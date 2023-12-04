import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68
});

//마커 속성정보로 사용할 geojson source를 추가합니다. 
let source = new ktGms.source.GeoJSONSource("geojsonSource", {
    data: [
        new ktGms.geometry.PointGeo([127.029414, 37.471401], { message: "ICON1", iconSize: [60, 60], url: "https://map.gis.kt.com/mapsdk/images/music.png"}),
        new ktGms.geometry.PointGeo([127.029312, 37.472443], { message: "ICON2", iconSize: [50, 50], url: "https://map.gis.kt.com/mapsdk/images/bar.png" }),
        new ktGms.geometry.PointGeo([127.028882, 37.470844], { message: "ICON3", iconSize: [40, 40], url: "https://map.gis.kt.com/mapsdk/images/bicycle.png" })
    ],
});

source.data instanceof Array && source.data.forEach((point: ktGms.geometry.PointGeo) => {
    //마커를 추가합니다.
    let marker = new ktGms.overlay.Marker({
        lngLat: [point.coordinates![0], point.coordinates![1]],
        data: point.properties
    }).addTo(map);

    //마커 이미지를 커스텀합니다.
    marker.setImageElement(
        marker.getData()["url"],
        marker.getData()["iconSize"][0],
        marker.getData()["iconSize"][1]
    );

    //마커 클릭 시 수행할 이벤트리스너를 추가합니다. 
    marker.on("click", () => {
        alert(marker.getData()["message"]);
    });
});