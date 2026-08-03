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
  'c:\\coskin\\COSKINn\\apps\\New\\apps\\customer-web\\src',
  'c:\\coskin\\COSKINn\\apps\\customer-web\\src'
];

const smallImages = [
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/Serum_d95eef23-8011-41c4-a856-692a67509aa1.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_919.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/Face_Mask.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/Eye_Care_49b3bc73-937d-4549-8e39-4c78f6b74e41.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_915_e0c2f1f1-2071-4740-8736-af7a0408c344.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/Face_Toner.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_913_f7ee333f-0dbb-4041-9b8f-4d0b34ed0d4e.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_920.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/Acne_2c4e1ede-0c50-450b-bf2f-9b22faddec99.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_916.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_917.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_918.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_2679_2.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_895_df5f14cd-8da3-4932-a797-039b1dbcd978.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_909_0f22b9b4-b73c-4b48-ba0a-16ead110449c.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_907_656adcce-5130-472e-af18-505fecb03cde.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_2_d5780193-0af9-42d2-97c9-d16c3a333b8a.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_894_dabb9781-850f-43d1-beab-cb226b2101cd.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_9_caf3ac76-77ae-4446-a478-fea9c04a377d.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_722_a1723890-c0c5-448c-8596-2c1a83fa8230.png',
  'https://cdn.shopify.com/s/files/1/0361/8553/8692/files/image_4_cc6c09ee-d88f-4772-8fdf-1965173e31ab.png'
];

const highResImages = [
  'https://www.dotandkey.com/cdn/shop/files/VitaminCSunscreenListing1_24ade7b6-5667-43a8-8cbf-a750fae616a4.jpg',
  'https://www.dotandkey.com/cdn/shop/files/Artboard1_583ef82d-c136-490d-aab1-4780f12ee608.jpg',
  'https://www.dotandkey.com/cdn/shop/files/1a_3ef32ac6-5192-495c-b4bb-dafb0e806260.jpg',
  'https://www.dotandkey.com/cdn/shop/files/1_de25ac2d-c470-43f2-9217-538f92860f78.jpg',
  'https://www.dotandkey.com/cdn/shop/files/1-_175g.jpg',
  'https://www.dotandkey.com/cdn/shop/files/Artboard_1_f94f4456-d328-4271-ab7e-94bde8c9bbd3.jpg',
  'https://www.dotandkey.com/cdn/shop/files/1-1_b4ae866f-e0a8-43d1-971f-1d143d76f01c.jpg',
  'https://www.dotandkey.com/cdn/shop/files/Artboard1_95ac3e40-4665-40b5-ae87-a3379ff9847e.jpg',
  'https://www.dotandkey.com/cdn/shop/files/1-175.jpg',
  'https://www.dotandkey.com/cdn/shop/files/1_7.jpg',
  'https://www.dotandkey.com/cdn/shop/files/ann_2_1_9036910d-d727-4641-ae46-a916a0408fcf.jpg',
  'https://www.dotandkey.com/cdn/shop/files/ann_1_fbd46065-e3cb-430d-b50b-a55d129abac1.jpg',
  'https://www.dotandkey.com/cdn/shop/files/dfs.jpg',
  'https://www.dotandkey.com/cdn/shop/files/Banner_Mob_c80fe41c-c277-4cdb-a135-343928f3e8aa.jpg',
  'https://www.dotandkey.com/cdn/shop/files/Banner_Desktop_cdcfa928-5948-4a5c-a344-7992702ed0b9.jpg',
  'https://www.dotandkey.com/cdn/shop/files/Desk_c1390568-a6ba-43d9-98d3-b87e0790dfc5.png',
  'https://www.dotandkey.com/cdn/shop/files/mob_11bd4c0e-4801-48c4-aeb8-fb07f1d46aba.jpg',
  'https://www.dotandkey.com/cdn/shop/files/MOIST_DESK_be5518ac-2e4e-4dc4-878f-a803c7677b21.jpg',
  'https://www.dotandkey.com/cdn/shop/files/MOIST_MOB_copy_2_33302a0c-5902-454d-89fb-b56be26e4b13.jpg',
  'https://www.dotandkey.com/cdn/shop/files/Desktop_Banner_2.jpg',
  'https://www.dotandkey.com/cdn/shop/files/Artboard_2_11.jpg'
];

const replacements = smallImages.map((sImg, i) => [sImg, highResImages[i % highResImages.length]]);

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkSync(filePath, filelist);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      filelist.push(filePath);
    }
  });
  return filelist;
};

apps.forEach(appDir => {
  if (fs.existsSync(appDir)) {
    const files = walkSync(appDir);
    files.forEach(file => {
      replaceInFile(file, replacements);
    });
  }
});
