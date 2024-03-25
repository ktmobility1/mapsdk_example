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
  const polygon1 = new ktGms.geometry.Polygon(
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
  new ktGms.layer.PolygonLayer( //Layer ID
    "polygon1_layer", //PolygonLayer에 적용할 스타일
    new ktGms.style.FillStyle(
      {
        "fill-color": "#1253A4",
        "fill-opacity": 0.5,
      },
      {
        "visibility": "visible",
      }
    ),
    polygon1
  ).addTo(map);

  // Polygon 생성
  const polygon2 = new ktGms.geometry.Polygon(
    [
      [
        [127.02222, 37.49144],
        [127.015522, 37.49044],
        [127.01855, 37.48522],
        [127.02222, 37.49144],
      ],
    ],
    {}
  );
  // 지도에 PolygonLayer 추가
  new ktGms.layer.PolygonLayer( //Layer ID
    "polygon2_layer", //PolygonLayer에 적용할 스타일
    new ktGms.style.FillStyle(
      {
        "fill-color": "#58BE89",
        "fill-opacity": 0.5,
      },
      {
        "visibility": "visible",
      }
    ),
    polygon2
  ).addTo(map);

  // difference 계산
  const difference = analysis.transformation.difference(polygon1, polygon2);
  // 지도에 PolygonLayer 추가
  new ktGms.layer.PolygonLayer( //Layer ID
    "diff_polygon_layer", //PolygonLayer에 적용할 스타일
    //difference 연산 결과를 노란 사각형으로 표시
    new ktGms.style.FillStyle(
      {
        "fill-color": "#FFFF00",
        "fill-opacity": 0.5,
      },
      {
        "visibility": "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("geojsonSource", { data: difference })
  ).addTo(map);

  // 버튼 토글 이벤트 발생 시 visibility 변경
  const polygon1_input = document.getElementById("polygon1");
  polygon1_input.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    map.setLayoutProperty(
      "polygon1_layer",
      "visibility",
      isChecked ? "visible" : "none"
    );
  });
  const polygon2_input = document.getElementById("polygon2");
  polygon2_input.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    map.setLayoutProperty(
      "polygon2_layer",
      "visibility",
      isChecked ? "visible" : "none"
    );
  });
  const difference_input = document.getElementById("difference");
  difference_input.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    map.setLayoutProperty(
      "diff_polygon_layer",
      "visibility",
      isChecked ? "visible" : "none"
    );
  });
});
