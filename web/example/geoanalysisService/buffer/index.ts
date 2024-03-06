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
  // Point 생성
  const point: ktGms.geometry.PointGeo = new ktGms.geometry.PointGeo(
    [127.017422, 37.49144],
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
        "circle-color": "#1253A4",
      },
      {
        visibility: "visible",
      }
    ),
    point
  ).addTo(map);
  
  // point로부터 0.3km 만큼 버퍼 생성
  const buffered = analysis.transformation.buffer(point, 0.3, {units:"kilometers"});

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
    new ktGms.source.GeoJSONSource("geojsonSource", {data : buffered})
  ).addTo(map);

});
