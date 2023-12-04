import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68,
});

//symbol style을 설정합니다
let style = new ktGms.style.SymbolStyle(
    {
        "icon-opacity" : 0.9, //아이콘 투명도
    }, 
    {
        "visibility": "visible",
        "icon-size": 0.2, //아이콘 크기
    },
    //symbol icon url
    "https://map.gis.kt.com/mapsdk/images/cat.png"
);

//지도가 로드된 후 수행합니다.
map.on("load", () => {
    //포인트 좌표를 추가합니다
    const symbolSource = new ktGms.geometry.MultiPoint(
        [[127.029414, 37.471401],
        [127.030334, 37.473301],
        [127.028444, 37.471001],]
    );

    //지도에 포인트 레이어를 추가합니다
    map.addLayer(new ktGms.layer.PointLayer("icon", style, symbolSource));
});