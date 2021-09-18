//GET CANVAS

var startCover = document.getElementById("startCover");
startCover.style.backgroundImage =
  document.body.clientWidth > document.body.clientHeight
    ? "url('img/landingPage.png')"
    : "url('img/landingPageMob.png')";
var start = document.getElementById("start");
if (document.body.clientWidth > document.body.clientHeight) {
  start.style.width = "40%";
  start.style.height = "12%";
  start.style.left = "30%";
  start.style.top = "44%";
} else {
  start.style.width = "500px";
  start.style.height = "151.5px";
  start.style.left = document.body.clientWidth / 2 - 250 + "px";
  start.style.top = "50%";
}
var instructions = document.getElementById("instructions");
if (document.body.clientWidth > document.body.clientHeight) {
  instructions.style.width = "30%";
  instructions.style.height = "9%";
  instructions.style.left = "35%";
  instructions.style.top = "60%";
} else {
  instructions.style.width = "600px";
  instructions.style.height = "100px";
  instructions.style.left = document.body.clientWidth / 2 - 300 + "px";
  instructions.style.top = "65%";
}

instructions.onclick = () => {
  instructionsImg.style.display = "block";
};

var instructionsImg = document.getElementById("instructionsImg");
if (document.body.clientWidth > document.body.clientHeight) {
  instructionsImg.style.width = "40%";
  instructionsImg.style.height = "80%";
  instructionsImg.style.left = "30%";
  instructionsImg.style.top = "10%";
} else {
  instructionsImg.style.width = document.body.clientWidth + "px";
  instructionsImg.style.height = document.body.clientWidth + "px";
  instructionsImg.style.top =
    document.body.clientHeight / 2 - document.body.clientWidth / 2 + "px";
}
instructionsImg.onclick = () => {
  instructionsImg.style.display = "none";
};

var container = document.getElementById("container");
var canvas = document.getElementById("renderCanvas");

var startAgain = document.createElement("DIV");
if (document.body.clientWidth > document.body.clientHeight) {
  startAgain.style.width = "40%";
  startAgain.style.height = "10%";
  startAgain.style.left = "30%";
  startAgain.style.top = "30%";
} else {
  startAgain.style.width = "800px";
  startAgain.style.height = "107.8px";
  startAgain.style.left = (document.body.clientWidth - 800) / 2 + "px";
  startAgain.style.top = "30%";
}
startAgain.style.position = "absolute";
startAgain.style.backgroundImage = 'url("img/startAgain.png")';
startAgain.style.backgroundSize = "cover";
startAgain.style.backgroundPosition = "center";
startAgain.style.display = "none";
container.append(startAgain);

