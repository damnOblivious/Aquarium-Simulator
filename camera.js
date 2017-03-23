var eye = vec3.create();
var center = vec3.create();
var up = vec3.create();

function setUpNormalCam() {
  eye = vec3.fromValues(0,10,30);
  center = vec3.fromValues(0,10,0);
  up = vec3.fromValues(0,1,0);

  mat4.perspective(projectionMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
  setViewMatrix();
}

function setUpFreeCam(delta) {
  mat4.multiply(viewMatrix,delta,viewMatrix);
}


function setUpFollowCam() {
  object = activeFish;
  vec3.scaleAndAdd(eye, object.positionVector, object.directionVector, -20.0);
  vec3.add(eye, eye, vec3.fromValues(0.0, 5.0, 0.0));
  center = vec3.clone(object.positionVector);
  up = vec3.fromValues(0.0, 1.0, 0.0);

  mat4.perspective(projectionMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
  setViewMatrix();
}

function setUpFirstPersonCam() {
  object = activeFish;
  vec3.scaleAndAdd(eye, object.positionVector, object.directionVector, 3.0);
  vec3.add(eye, eye, vec3.fromValues(0.0, 0.0, 0.0));
  vec3.scaleAndAdd(center, object.positionVector, object.directionVector, 10.0);
  up = vec3.fromValues(0.0, -1.0, 0.0);

  mat4.perspective(projectionMatrix, 180, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
  setViewMatrix();
}

function setViewMatrix() {
  mat4.lookAt(viewMatrix, eye, center, up);
}

function setCam() {
  switch (typeOfView) {
    case "normalView":
    setUpNormalCam();
    break;
    case "followView":
    setUpFollowCam();
    break;
    case "firstPersonView":
    setUpFirstPersonCam();
    break;
    // case "free":
    // setUpFreeCam(vec3.create());
    // break;
    default:

  }
}
