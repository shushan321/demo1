const https = require('https');

const TOKEN = process.argv[2] || '';

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

async function main() {
  const options = {
    hostname: 'api.github.com',
    path: '/user/repos?per_page=100',
    method: 'GET',
    headers: {
      'Authorization': `token ${TOKEN}`,
      'User-Agent': 'Node.js'
    }
  };
  
  const response = await makeRequest(options);
  console.log('Repos:', response.status);
  if (Array.isArray(response.body)) {
    response.body.forEach(repo => {
      console.log('-', repo.name, '-', repo.html_url);
    });
  } else {
    console.log('Response:', JSON.stringify(response.body, null, 2));
  }
}

main().catch(console.error);
