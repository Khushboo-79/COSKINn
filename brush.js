
function generateTopBrush() {
  let path = "M0,100 L0,50 ";
  path += "C 120,40 240,60 360,30 ";
  path += "C 480,0 600,70 720,40 ";
  path += "C 840,10 960,60 1080,20 ";
  path += "C 1200,-20 1320,50 1440,30 ";
  path += "L1440,100 Z";
  return path;
}
function generateBottomBrush() {
  let path = "M0,0 L0,50 ";
  path += "C 120,60 240,40 360,70 ";
  path += "C 480,100 600,30 720,60 ";
  path += "C 840,90 960,40 1080,80 ";
  path += "C 1200,120 1320,50 1440,70 ";
  path += "L1440,0 Z";
  return path;
}
console.log("Top:", generateTopBrush());
console.log("Bottom:", generateBottomBrush());

