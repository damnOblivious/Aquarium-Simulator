var cubeVertexPositionBuffer;
var cubeVertexColorBuffer;
var cubeVertexIndexBuffer;

function createObjects() {
  createTerrain();
  createFish();
  createEgg();
}

function eggOut() {
  $( "#egg" ).load( "models/egg.html" ,function() {
    var newEgg;
    newEgg = parseMeshInfo("egg.obj");
    genTexture("textures/egg.png", newEgg, "terrain");
    mat4.translate(newEgg.modelMatrix,newEgg.modelMatrix,activeFish.positionVector);
    eggs.push(newEgg);
  });
}

function parseMeshInfo(id) {
  var objStr = document.getElementById(id).innerHTML;
  var mesh = new OBJ.Mesh(objStr);
  OBJ.initMeshBuffers(gl, mesh);
  mesh.modelMatrix = mat4.create();
  mat4.identity(mesh.modelMatrix);
  return mesh;
}

function genTexture(imageSrc, obj, loaded) {
  var texture = gl.createTexture();
  texture.image = new Image();
  texture.image.onload = function () {
    obj.appliedTexture = texture;

    if(loaded == "player") {
      handleLoadedTexture(texture, false);
      playerLoaded = true;
    }
    else if(loaded == "terrain") {
      handleLoadedTexture(texture, true);
      terrainLoaded = true;
    }
  }
  texture.image.src = imageSrc;
}

function handleLoadedTexture(texture, isRepeat) {
  var repeatVal;
  if(isRepeat) {
    repeatVal = gl.REPEAT;
  }
  else {
    repeatVal = gl.CLAMP_TO_EDGE;
  }

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, repeatVal);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, repeatVal);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

function createFish() {
  $( "#fish1" ).load( "models/fish1.html" ,function() {
    for(var i = 0;i < 3; i++) {
      fishes[i] = parseMeshInfo("fish1.obj");
      genTexture("textures/fish_body2.jpg", fishes[i] , "player");
      fishes[i].initialDirection = vec3.fromValues(Math.random(), 0.0, Math.random());
      vec3.normalize(fishes[i].initialDirection,fishes[i].initialDirection);
      fishes[i].initialAngle = Math.acos(vec3.dot(fishes[i].initialDirection,fishDefaultDirection));
      fishes[i].positionVector = vec3.fromValues(Math.floor((Math.random() * 8) - 6.0), Math.floor((Math.random() * 8) + 5.0), Math.floor((Math.random() * 8) - 6.0));
      fishes[i].translationVector = vec3.create();
      fishes[i].directionVector = vec3.create();
      fishes[i].speed = (Math.random() * 0.07) + 0.05;
      fishes[i].displayAngle = 0;
      fishes[i].rotationAngle = 0;
    }
    for(var i = 3;i < 6; i++) {
      fishes[i] = parseMeshInfo("fish1.obj");
      genTexture("textures/fish22.jpg", fishes[i] , "player");
      fishes[i].initialDirection = vec3.fromValues(Math.random(), 0.0, Math.random());
      vec3.normalize(fishes[i].initialDirection,fishes[i].initialDirection);
      fishes[i].initialAngle = Math.acos(vec3.dot(fishes[i].initialDirection,fishDefaultDirection));
      fishes[i].positionVector = vec3.fromValues(Math.floor((Math.random() * 8) - 6.0), Math.floor((Math.random() * 8) + 5.0), Math.floor((Math.random() * 8) - 6.0));
      fishes[i].translationVector = vec3.create();
      fishes[i].directionVector = vec3.create();
      fishes[i].speed = (Math.random() * 0.07) + 0.05;
      fishes[i].displayAngle = 0;
      fishes[i].rotationAngle = 0;
    }

  });
}

function createTerrain() {
  $( "#terrain" ).load( "models/terrain.html" ,function() {
    terrain = parseMeshInfo("terrain.obj");
    genTexture("textures/terrain_sand.jpg", terrain, "terrain");
  });
}

function createEgg() {
  $( "#egg" ).load( "models/egg.html" ,function() {
    egg = parseMeshInfo("egg.obj");
    genTexture("textures/egg.png", egg, "terrain");
  });
}
