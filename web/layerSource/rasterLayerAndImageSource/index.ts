import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
let map:ktGms.Map = new ktGms.Map({
  container: document.getElementById("map"),
  style: "normal",
  center: [127.017422, 37.49144],
  zoom: 16,
  maxPitch: 68
});

//RasterLayer에 적용할 스타일을 지정합니다.
let style:ktGms.style.RasterStyle = new ktGms.style.RasterStyle(
  { "raster-opacity" : 0.7},
  { "visibility" : 'visible'}
);
 
//RasterLayer에 적용할 ImageSource 정보를 지정합니다.
let source_image:ktGms.source.ImageSource = new ktGms.source.ImageSource('imgSource',{
  "url" : "https://maplibre.org/maplibre-gl-js/docs/assets/radar1.gif",
  "coordinates" : [
    [127.007422, 37.50144],
    [127.027422, 37.50144],
    [127.027422, 37.48144],
    [127.007422, 37.48144]
  ]});

//지도가 로드되었을 때 RasterLayer를 추가합니다.
map.on(ktGms.event.MapDefaultEvent.eventName.load, (event:ktGms.event.MapDefaultEvent) => {
  new ktGms.layer.RasterLayer("rasterLayer", style, source_image).addTo(map);
}); 