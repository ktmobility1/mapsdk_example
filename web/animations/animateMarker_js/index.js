import ktGms from "kt-map-sdk-js";

let map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68
});

// 마커 생성
const marker = new ktGms.overlay.Marker();

// 마커 이동 애니메이션 함수
function animateMarker() {
    // 마커가 회전하는 원의 반지름
    const radius = 0.001;
    // 마커가 회전하는 원의 중심
    const center = [127.029414, 37.471401];

    // sine, cosine 그래프를 활용해 원 모양 좌표 이동
    marker.setLngLat([
        center[0] + Math.cos(performance.now() / 1000) * radius,
        center[1] + Math.sin(performance.now() / 1000) * radius
    ]);

    // 지도에 마커 추가
    marker.addTo(map);

    // 애니메이션 실행(프레임 갱신)
    requestAnimationFrame(animateMarker);
}

// 애니메이션 실행
requestAnimationFrame(animateMarker);