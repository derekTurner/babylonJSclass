import { SceneData } from "./interfaces";

import {
  Scene, ArcRotateCamera, Vector3,
  MeshBuilder,
  Engine,
  HemisphericLight,
  Texture,
  StandardMaterial,
  CubeTexture,
  Color3,
  Mesh

} from "@babylonjs/core";


function createTube(scene: Scene) {
  //Array of paths to construct tube
  const myPath = [
    new Vector3(5.0, 0, 0.0),
    new Vector3(0, 1, 0.1),
    new Vector3(-4.0, 6, 0.2),
    new Vector3(-3.0, 7, 0.4)
  ];

  const tube = MeshBuilder.CreateTube("tube", { path: myPath, radius: 0.5, sideOrientation: Mesh.DOUBLESIDE }, scene);
  return tube;
}

function createGround(scene: Scene) {
  const groundMaterial = new StandardMaterial("groundMaterial");
  groundMaterial.diffuseTexture = new Texture(
    "./assets/environments/villagegreen.png"
  );
  groundMaterial.diffuseTexture.hasAlpha = true;
  groundMaterial.backFaceCulling = false;
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 24, height: 24 },
    scene
  );
  ground.material = groundMaterial;
  ground.position.y = 0.01;
  return ground;
}


function createSky(scene: Scene) {
  const skybox = MeshBuilder.CreateBox("skyBox", { size: 150 }, scene);
  const skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new CubeTexture(
    "./assets/textures/skybox/skybox",
    scene
  );
  skyboxMaterial.reflectionTexture.coordinatesMode =
    Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skybox.material = skyboxMaterial;
  return skybox;
}


function createHemisphericLight(scene: Scene) {
  const light = new HemisphericLight(
    "light",
    new Vector3(2, 1, 0), // move x pos to direct shadows
    scene
  );
  light.intensity = 0.8;
  light.diffuse = new Color3(1, 1, 1);
  light.specular = new Color3(1, 0.8, 0.8);
  light.groundColor = new Color3(0, 0.2, 0.7);
  return light;
}

function createArcRotateCamera(scene: Scene) {
  let camAlpha = -Math.PI / 2,
    camBeta = Math.PI / 2.5,
    camDist = 25,
    camTarget = new Vector3(0, 0, 0);
  let camera = new ArcRotateCamera(
    "camera1",
    camAlpha,
    camBeta,
    camDist,
    camTarget,
    scene
  );
  camera.lowerRadiusLimit = 9;
  camera.upperRadiusLimit = 25;
  camera.lowerAlphaLimit = 0;
  camera.upperAlphaLimit = Math.PI * 2;
  camera.lowerBetaLimit = 0;
  camera.upperBetaLimit = Math.PI / 2.02;

  camera.attachControl(true);
  return camera;
}


export default function createStartScene(engine: Engine) {

  let scene = new Scene(engine);
  let ground = createGround(scene);
  let sky = createSky(scene);
  let tube = createTube(scene);


  let lightHemispheric = createHemisphericLight(scene);
  let camera = createArcRotateCamera(scene);


  let that: SceneData = {
    scene,
    ground,
    sky,
    tube,
    lightHemispheric,
    camera
  };
  return that;
}