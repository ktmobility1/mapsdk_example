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
      [127.02052285862385, 37.49408524182098],
      [127.01591370292363, 37.49449157168321],
      [127.01432854355636, 37.49263404569571],
      [127.01515770384145, 37.49060232375004],
      [127.02074234222835, 37.490428173582785],
      [127.02179098611799, 37.491743964788654],
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
        "line-join": "round",
        "line-cap": "round",
      }
    ),
    new ktGms.source.GeoJSONSource("line", { data: line })
  ).addTo(map);

  // Polygon 변환
  const polygon = analysis.conversion.lineToPolygon(line);

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
        "visibility": "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("geojsonSource", { data: polygon })
  ).addTo(map);
});
