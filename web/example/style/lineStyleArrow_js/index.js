import ktGms from "kt-map-sdk-js";
//지도를 생성합니다
const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.243795, 37.654669],
    zoom: 16,
    maxPitch: 68
});
const arrowHeadImage = (color) => {
    const param = { "color": color, "size": 16, "rotation": 90 };
    const data = `<svg width='${param.size}' height='${param.size}' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' version='1.1'><polygon fill='${param.color}' stroke='gray' stroke-width='1' points='20,90 50,10 80,90 50,70' transform='rotate(${param.rotation} 50 50)'/></svg>`;
    return new Promise((resolve) => {
        const img = new Image(param.size, param.size);
        img.src = "data:image/svg+xml;base64," + btoa(data);
        img.onload = () => resolve(createImageBitmap(img));
    });
};
map.on("load", async () => {
    const is = await arrowHeadImage("#ff0000");
    map.addImage('arrow-head', is);
    //"route" 이름으로 경로 좌표 저장
    map.addSource("route", new ktGms.source.GeoJSONSource("route", {
        data: "https://map.gis.kt.com/mapsdk/data/lineData.geojson",
    }));
    //흰색 라인 레이어
    map.addLayer(new ktGms.layer.LineLayer("background-route", new ktGms.style.LineStyle({
        "line-width": 15, //라인 두께
        "line-color": "#ffffff", //라인 색상
        "line-opacity": 0.8 //라인 투명도
    }, {}), "route" //"route" 소스 데이터 사용
    ));
    //길 표시 하는 라인 레이어
    map.addLayer(new ktGms.layer.LineLayer("route", new ktGms.style.LineStyle({
        "line-width": 1.5, //라인 두께
        "line-color": "#007cbf" //라인 색상
    }, {}), "route" //"route" 소스 데이터 사용
    ));
    //화살표 표시하는 SymbolStyle의 라인 레이어
    map.addLayer(new ktGms.layer.LineSymbolicLayer("arrow", new ktGms.style.SymbolStyle({}, {
        "visibility": "visible",
        "symbol-placement": "line",
        "icon-image": "arrow-head",
        "symbol-spacing": 70,
        "icon-offset": [0, 0],
    }), "route" //"route" 소스 데이터 사용
    ));
});
