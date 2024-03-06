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
  // point 생성
  const points: ktGms.geometry.MultiPoint = new ktGms.geometry.MultiPoint(
    [
      [127.01932789233126, 37.4943561286411],
      [127.01784028123268, 37.49346606825651],
      [127.01559667105045, 37.49358216369076],
      [127.0145724142294, 37.49286623897089],
      [127.01571860638632, 37.491802013866774],
      [127.01649899253704, 37.490582973751586],
      [127.01862066738204, 37.490447523621384],
      [127.0204496974224, 37.4925372982849],
      [127.01876698978509, 37.492885588377845],
      [127.01730376575364, 37.491802013866774],
    ],
    {}
  );
  // 지도에 PointLayer 추가
  new ktGms.layer.PointLayer(
    //Layer ID
    "point_layer",
    //PointLayer에 적용할 스타일
    new ktGms.style.CircleStyle(
      {
        "circle-radius": 5,
        "circle-color": "#1253A4",
      },
      {
        visibility: "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("points", { data: points })
  ).addTo(map);

  // polygon 생성
  const polygon: ktGms.geometry.Polygon = new ktGms.geometry.Polygon(
    [
      [
        [127.01649899259172, 37.4929823353571],
        [127.0200595044023, 37.493736957341994],
        [127.02044969747703, 37.49108607210243],
        [127.01745008821263, 37.49031207326567],
        [127.01649899259172, 37.4929823353571],
      ],
    ],
    {}
  );
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
    new ktGms.source.GeoJSONSource("polygon", { data: polygon })
  ).addTo(map);

  // polygon 내부 points 계산
  const ptsWithinPoly = analysis.joins.pointsWithinPolygon(points, polygon);
  // 지도에 PointLayer 추가
  new ktGms.layer.PointLayer(
    //Layer ID
    "point_within_polygon_layer",
    //PointLayer에 적용할 스타일
    new ktGms.style.CircleStyle(
      {
        "circle-radius": 5,
        "circle-color": "#FF0000",
      },
      {
        visibility: "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("point_within_polygon", { data: ptsWithinPoly })
  ).addTo(map);
});
