import { RevolvingWorld } from "./main";
import { config } from "./configuration";
import {
  Mesh,
  PointsMaterial,
  ShaderMaterial,
  SphereGeometry,
  TextureLoader,
} from "three";

export const addGUI = (world: RevolvingWorld) => {
  const gui = world.gui;
  gui.add(world.orbittalController, "enabled").name("Enable Orbit Controllers");
  gui.add(world.camera.position, "z", 0, 15, 1).name("Camera Z");
  gui
    .add(config, "startCount", 1000, 5000, 500)
    .name("Star Count")
    .onChange(() => {
      world.scene.remove(world.stars);
      world.createStars();
    });
  gui
    .addColor(world.stars.material, "color")
    .name("Star Color")
    .onChange((c) => {
      (world.stars.material as PointsMaterial).color.r = c.r;
      (world.stars.material as PointsMaterial).color.g = c.g;
      (world.stars.material as PointsMaterial).color.b = c.b;
    });
  gui.add(config, "atmosphereScale", 0, 5, 0.1).onChange((x) => {
    world.atmosphere.scale.set(x, x, x);
  });

  gui
    .add(config, "earthRadius", 4, 5, 0.25)
    .name("Earth Radis")
    .onChange((newRadius) => {
      world.earth.geometry = new SphereGeometry(newRadius, 50, 50);
    });
  gui
    .add(config, "earthRotationSpeed", 0.0, 0.025, 0.0025)
    .name("Earth Roation Speed")
    .onChange((newSpeed) => {
      world.earth.rotation.y += newSpeed;
    });
  gui
    .add(config, "earthUV", [
      "src/assets/earthUV2.jpg",
      "src/assets/earthUV.jpg",
    ])
    .name("Earth Texture")
    .onChange((newTexture) => {
      (world.earth.material as ShaderMaterial).uniforms["globeTexture"].value =
        new TextureLoader().load(newTexture);
    });
  gui
    .add(config, "showAtmosphere")
    .name("Show Atmoshpeher")
    .onChange((value) => {
      (world.group.getObjectByName(config.Atmosphere) as Mesh).visible = value;
    });
  gui
    .add(config, "showEarth")
    .name("Show Earth")
    .onChange((value) => {
      (world.group.getObjectByName(config.Earth) as Mesh).visible = value;
    });
  gui
    .add(config, "showAxes")
    .name("Show Axes")
    .onChange((value) => {
      (world.scene.getObjectByName(config.Axes) as Mesh).visible = value;
    });
};
