var gl;
var lastTime = 0;
var fish1 = {},terrain;
var generic = {};
var fishes = new Array;
var eggs = [],newEgg;
var defaultFishInfo;
var loadedFishes;
var playerLoaded = false , terrainLoaded = false;
var currentlyPressedKeys = {};
var activeFish;
var selectedIndex = 0;
var typeOfView = "normalView";       //"followCam", "firstPerson", "normalView"
var normalView = false;
var PI = 3.14159265;
var modelMatrix = mat4.create();
var projectionMatrix = mat4.create();
var viewMatrix = mat4.create();
var tankBoundary = {
  x : 10,
  y : 10,
  z : 10,
  centerx : 0,
  centery : 0,
  centerz : 0,
};

var freeCamMat = mat4.create();


var fishDefaultDirection = vec3.fromValues(-1.0, 0.0, 0.0);

var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;

function animate() {
  var timeNow = new Date().getTime();
  if (lastTime != 0) {
  }
  lastTime = timeNow;
}

function tick() {
  requestAnimFrame(tick);
  handleKeys();
  renderScene();
  setCam();
  animate();
}

function initGL(canvas) {
  try {
    gl = canvas.getContext("webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch (e) {
  }
  if (!gl) {
    alert("Could not initialise WebGL, sorry :-(");
  }
}

function setActiveFish() {
  activeFish = fishes[selectedIndex];
}

function startWebGl() {
  var canvas = document.getElementById("canvas1");
  initGL(canvas);
  initShaders();
  createObjects();

  gl.clearColor(0.0, 0.0, 1.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;
  canvas.onmousedown = handleMouseDown;
  document.onmouseup = handleMouseUp;
  document.onmousemove = handleMouseMove;
  tick();
}
