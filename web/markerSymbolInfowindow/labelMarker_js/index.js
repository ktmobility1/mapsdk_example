import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 10,
    maxPitch: 68,
    navigationControl: true,
});

//마커 속성정보로 사용할 geojson source를 추가합니다. 
let source = new ktGms.source.GeoJSONSource("geojsonSource", {
    data: [
        new ktGms.geometry.PointGeo([127.029414, 37.471401], { label: "우면" }),
        new ktGms.geometry.PointGeo([126.978916, 37.572020], { label: "광화문" }),
        new ktGms.geometry.PointGeo([127.114931, 37.358817], { label: "분당" }),
        new ktGms.geometry.PointGeo([127.106357, 37.513864], { label: "송파" })
    ],
});

source.data.forEach((point) => {
    //라벨 마커를 추가합니다.
    let marker = new ktGms.overlay.Marker({
        lngLat: point.coordinates,
        label: point.properties["label"],
        labelOptions: {
            color: "#ff1af3", //라벨 색상
            position: "bottom", //라벨 위치
            offset: [0,-1], //오프셋
            size: 15 //글자 크기
        }
    }).addTo(map);

    //마커 클릭 시 수행할 이벤트리스너를 추가합니다. 
    marker.on("click", () => {
        map.setCenter(point.coordinates);
        map.easeTo({ zoom: 14 });
    });
});
