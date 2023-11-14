import ktGms from "kt-map-sdk-js";

let map:ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 17,
    maxPitch: 68,
    pitch: 60,
    interactive: false // 기존 mouse, touch, keyboard listener 작동 X
});

// 위, 아래 방향키를 눌렀을 때 지도 pan 동작 픽셀값
const deltaDistance:number = 100;

// 좌, 우 방향키를 눌렀을 때 지도 rotate 동작 각도
const deltaDegrees:number = 25;

// panBy, easeTo 함수에 option으로 사용할 easing 값 보정 함수
function easing(t:number):number {
    return t * (2 - t);
}

//className 이름의 속성값 변경하는 함수
const adjustAttribute = (className:string, status:string) => {
    (document.getElementById(className) as HTMLElement).setAttribute("class", status);
}

map.on("load", () => {
    // 키보드 이벤트 테스트를 위한 focus 지정
    map.getCanvas().focus();
    map.changeExtrusionOpacity(0.8) // 입체건물의 불투명도 0.8로 변경

    // keydown event 지정
    map.getCanvas().addEventListener(
        "keydown",
        (e:KeyboardEvent) => {
            e.preventDefault();
            let keyValue:number = e.keyCode || e.which || 0;
            if (keyValue === 38) { // 키보드 위 방향키
                adjustAttribute("table_button_up", "active");
                map.panBy([0, -deltaDistance], {
                    easing
                });
            } else if (keyValue === 40) { // 키보드 아래 방향키
                adjustAttribute("table_button_down", "active");
                map.panBy([0, deltaDistance], {
                    easing
                });
            } else if (keyValue === 37) { // 키보드 왼쪽 방향키
                adjustAttribute("table_button_left", "active");
                map.easeTo({
                    bearing: map.getBearing() - deltaDegrees,
                    easing
                });
            } else if (keyValue === 39) { // 키보드 오른쪽 방향키
                adjustAttribute("table_button_right", "active");
                map.easeTo({
                    bearing: map.getBearing() + deltaDegrees,
                    easing
                });
            }
        },
        true
    );
    
    // keyup event 지정
    map.getCanvas().addEventListener(
        "keyup",
        (e:KeyboardEvent) => {
            e.preventDefault();
            let keyValue:number = e.keyCode || e.which || 0;
            if (keyValue === 38) { adjustAttribute("table_button_up", "") } // 키보드 위 방향키
            else if (keyValue === 40) { adjustAttribute("table_button_down", "") } // 키보드 아래 방향키
            else if (keyValue === 37) { adjustAttribute("table_button_left", "") } // 키보드 왼쪽 방향키
            else if (keyValue === 39) { adjustAttribute("table_button_right", "") }// 키보드 오른쪽 방향키
        },
        true
    );
});