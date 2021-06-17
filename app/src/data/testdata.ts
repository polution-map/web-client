import { GeoPoint, GeoPointW, PointWeight } from 'geo-points';
import izhevskBorders from 'src/data/izhevskBorders.json';
import points from 'src/data/testdata.json';
import pointsBig from 'src/data/testdataBig.json';

const geoPoints = points.features.map((f) => f.geometry.coordinates) as Array<GeoPoint>;
const getGeoPointsW = (maxValue: PointWeight): Array<GeoPointW> => geoPoints.map(
  (p) => [...p, Math.floor(Math.random() * maxValue)],
);

const geoPointsBig = pointsBig.features.map((f) => f.geometry.coordinates) as Array<GeoPoint>;
const geoPointsBigW = (maxValue: PointWeight): Array<GeoPointW> => geoPointsBig.map(
  (p) => [...p, Math.floor(Math.random() * maxValue)],
);

const getIzhevskBorders = () => izhevskBorders.map((p) => [...p],) as Array<GeoPoint>;

export {
  geoPoints, getGeoPointsW, geoPointsBigW, getIzhevskBorders,
};
