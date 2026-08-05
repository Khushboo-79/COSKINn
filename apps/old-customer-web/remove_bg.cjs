const Jimp = require('jimp');

async function removeBg() {
  const image = await Jimp.read('c:\\coskin\\COSKINn\\apps\\customer-web\\public\\floating_skincare.png');
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    const red = this.bitmap.data[idx + 0];
    const green = this.bitmap.data[idx + 1];
    const blue = this.bitmap.data[idx + 2];
    
    // If pixel is very close to white
    if (red > 240 && green > 240 && blue > 240) {
      this.bitmap.data[idx + 3] = 0; // alpha to 0
    }
  });
  await image.writeAsync('c:\\coskin\\COSKINn\\apps\\customer-web\\public\\floating_skincare.png');
  await image.writeAsync('c:\\coskin\\COSKINn\\apps\\New\\apps\\customer-web\\public\\floating_skincare.png');
  console.log('done');
}
removeBg();
