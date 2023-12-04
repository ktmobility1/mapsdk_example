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
    lngLat: [127.029414, 37.471401],
    draggable: true, //드래그 가능 여부
}).addTo(map);

//마커 드래그 끝났을 때 실행할 함수를 추가합니다.
function onDragEnd() {
    //드래그 끝났을 때의 좌표를 받아옵니다.
    const lngLat = marker.getLngLat();

    //infowindow로 좌표를 표시합니다. 
    const info = new ktGms.overlay.InfoWindow()
        .setHTML(`Longitude: ${lngLat.lng} <br/> Latitude: ${lngLat.lat}`);
        
    //marker의 InfoWindow를 설정합니다. 드래그 직후에 open 되어있도록 설정합니다. 
    marker.setInfoWindow(info, true);
}

marker.on("dragend", onDragEnd);