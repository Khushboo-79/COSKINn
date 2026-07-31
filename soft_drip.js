
const width = 1440;
const drips = [
  { w: 180, h: 180 },
  { w: 140, h: 220 },
  { w: 160, h: 130 },
  { w: 120, h: 240 },
  { w: 180, h: 160 },
  { w: 140, h: 200 },
  { w: 160, h: 150 },
  { w: 180, h: 210 },
  { w: 180, h: 170 } // total width 1440
];

function generatePath(offsetY) {
  let path = `M0,250 L0,${50 + offsetY} `;
  let currentX = 0;
  for (let drip of drips) {
    let targetY = drip.h - offsetY*0.6;
    let H = 50 + offsetY;
    let D = targetY;
    let x0 = currentX;
    let w = drip.w;
    let x_mid = x0 + w/2;
    let x1 = x0 + w;
    
    let c = w * 0.25; // standard smooth curve
    
    // down to drip tip
    path += `C ${x0 + c},${H} ${x_mid - c},${D} ${x_mid},${D} `;
    
    // up to peak
    path += `C ${x_mid + c},${D} ${x1 - c},${H} ${x1},${H} `;
    
    currentX = x1;
  }
  path += `L1440,250 Z`;
  return path;
}
console.log("Yellow: " + generatePath(0));
console.log("Mint: " + generatePath(20));
console.log("White: " + generatePath(40));

