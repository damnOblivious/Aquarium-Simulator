function getShader(gl, id) {
  var shaderScript = document.getElementById(id);
  if (!shaderScript) {
    return null;
  }

  var str = "";
  var k = shaderScript.firstChild;
  while (k) {
    if (k.nodeType == 3) {
      str += k.textContent;
    }
    k = k.nextSibling;
  }

  var shader;
  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;
  }

  gl.shaderSource(shader, str);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

var programID;

function initShaders() {
  var vertexShader = getShader(gl, "vertShader");
  var fragmentShader = getShader(gl, "fragShader");

  programID = gl.createProgram();
  gl.attachShader(programID, vertexShader);
  gl.attachShader(programID, fragmentShader);
  gl.linkProgram(programID);

  if (!gl.getProgramParameter(programID, gl.LINK_STATUS)) {
    alert("Could not initialise shaders");
  }

  gl.useProgram(programID);

  programID.positionAttributeLoc = gl.getAttribLocation(programID, "vertexPosition");
  programID.textureAttributeLoc = gl.getAttribLocation(programID, "textureCoords");
  gl.enableVertexAttribArray(programID.positionAttributeLoc);
  gl.enableVertexAttribArray(programID.textureAttributeLoc);

  programID.modelLoc = gl.getUniformLocation(programID, "uModelMatrix");
  programID.viewLoc = gl.getUniformLocation(programID, "uViewMatrix");
  programID.projLoc = gl.getUniformLocation(programID, "uProjectionMatrix");
}
