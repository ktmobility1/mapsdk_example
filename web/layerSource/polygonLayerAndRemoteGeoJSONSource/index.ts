import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
let map:ktGms.Map = new ktGms.Map({
  container: document.getElementById("map"),
  style: "normal",
  center: [127.017422, 37.49144],
  zoom: 10,
  maxPitch: 68,
});

//PolygonLayer에 적용할 스타일을 지정합니다.
let style:ktGms.style.FillStyle = new ktGms.style.FillStyle({
    "fill-antialias": true,
    "fill-color": "#00ff00",
    "fill-outline-color": "#000",
    "fill-opacity": 0.6,
  },{
    visibility: "visible",
  }
);

//PolygonLayer에 적용할 GeoJSONSource 정보를 지정합니다.
let source:ktGms.source.GeoJSONSource = new ktGms.source.GeoJSONSource("geojsonSource", {
  data: "https://map.gis.kt.com/mapsdk/data/seoul_sub.geojson",
});

//지도가 로드되었을 때 PolygonLayer를 추가합니다.
map.on(ktGms.event.MapDefaultEvent.eventName.load, (event: ktGms.event.MapDefaultEvent) => {
    let polygonLayer = new ktGms.layer.PolygonLayer("polygonLayer", style, source);
    polygonLayer.addTo(map);
  }
);
