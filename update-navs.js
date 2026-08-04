const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('Router.tsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('apps/internal-panel/src/modules');

const linkReplacement = `<Link
              key={tab.name || tab.path}
              to={tab.path}
              className={\`flex items-center whitespace-nowrap px-5 py-4 text-sm font-bold border-b-2 transition-all duration-300 ease-out active:scale-95 \${
                isActive
                  ? 'border-[#FF7F50] text-[#FF7F50] bg-gradient-to-t from-[#FF7F50]/10 to-transparent shadow-[inset_0_-2px_4px_rgba(255,127,80,0.1)]'
                  : 'border-transparent text-slate-500 hover:text-[#FF7F50] hover:bg-gradient-to-t hover:from-[#FF7F50]/5 hover:to-transparent'
              }\`}
            >
              <Icon className={\`h-4 w-4 mr-2.5 transition-transform duration-300 \${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}\`} />
              {tab.name}
            </Link>`;

files.forEach(f => {
  if (f.includes('AdminRouter')) return;
  
  let content = fs.readFileSync(f, 'utf8');
  
  // Replace the link block inside the map
  const newContent = content.replace(/<Link[\s\S]*?to=\{tab\.path\}[\s\S]*?className=\{`flex items-center[\s\S]*?<\/Link>/g, linkReplacement);
  
  // Also try to make their container look like AdminRouter if it uses space-x or similar
  let finalContent = newContent.replace(/className="flex space-x-6"/g, 'className="flex border-b border-slate-200 bg-white mb-6 rounded-2xl shadow-sm overflow-x-auto px-2 scrollbar-hide"');
  // And remove the wrapper's redundant classes if we did that
  finalContent = finalContent.replace(/<div className="bg-white border-b border-slate-200[^>]*>\s*<nav className="flex[^>]*>/g, '<div className="flex border-b border-slate-200 bg-white mb-6 rounded-2xl shadow-sm overflow-x-auto px-2 scrollbar-hide w-full">');
  // Just in case it has a closing nav tag
  finalContent = finalContent.replace(/<\/nav>\s*<\/div>/g, '</div>');

  if (content !== finalContent) {
    fs.writeFileSync(f, finalContent);
    console.log('Updated ' + f);
  }
});
console.log('Done');
