import ktGms from "kt-map-sdk-js";

let map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68,
    pitch: 60
});

// 카메라 시점 변경 함수
function rotateCamera() {
    // rotateTo와 timeStamp를 사용하여 카메라 시점 변경
    map.rotateTo((performance.now() / 100) % 360, {duration: 0});
    // 애니메이션 실행(프레임 갱신)
    requestAnimationFrame(rotateCamera);
}

map.on("load", () => {
    // 애니메이션 실행
    rotateCamera();

    // 지도에 표출되는 라벨 제거
    const layers = map.getStyle().layers;
    for (let i = 0; i < layers.length; i++) { // layer type이 symbol이고, text-field 값이 존재하는 경우 레이어 "visibility" 속성 변경
        if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
            map.setLayoutProperty(layers[i].id, "visibility", "none");
        }
    }
});

