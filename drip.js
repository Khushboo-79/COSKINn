
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
    let targetY = drip.h - offsetY*0.5;
    path += `C ${currentX + drip.w*0.2},${50 + offsetY} ${currentX + drip.w*0.4},${targetY} ${currentX + drip.w*0.5},${targetY} `;
    currentX += drip.w;
    path += `C ${currentX - drip.w*0.4},${targetY} ${currentX - drip.w*0.2},${50 + offsetY} ${currentX},${50 + offsetY} `;
  }
  path += `L1440,250 Z`;
  return path;
}
console.log("Yellow: " + generatePath(0));
console.log("Mint: " + generatePath(20));
console.log("White: " + generatePath(40));

