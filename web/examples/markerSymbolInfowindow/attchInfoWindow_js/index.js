import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68
});

//infoWindow를 생성합니다
const infoWindow = new ktGms.overlay.InfoWindow({}).setText("KT연구개발센터");

//marker를 생성합니다
const marker = new ktGms.overlay.Marker({
    lngLat: [127.029414, 37.471401], //좌표
})
    .addTo(map) //지도에 마커를 추가합니다
    .setImageElement("https://map.gis.kt.com/mapsdk/images/cat.png", 60, 60) //마커 아이콘을 60px*60px 크기의 이미지로 바꿉니다
    .setInfoWindow(infoWindow, true); //마커에 infoWindow를 셋팅하고, 처음 로딩 시 infoWindow가 열려있도록 설정합니다
