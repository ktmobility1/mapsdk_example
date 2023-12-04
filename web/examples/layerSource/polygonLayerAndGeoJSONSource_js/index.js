import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
let map = new ktGms.Map({
  container: document.getElementById("map"),
  style: "normal",
  center: [127.017422, 37.49144],
  zoom: 16,
  maxPitch: 68,
});

//PolygonLayer에 적용할 스타일을 지정합니다.
let style = new ktGms.style.FillStyle(
  {
    "fill-antialias": true,
    "fill-color": "#ff0000",
    "fill-opacity": 0.6,
  },
  {
    visibility: "visible",
  }
);

//PolygonLayer에 적용할 GeoJSONSource 정보를 지정합니다.
let source = new ktGms.source.GeoJSONSource("geojsonSource", {
  data: new ktGms.geometry.Polygon(
    [
      [
        [127.017422, 37.49144],
        [127.018522, 37.49144],
        [127.018522, 37.49294],
        [127.017422, 37.49144],
      ],
    ],
    {}
  ),
});

//지도가 로드되었을 때 PolygonLayer를 추가합니다.
map.on(ktGms.event.MapDefaultEvent.eventName.load, (event) => {
  let polygonLayer = new ktGms.layer.PolygonLayer("trangle", style, source);
  polygonLayer.addTo(map);

  setInterval(() => {
    if (polygonLayer.source instanceof ktGms.source.GeoJSONSource) {
      //Layer에 포함된 Source의 좌표 정보 변경
      polygonLayer.source.setData(
        new ktGms.geometry.Polygon(
          [
            [
              [127.017422, 37.49144],
              [127.018522, 37.49144],
              [127.019522, 37.49294],
              [127.017422, 37.49144],
            ],
          ],
          {}
        )
      );
    }
  }, 1000);

  setInterval(() => {
    //Layer의 paint style 변경
    polygonLayer.setPaintProperty("fill-color", "#000");
  }, 1500);
});
