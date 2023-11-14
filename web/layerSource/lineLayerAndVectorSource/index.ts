import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
let map:ktGms.Map = new ktGms.Map({
  container: document.getElementById("map"),
  style: "normal",
  center: [127.017422, 37.49144],
  zoom: 16,
  maxPitch: 68
});

//LineLayer에 적용할 스타일을 지정합니다.
let style:ktGms.style.LineStyle = new ktGms.style.LineStyle({
      "line-color": "#ff0000",
      "line-opacity":1,
      "line-width": 1.5
    }, {
      visibility:"visible"
    }
)
 
//LineLayer에 적용할 VectorSource 정보를 지정합니다.
let source:ktGms.source.VectorSource = new ktGms.source.VectorSource("sourceId", {
  tiles:["https://map.gis.kt.com/vtile/mvt3/ctt/{z}/{x}/{y}.pbf"],
  minzoom:6,
  maxzoom:24,
  defaultLayer: "ctt" //표출시킬 Layer의 id
})

//지도가 로드되었을 때 LineLayer를 추가합니다.
map.on(ktGms.event.MapDefaultEvent.eventName.load, (event:ktGms.event.MapDefaultEvent) => {
  let lineLayer:ktGms.layer.LineLayer = new ktGms.layer.LineLayer("lineLayer", style, source);
  lineLayer.addTo(map);
})
