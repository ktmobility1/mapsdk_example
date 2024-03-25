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
  const polygon: ktGms.geometry.Polygon = new ktGms.geometry.Polygon(
    [
      [
        [127.015522, 37.49044],
        [127.02222, 37.49044],
        [127.02222, 37.49294],
        [127.015522, 37.49294],
        [127.015522, 37.49044],
      ],
    ],
    {}
  );
  // 지도에 PolygonLayer 추가
  new ktGms.layer.PolygonLayer(
    //Layer ID
    "polygon_layer",
    //PolygonLayer에 적용할 스타일
    new ktGms.style.FillStyle(
      {
        "fill-color": "#1253A4",
        "fill-opacity": 0.5,
      },
      {
        "visibility": "visible",
      }
    ),
    polygon
  ).addTo(map);

  // rotate
  const angle = 90;
  const rotatedPolygon = analysis.transformation.transformRotate(
    polygon,
    angle,
    { pivot: [127.013, 37.49] }
  );

  // 지도에 PolygonLayer 추가
  new ktGms.layer.PolygonLayer(
    //Layer ID
    "polygon2_layer",
    //PolygonLayer에 적용할 스타일
    new ktGms.style.FillStyle(
      {
        "fill-color": "#58BE89",
        "fill-opacity": 0.5,
      },
      {
        "visibility": "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("rotatedPolygon", { data: rotatedPolygon })
  ).addTo(map);
});
