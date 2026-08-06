import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(directoryPath);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes("'http://localhost:3000/api")) {
    content = content.replace(/'http:\/\/localhost:3000\/api(.*?)'/g, "`\\${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}$1`");
    changed = true;
  }
  
  if (content.includes('`http://localhost:3000/api')) {
    content = content.replace(/`http:\/\/localhost:3000\/api(.*?)`/g, "`\\${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}$1`");
    changed = true;
  }
  
  if (content.includes('`http://localhost:3000${endpoint}`')) {
    content = content.replace(/`http:\/\/localhost:3000\$\{endpoint\}`/g, "`\\${(import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace('/api', '')}\\${endpoint}`");
    changed = true;
  }

  if (changed) {
    // don't mess up client.ts which defines BASE_URL
    if (!file.includes('client.ts') && !file.includes('apiClient.js')) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
  }
});
