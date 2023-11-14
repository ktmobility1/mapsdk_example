import ktGms from "kt-map-sdk-js";

let map:ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.004165, 37.5217105], // 중간 좌표
    zoom: 11.5, 
    maxPitch: 68
});

// kt연구개발센터 사옥
const origin:number[] = [127.029414, 37.471401];

// kt광화문 사옥
const destination:number[] = [126.978916, 37.572020];

let coordinates:number[][] = []; // GeoJSON 객체에 들어가는 좌표 데이터
let animation:number; // 애니메이션 정지 / 시작을 위한 변수
let startTime:number = 0; // 진행 정도 계산을 위한 변수
let progress:number = 0; // 진행 정도 계산을 위한 변수
let resetTime:boolean = false; // 애니메이션 재시작 시 진행 정도 재계산을 위한 변수
const end:number = 8000; // 갱신 속도 계산을 위한 변수(숫자가 작을수록 갱신속도 빠름)
const pauseButton:HTMLButtonElement = document.getElementById("pause") as HTMLButtonElement; // button DOM 접근

// lineString Geometry 스타일 생성
let style:ktGms.style.LineStyle = new ktGms.style.LineStyle( 
    {
        "line-color": "#FF0000", //라인 색상
        "line-width": 5, //라인 두께
        "line-opacity": 0.8 //라인 투명도
    }, {
        "line-cap": "round", //라인 끝 모양
        "line-join": "round" //라인 합쳐질때의 모양
    }
);
      
// LineString을 데이터로 한 GeoJSONSource 생성
let source = new ktGms.source.GeoJSONSource("line", {
    data: new ktGms.geometry.LineString([origin],{})
});  

map.on("load", () => {
    // 선언한 style, source를 포함하는 LineLayer map에 추가
    let layer:ktGms.layer.LineLayer = new ktGms.layer.LineLayer("line-animation", style, source);
    layer.addTo(map);

    // turf 를 사용하여 origin <-> destination 거리 계산
    let route = turf.lineString([origin, destination]);
    let lineDistance = turf.length(route, {units: 'kilometers'});

    // 진행 정도 계산을 위한 startTime 변수 갱신
    startTime = performance.now();

    // 애니메이션 기능 표출을 위한 함수 호출
    animateLine();

    // 애니메이션 정지 / 시작을 위한 버튼 이벤트 생성
    pauseButton.addEventListener("click", () => {
        pauseButton.classList.toggle("pause");
        if (pauseButton.classList.contains("pause")) {
            cancelAnimationFrame(animation);
        } else {
            resetTime = true; // 애니메이션 재시작 체크
            animateLine();
        }
    });

    // 탭을 숨겼을 때 애니메이션 정지를 위한 이벤트 생성
    document.addEventListener("visibilitychange", () => {
        resetTime = true;
    });

    // 애니메이션 구현 함수
    function animateLine() {
        if (resetTime) {
            // 애니메이션 재시작
            startTime = performance.now() - progress;
            resetTime = false;
        } else {
            // 진행도 계산
            progress = performance.now() - startTime;
        }

        if (progress > end) { // 도착 시 초기화
            startTime = performance.now();
            coordinates = [];
            // 좌표를 비우고 지도 업데이트
            (map.getSource("line") as ktGms.source.GeoJSONSource).setData(new ktGms.geometry.LineString(coordinates,{}));
        } else { //turf를 사용하여 origin <-> destination 구간의 step 별 point 좌표 계산
            const segment = turf.along(route, lineDistance * (progress/end), "kilometers");
            coordinates.push(segment.geometry.coordinates);

            // 좌표 기반 지도 업데이트
            (map.getSource("line") as ktGms.source.GeoJSONSource).setData(new ktGms.geometry.LineString(coordinates,{}));
        }
        // 애니메이션 실행(프레임 갱신)
        animation = requestAnimationFrame(animateLine);
    }
});