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
  // Polygon 생성
  const polygon1: ktGms.geometry.Polygon = new ktGms.geometry.Polygon(
    [[
      [127.015522, 37.49044],
      [127.02222, 37.49044],
      [127.02222, 37.49294],
      [127.015522, 37.49294],
      [127.015522, 37.49044]
    ]],
    {}
  );
  // 지도에 PolygonLayer 추가
  new ktGms.layer.PolygonLayer(
    //Layer ID
    "polygon1_layer",
    //PolygonLayer에 적용할 Line 스타일
    new ktGms.style.LineStyle(
      {
        "line-color": "#ffb3ba",
        "line-width": 10,
        "line-opacity": 1
      },
      {
        "line-join": "round",
        "line-cap": "round"
      }
    ),
    polygon1
  ).addTo(map);

  // Polygon 생성
  const polygon2: ktGms.geometry.Polygon = new ktGms.geometry.Polygon(
    [[
      [127.02222, 37.49144],
      [127.015522, 37.49044],
      [127.01855, 37.48522],
      [127.02222, 37.49144]
    ]],
    {}
  );
  // 지도에 PolygonLayer 추가
  new ktGms.layer.PolygonLayer(
    //Layer ID
    "polygon2_layer",
    //PolygonLayer에 적용할 Line 스타일
    new ktGms.style.LineStyle(
      {
        "line-color": "#bae1ff",
        "line-width": 10,
        "line-opacity": 1
      },
      {
        "line-join": "round",
        "line-cap": "round"        
      }
    ),
    polygon2
  ).addTo(map);

  // union 계산
  const union = analysis.transformation.union(polygon1, polygon2);
  // 지도에 PolygonLayer 추가
  new ktGms.layer.PolygonLayer(
    //Layer ID
    "union_polygon_layer",
    //PolygonLayer에 적용할 스타일
    //union 연산 결과를 노란 사각형으로 표시
    new ktGms.style.FillStyle(
      {
        "fill-color": "#ffffba",
        "fill-opacity": 0.5,
      },
      {
        visibility: "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("geojsonSource", {data : union})
  ).addTo(map);    

});
