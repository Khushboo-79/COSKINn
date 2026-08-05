const fs = require('fs');
const path = require('path');

const replaceInFile = (filePath, replacements) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const [target, replacement] of replacements) {
    if (content.includes(target)) {
      content = content.split(target).join(replacement);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
};

const apps = [
  'c:\\coskin\\COSKINn\\apps\\New\\apps\\customer-web\\src\\components\\home',
  'c:\\coskin\\COSKINn\\apps\\customer-web\\src\\components\\home'
];

const replacements = [
  ['https://images.pexels.com/photos/9306017/pexels-photo-9306017.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_909_0f22b9b4-b73c-4b48-ba0a-16ead110449c.png'],
  ['https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_907_656adcce-5130-472e-af18-505fecb03cde.png'],
  ['https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_2_d5780193-0af9-42d2-97c9-d16c3a333b8a.png'],
  ['https://images.pexels.com/photos/27393236/pexels-photo-27393236.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_894_dabb9781-850f-43d1-beab-cb226b2101cd.png'],
  ['https://images.pexels.com/photos/9306017/pexels-photo-9306017.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_9_caf3ac76-77ae-4446-a478-fea9c04a377d.png']
];

apps.forEach(appDir => {
  ['Philosophy.tsx', 'InteractiveExperience.tsx', 'Hero.tsx'].forEach(file => {
    replaceInFile(path.join(appDir, file), replacements);
  });
});
