

function setUniformMatrix(model) {
    gl.uniformMatrix4fv(programID.modelLoc, false, model);
    gl.uniformMatrix4fv(programID.viewLoc, false, viewMatrix);
    gl.uniformMatrix4fv(programID.projLoc, false, projectionMatrix);
}

function setupRenderBuffers(meshObj) {
  gl.bindBuffer(gl.ARRAY_BUFFER, meshObj.vertexBuffer);
  gl.vertexAttribPointer(programID.positionAttributeLoc, meshObj.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, meshObj.textureBuffer);
  gl.vertexAttribPointer(programID.textureAttributeLoc, meshObj.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshObj.indexBuffer);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, meshObj.appliedTexture);
  gl.uniform1i(programID.texture, 0);
}


function renderFish(fish) {
  if(playerLoaded == true) {
    checkCollision(fish);
    setupRenderBuffers(fish);
    rotateAndtranslateObject(fish);
    setUniformMatrix(fish.modelMatrix);
    gl.drawElements(gl.TRIANGLES, fish.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  }
}

function renderTerrain() {
  if(terrainLoaded == true) {
    setupRenderBuffers(terrain);
    setUniformMatrix(terrain.modelMatrix);
    gl.drawElements(gl.TRIANGLES, terrain.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  }
}

function renderEgg(object) {
  if(terrainLoaded == true) {
    setupRenderBuffers(object);
    setUniformMatrix(object.modelMatrix);
    gl.drawElements(gl.TRIANGLES, object.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  }
}

function renderScene() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  renderTerrain();
  for(egg in eggs) {
      renderEgg(eggs[egg]);
  }
  for (fish in fishes) {
    renderFish(fishes[fish]);
  }
}
