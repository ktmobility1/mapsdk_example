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
  const bbox = [127.015, 37.49, 127.02, 37.493];
  const cellSide = 0.05;
  const grid = analysis.grid.pointGrid(bbox, cellSide, { units: "kilometers" });

  // 지도에 PointLayer 추가
  new ktGms.layer.PointLayer( //Layer ID
    "point_layer", // PointLayer에 적용할 스타일
    new ktGms.style.CircleStyle(
      {
        "circle-radius": 10,
        "circle-color": "#FF0000",
        "circle-opacity": 0.5,
      },
      {
        "visibility": "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("point", { data: grid })
  ).addTo(map);
});
