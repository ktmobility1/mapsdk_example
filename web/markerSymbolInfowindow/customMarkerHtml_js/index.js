import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68
});

//마커를 커스텀할 HTML 요소를 생성합니다.
let htmlSource = window.document.createElement("div");
htmlSource.innerHTML = "<h2>KT MAP</h2>";
htmlSource.style.color = "blue";

//HTML 요소로 커스텀한 마커를 지도에 추가합니다.
let marker = new ktGms.overlay.Marker({
    lngLat: [127.029414, 37.471401], //좌표
    element: htmlSource, //커스텀할 HTML 요소
    removable: true, //marker hover 시 제거 가능 여부
}).addTo(map);
