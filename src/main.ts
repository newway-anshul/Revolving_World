import {
  SphereGeometry,
  Mesh,
  ShaderMaterial,
  TextureLoader,
  AdditiveBlending,
  BackSide,
  Group,
  BufferGeometry,
  PointsMaterial,
  Float32BufferAttribute,
  Points,
  MeshBasicMaterial,
} from "three";
import { BaseRevolvingWorld } from "./Base";
import vertextShader from "./shaders/vertext.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";
import atmosphereVertextShader from "./shaders/atmosphereVertext.glsl?raw";
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl?raw";
import { config } from "./configuration";
import { getPoints } from "./getPoints";
import { addGUI } from "./addGUI";
import { showArrow } from "./helper";
import { MeshBasicNodeMaterial } from "three/examples/jsm/nodes/Nodes.js";
export class RevolvingWorld extends BaseRevolvingWorld {
  earth!: Mesh;
  atmosphere!: Mesh;
  group: Group = new Group();
  stars!: Points;
  points!: Mesh[];
  pointsGroup: Group = new Group();
  constructor() {
    super();
    this.makeScene();
    this.renderScene();
    this.showGui();
    showArrow(this);
  }
  showGui() {
    addGUI(this);
  }
  makeScene() {
    this.createAtmosphere();
    this.createEarth();
    this.createStars();
    this.addPoints();
    this.earth.rotation.y = -Math.PI / 2;
    this.scene.add(this.group);
  }
  createEarth() {
    this.earth = new Mesh(
      new SphereGeometry(config.earthRadius, 50, 50),
      new ShaderMaterial({
        vertexShader: vertextShader,
        fragmentShader: fragmentShader,
        uniforms: {
          globeTexture: {
            value: new TextureLoader().load(config.earthUV),
          },
        },
      })
      //new MeshBasicMaterial({
      //  map: new TextureLoader().load(config.earthUV),
      //})
    );
    this.earth.name = config.Earth;
    this.group.add(this.earth);
  }
  createAtmosphere() {
    this.atmosphere = new Mesh(
      new SphereGeometry(5, 50, 50),
      new ShaderMaterial({
        vertexShader: atmosphereVertextShader,
        fragmentShader: atmosphereFragmentShader,
        blending: AdditiveBlending,
        side: BackSide,
      })
    );
    this.atmosphere.name = config.Atmosphere;
    this.atmosphere.scale.set(
      config.atmosphereScale,
      config.atmosphereScale,
      config.atmosphereScale
    );
    this.group.add(this.atmosphere);
  }
  createStars() {
    const starGeometry = new BufferGeometry();
    const starMaterial = new PointsMaterial({
      color: config.starColor,
    });
    const startVertices = [];
    for (let i = 0; i < config.startCount; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -(Math.random() - 0.5) * 1000;
      startVertices.push(x, y, z);
    }
    starGeometry.setAttribute(
      "position",
      new Float32BufferAttribute(startVertices, 3)
    );
    this.stars = new Points(starGeometry, starMaterial);
    this.scene.add(this.stars);
  }
  addPoints() {
    this.points = getPoints();
    this.points.forEach((p) => this.pointsGroup.add(p));
    this.group.add(this.pointsGroup);
    this.pointsGroup.name = "pointsGrp";
  }
  renderScene = () => {
    let isInterSecting = false;
    this.raycaster.setFromCamera(this.mousePoint, this.camera);
    const intersects = this.raycaster.intersectObjects(this.points);
    this.points.forEach((p) => {
      (p.material as MeshBasicMaterial).opacity = config.pointsOpacity;
    });
    for (let i = 0; i < intersects.length; i++) {
      (intersects[i].object as any).material.opacity = 1;
      isInterSecting = true;
      this.showInfoPopUp(intersects[i].object.name);
    }
    if (!isInterSecting) {
      this.hideInfoPopup();
    }
    this.renderer.render(this.scene, this.camera);
    this.group.rotation.y += isInterSecting ? 0 : config.earthRotationSpeed;

    requestAnimationFrame(this.renderScene);
  };
  hideInfoPopup() {
    let infoEle: HTMLDivElement = document.querySelector("div.info-popup")!;
    infoEle.classList.add("hide");
  }
  showInfoPopUp(text: string) {
    let infoEle: HTMLDivElement = document.querySelector("div.info-popup")!;
    infoEle.style.top =
      (-(this.mousePoint.y - 1) * window.innerHeight) / 2 + "px";
    infoEle.style.left =
      ((this.mousePoint.x + 1) * window.innerWidth) / 2 + "px";
    infoEle.classList.remove("hide");
    infoEle.innerText = text;
  }
}
(window as any)["revolvingWorld"] = new RevolvingWorld();
