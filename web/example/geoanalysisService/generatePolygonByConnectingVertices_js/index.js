import ktGms from "kt-map-sdk-js";
import analysis from "kt-map-sdk-geoanalysis";
let map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.017422, 37.49144],
  zoom: 15,
  maxPitch: 68,
});

map.on("load", () => {
  // point FeatureCollection 생성
  const points = analysis.helper.featureCollection([
    new ktGms.geometry.PointGeo([127.015522, 37.49044], {}),
    new ktGms.geometry.PointGeo([127.02222, 37.49144], {}),
    new ktGms.geometry.PointGeo([127.015522, 37.49294], {}),
    new ktGms.geometry.PointGeo([127.01312, 37.48755], {}),
    new ktGms.geometry.PointGeo([127.02, 37.4935], {}),
    new ktGms.geometry.PointGeo([127.018, 37.4965], {}),
    new ktGms.geometry.PointGeo([127.019, 37.49], {}),
  ]);
  // 지도에 PointLayer 추가
  new ktGms.layer.PointLayer( //Layer ID
    "point_layer", //PointLayer에 적용할 스타일
    new ktGms.style.CircleStyle(
      {
        "circle-radius": 3,
        "circle-color": "#1253A4",
      },
      {
        "visibility": "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("points", { data: points })
  ).addTo(map);

  // points를 모두 포함하는 hull 계산
  const hull = analysis.transformation.concave(points, { units: "kilometers" });

  // PolygonLayer 추가
  new ktGms.layer.PolygonLayer( //Layer ID
    "polygon_layer", //PointLayer에 적용할 스타일
    new ktGms.style.FillStyle(
      {
        "fill-color": "#58BE89",
        "fill-opacity": 0.5,
      },
      {
        "visibility": "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("geojsonSource", { data: hull })
  ).addTo(map);
});
