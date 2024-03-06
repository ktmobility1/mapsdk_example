import ktGms from "kt-map-sdk-js";
import analysis from "kt-map-sdk-geoanalysis";
let map: ktGms.Map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.017422, 37.49144],
  zoom: 15,
  maxPitch: 68,
});

map.on("load", () => {
  // MultiPoint 생성
  const multiPoint: ktGms.geometry.MultiPoint = new ktGms.geometry.MultiPoint(
    [
      [127.02222, 37.49144],
      [127.015522, 37.49044],
      [127.015522, 37.49294],
    ],
    {}
  );
  const centerPoint = analysis.measurement.center(multiPoint);
  // 지도에 Point 객체 및 PointLayer 추가
  new ktGms.layer.PointLayer(
    //Layer ID
    "point_layer",
    //PointLayer에 적용할 스타일
    new ktGms.style.CircleStyle(
      {
        "circle-radius": 10,
        "circle-color": "#000000",
      },
      {
        visibility: "visible",
      }
    ),
    multiPoint
  ).addTo(map);
  new ktGms.layer.PointLayer(
    //Layer ID
    "center_point_layer",
    //PointLayer에 적용할 스타일
    new ktGms.style.CircleStyle(
      {
        "circle-radius": 10,
        "circle-color": "#FF0000",
      },
      {
        visibility: "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("center_point", { data: centerPoint })
  ).addTo(map);
});
