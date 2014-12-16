var fs = require("fs");

var origPoints = JSON.parse(
  fs.readFileSync("./Star_points.json")
),
  normalizedPoints = [],
  max = null;


var i, p, normalizedP, axis;

max = origPoints[0];
for (i = 1; i < origPoints.length; i++) {

  p = origPoints[i];

  if (
    p.point[0] > max.point[0] ||
    p.point[1] > max.point[1]
  ) {
    max = p;
  }
}

for (i = 0; i < origPoints.length; i++) {
  p = origPoints[i];
  normalizedP = {point: []};

  for (axis = 0; axis < 3; axis++) {
    if (p.point[axis] === 0 || max.point[axis] === 0) {
      normalizedP.point.push(0);
    } else {
      normalizedP.point.push(p.point[axis] / max.point[axis]);
    }
  }
  normalizedPoints.push(normalizedP);
}

console.log(JSON.stringify(normalizedPoints));
