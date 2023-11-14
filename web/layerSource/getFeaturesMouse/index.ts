import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
let map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.017422, 37.49144],
    zoom: 16,
    maxPitch: 68
});

//지도에 mousemoveEvent를 추가합니다.
map.on(ktGms.event.MapMouseEvent.eventName.mousemove, (e: ktGms.event.MapMouseEvent) => {
    //queryRenderedFeatures 메소드를 사용하여 마우스 좌표 지점의 features을 추출합니다.
    const features = map.queryRenderedFeatures(e.point);
    //표출할 속성을 지정합니다.
    const displayProperties:string[] = [
        "type",
        "properties",
        "id",
        "layer",
        "source",
        "sourceLayer",
        "state"
    ];
    //features 배열의 map 메소드를 통해 표출할 속성만 가진 객체로 변환합니다.
    const displayFeatures = features.map((feat:any) => {
        const displayFeat = {};
        displayProperties.forEach((prop:string) => {
            displayFeat[prop] = feat[prop];
        });
        return displayFeat;
    });
    //index.html에서 선언한 <pre id="features"> 태그의 innerHTML을 변경합니다.
    (document.getElementById("features") as HTMLElement).innerHTML = JSON.stringify(
        displayFeatures,
        null,
        2
    );
});