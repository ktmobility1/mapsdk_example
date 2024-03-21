import ktGms from "kt-map-sdk-js";
import analysis from "kt-map-sdk-geoanalysis";

let map = new ktGms.Map({
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
      new ktGms.layer.PolygonLayer( //Layer ID
        "polygon_layer", //PointLayer에 적용할 스타일
        new ktGms.style.FillStyle(
          {
            "fill-color": "#640064",
            "fill-opacity": 0.5,
          },
          {
            "visibility": "visible",
          }
        ),
        new ktGms.source.GeoJSONSource("geojsonSource", { data: value })
      ).addTo(map);
      const result = document.getElementById("result_text");
      result.innerText =
        "area result : " + String(analysis.measurement.area(value));
    })
    .catch((err) => {
      console.log(err);
    });
});
