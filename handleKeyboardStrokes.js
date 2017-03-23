function handleKeyDown(event) {

  currentlyPressedKeys[event.keyCode] = true;
  switch(String.fromCharCode(event.keyCode)) {

    /***********************************CAMERA*************************************/
    case "F":           //followCam
    setActiveFish();
    typeOfView = "followView";
    break;
    case "P":           //firstPerson
    typeOfView = "firstPersonView";
    setActiveFish();
    break;
    case "N":            //normalView
    typeOfView = "normalView";
    break;
    case "M":            //normalView
    typeOfView = "free";
    break;

    case "&":       // upkey
    if(typeOfView == "free") {
      mat4.fromTranslation(freeCamMat ,[0,-0.1,0]);
      setUpFreeCam(freeCamMat);
    }
    break;
    case "(":       // down
    if(typeOfView == "free") {
      mat4.fromTranslation(freeCamMat ,[0,0.1,0]);
      setUpFreeCam(freeCamMat);
    }
    break;
    case "'":       // right
    if(typeOfView == "free") {
      mat4.fromTranslation(freeCamMat ,[-0.1,0,0]);
      setUpFreeCam(freeCamMat);
    }
    break;
    case "%":       // left
    if(typeOfView == "free") {
      mat4.fromTranslation(freeCamMat ,[0.1,0,0]);
      setUpFreeCam(freeCamMat);
    }
    break;
    case "I":       // in
    if(typeOfView == "free") {
      mat4.fromTranslation(freeCamMat ,[0,0,0.1]);
      setUpFreeCam(freeCamMat);
    }
    break;
    case "O":       // out
    if(typeOfView == "free") {
      mat4.fromTranslation(freeCamMat ,[0,0,-0.1]);
      setUpFreeCam(freeCamMat);
    }
    break;

    case "U":       // rotate
    if(typeOfView == "free") {
      mat4.fromRotation(freeCamMat ,degToRadians(2),[0,1,0]);
      setUpFreeCam(freeCamMat);
    }
    break;
    case "Y":       // antirotate
    if(typeOfView == "free") {
      mat4.fromRotation(freeCamMat ,degToRadians(-2),[0,1,0]);
      setUpFreeCam(freeCamMat);
    }
    break;

    case "K":       // rotate
    if(typeOfView == "free") {
      mat4.fromRotation(freeCamMat ,degToRadians(2),[1,0,0]);
      setUpFreeCam(freeCamMat);
    }
    break;
    case "J":       // antirotate
    if(typeOfView == "free") {
      mat4.fromRotation(freeCamMat ,degToRadians(-2),[1,0,0]);
      setUpFreeCam(freeCamMat);
    }
    break;

    /**********************************FISH*CONTROLS****************************************/
    case "R":
    setActiveFish();
    activeFish.rotationAngle = 1;
    break;
    case "W":
    activeFish.speed += 0.01;
    break;
    case "S":
    activeFish.speed -= 0.01;
    break;
    case "E":
    eggOut();
    break;
    case "D":
    // var findex = fishes.indexOf(activeFish);
    // console.log(findex);
    // if (findex > -1) {
    //   array.splice(findex, 1);
    // }
    break;

    case "T":
    selectedIndex =(selectedIndex + 1)%6;
    setActiveFish();
    break;


    default:
    console.log(String.fromCharCode(event.keyCode));
    break;
  }
}

function handleKeyUp(event) {
  currentlyPressedKeys[event.keyCode] = false;
  switch(String.fromCharCode(event.keyCode)) {
    case "F":
    break;
    default:
  }
}

function handleKeys() {
  if (currentlyPressedKeys[33]) {
    // Page Up
  }
  if (currentlyPressedKeys[34]) {
    // Page Down
  }
  if (currentlyPressedKeys[37]) {
    // Left cursor key
  }
  if (currentlyPressedKeys[39]) {
    // Right cursor key
  }
  if (currentlyPressedKeys[38]) {
    // Up cursor key
  }
  if (currentlyPressedKeys[40]) {
    // Down cursor key
  }
}

function fitinCordsX (x) {
  return (x/600)*10*2 - 10.0;
}
function fitinCordsY (y) {
  return 20.0 - (y/600)*20*2;
}

function handleMouseDown(event) {
  mouseDown = true;
  lastMouseX = fitinCordsX(event.clientX);
  lastMouseY = fitinCordsY(event.clientY);
  var distance = 10000;
  var ans = 0;
  for(var i = 0; i < 6; i++) {
    var position = vec3.clone(fishes[i].positionVector);
    var currdis = Math.sqrt((position[0] - lastMouseX)*(position[0] - lastMouseX) + (position[2] - lastMouseX)*(position[2] - lastMouseY));
    if ( distance > currdis ) {
      distance = currdis;
      ans = i;
    }
  }
  selectedIndex = ans;
  setActiveFish();
  console.log(ans);
}

function handleMouseUp(event) {
  mouseDown = false;
}

function handleMouseMove(event) {
  if (!mouseDown) {
    return;
  }
  // for ( )
  var newX = event.clientX;
  var newY = event.clientY;
  var deltaX = newX - lastMouseX;
  var deltaY = newY - lastMouseY;

  lastMouseX = newX
  lastMouseY = newY;
}
