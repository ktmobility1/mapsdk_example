import ktGms from "kt-map-sdk-js";

// 지도를 생성합니다.
const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [126.990368, 37.550696],
    zoom: 10,
    maxPitch: 68,
})

let clickedStateId: number | null = null; //선택된 구역의 id

map.on("load", () => {
    // 서울시 행정동 구역의 geoJson 데이터로 소스를 생성합니다.
    const source = new ktGms.source.GeoJSONSource("states", {
        data: "https://map.gis.kt.com/mapsdk/data/seoul_event.geojson",
        generateId: true,
    });

    // PolygonLayer를 채울 스타일을 설정합니다
    const fillStyle = new ktGms.style.FillStyle(
        {
            "fill-color": "#4ba3e3", //색상
            "fill-opacity": [ //불투명도
                "case", ["boolean", ["feature-state", "click"], false], 1, 0.3 //"feature-state"의 click 상태가 true이면 불투명도 1, false이면 불투명도 0.3
            ],
        },
        {}
    );

    // 서울시 행정동 구역 데이터로 Polygon Layer를 추가합니다.
    const layer = new ktGms.layer.PolygonLayer("state-fills", fillStyle, source);
    layer.addTo(map);

    //lineStyle 정의합니다.
    const lineStyle = new ktGms.style.LineStyle(
        {
            "line-color": "#4ba3e3", //라인 색상
            "line-width": 2, //라인 두께
        },
        {}
    );

    // 서울시 행정동 구역 데이터로 Line Layer를 추가합니다.
    const lineLayer = new ktGms.layer.LineLayer("state-borders", lineStyle, source)
    lineLayer.addTo(map);

    // "state-fills" 폴리곤 레이어 위로 마우스를 클릭했을 때 실행할 함수를 설정합니다
    map.onLayer("click", "state-fills", (e: any) => {
        // 마우스 아래의 Feature에 대한 "feature-state"입니다.
        if (e.features.length > 0) {
            // 행정동 정보가 포함된 infoWindow를 표시합니다.
            new ktGms.overlay.InfoWindow().setLngLat(e.lngLat).setHTML(e.features[0].properties.adm_nm).addTo(map);

            // 이전에 클릭했던 구역은 false로 수정
            if (clickedStateId == 0 || clickedStateId) {
                map.setFeatureState({ source: "states", id: clickedStateId }, { click: false });
            }

            // 새로 클릭한 구역은 true로 수정
            clickedStateId = e.features[0].id;
            map.setFeatureState({ source: "states", id: clickedStateId }, { click: true });
        }
    });
});
