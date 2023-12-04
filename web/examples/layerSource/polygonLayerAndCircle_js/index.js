import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
let map = new ktGms.Map({
  container: document.getElementById("map"),
  style: "normal",
  center: [127.017422, 37.49144],
  zoom: 16,
  maxPitch: 68,
});

//지도가 로드되었을 때 PolygonLayer를 추가합니다.
map.on(ktGms.event.MapDefaultEvent.eventName.load,(event) => {
    let polygonLayer = new ktGms.layer.PolygonLayer("circle",
    //PolygonLayer에 적용할 스타일을 지정합니다.
    new ktGms.style.FillStyle(
      {
        "fill-antialias": true,
        "fill-color": "#640064",
        "fill-opacity": 0.5,
      },
      {}
    ),
    //PolygonLayer에 적용할 Polygon Geometry 정보를 지정합니다.
    new ktGms.geometry.Circle([127.017422, 37.49144], 0.15, "kilometers", 64)
    ).addTo(map);
  }
);
