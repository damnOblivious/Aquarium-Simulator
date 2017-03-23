var rotationMagnitude = 1;

function degToRadians(deg) {
  return (deg*(PI))/180.0;
}

function rotateAndtranslateObject(object) {
  var finalVec = vec3.create();
  var quatVec = quat.create();

  if(object.rotationAngle != 0) {
    if(object.rotationAngle > 0) {
      object.displayAngle += rotationMagnitude;
      object.rotationAngle -= rotationMagnitude;
    }
    if(object.rotationAngle < 0) {
      object.displayAngle -= rotationMagnitude;
      object.rotationAngle += rotationMagnitude;
    }

    if(object.displayAngle > 360) {
      object.displayAngle -= 360;
    }
    else if(object.displayAngle < 0) {
      object.displayAngle += 360;
    }
    if(object.rotationAngle > 360) {
      object.rotationAngle -= 360;
    }
    else if(object.rotationAngle < -360) {
      object.rotationAngle += 360;
    }
  }

  vec3.rotateY(object.directionVector, object.initialDirection, vec3.fromValues(0,0,0), degToRadians(object.displayAngle));
  vec3.scale(object.translationVector, object.directionVector, object.speed);          //make translationVector
  vec3.add(finalVec, object.translationVector, object.positionVector);

  quat.rotateY(quatVec, quatVec, glMatrix.toRadian(object.displayAngle) + object.initialAngle);
  mat4.fromRotationTranslation(object.modelMatrix, quatVec, finalVec);
  vec3.transformMat4(object.positionVector, [0.0, 0.0, 0.0], object.modelMatrix);
}
