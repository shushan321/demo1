const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_USER = 'shushan321';
const REPO_NAME = 'demo1';
const TOKEN = process.argv[2] || '';

const IGNORE_PATTERNS = ['node_modules', '.git', 'dist', '.trae', 'deploy-to-github.js'];

function isIgnored(filePath) {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function getAllFiles(dir, files = [], prefix = '') {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const relativePath = prefix ? `${prefix}/${entry}` : entry;
    
    if (isIgnored(relativePath)) continue;
    
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllFiles(fullPath, files, relativePath);
    } else {
      files.push({
        path: relativePath,
        content: fs.readFileSync(fullPath, 'utf-8')
      });
    }
  }
  return files;
}

function makeRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const reqOptions = { ...options, rejectUnauthorized: false };
    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function createRepo() {
  console.log('Checking if repo exists...');
  const checkOptions = {
    hostname: 'api.github.com',
    path: `/repos/${GITHUB_USER}/${REPO_NAME}`,
    method: 'GET',
    headers: {
      'Authorization': `token ${TOKEN}`,
      'User-Agent': 'Node.js'
    }
  };
  
  const checkResponse = await makeRequest(checkOptions);
  
  if (checkResponse.status === 200) {
    console.log('Repo already exists, skipping creation');
    return true;
  }
  
  const options = {
    hostname: 'api.github.com',
    path: '/user/repos',
    method: 'POST',
    headers: {
      'Authorization': `token ${TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Node.js'
    }
  };
  
  const body = {
    name: REPO_NAME,
    private: false,
    auto_init: true
  };
  
  const response = await makeRequest(options, body);
  console.log('Create repo response:', response.status, response.body.message || response.body);
  
  return response.status === 201;
}

async function uploadFiles() {
  const files = getAllFiles('.');
  console.log(`Found ${files.length} files to upload`);
  
  for (const file of files) {
    const getOptions = {
      hostname: 'api.github.com',
      path: `/repos/${GITHUB_USER}/${REPO_NAME}/contents/${file.path}`,
      method: 'GET',
      headers: {
        'Authorization': `token ${TOKEN}`,
        'User-Agent': 'Node.js'
      }
    };
    
    const getResponse = await makeRequest(getOptions);
    
    const body = {
      message: `Add ${file.path}`,
      content: Buffer.from(file.content).toString('base64')
    };
    
    if (getResponse.status === 200) {
      body.sha = getResponse.body.sha;
    }
    
    const putOptions = {
      hostname: 'api.github.com',
      path: `/repos/${GITHUB_USER}/${REPO_NAME}/contents/${file.path}`,
      method: 'PUT',
      headers: {
        'Authorization': `token ${TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Node.js'
      }
    };
    
    const response = await makeRequest(putOptions, body);
    console.log(`Upload ${file.path}: ${response.status}`);
    
    if (response.status !== 201 && response.status !== 200) {
      console.log('Error:', response.body.message || response.body);
    }
  }
}

async function main() {
  console.log('Starting deployment to GitHub...');
  
  if (!TOKEN || TOKEN === 'ghp_...') {
    console.error('ERROR: Please provide a valid GitHub Personal Access Token');
    console.error('Visit https://github.com/settings/tokens to generate one');
    return;
  }
  
  const created = await createRepo();
  if (created) {
    await uploadFiles();
    console.log('\nDeployment complete!');
    console.log(`Repository: https://github.com/${GITHUB_USER}/${REPO_NAME}`);
  } else {
    console.error('Failed to create repository');
  }
}

main().catch(console.error);
