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
  // Polygon 생성
  const polygon = new ktGms.geometry.Polygon(
    [
      [
        [127.01944982766713, 37.494201336292775],
        [127.01747447522507, 37.49408524182098],
        [127.01535280037876, 37.49325322615786],
        [127.01513331677427, 37.491995510467916],
        [127.01542596158032, 37.49064102373197],
        [127.0162551218653, 37.489808969701116],
        [127.01962053713726, 37.48994442098923],
        [127.02049847155672, 37.491240870888134],
        [127.02130324477332, 37.493175828880865],
        [127.01944982766713, 37.494201336292775],
      ],
    ],
    {}
  );

  // 지도에 PolygonLayer 추가
  new ktGms.layer.PolygonLayer( //Layer ID
    "polygon_layer", //PolygonLayer에 적용할 스타일
    new ktGms.style.FillStyle(
      {
        "fill-color": "#58BE89",
        "fill-opacity": 0.5,
      },
      {
        "visibility": "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("polygon", { data: polygon })
  ).addTo(map);

  // Point 추출
  const points = analysis.conversion.explode(polygon);
  new ktGms.layer.PointLayer( //Layer ID
    "point_layer", //PointLayer에 적용할 스타일
    new ktGms.style.CircleStyle(
      {
        "circle-radius": 3,
        "circle-color": "#000000",
      },
      {
        "visibility": "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("point", { data: points })
  ).addTo(map);
});
