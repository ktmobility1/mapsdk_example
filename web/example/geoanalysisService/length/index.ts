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
  // LineString 생성
  const line: ktGms.geometry.LineString = new ktGms.geometry.LineString(
    [
      [127.02222, 37.49144],
      [127.015522, 37.49044],
      [127.015522, 37.49294],
    ],
    {}
  );
  // 지도에 LineLayer 추가
  new ktGms.layer.LineLayer(
    //Layer ID
    "line_layer",
    //LineLayer에 적용할 스타일
    new ktGms.style.LineStyle(
      {
        "line-color": "#000000",
        "line-opacity": 1,
        "line-width": 5,
      },
      {
        "visibility": "visible",
        "line-join": "round",
        "line-cap": "round",
      }
    ),
    line
  ).addTo(map);

  // Line의 length 계산
  const result = document.getElementById("result_text");
  result.innerText = "length result : " + String(analysis.measurement.length(line, {units: "kilometers"})+ "km");
});
