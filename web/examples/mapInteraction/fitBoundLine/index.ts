import ktGms from "kt-map-sdk-js";

const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.031984, 37.471458],
    zoom: 12,
    maxPitch: 68,
});

// LineString 좌표
const coordinates = [
    [127.038419, 37.474926], [127.037368, 37.474841],
    [127.036268, 37.474287], [127.034916, 37.473849],
    [127.033273, 37.473261], [127.032411, 37.472542],
    [127.031081, 37.471456], [127.029906, 37.470107],
    [127.028575, 37.468467], [127.028876, 37.466969],
];

map.on("load", () => {
    // LineString Source를 추가합니다
    map.addSource("LineString", 
        new ktGms.source.GeoJSONSource("LineString",{data: new ktGms.geometry.LineString(coordinates)})
    );
    
    // Line Layer를 추가합니다
    map.addLayer(new ktGms.layer.LineLayer(
        "LineString", 
        new ktGms.style.LineStyle({
            "line-color": "#F7455D",
            "line-width": 7,
        },{
            "line-join": "round",
            "line-cap": "round",
        }),
        "LineString"
    ));
});

document?.getElementById("zoomto")?.addEventListener("click", (): void => {
    // LineString의 첫 번째 좌표를 "lngLatBounds"에 전달하고 각 좌표 쌍을 "extend"로 래핑하여 경계 결과에 포함시킵니다.
    // 이 기술의 변형은 여러 점 또는 다각형 형상의 경계를 확대/축소하는 데 적용될 수 있습니다.
    // 확장 방법으로 모든 좌표를 래핑하면 됩니다.
    const bounds = coordinates.reduce((bounds, coord): any => {
        return bounds.extend(coord);
    }, new ktGms.utils.LngLatBounds(coordinates[0], coordinates[0]));

    map.fitBounds(bounds, {
        padding: 20,
    });
});
