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

  // Point 생성
  const point: ktGms.geometry.PointGeo = new ktGms.geometry.PointGeo(
    [127.019, 37.493],
    {}
  );
  // 지도에 PointLayer 추가
  new ktGms.layer.PointLayer(
    //Layer ID
    "point_layer",
    //LineLayer에 적용할 스타일
    new ktGms.style.CircleStyle(
      {
        "circle-radius": 10,
        "circle-color": "#58BE89",
      },
      {
        "visibility": "visible",
      }
    ),
    point
  ).addTo(map);

  const nearestPoint = analysis.miscellaneous.nearestPointOnLine(line, point, {
    units: "kilometers",
  });
  // 지도에 PointLayer 추가
  new ktGms.layer.PointLayer(
    //Layer ID
    "nearest_point_layer",
    //LineLayer에 적용할 스타일
    new ktGms.style.CircleStyle(
      {
        "circle-radius": 10,
        "circle-color": "#1253A4",
      },
      {
        "visibility": "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("nearest_point", { data: nearestPoint })
  ).addTo(map);
});
