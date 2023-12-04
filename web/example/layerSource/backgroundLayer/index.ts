import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
let map:ktGms.Map = new ktGms.Map({
  container: document.getElementById("map"),
  style: "normal",
  center: [127.017422, 37.49144],
  zoom: 16,
  maxPitch: 68
});

//지도가 로드되었을 때 BackgroundLayer를 추가합니다.
map.on(ktGms.event.MapDefaultEvent.eventName.load, (event:ktGms.event.MapDefaultEvent) => {
  new ktGms.layer.BackgroundLayer("backgroundLayer",
    //BackgroundLayer에 적용할 스타일을 지정합니다.
    new ktGms.style.BackgroundStyle({
      "background-color": "#000",
      "background-opacity":0.5
    }, {
      "visibility": "visible"
    })).addTo(map);
});