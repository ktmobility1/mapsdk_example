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
  const line1: ktGms.geometry.LineString = new ktGms.geometry.LineString(
    [
      [127.02222, 37.49144],
      [127.013522, 37.49044],
    ],
    {}
  );
  // LineString 생성
  const line2: ktGms.geometry.LineString = new ktGms.geometry.LineString(
    [
      [127.02, 37.49],
      [127.018, 37.493],
    ],
    {}
  );
  // lines로 병합 & Layer 추가
  const lines = analysis.helper.featureCollection([line1, line2])
  new ktGms.layer.LineLayer(
    //Layer ID
    "line_layer1",
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
    new ktGms.source.GeoJSONSource("line", { data: lines })
  ).addTo(map);

  // 교차점 계산
  const intersectPoint = analysis.miscellaneous.lineIntersect(line1, line2);
  // 지도에 PointLayer 추가
  new ktGms.layer.PointLayer(
    //Layer ID
    "point_layer",
    //PointLayer에 적용할 스타일
    new ktGms.style.CircleStyle(
      {
        "circle-radius": 10,
        "circle-color": "#FF0000",
      },
      {
        visibility: "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("intersect_point", { data: intersectPoint })
  ).addTo(map);
});
