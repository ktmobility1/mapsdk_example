import ktGms from "kt-map-sdk-js";

const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68,

    // 사용자 이벤트(마우스, 터치, 키보드) 발생 시 맵에 연결시킬지에 대한 여부입니다.
    // false이면 사용자 이벤트에 응답하지 않습니다.
    interactive: false 
});