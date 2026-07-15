const fs = require('fs');
const https = require('https');

const TOKEN = process.argv[2] || '';
const GITHUB_USER = 'shushan321';
const REPO_NAME = 'demo1';

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

async function updatePagesConfig() {
  const options = {
    hostname: 'api.github.com',
    path: `/repos/${GITHUB_USER}/${REPO_NAME}/pages`,
    method: 'PUT',
    headers: {
      'Authorization': `token ${TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Node.js'
    }
  };
  
  const body = {
    source: {
      branch: 'main',
      path: '/'
    }
  };
  
  const response = await makeRequest(options, body);
  console.log('Pages config:', response.status, response.body.message || response.body);
  return response.status === 200;
}

async function main() {
  console.log('Configuring GitHub Pages...');
  
  if (!TOKEN) {
    console.error('Please provide GitHub token');
    return;
  }
  
  const success = await updatePagesConfig();
  if (success) {
    console.log('\nGitHub Pages configured!');
    console.log('Visit: https://shushan321.github.io/demo1');
    console.log('Note: It may take 10-15 minutes for the site to become available');
  }
}

main().catch(console.error);
