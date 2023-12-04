import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68
});

//드래그 가능한 마커를 지도에 추가합니다.
let marker = new ktGms.overlay.Marker({
    lngLat: [127.029414, 37.471401], //좌표
    bounceAnimation: true, //바운스 애니메이션 여부
    removable: true, //삭제 가능 여부
}).addTo(map);

