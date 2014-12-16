var fs = require("fs"),
  dist;

dist = function (one, two) {
  var squares = 0,
    axis;

  for (axis = 0; axis < 3; axis++) {
    squares += Math.pow(two.point[axis] - one.point[axis], 2);
  }

  return Math.sqrt(squares);
};

var starPoints = JSON.parse(
  fs.readFileSync("./Star_points_normalized.json")
),
  starSegments = [],
  numStarSegments = 10,
  lightPoints = [];


var i, segStart, segEnd, l, light, sideVector;

for (i = 0; i < numStarSegments; i++) {

  segStart = starPoints[i];
  segEnd = starPoints[(i + 1) % 10];
  sideVector = [
    segEnd.point[0] - segStart.point[0],
    segEnd.point[1] - segStart.point[1],
    segEnd.point[2] - segStart.point[2]
  ];

  // place each light along this segment
  for (l = 1; l < 9; l++) {

    lightPoints.push({
      point: [
        segStart.point[0] + l * (sideVector[0] / 9.0),
        segStart.point[1] + l * (sideVector[1] / 9.0),
        segStart.point[2] + l * (sideVector[2] / 9.0)
      ]
    });
  }
}

console.log(JSON.stringify(lightPoints));
