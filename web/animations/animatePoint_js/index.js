import ktGms from "kt-map-sdk-js";

let map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68
});

map.on("load", () => {
    // 점이 회전하는 원의 반지름
    const radius = 0.001;
    // 점이 회전하는 원의 중심
    const center = [127.029414, 37.471401];

    // PointLayer, PointSource 추가
    let layer = 
        new ktGms.layer.PointLayer(
            "point-animation", //Layer ID
            new ktGms.style.CircleStyle({ //Layer Style
                "circle-radius": 10,
                "circle-color": "#007cbf"
            },{}),
            new ktGms.source.GeoJSONSource("point", { //Layer Source
                data: new ktGms.geometry.PointGeo(center,{})
            })
        );
    layer.addTo(map);

    // 점 이동 애니메이션 함수
    function animateMarker() {
        // point source 좌표 갱신
        layer.getSource().setData(new ktGms.geometry.PointGeo([
            center[0] + Math.cos(performance.now() / 1000) * radius,
            center[1] + Math.sin(performance.now() / 1000) * radius
        ],{}));

        // 애니메이션 실행(프레임 갱신)
        requestAnimationFrame(animateMarker);
    }

    // 애니메이션 실행
    animateMarker();
});