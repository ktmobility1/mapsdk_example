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
  const coordinate1 = [127.02222, 37.49144];
  const coordinate2 = [127.015522, 37.49044];
  // MultiPoint 생성
  const multiPoint = new ktGms.geometry.MultiPoint(
    [coordinate1, coordinate2],
    {}
  );
  // 지도에 Point 객체 및 PointLayer 추가
  new ktGms.layer.PointLayer( //Layer ID
    "point_layer", //PointLayer에 적용할 스타일
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
  const result = document.getElementById("result_text");
  result.innerText =
    "distance result : " +
    String(
      analysis.measurement.distance(coordinate1, coordinate2, {
        units: "kilometers",
      }) + "km"
    );
});
