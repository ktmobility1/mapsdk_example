import ktGms from "kt-map-sdk-js";

let map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.017422, 37.49144],
  zoom: 16,
  maxPitch: 68,
});

let style = new ktGms.style.RasterStyle(
 {"raster-opacity": 0.6,},
 {visibility: "visible"},
)
let source = new ktGms.source.RasterSource("raster-tiles",{
  "tiles": ["https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"],
  "tileSize": 256,
})

map.on(
  ktGms.event.MapDefaultEvent.eventName.load,
  (event: ktGms.event.MapDefaultEvent) => {
    new ktGms.layer.RasterLayer(
      "raster",style, source 
    ).addTo(map);
  }
);
