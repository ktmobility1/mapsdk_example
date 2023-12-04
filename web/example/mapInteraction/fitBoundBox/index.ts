import ktGms from "kt-map-sdk-js";

const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 12,
    maxPitch: 68,
});

document?.getElementById("fit")?.addEventListener("click", (): void => {
    map.fitBounds([
        [128.7384361, 34.8799083], // 부산의 남서 경계 좌표
        [129.3728194, 35.3959361], // 부산의 북동 경계 좌표
    ]);
});
