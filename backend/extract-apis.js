const fs = require('fs');
const path = require('path');

const walk = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      fileList = walk(path.join(dir, file), fileList);
    } else if (file.endsWith('.controller.ts')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
};

const controllers = walk('./src/modules');
let totalRoutes = 0;
let output = '# Complete Backend API List\n\n';

for (const file of controllers) {
  const content = fs.readFileSync(file, 'utf-8');
  const controllerMatch = content.match(/@Controller\(['"](.*?)['"]\)/) || content.match(/@Controller\(\)/);
  const basePath = controllerMatch && controllerMatch[1] ? controllerMatch[1] : '';
  
  const moduleName = path.basename(file, '.controller.ts');
  output += `### ${moduleName.toUpperCase()} Module\n`;
  
  const lines = content.split('\n');
  for (const line of lines) {
    const routeMatch = line.match(/@(Get|Post|Put|Delete|Patch)\(['"](.*?)['"]\)/) || line.match(/@(Get|Post|Put|Delete|Patch)\(\)/);
    if (routeMatch) {
      const method = routeMatch[1].toUpperCase();
      const subPath = routeMatch[2] ? routeMatch[2] : '';
      let fullPath = `/${basePath}${basePath && subPath ? '/' : ''}${subPath}`;
      // Clean up double slashes
      fullPath = fullPath.replace(/\/\//g, '/');
      output += `- \`${method} ${fullPath}\`\n`;
      totalRoutes++;
    }
  }
  output += '\n';
}

output = `> **Total APIs Successfully Built:** ${totalRoutes}\n\n` + output;
fs.writeFileSync('api-list-report.md', output);
console.log('Generated api-list-report.md');
