import {
  Scene,
  Color,
  WebGLRenderer,
  PerspectiveCamera,
  Vector2,
  Raycaster,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "dat.gui";
import { config } from "./configuration";

export class BaseRevolvingWorld {
  scene!: Scene;
  renderer!: WebGLRenderer;
  camera!: PerspectiveCamera;
  orbittalController!: OrbitControls;
  gui: GUI = new GUI();
  mousePoint!: Vector2;
  raycaster!: Raycaster;
  constructor() {
    this.createScene();
    this.setUpCamera();
    this.createRendrer();
    this.addOrbitalControl();
    this.setUpRayCaster();
    window.addEventListener("resize", this.resize);
    window.addEventListener("mousemove", this.onPointerMove);
  }
  resize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
  createScene() {
    this.scene = new Scene();
    this.scene.background = new Color(config.scene_bg_color);
  }
  setUpCamera() {
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = config.cameraZPosition;
  }
  createRendrer() {
    this.renderer = new WebGLRenderer({
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }
  addOrbitalControl() {
    this.orbittalController = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
  }
  onPointerMove = (event: any) => {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    this.mousePoint.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mousePoint.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  setUpRayCaster() {
    this.raycaster = new Raycaster();
    this.mousePoint = new Vector2();
  }
}
