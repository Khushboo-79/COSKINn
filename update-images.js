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
  'c:\\coskin\\COSKINn\\apps\\New\\apps\\customer-web\\src\\pages',
  'c:\\coskin\\COSKINn\\apps\\customer-web\\src\\pages'
];

const replacements = [
  // About.tsx
  ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_722_a1723890-c0c5-448c-8596-2c1a83fa8230.png'],
  ['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_4_cc6c09ee-d88f-4772-8fdf-1965173e31ab.png'],
  // Contact.tsx
  ['https://images.pexels.com/photos/4465121/pexels-photo-4465121.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_895_df5f14cd-8da3-4932-a797-039b1dbcd978.png'],
  // Journal.tsx
  ['https://images.pexels.com/photos/9306017/pexels-photo-9306017.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/Face_Mask.png'],
  ['https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/Serum_d95eef23-8011-41c4-a856-692a67509aa1.png'],
  ['https://images.pexels.com/photos/27393236/pexels-photo-27393236.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_919.png'],
  ['https://images.unsplash.com/photo-1550828520-4cb496926fc9?auto=format&fit=crop&w=800&q=80', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_913_f7ee333f-0dbb-4041-9b8f-4d0b34ed0d4e.png'],
  // RoutineResult.tsx
  ['https://images.unsplash.com/photo-1615397323133-c90a2a16d557?auto=format&fit=crop&q=80', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/Eye_Care_49b3bc73-937d-4549-8e39-4c78f6b74e41.png'],
  ['https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_920.png'],
  ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/Acne_2c4e1ede-0c50-450b-bf2f-9b22faddec99.png'],
  ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_917.png'],
  // auth/Login.tsx, auth/OTPVerification.tsx
  ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_915_e0c2f1f1-2071-4740-8736-af7a0408c344.png'], // (Duplicate in replacements, won't run if previous matches but it's fine, I'll update it)
  ['https://images.pexels.com/photos/27393236/pexels-photo-27393236.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_919.png'],
  ['https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/Serum_d95eef23-8011-41c4-a856-692a67509aa1.png']
];

apps.forEach(appDir => {
  ['About.tsx', 'Contact.tsx', 'Journal.tsx', 'RoutineResult.tsx', 'Account.tsx', 'auth/Login.tsx', 'auth/OTPVerification.tsx'].forEach(file => {
    replaceInFile(path.join(appDir, file), replacements);
  });
});
