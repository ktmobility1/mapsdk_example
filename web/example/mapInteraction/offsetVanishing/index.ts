import ktGms from "kt-map-sdk-js";

const center = [127.029414, 37.471401];
const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: center,
    zoom: 16,
    maxPitch: 68,
});

new ktGms.overlay.Marker().setLngLat(center).addTo(map);

type paddingType = {
    [id: string]: number;
};

/*
    사이드바 스타일은 기본적으로 "collapsed" 되어 있으며 CSS 변환을 사용하여 화면 밖으로 밀어냅니다.
    ToggleSidebar() 함수는 요소를 확장하기 위해 요소에서 이 클래스를 제거합니다.
*/
function toggleSidebar(id: string) {
    const elem = document.getElementById(id);
    if (elem) {

        const classes = elem.className.split(" ");
        const collapsed = classes?.indexOf("collapsed") !== -1; // 요소의 클래스 목록에 "collapsed"가 포함되어 있는지 여부
        const padding: paddingType = {};

        if (collapsed) {
            // 요소의 클래스 목록에서 "collapsed" 클래스를 제거하면 다시 확장된 상태로 설정됩니다.
            classes?.splice(classes.indexOf("collapsed"), 1);

            padding[id] = 300; // px 단위로 .sidebar CSS 클래스에 설정된 사이드바의 너비와 일치합니다.
            map.easeTo({
                // padding : { right : 300 } 변경될 때 애니메이션을 적용하여 변경합니다.
                padding,
                duration: 1000, // ms 단위로 사이드바의 CSS 전환 기간 속성이 이 값과 일치합니다.
            });
        } else {
            padding[id] = 0;
            // 요소의 클래스 목록에 "collapsed" 클래스를 추가합니다.
            classes.push("collapsed");

            map.easeTo({
                padding,
                duration: 1000,
            });
        }
        // 요소의 클래스 목록 업데이트
        elem.className = classes.join(" ");
        changeArrow(`${id}-toggle`)
    }
}

map.on("load", () => {
    toggleSidebar("left");
});

document.getElementById("right-toggle")?.addEventListener("click", () => {
    toggleSidebar("right");
});
document.getElementById("left-toggle")?.addEventListener("click", () => {
    toggleSidebar("left");
});

// 화살표의 방향을 바꿔주는 함수입니다.
const changeArrow = (id:string) => {
    let arrow = document.getElementById(id)?.innerText
    document.getElementById(id)!.innerText = ((arrow =="→") ? "←" : "→")
}