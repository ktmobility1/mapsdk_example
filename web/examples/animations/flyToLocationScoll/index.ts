import ktGms from "kt-map-sdk-js";

let map:ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 17,
    maxPitch: 68,
    pitch: 40,
    bearing: -75
});

interface CameraOptions {
    [key:string] : {
        bearing?: number,
        center?: [number, number],
        zoom?: number,
        pitch?: number
    }
}

// 이동할 위치의 좌표와 카메라 시점
const chapters:CameraOptions = {
    "seocho": {
        bearing: -75,
        center: [127.029414, 37.471401],
        zoom: 17,
        pitch: 40
    },
    "bundang": {
        bearing: -50,
        center: [127.114931, 37.358817],
        zoom: 16.5,
        pitch: 40
    },
    "jongno": {
        bearing: -158,
        center: [126.978341, 37.572040],
        zoom: 17,
        pitch: 50
    },
    "songpa": {
        bearing: -160,
        center: [127.106357, 37.513864],
        zoom: 16,
        pitch: 60
    }
};

// scroll event 지정
// scroll event가 발생했을 때 가장 위에 표출되는 chapter를 active 상태로 변경
window.onscroll = function ():void {
    const chapterNames:string[] = Object.keys(chapters);
    for (let i = 0; i < chapterNames.length; i++) {
        const chapterName:string = chapterNames[i];
        if (isElementOnScreen(chapterName)) {
            setActiveChapter(chapterName);
            break;
        }
    }
};

// active chapter 판별용 변수
let activeChapterName:string = "seocho";
// chapter를 active 모드로 변경하는 함수
function setActiveChapter(chapterName:string):void {
    // 해당 chapter가 현재 active 상태인 경우 
    if (chapterName === activeChapterName) return;

    // chapter로 카메라 시점 이동
    map.flyTo(chapters[chapterName]);

    // active chapter 변경
    (document.getElementById(chapterName) as HTMLElement).setAttribute("class", "active");
    (document.getElementById(activeChapterName) as HTMLElement).setAttribute("class", "");
    activeChapterName = chapterName;
}

// 해당 DOM section이 현재 바라보고 DOM 인지 체크
function isElementOnScreen(id:string):boolean {
    // id를 통해 DOM 접근
    const element = document.getElementById(id) as HTMLElement;
    const bounds = element.getBoundingClientRect();
    // DOM section top 이 innerHeight 보다 작아진 경우
    // 보여지는 DOM section list 중 가장 위 컨텐츠
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}