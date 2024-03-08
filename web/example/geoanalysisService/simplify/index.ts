import ktGms from "kt-map-sdk-js";
import analysis from "kt-map-sdk-geoanalysis";

let map: ktGms.Map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.017422, 37.49144],
  zoom: 10,
  maxPitch: 68,
});

map.on("load", async () => {
  // remote로 geojson 호출
  analysis.utils
    .getGeoJSONfromRemote(
      "https://map.gis.kt.com/mapsdk/data/seoul_sub.geojson"
    )
    .then((value) => {
      // PolygonLayer 추가
      new ktGms.layer.PolygonLayer(
        //Layer ID
        "polygon_layer",
        //PointLayer에 적용할 스타일
        new ktGms.style.FillStyle(
          {
            "fill-color": "#1253A4",
            "fill-opacity": 0.5,
          },
          {
            "visibility": "visible",
          }
        ),
        new ktGms.source.GeoJSONSource("geojsonSource", { data: value })
      ).addTo(map);

      //simplify
      const options = {
        tolerance: 0.01,
        highQuality: false,
      };
      const simplified = analysis.transformation.simplify(value, options);
      // PolygonLayer 추가
      new ktGms.layer.PolygonLayer(
        //Layer ID
        "simplified_polygon_layer",
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
        new ktGms.source.GeoJSONSource("simplifiedSource", { data: simplified })
      ).addTo(map);
    });
});
