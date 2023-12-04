import ktGms from "kt-map-sdk-js";

let map:ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.0469235, 37.4654185],
    zoom: 10,
    maxPitch: 68
});

const origin:number[] = [127.114931, 37.358817] // kt분당 사옥

const destination:number[][] = [
    [127.106357, 37.513864], // kt송파 사옥
    [127.029414, 37.471401], // kt우면연구개발센터
    [126.978916, 37.572020] // kt광화문 사옥
];

// turf를 사용하여 start <-> end point 거리 측정
let route = turf.lineString([origin,...destination]);
const lineDistance:number = turf.lineDistance(route, "kilometers");

// 각 step별 좌표를 저장해 둘 배열 선언
let coordinates:number[][] = [];

// start <-> end point 까지의 총 steps 수
const steps:number = 1000;

// 전체 거리를 step을 기준으로 분할하고 각 points를 coordinates 배열에 저장
for (let i = 0; i <= lineDistance; i += lineDistance / steps) {
    const segment = turf.along(route, i, "kilometers");
    coordinates.push(segment.geometry.coordinates);
}

// route에 분할된 좌표들 저장
route.geometry.coordinates = coordinates;

// 애니메이션 진행 정도를 판별하기 위한 변수
let counter:number = 0;

map.on("load", () => {
    // point geometry 객체 선언
    let point_geometry:ktGms.geometry.PointGeo = new ktGms.geometry.PointGeo(origin,{});

    // route 표출을 위한 LineLayer 추가
    map.addLayer(
        new ktGms.layer.LineLayer(
            "route", 
            new ktGms.style.LineStyle({
                "line-width": 2, //라인 두께
                "line-color": "#007cbf" //라인 색상
            },{}),
            route.geometry
    ));

    // 움직이는 point 표출을 위한 SymbolStyle을 적용한 PointLayer 추가
    map.addLayer(new ktGms.layer.PointLayer("point", 
            new ktGms.style.SymbolStyle({},{
                "icon-size": 0.1, //아이콘 크기
                "icon-rotate": ["get", "bearing"], //아이콘 회전 각도
                "icon-rotation-alignment": "map", //아이콘 회전 유형
                "icon-overlap": "always", 
                "icon-ignore-placement": true}, 
                "https://map.gis.kt.com/mapsdk/images/car.png" //아이콘 url
            ),
            point_geometry
        )
    );

    // 애니메이션 구현 함수
    function animate() {
        // counter index에 해당하는 좌표로 point 저장
        point_geometry.coordinates = route.geometry.coordinates[counter];

        // turf를 사용하여 point GeoJSON 객체에 저장된 bearing 값에 맞게 회전
        // 시작점과 끝점은 bearing 계산 제외
        point_geometry.properties.bearing = turf.bearing(
            turf.point(
                route.geometry.coordinates[
                    counter >= steps ? counter - 1 : counter
                ]
            ),
            turf.point(
                route.geometry.coordinates[
                    counter >= steps ? counter : counter + 1
                ]
            )
        );

        // 지도 갱신
        (map.getSource("point_source") as ktGms.source.GeoJSONSource).setData(point_geometry);

        // 끝점에 도달하지 않은 경우 다음 프레임 실행
        if (counter < steps) {
            requestAnimationFrame(animate);
        }

        counter = counter + 1;
    }

    // HTML파일에서 선언한 버튼 접근
    (document
        .getElementById("replay") as HTMLButtonElement)
        .addEventListener("click", () => {
            // 다시 시작점으로 좌표 이동
            point_geometry.coordinates = origin;

            // 지도 갱신
            map.getSource("point_source").setData(point_geometry);

            // counter 변수 초기화
            counter = 0;

            // 애니메이션 함수 재실행
            animate();
        });

    // 애니메이션 실행(프레임 갱신)
    animate();
});