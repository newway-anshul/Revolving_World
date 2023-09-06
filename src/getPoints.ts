import {
  Mesh,
  SphereGeometry,
  MeshBasicMaterial,
  BoxGeometry,
  Matrix4,
} from "three";
import { config } from "./configuration";
import { gsap } from "gsap";
import { Countries } from "./countries";
interface PointData {
  name: string;
  lat: number;
  longi: number;
}
export const getPoints = () => {
  // const latLongis: PointData[] = [
  //   {
  //     countryName: "mexico",
  //     lattitude: 23.6345,
  //     longitude: -102.5528,
  //   },
  //   {
  //     countryName: "india",
  //     lattitude: 20.5937,
  //     longitude: 78.9629,
  //   },
  // ];
  const points: Mesh[] = [];
  Countries.forEach((latlongi: PointData) => {
    const point = new Mesh(
      new BoxGeometry(0.05, 0.05, config.pointHeight),
      new MeshBasicMaterial({
        color: config.pointColor,
        transparent: true,
        opacity: 0.8,
      })
    );
    setPointPosition(point, latlongi);
    points.push(point);
  });
  return points;
};
const setPointPosition = (point: Mesh, data: PointData) => {
  const latRad = (90 - data.lat) * (Math.PI / 180);
  const lonRad = (90 - data.longi) * (Math.PI / 180);
  point.position.x = config.earthRadius * Math.sin(latRad) * Math.cos(lonRad);
  point.position.y = config.earthRadius * Math.cos(latRad);
  point.position.z = config.earthRadius * Math.sin(latRad) * Math.sin(lonRad);
  point.name = data.name;
  point.lookAt(0, 0, 0);
  point.geometry.applyMatrix4(
    new Matrix4().makeTranslation(0, 0, -config.pointHeight / 2)
  );
  gsap.to(point.scale, {
    z: 0.4,
    duration: 1.5,
    yoyo: true,
    ease: "linear",
    repeat: -1,
    delay: Math.random(),
  });
};
