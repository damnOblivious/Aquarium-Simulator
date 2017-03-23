var xBoundaryDirection = vec3.fromValues(0.0,0.0,1.0);
var yBoundaryDirection = vec3.fromValues(0.0,1.0,0.0);
var zBoundaryDirection = vec3.fromValues(1.0,0.0,0.0);

function checkCollision(object) {

  if(object.positionVector[0] < -tankBoundary.x) {
    if(object.directionVector[0] < 0) {
      object.rotationAngle = 1;
    }
    else if(object.directionVector[0] < 0.02){
      if(object.rotationAngle <= 0) {
        object.rotationAngle = Math.floor((Math.random() * 90) + 10);
      }
    }
  }
  else if(object.positionVector[0] > tankBoundary.x) {
    if(object.directionVector[0] > 0) {
      object.rotationAngle += 1;
    }
    else if(object.directionVector[0] > -0.02){
      if(object.rotationAngle <= 0) {
        object.rotationAngle = Math.floor((Math.random() * 90) + 10);
      }
    }
  }


  else if(object.positionVector[2] < -tankBoundary.z) {
    if(object.directionVector[2] < 0) {
      object.rotationAngle += 1;
    }
    else if(object.directionVector[2] < 0.02){
      if(object.rotationAngle <= 0) {
        object.rotationAngle = Math.floor((Math.random() * 90) + 10);
      }
    }
  }
  else if(object.positionVector[2] > tankBoundary.z) {
    if(object.directionVector[2] > 0) {
      object.rotationAngle = 1;
    }
    else if(object.directionVector[2] > -0.02){
      if(object.rotationAngle <= 0) {
        object.rotationAngle = Math.floor((Math.random() * 90) + 10);
      }
    }
  }

}
