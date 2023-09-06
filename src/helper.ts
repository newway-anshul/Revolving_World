import * as THREE from "three";
import { RevolvingWorld } from "./main";
import { config } from "./configuration";

export const showArrow = (world: RevolvingWorld) => {
  const axesHelper = new THREE.AxesHelper(2);
  axesHelper.name = config.Axes;
  world.scene.add(axesHelper);
};