startAgain.onclick = () => {
  location.reload();
};

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
};
start.onclick = () => {
  startCover.style.display = "none";

  function createScene() {
    var scene = new BABYLON.Scene(engine);

    var light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, -1),
      scene
    );
    light.intensity = 1;
    var light2 = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 1),
      scene
    );
    light2.intensity = 1;
    var light3 = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, -1, -1),
      scene
    );
    light3.intensity = 1;
    var light4 = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, -1, 1),
      scene
    );
    light4.intensity = 1;

    var camera = new BABYLON.ArcRotateCamera(
      "Camera",
      0,
      0,
      0,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera.setPosition(new BABYLON.Vector3(0, 3, -5));

    //GUI
    var advancedTexture =
      BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    //START PANEL

    //start game image

    //display pause sign
    var pauseGameSign = new BABYLON.GUI.Image("", "img/pause.png");
    if (document.body.clientWidth > document.body.clientHeight) {
      pauseGameSign.width = 0.4;
      pauseGameSign.height = 0.1;
    } else {
      pauseGameSign.width = 0.7;
      pauseGameSign.height = 0.08;
    }
    pauseGameSign.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    pauseGameSign.verticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    pauseGameSign.notRenderable = true;
    advancedTexture.addControl(pauseGameSign);
    //game over sign
    var gameOverSign = new BABYLON.GUI.Image("", "img/gameOver.png");
    if (document.body.clientWidth > document.body.clientHeight) {
      gameOverSign.width = 0.4;
      gameOverSign.height = 0.1;
      gameOverSign.top = document.body.clientHeight * 0.15 + "px";
    } else {
      gameOverSign.width = 0.7;
      gameOverSign.height = 0.05;
    }
    gameOverSign.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    gameOverSign.verticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    gameOverSign.notRenderable = true;
    advancedTexture.addControl(gameOverSign);

    //pause game button
    var pauseGameButton = new BABYLON.GUI.Image("", "img/pauseButton.png");
    if (document.body.clientWidth > document.body.clientHeight) {
      pauseGameButton.width = 0.025;
      pauseGameButton.height = 0.05;
      pauseGameButton.top = 20 + "px";
      pauseGameButton.left = -20 + "px";
    } else {
      pauseGameButton.width = 0.1;
      pauseGameButton.height = 0.05;
      pauseGameButton.top = 30 + "px";
      pauseGameButton.left = -30 + "px";
    }
    pauseGameButton.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    pauseGameButton.verticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    pauseGameButton.isPointerBlocker = true;
    advancedTexture.addControl(pauseGameButton);
    //start game from pause button
    var startGameFromPauseButton = new BABYLON.GUI.Image(
      "",
      "img/playButton.png"
    );
    if (document.body.clientWidth > document.body.clientHeight) {
      startGameFromPauseButton.width = 0.025;
      startGameFromPauseButton.height = 0.05;
      startGameFromPauseButton.top = 20 + "px";
      startGameFromPauseButton.left = -20 + "px";
    } else {
      startGameFromPauseButton.width = 0.1;
      startGameFromPauseButton.height = 0.05;
      startGameFromPauseButton.top = 30 + "px";
      startGameFromPauseButton.left = -30 + "px";
    }
    startGameFromPauseButton.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    startGameFromPauseButton.verticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    startGameFromPauseButton.isPointerBlocker = true;
    startGameFromPauseButton.notRenderable = true;
    advancedTexture.addControl(startGameFromPauseButton);

    //LIFE AND COINS DISPLAY
    //lives display
    var lifesHolder = new BABYLON.GUI.Rectangle();
    lifesHolder.thickness = 0;
    if (document.body.clientWidth > document.body.clientHeight) {
      lifesHolder.width = 0.04;
      lifesHolder.height = 0.04;
      lifesHolder.left = 20 + "px";
      lifesHolder.top = 20 + "px";
    } else {
      lifesHolder.width = 100 + "px";
      lifesHolder.height = 70 + "px";
      lifesHolder.left = 30 + "px";
      lifesHolder.top = 30 + "px";
    }
    lifesHolder.background = "black";
    lifesHolder.alpha = 0.4;
    lifesHolder.cornerRadius = 15;
    lifesHolder.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    lifesHolder.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture.addControl(lifesHolder);

    var livesBlock = new BABYLON.GUI.TextBlock();
    livesBlock.text = "x3";
    livesBlock.color = "#fff";
    if (document.body.clientWidth > document.body.clientHeight) {
      livesBlock.fontSize = 25 + "px";
    } else {
      livesBlock.fontSize = 50 + "px";
    }
    livesBlock.alpha = 2.5;
    lifesHolder.addControl(livesBlock);
    //coins display
    var coinsHolder = new BABYLON.GUI.Rectangle();
    coinsHolder.thickness = 0;
    if (document.body.clientWidth > document.body.clientHeight) {
      coinsHolder.width = 0.09;
      coinsHolder.height = 0.04;
      coinsHolder.left = 20 + "px";
      coinsHolder.top = 70 + "px";
    } else {
      coinsHolder.width = 250 + "px";
      coinsHolder.height = 70 + "px";
      coinsHolder.left = 30 + "px";
      coinsHolder.top = 120 + "px";
    }
    coinsHolder.background = "black";
    coinsHolder.alpha = 0.4;
    coinsHolder.cornerRadius = 15;
    coinsHolder.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    coinsHolder.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture.addControl(coinsHolder);

    var coinBlock = new BABYLON.GUI.TextBlock();
    coinBlock.text = "Coins:" + 0;
    coinBlock.color = "#fff";
    if (document.body.clientWidth > document.body.clientHeight) {
      coinBlock.fontSize = 25 + "px";
    } else {
      coinBlock.fontSize = 50 + "px";
    }
    coinBlock.alpha = 2.5;
    coinsHolder.addControl(coinBlock);

    // // Skybox
    var box = BABYLON.Mesh.CreateBox(
      "SkyBox",
      10000,
      scene,
      false,
      BABYLON.Mesh.BACKSIDE
    );
    box.material = new BABYLON.SkyMaterial("sky", scene);
    box.material.inclination = 0;

    //POSITION Z OF THE ELEMNENTS OF GAME
    var posZ = 0;
    //FOOES
    //animate the mesh when it hits fooes to blink
    function visColAnim(mesh) {
      const anim = new BABYLON.Animation(
        "visColAnim",
        "isVisible",
        60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );
      const colKeys = [
        { frame: 0, value: 1 },
        { frame: 5, value: false },
        { frame: 10, value: true },
        { frame: 15, value: false },
        { frame: 20, value: true },
        { frame: 25, value: false },
        { frame: 30, value: true },
        { frame: 35, value: false },
      ];
      anim.setKeys(colKeys);
      mesh.animations = [];
      mesh.animations.push(anim);
      return scene.beginAnimation(mesh, 0, 35, false);
    }
    //animate the mesh when it hits fooes to go back few steps
    function animPosZMeshCollision(mesh) {
      const anim = new BABYLON.Animation(
        "animPosZMeshCollision",
        "position.z",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );
      anim.setKeys([
        { frame: 0, value: mesh.position.z },
        { frame: 5, value: mesh.position.z - 3 },
        { frame: 30, value: mesh.position.z - 3 },
      ]);
      mesh.animations = [];
      mesh.animations.push(anim);
      return scene.beginAnimation(mesh, 0, 60, false);
    }

    var pillarMat = new BABYLON.StandardMaterial("pillarMat", scene);
    pillarMat.diffuseColor = new BABYLON.Color3.FromHexString("#000000");
    var obstacaleWallUpperHolderLeft = BABYLON.MeshBuilder.CreateBox(
      "obstacaleWallUpperHolderLeft",
      { width: 0.1, height: 1.4, depth: 0.1 },
      scene
    );

    obstacaleWallUpperHolderLeft.position = new BABYLON.Vector3(-1.5, 0.8, 0);
    obstacaleWallUpperHolderLeft.material = pillarMat;

    var obstacaleWallUpperHolderRight = obstacaleWallUpperHolderLeft.clone(
      "obstacaleWallUpperHolderRight"
    );
    obstacaleWallUpperHolderRight.position.x = 1.5;

    var obstacaleWall = BABYLON.MeshBuilder.CreatePlane("obstacaleWall", {
      height: 1.4,
      width: 2.9,
    });
    obstacaleWall.position = new BABYLON.Vector3(0, 0.8, 0);
    var obstacaleWallmat = new BABYLON.StandardMaterial(
      "obstacaleWallmat",
      scene
    );

    var obstacaleWalltex = new BABYLON.Texture(
      "textures/obsticleWall.png",
      scene
    );
    obstacaleWalltex.hasAlpha = true;
    obstacaleWallmat.diffuseTexture = obstacaleWalltex;
    obstacaleWallmat.useAlphaFromDiffuseTexture = true;
    obstacaleWall.material = obstacaleWallmat;

    var simpleObstacleWall = BABYLON.Mesh.MergeMeshes(
      [
        obstacaleWall,
        obstacaleWallUpperHolderRight,
        obstacaleWallUpperHolderLeft,
      ],
      true,
      true,
      undefined,
      false,
      true
    );
    simpleObstacleWall.position = new BABYLON.Vector3(3, 0, 0);
    simpleObstacleWall.isVisible = false;
    //array to put fooes
    fooes = [];
    //function to create simple wall
    function createSimpleObstacleWall(
      SimpleObstacleWallLanePositionX,
      SimpleObstacleWallLanePositionY,
      SimpleObstacleWallLanePositionZ,
      hightOfWall
    ) {
      var newSimpleObstacleWall =
        simpleObstacleWall.createInstance("simpleObstacleWall");
      fooes.push(newSimpleObstacleWall);
      newSimpleObstacleWall.position = new BABYLON.Vector3(
        SimpleObstacleWallLanePositionX,
        SimpleObstacleWallLanePositionY,
        SimpleObstacleWallLanePositionZ
      );
      newSimpleObstacleWall.scaling = new BABYLON.Vector3(1, hightOfWall, 1);
      fooesCollider(newSimpleObstacleWall);
    }

    //COINS
    function animRotY() {
      const anim = new BABYLON.Animation(
        "animRotY",
        "rotation.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );
      anim.setKeys([
        { frame: 0, value: 0 },
        { frame: 30, value: 2 * Math.PI },
      ]);
      return anim;
    }
    function animPosY() {
      const anim = new BABYLON.Animation(
        "animPosY",
        "position.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );
      anim.setKeys([
        { frame: 0, value: 1 },
        { frame: 15, value: 1.2 },
        { frame: 30, value: 1 },
      ]);
      return anim;
    }
    const animationsCoin = [animRotY(), animPosY()];

    const coinMat = new BABYLON.StandardMaterial("coinMat");
    coinMat.diffuseTexture = new BABYLON.Texture("textures/coin.png");
    const faceUV2 = [];
    faceUV2[0] = new BABYLON.Vector4(0, 0.0, 1, 1);
    faceUV2[1] = new BABYLON.Vector4(0.49, 0.49, 0.5, 0.5);
    faceUV2[2] = new BABYLON.Vector4(0, 0, 1, 1);

    let coin = BABYLON.MeshBuilder.CreateCylinder(
      "coin",
      {
        height: 0.05,
        diameter: 0.5,
        tessellation: 48 /*faceUV: faceUV2*/,
        faceUV: faceUV2,
      },
      this.scene
    );
    coin.addRotation(-1.5, 3, 0);
    coin.position = new BABYLON.Vector3(-2, 1, 0);

    coin.material = coinMat;
    coin.isVisible = false;
    coins = [];
    function createCoinLane(
      coinLanePositionX,
      coinLanePositionY,
      coinLanePositionZ,
      coinNum
    ) {
      for (var i = 1; i < coinNum + 1; i++) {
        var newCoin = coin.createInstance("coin" + i);
        coins.push(newCoin);
        newCoin.rotationQuaternion = null;
        newCoin.position = new BABYLON.Vector3(
          coinLanePositionX,
          coinLanePositionY + 0.7,
          coinLanePositionZ + i * 3
        );
        coinsCollider(newCoin);
        scene.beginDirectAnimation(newCoin, animationsCoin, 0, 30, true, 0.3);
      }
    }

    // //CREATE PEACES FOR GROUND/BRIDGE/TRACK

    // //main platform for running
    var street = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 150 },
      scene
    );
    street.position = new BABYLON.Vector3(0, 0, 70);

    var bridgeMat = new BABYLON.StandardMaterial("bridgeMat", scene);
    bridgeMat.diffuseTexture = new BABYLON.Texture(
      "textures/street121.png",
      scene
    );
    bridgeMat.diffuseTexture.uScale = 1;
    bridgeMat.diffuseTexture.vScale = 15;
    bridgeMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    street.material = bridgeMat;

    // //create sidewalks

    var sidewalk = new BABYLON.MeshBuilder.CreateBox(
      "sidewalk",
      { width: 3, height: 0.1, depth: 150 },
      scene
    );
    sidewalk.position = new BABYLON.Vector3(-5.5, 0, 70);
    var sidewalkMat = new BABYLON.StandardMaterial("sidewalkMat", scene);
    sidewalkMat.diffuseTexture = new BABYLON.Texture(
      "textures/grass.jpg",
      scene
    );
    sidewalkMat.diffuseTexture.uScale = 150;
    sidewalkMat.diffuseTexture.vScale = 1;

    sidewalk.material = sidewalkMat;
    //other bridge walls
    var sidewalk2 = sidewalk.clone("sidewalk2");
    sidewalk2.position.x = 5.5;

    // //trees
    var leafMaterial = new BABYLON.StandardMaterial("leafMaterial", scene);
    leafMaterial.diffuseColor = new BABYLON.Color3.FromHexString("#004e00");

    var woodMaterial = new BABYLON.StandardMaterial("", scene);
    var woodTexture = new BABYLON.WoodProceduralTexture("", 512, scene);
    woodTexture.ampScale = 50;
    woodMaterial.diffuseTexture = woodTexture;
    QuickTreeGenerator = function (
      sizeBranch,
      sizeTrunk,
      radius,
      trunkMaterial,
      leafMaterial,
      scene
    ) {
      var treeparent = BABYLON.Mesh.CreatePlane("treeparent", scene);
      treeparent.isVisible = false;

      var leaves = new BABYLON.Mesh("leaves", scene);

      //var vertexData = BABYLON.VertexData.CreateSphere(2,sizeBranch); //this line for BABYLONJS2.2 or earlier
      var vertexData = BABYLON.VertexData.CreateSphere({
        segments: 2,
        diameter: sizeBranch,
      }); //this line for BABYLONJS2.3 or later

      vertexData.applyToMesh(leaves, false);

      var positions = leaves.getVerticesData(BABYLON.VertexBuffer.PositionKind);
      var indices = leaves.getIndices();
      var numberOfPoints = positions.length / 3;

      var map = [];

      // The higher point in the sphere
      var v3 = BABYLON.Vector3;
      var max = [];

      for (var i = 0; i < numberOfPoints; i++) {
        var p = new v3(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        );

        if (p.y >= sizeBranch / 2) {
          max.push(p);
        }

        var found = false;
        for (var index = 0; index < map.length && !found; index++) {
          var array = map[index];
          var p0 = array[0];
          if (p0.equals(p) || p0.subtract(p).lengthSquared() < 0.01) {
            array.push(i * 3);
            found = true;
          }
        }
        if (!found) {
          var array = [];
          array.push(p, i * 3);
          map.push(array);
        }
      }
      var randomNumber = function (min, max) {
        if (min == max) {
          return min;
        }
        var random = Math.random();
        return random * (max - min) + min;
      };

      map.forEach(function (array) {
        var index,
          min = -sizeBranch / 10,
          max = sizeBranch / 10;
        var rx = randomNumber(min, max);
        var ry = randomNumber(min, max);
        var rz = randomNumber(min, max);

        for (index = 1; index < array.length; index++) {
          var i = array[index];
          positions[i] += rx;
          positions[i + 1] += ry;
          positions[i + 2] += rz;
        }
      });

      leaves.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
      var normals = [];
      BABYLON.VertexData.ComputeNormals(positions, indices, normals);
      leaves.setVerticesData(BABYLON.VertexBuffer.NormalKind, normals);
      leaves.convertToFlatShadedMesh();

      leaves.material = leafMaterial;
      leaves.position.y = sizeTrunk + sizeBranch / 2 - 2;

      var trunk = BABYLON.Mesh.CreateCylinder(
        "trunk",
        sizeTrunk,
        radius - 2 < 1 ? 1 : radius - 2,
        radius,
        10,
        2,
        scene
      );

      trunk.position.y = sizeBranch / 2 + 2 - sizeTrunk / 2;

      trunk.material = trunkMaterial;
      trunk.convertToFlatShadedMesh();

      leaves.parent = treeparent;
      trunk.parent = treeparent;
      var mTree = BABYLON.Mesh.MergeMeshes(
        [treeparent, trunk, leaves],
        true,
        true,
        undefined,
        false,
        true
      );

      return mTree;
    };

    var tree = QuickTreeGenerator(15, 10, 5, woodMaterial, leafMaterial, scene);
    tree.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
    tree.position = new BABYLON.Vector3(5.5, 0, 0);

    var treesR = [];
    var treesL = [];

    for (let i = 0; i < 7; i++) {
      var newTree = tree.clone("newTree");
      newTree.position.z = i * 20;
      treesR.push(newTree);
    }

    for (let i = 0; i < 7; i++) {
      var newTree = tree.clone("newTree");
      newTree.position.x = -5.5;
      newTree.position.z = i * 20 + 10;
      treesL.push(newTree);
    }
    //combine bridge meshes
    var bridgeMesh = BABYLON.Mesh.MergeMeshes(
      [
        street,
        sidewalk,
        sidewalk2,
        treesR[0],
        treesR[1],
        treesR[2],
        treesR[3],
        treesR[4],
        treesR[5],
        treesR[6],
        treesL[0],
        treesL[1],
        treesL[2],
        treesL[3],
        treesL[4],
        treesL[5],
        treesL[6],
      ],
      true,
      true,
      undefined,
      false,
      true
    );
    bridgeMesh.isVisible = true;

    var runningTracks = [];
    var grounds = [];

    function createTrackOne() {
      var bridgeMeshInstance = bridgeMesh.createInstance("bridgeMeshInstance");
      runningTracks.push(bridgeMeshInstance);
      bridgeMeshInstance.position = new BABYLON.Vector3(0, 0, posZ);
      var streetInstance = street.createInstance("streetInstance");

      streetInstance.position = new BABYLON.Vector3(0, 0, posZ + 70);
      posZ += 150;

      grounds.push(streetInstance);
    }

    function createTrackOptionOne() {
      createCoinLane(0, 0, posZ + 15, 10);
      createCoinLane(-3, 2, posZ + 56, 10);
      createSimpleObstacleWall(-3, 0, posZ + 105, 1);
      createSimpleObstacleWall(3, 0, posZ + 95, 1);
      createCoinLane(0, 2, posZ + 103, 10);
      createTrackOne();
      //46
    }

    function createTrackOptionTwo() {
      createCoinLane(0, 2, posZ + 18, 10);
      createSimpleObstacleWall(3, 0, posZ + 20, 1);
      createSimpleObstacleWall(-3, 0, posZ + 25, 1);
      createSimpleObstacleWall(0, 0, posZ + 85, 1);
      createCoinLane(0, 0, posZ + 90, 5);
      createCoinLane(-3, 0, posZ + 110, 5);
      createCoinLane(3, 0, posZ + 110, 5);
      createSimpleObstacleWall(0, 0, posZ + 120, 1);
      createSimpleObstacleWall(-3, 0, posZ + 125, 1);
      createSimpleObstacleWall(3, 0, posZ + 130, 1);
      createTrackOne();
      //45
    }

    function createTrackOptionThree() {
      createCoinLane(3, 0, posZ + 50, 10);
      createSimpleObstacleWall(0, 0, posZ + 50, 1);
      createCoinLane(0, 0, posZ + 80, 10);
      createSimpleObstacleWall(-3, 0, posZ + 90, 1);
      createSimpleObstacleWall(3, 0, posZ + 90, 1);
      createSimpleObstacleWall(0, 0, posZ + 120, 1);
      createCoinLane(3, 0, posZ + 120, 5);
      createCoinLane(-3, 0, posZ + 120, 5);
      createTrackOne();
      //40
    }

    function createTrackOptionFour() {
      createCoinLane(0, 0, posZ + 35, 15);
      createSimpleObstacleWall(-3, 0, posZ + 70, 1);
      createSimpleObstacleWall(3, 0, posZ + 70, 1);
      createSimpleObstacleWall(0, 0, posZ + 85, 1);
      createSimpleObstacleWall(-3, 0, posZ + 95, 1);
      createCoinLane(-3, 0, posZ + 97, 5);
      createSimpleObstacleWall(-3, 0, posZ + 115, 1);
      createSimpleObstacleWall(3, 0, posZ + 115, 1);
      createSimpleObstacleWall(0, 0, posZ + 120, 1);
      createTrackOne();
      //37
    }

    function createTrackOptionFive() {
      createCoinLane(-3, 0, posZ + 15, 10);
      createCoinLane(0, 0, posZ + 15, 10);
      createCoinLane(3, 0, posZ + 15, 10);
      createSimpleObstacleWall(3, 0, posZ + 31.5, 1);
      createSimpleObstacleWall(0, 0, posZ + 31.5, 1);
      createSimpleObstacleWall(-3, 0, posZ + 31.5, 1);
      createSimpleObstacleWall(-3, 0, posZ + 60, 1);
      createSimpleObstacleWall(0, 0, posZ + 70, 1);
      createSimpleObstacleWall(0, 0, posZ + 80, 1);
      createCoinLane(0, 0, posZ + 81, 5);
      createSimpleObstacleWall(0, 0, posZ + 100, 1);
      createCoinLane(0, 0, posZ + 101, 5);
      createSimpleObstacleWall(0, 0, posZ + 120, 1);
      createCoinLane(0, 0, posZ + 121, 5);
      createTrackOne();
      //53
    }

    function createTrackOptionSix() {
      createSimpleObstacleWall(-3, 0, posZ + 15, 1);
      createSimpleObstacleWall(3, 0, posZ + 15, 1);
      createSimpleObstacleWall(0, 0, posZ + 25, 1);
      createCoinLane(0, 0, posZ + 21, 5);
      createSimpleObstacleWall(0, 0, posZ + 45, 1);
      createCoinLane(-3, 0, posZ + 41, 5);
      createSimpleObstacleWall(-3, 0, posZ + 60, 1);
      createSimpleObstacleWall(-3, 0, posZ + 70, 1);
      createSimpleObstacleWall(0, 0, posZ + 70, 1);
      createSimpleObstacleWall(3, 0, posZ + 70, 1);
      createSimpleObstacleWall(-3, 0, posZ + 85, 1);
      createSimpleObstacleWall(3, 0, posZ + 85, 1);
      createSimpleObstacleWall(0, 0, posZ + 90, 1);
      createCoinLane(0, 0, posZ + 81, 5);
      createSimpleObstacleWall(-3, 0, posZ + 105, 1);
      createSimpleObstacleWall(0, 0, posZ + 105, 1);
      createSimpleObstacleWall(-3, 0, posZ + 115, 1);
      createSimpleObstacleWall(0, 0, posZ + 120, 1);
      createSimpleObstacleWall(3, 0, posZ + 125, 1);
      createCoinLane(0, 0, posZ + 126, 5);
      createSimpleObstacleWall(0, 0, posZ + 140, 1);
      createTrackOne();
      //39
    }
    var randNum = () => {
      return Math.floor(Math.random() * 6);
    };

    var trackOptions = [
      createTrackOptionOne,
      createTrackOptionTwo,
      createTrackOptionThree,
      createTrackOptionFour,
      createTrackOptionFive,
      createTrackOptionSix,
    ];

    function randomTrackOpt() {
      trackOptions[randNum()]();
    }

    //game info
    var gameRunning = false;
    var running = false;
    var playerSpeed = 0.3;
    var lives = 3;
    var colectedCoins = 0;
    var pause = false;

    //ROBOT AND ELLIPSOID
    //robot head
    var robotHead = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 0.7 },
      scene
    );
    robotHead.position = new BABYLON.Vector3(0, 1.6, 0);
    robotHead.isVisible = true;
    const headMat = new BABYLON.StandardMaterial("headMat");
    headMat.diffuseTexture = new BABYLON.Texture("textures/headTex.png");
    headMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    robotHead.material = headMat;

    const eyesUV = [];
    eyesUV[0] = new BABYLON.Vector4(0, 0, 0.1, 1);
    eyesUV[1] = new BABYLON.Vector4(0, 0, 1, 1);
    eyesUV[2] = new BABYLON.Vector4(0, 0, 0.1, 1);

    const eyesMat = new BABYLON.StandardMaterial("eyesMat");
    eyesMat.diffuseTexture = new BABYLON.Texture("textures/eyesTex.png");

    var robotEyes = BABYLON.MeshBuilder.CreateCylinder(
      "robotEyes",
      {
        diameter: 0.75,
        height: 0.15,
        tessellation: 24,
        faceUV: eyesUV,
      },
      scene
    );
    robotEyes.material = eyesMat;
    robotEyes.position = new BABYLON.Vector3(0, 0.05, 0);
    robotEyes.parent = robotHead;
    robotEyes.isVisible = true;
    robotEyes.addRotation(0, 0, 0);
    camera.target = robotHead;
    //body
    const bodyUV = [];
    bodyUV[0] = new BABYLON.Vector4(0, 0, 0.1, 1);
    bodyUV[1] = new BABYLON.Vector4(0, 0, 1, 1);
    bodyUV[2] = new BABYLON.Vector4(0, 0, 0.1, 1);
    const bodyMat = new BABYLON.StandardMaterial("bodyMat");
    bodyMat.diffuseTexture = new BABYLON.Texture("textures/bodyTex.png");
    bodyMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    var robotBody = BABYLON.MeshBuilder.CreateCylinder(
      "robotBody",
      {
        diameter: 0.8,
        height: 1.2,
        tessellation: 24,
        diameterBottom: 0.6,
        faceUV: bodyUV,
      },
      scene
    );
    robotBody.position = new BABYLON.Vector3(0, -0.7, 0);
    robotBody.parent = robotHead;
    robotBody.isVisible = true;
    robotBody.addRotation(0, 0, 0);
    robotBody.material = bodyMat;

    const handMat = new BABYLON.StandardMaterial("handMat");
    handMat.diffuseTexture = new BABYLON.Texture("textures/handTex.png");
    handMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

    var robotHandR = BABYLON.MeshBuilder.CreateSphere("robotHandR", {
      diameterX: 0.1,
      diameterY: 0.2,
      diameterZ: 0.7,
    });
    robotHandR.position = new BABYLON.Vector3(0.5, 0.2, 0.2);
    robotHandR.addRotation(1, 0, 0);
    robotHandR.material = handMat;
    robotHandR.parent = robotBody;

    var robotHandL = BABYLON.MeshBuilder.CreateSphere("robotHandL", {
      diameterX: 0.1,
      diameterY: 0.2,
      diameterZ: 0.7,
    });
    robotHandL.position = new BABYLON.Vector3(-0.5, 0.2, 0.2);
    robotHandL.addRotation(1, 0, 0);
    robotHandL.material = handMat;
    robotHandL.parent = robotBody;

    //Create Ellipsoid around mesh
    var a = 0.5;
    var b = 0.91;
    var points = [];
    for (var theta = -Math.PI / 2; theta < Math.PI / 2; theta += Math.PI / 36) {
      points.push(
        new BABYLON.Vector3(0, b * Math.sin(theta), a * Math.cos(theta))
      );
    }
    var ellipse = [];
    ellipse[0] = BABYLON.MeshBuilder.CreateLines(
      "e",
      { points: points },
      scene
    );
    ellipse[0].isVisible = false;
    ellipse[0].parent = robotBody;
    ellipse[0].rotation.y = Math.PI * 1;
    for (var i = 1; i < 2; i++) {
      ellipse[i] = ellipse[0].createInstance("e" + i);
      ellipse[i].parent = robotBody;
      ellipse[i].isVisible = false;
      ellipse[i].checkCollisions = true;
    }
    ellipse[1].rotation.y = Math.PI * 2;

    //wheel holder
    var holderMat = new BABYLON.StandardMaterial("holderMat");
    holderMat.diffuseColor = new BABYLON.Color3.FromHexString("#d6d6d5");
    var wheelHolder = BABYLON.MeshBuilder.CreateCylinder(
      "wheelHolder",
      {
        diameter: 0.4,
        height: 0.7,
        tessellation: 24,
      },
      scene
    );
    wheelHolder.position = new BABYLON.Vector3(0, -0.6, 0);
    wheelHolder.parent = robotBody;
    wheelHolder.isVisible = true;
    wheelHolder.addRotation(0, 0, -1.57);
    wheelHolder.material = holderMat;

    //wheel face UVs
    const wheelUV = [];
    wheelUV[0] = new BABYLON.Vector4(0, 0, 0.5, 1);
    wheelUV[1] = new BABYLON.Vector4(0.5, 0.5, 1, 1);
    wheelUV[2] = new BABYLON.Vector4(0, 0, 0.5, 1);

    const wheelMat = new BABYLON.StandardMaterial("wheelMat");
    wheelMat.diffuseTexture = new BABYLON.Texture("textures/wheelTex2.png");
    wheelMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

    wheelR = BABYLON.MeshBuilder.CreateCylinder("wheelR", {
      diameter: 0.5,
      height: 0.08,
      faceUV: wheelUV,
    });
    wheelR.material = wheelMat;
    wheelR.position = new BABYLON.Vector3(0, 0.4, 0);
    wheelR.parent = wheelHolder;

    wheelL = BABYLON.MeshBuilder.CreateCylinder("wheelL", {
      diameter: 0.5,
      height: 0.08,
      faceUV: wheelUV,
    });
    wheelL.material = wheelMat;
    wheelL.position = new BABYLON.Vector3(0, -0.4, 0);
    wheelL.parent = wheelHolder;

    function animWheel(mesh) {
      const anim = new BABYLON.Animation(
        "animWheel",
        "rotation.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );
      anim.setKeys([
        { frame: 0, value: 0 },
        { frame: 30, value: 2 * Math.PI },
      ]);
      mesh.animations = [];
      mesh.animations.push(anim);
      return scene.beginAnimation(mesh, 0, 30, true);
    }
    animWheel(wheelR);
    animWheel(wheelL);

    //MOVMENT
    //animation for moving left and right
    function moveRobotAnim(mesh, pos, direction) {
      const anim = new BABYLON.Animation(
        "moveLeftAnim",
        "position.x",
        60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );
      anim.setKeys([
        { frame: 0, value: pos },
        { frame: 15, value: direction },
      ]);
      mesh.animations = [];
      mesh.animations.push(anim);
      return scene.beginAnimation(mesh, 0, 15, false);
    }
    //function to move left
    function robotMoveLeft() {
      if (robotHead.position.x == 0 || robotHead.position.x == 3) {
        moveRobotAnim(
          robotHead,
          robotHead.position.x,
          robotHead.position.x - 3
        );
        robotHead.addRotation(0, -0.3, 0);
        setTimeout(function () {
          robotHead.addRotation(0, 0.3, 0);
        }, 250);
      }
    }
    //function to move right
    function robotMoveRight() {
      if (robotHead.position.x == 0 || robotHead.position.x == -3) {
        moveRobotAnim(
          robotHead,
          robotHead.position.x,
          robotHead.position.x + 3
        );
        robotHead.addRotation(0, 0.3, 0);
        setTimeout(function () {
          robotHead.addRotation(0, -0.3, 0);
        }, 250);
      }
    }
    //animation for jumping
    function aniPosY(mesh, meshPosition) {
      const anim = new BABYLON.Animation(
        "animPosY",
        "position.y",
        45,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );
      anim.setKeys([
        { frame: 0, value: meshPosition + 0 },
        { frame: 10, value: meshPosition + 2.5 },
        { frame: 15, value: meshPosition + 3 },
        { frame: 20, value: meshPosition + 3.5 },
        { frame: 30, value: meshPosition + 0 },
      ]);
      mesh.animations = [];
      mesh.animations.push(anim);
      return scene.beginAnimation(mesh, 0, 30, false);
    }
    //function for jumping
    function robotJump() {
      if (
        robotHead.position.x == 0 ||
        robotHead.position.x == -3 ||
        robotHead.position.x == 3
      ) {
        aniPosY(robotHead, robotHead.position.y);

        running = false;
        setTimeout(function () {
          if (gameRunning) {
            running = true;
          }
        }, 680);
      }
    }

    //EVENT LISTENERS
    //key event listeners
    function lintenKeysEvents() {
      document.onkeydown = checkKey;
      function checkKey(event) {
        if (event.keyCode == 38 && running) {
          robotJump();
        }
        //jump on ins0
        if (event.keyCode == 96 && running) {
          robotJump();
        }
        //robot move left
        if (event.keyCode == 37 && running) {
          robotMoveLeft();
        }
        //robot move right
        if (event.keyCode == 39 && running) {
          robotMoveRight();
        }
      }
    }
    //touch event listeners with hammer
    function lintenTouchEvents() {
      var hammertime = new Hammer(canvas);
      hammertime.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
      hammertime.on(
        "swipeleft swiperight swipeup swipedown tap press",
        function (ev) {
          if (ev.type == "swipeup" && running) {
            robotJump();
          } else if (ev.type == "swipeleft" && running) {
            robotMoveLeft();
          } else if (ev.type == "swiperight" && running) {
            robotMoveRight();
          }
        }
      );
    }
    function gameRender() {
      //loop track and elements creation
      if (runningTracks.length < 2) {
        randomTrackOpt();
      }
      //dispose track
      for (let i = 0; i < runningTracks.length; i++) {
        if (robotHead.position.z - 155 > runningTracks[i].position.z) {
          runningTracks[i].dispose();
          grounds[i].dispose();
          runningTracks.splice(i, 1);
          grounds.splice(i, 1);
        }
      }
      //dispose fooes
      if (fooes.length > 0) {
        for (let i = 0; i < fooes.length; i++) {
          if (robotHead.position.z - 5 > fooes[i].position.z) {
            fooes[i].dispose();
            fooes.splice(i, 1);
          }
        }
      }
      //dispose coins
      if (coins.length > 0) {
        for (let i = 0; i < coins.length; i++) {
          if (robotHead.position.z - 5 > coins[i].position.z) {
            coins[i].dispose();
            coins.splice(i, 1);
          }
        }
      }
    }

    //function for mesh to start running
    function meshRunning() {
      //change running status
      running = true;
      gameRunning = true;

      //start running animation
      //change robot mesh position z - move thrue space
      scene.beforeRender = function () {
        robotHead.position.z += playerSpeed * scene.getAnimationRatio();
        gameRender();
      };
    }

    function pauseGame() {
      if (gameRunning) {
        running = false;
        gameRunning = false;
        pause = true;
        scene.beforeRender = function () {
          robotHead.position.z += 0;
        };
        pauseGameButton.notRenderable = true;
        startGameFromPauseButton.notRenderable = false;
        pauseGameSign.notRenderable = false;
      }
    }

    //start game from pause function
    function startGameFromPause() {
      if (!gameRunning) {
        gameRunning = true;
        running = true;
        pause = false;
        camera.setPosition(
          new BABYLON.Vector3(
            robotHead.position.x,
            robotHead.position.y + 1.2,
            robotHead.position.z - 5
          )
        );
        meshRunning();
        pauseGameButton.notRenderable = false;
        startGameFromPauseButton.notRenderable = true;
        pauseGameSign.notRenderable = true;
      }
    }
    //pause game
    pauseGameButton.onPointerClickObservable.add(function () {
      pauseGame();
    });
    //start game from pause
    startGameFromPauseButton.onPointerClickObservable.add(function () {
      startGameFromPause();
    });

    //START GAME
    setTimeout(function () {
      setTimeout(function () {
        street.isVisible = false;
        bridgeMesh.isVisible = false;
        meshRunning();
        lintenKeysEvents();
        lintenTouchEvents();
      }, 1100);
    }, 0);

    //game over function
    function gameOver() {
      running = false;
      gameRunning = false;
      gameOverSign.notRenderable = false;
      scene.beforeRender = function () {
        robotHead.position.z += 0;
      };
      startAgain.style.display = "block";
    }

    //COLLIDERS
    //add collison to coins
    function coinsCollider(thisCoin) {
      for (let j = 0; j < ellipse.length; j++) {
        thisCoin.checkCollisions = true;
        thisCoin.actionManager = new BABYLON.ActionManager(scene);
        let action = new BABYLON.ExecuteCodeAction(
          {
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
            parameter: {
              mesh: thisCoin,
            },
          },
          (evt) => {
            if (thisCoin.isVisible) {
              colectedCoins += 1;
              coinBlock.text = "Coins:" + colectedCoins;
              thisCoin.isVisible = false;
            }
          }
        );
        ellipse[j].actionManager.registerAction(action);
      }
    }
    //add coolision to fooes
    function fooesCollider(thisFooe) {
      for (let fe = 0; fe < ellipse.length; fe++) {
        thisFooe.checkCollisions = true;
        thisFooe.actionManager = new BABYLON.ActionManager(scene);
        let action = new BABYLON.ExecuteCodeAction(
          {
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
            parameter: {
              mesh: thisFooe,
            },
          },
          (evt) => {
            if (thisFooe.checkCollisions) {
              //give mesh animation to go back on collision
              animPosZMeshCollision(robotHead);
              //goves mesh position after hit
              robotHead.position.x = thisFooe.position.x;
              robotHead.position.y = 1.6;
              visColAnim(thisFooe);
              // fooes[i].isVisible = false;
              thisFooe.checkCollisions = false;
              lives -= 1;
              livesBlock.text = "x" + lives;
              if (lives > 0) {
                running = false;
                setTimeout(function () {
                  if (!pause) {
                    running = true;
                  }
                }, 1000);
              }
              if (lives < 1) {
                gameOver();
              }
            }
          }
        );
        ellipse[fe].actionManager.registerAction(action);
      }
    }
    //add collison to speed track
    function speedTrackCollider(thisSpeedGround) {
      for (let j = 0; j < ellipse.length; j++) {
        thisSpeedGround.checkCollisions = true;
        thisSpeedGround.actionManager = new BABYLON.ActionManager(scene);
        let action = new BABYLON.ExecuteCodeAction(
          {
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
            parameter: {
              mesh: thisSpeedGround,
            },
          },
          (evt) => {
            if (thisSpeedGround.checkCollisions) {
              thisSpeedGround.checkCollisions = false;
              playerSpeed += 0.2;
              setTimeout(function () {
                playerSpeed -= playerSpeed * scene.getAnimationRatio();
              }, 2000);
            }
          }
        );
        ellipse[j].actionManager.registerAction(action);
      }
    }

    //loop to ellipse to give action manager
    for (let z = 0; z < ellipse.length; z++) {
      ellipse[z].actionManager = new BABYLON.ActionManager(scene);
    }

    return scene;
    //END OF SCENE
  }
  window.initFunction = async function () {
    var asyncEngineCreation = async function () {
      try {
        return createDefaultEngine();
      } catch (e) {
        console.log(
          "the available createEngine function failed. Creating the default engine instead"
        );
        return createDefaultEngine();
      }
    };

    window.engine = await asyncEngineCreation();
    if (!engine) throw "engine should not be null.";
    window.scene = createScene();
  };

  initFunction().then(() => {
    sceneToRender = scene;
    engine.runRenderLoop(function () {
      if (sceneToRender && sceneToRender.activeCamera) {
        sceneToRender.render();
      }
    });
  });

  // Resize
  window.addEventListener("resize", function () {
    engine.resize();
  });
};
