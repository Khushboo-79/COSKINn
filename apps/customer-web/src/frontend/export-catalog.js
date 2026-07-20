import fs from 'fs';

const content = fs.readFileSync('./src/constants/skincareProducts.js', 'utf8');

const mockContent = content
  .replace(/import (\w+) from '([^']+)';/g, "const $1 = '/assets/' + '$2'.split('/').pop();") // map images to a predictable path
  .replace(/export const/g, 'const')
  .replace('export default', '// export default')
  + '\n\nfs.writeFileSync("catalog.json", JSON.stringify(skincareProducts, null, 2));\nconsole.log("Exported to catalog.json");';

fs.writeFileSync('./mock-run.js', "import fs from 'fs';\n" + mockContent);
