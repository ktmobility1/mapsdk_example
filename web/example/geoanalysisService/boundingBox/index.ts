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
        "line-opacity": 0.5,
        "line-width": 3,
      },
      {
        "visibility": "visible",
        "line-join": "round",
        "line-cap": "round",
      }
    ),
    line
  ).addTo(map);

  // bounding box 계산 & polygon으로 변환
  const bbox = analysis.measurement.bbox(line);
  const polygon = analysis.measurement.bboxPolygon(bbox);

  // PolygonLayer 추가
  new ktGms.layer.PolygonLayer(
    //Layer ID
    "polygon_layer",
    //PointLayer에 적용할 스타일
    new ktGms.style.FillStyle(
      {
        "fill-color": "#58BE89",
        "fill-opacity": 0.5,
      },
      {
        visibility: "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("geojsonSource", {data : polygon})
  ).addTo(map);
    
});
