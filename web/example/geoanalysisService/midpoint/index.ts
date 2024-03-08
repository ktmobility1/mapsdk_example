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
  const coordinate1 = [127.02222, 37.49144];
  const coordinate2 = [127.015522, 37.49044];
  // MultiPoint 생성
  const multiPoint: ktGms.geometry.MultiPoint = new ktGms.geometry.MultiPoint(
    [coordinate1, coordinate2],
    {}
  );
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
        "visibility": "visible",
      }
    ),
    multiPoint
  ).addTo(map);

  // midPoint 계산
  const midPoint = analysis.measurement.midpoint(coordinate1, coordinate2);
  new ktGms.layer.PointLayer(
    //Layer ID
    "mid_point_layer",
    //PointLayer에 적용할 스타일
    new ktGms.style.CircleStyle(
      {
        "circle-radius": 10,
        "circle-color": "#FF0000",
      },
      {
        "visibility": "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("mid_point", { data: midPoint })
  ).addTo(map);
});
