import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
let map:ktGms.Map = new ktGms.Map({
    container: document.getElementById("map"),
    style: "normal",
    center: [127.017422, 37.49144],
    zoom: 16,
    maxPitch: 68,
});

//지도가 로드되었을 때 PolygonLayer를 추가합니다.
map.on(ktGms.event.MapDefaultEvent.eventName.load, (event:ktGms.event.MapDefaultEvent) => {
    let polygonLayer:ktGms.layer.PolygonLayer = new ktGms.layer.PolygonLayer("trangle", 
    //PolygonLayer에 적용할 스타일을 지정합니다.
    new ktGms.style.FillStyle({
        "fill-color": "#ff0000", // 채우기 색상
        "fill-opacity": 0.6, // 채우기 투명도
    }, {}),
    //PolygonLayer에 적용할 Polygon Geometry 정보를 지정합니다.
    new ktGms.geometry.Polygon([ 
        [
            [127.017422, 37.49144],
            [127.018522, 37.49144],
            [127.018522, 37.49294],
            [127.017422, 37.49144],
        ],
    ], {})).addTo(map);
});
