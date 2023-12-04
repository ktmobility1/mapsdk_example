import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
let map:ktGms.Map = new ktGms.Map({
  container: document.getElementById("map"),
  style: "normal", 
  center: [127.017422, 37.49144],
  zoom: 16,
  maxPitch: 68,
});

//지도가 로드되었을 때 PointLayer를 추가합니다.
map.on(ktGms.event.MapDefaultEvent.eventName.load, (event: ktGms.event.MapDefaultEvent) => {
  new ktGms.layer.PointLayer("test",
    //PointLayer에 적용할 스타일을 지정합니다.
    new ktGms.style.CircleStyle(
      {
        "circle-radius": 12,
        "circle-color": "#B42222"
      },
      {
        "visibility": "visible",
      }
    ),
    //PolygonLayer에 적용할 MultiPoint Geometry 정보를 지정합니다.
    new ktGms.geometry.MultiPoint(
      [
        [127.017422, 37.49144],
        [127.018522, 37.49144],
        [127.018522, 37.49294],
      ],
      {}
    )
  ).addTo(map);
});
