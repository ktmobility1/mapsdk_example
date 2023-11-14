import ktGms from "kt-map-sdk-js";

//지도를 생성합니다
const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.013412, 37.6763370],
    zoom: 9,
    maxPitch: 68,
    bearing: 70,
    navigationControl: true
});

map.on("load", () => {
    //소스 데이터를 추가합니다
    map.addSource("line-data", new ktGms.source.GeoJSONSource("line-data",{
        data: "https://map.gis.kt.com/mapsdk/data/lineData.geojson",
        lineMetrics: true
    }));

    //라인 레이어 생성 후 추가합니다
    const lineLayer = new ktGms.layer.LineLayer(
        "lineLayer",
        new ktGms.style.LineStyle(
            {
                "line-width": 14, //라인 굵기
                "line-gradient": [ //라인 그라데이션
                    "interpolate",
                    ["linear"],
                    ["line-progress"],
                    0, "blue",
                    0.1, "royalblue",
                    0.3, "cyan",
                    0.5, "lime",
                    0.7, "yellow",
                    1, "red"
                ]
            },
            {
                "line-cap": "round",
                "line-join": "round"
            }),
        "line-data"
    )
    map.addLayer(lineLayer);
})