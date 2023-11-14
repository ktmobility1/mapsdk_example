import ktGms from "kt-map-sdk-js";
import { createDonutChart } from "./createCustomCluster.js";

//지도를 생성합니다
const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 10,
    maxPitch: 68,
    navigationControl: true,
});

//데이터를 구분하기 위해 properties의 mag 값을 기준으로 데이터를 나누고 색상을 설정합니다
const mag1 = ["<", ["get", "mag"], 2];
const mag2 = ["all", [">=", ["get", "mag"], 2], ["<", ["get", "mag"], 3]];
const mag3 = ["all", [">=", ["get", "mag"], 3], ["<", ["get", "mag"], 4]];
const mag4 = ["all", [">=", ["get", "mag"], 4], ["<", ["get", "mag"], 5]];
const mag5 = [">=", ["get", "mag"], 5];
const colors = ["#70a1ff", "#246fff", "#0057ff", "#0045cb", "#002d84"];

map.on("load", () => {
    // 소스 데이터를 추가합니다
    map.addSource("custom-cluster-source", new ktGms.source.GeoJSONSource("custom-cluster-source", {
        data: "https://map.gis.kt.com/mapsdk/data/clusterSample.geojson",
        cluster: true,
        clusterRadius: 80,
        clusterMaxZoom: 14,
        clusterProperties: {
            "mag1": ["+", ["case", mag1, 1, 0]],
            "mag2": ["+", ["case", mag2, 1, 0]],
            "mag3": ["+", ["case", mag3, 1, 0]],
            "mag4": ["+", ["case", mag4, 1, 0]],
            "mag5": ["+", ["case", mag5, 1, 0]]
        }
    }));

    //클러스터 되지 않은 데이터를 원 모양의 레이어로 추가합니다
    map.addLayer(
        new ktGms.layer.PointLayer(
            "custom-cluster-circle",
            new ktGms.style.CircleStyle({
                "circle-color": [ //원 색상을 source의 mag값에 따라 다르게 설정합니다
                    "case",
                    mag1, colors[0], //mag < 2 이면 "#70a1ff"
                    mag2, colors[1], // 2 <= mag < 3 이면 "#246fff"
                    mag3, colors[2], // 3 <= mag < 4 이면 "#0057ff"
                    mag4, colors[3], // 4 <= mag < 5 이면 "#0045cb"
                    colors[4] // mag >= 5 이면 "#002d84"
                ],
                "circle-opacity": 0.6, //원 투명도
                "circle-radius": 12 //원 크기
            },{}),
            "custom-cluster-source",
            "",
            { filter: ["!=", "cluster", true] } //cluster가 되지 않은 것들만 표시 되도록 필터
        )
    );

    //클러스터 되지 않은 데이터를 표출할 symbol 레이어를 추가합니다
    map.addLayer(new ktGms.layer.PointLayer(
        "custom-cluster-label",
        new ktGms.style.SymbolStyle({
            "text-color": [ "case", ["<", ["get", "mag"], 3], "black", "white" ] // 글자 색상이 mag값이 3 미만이면 black, 이상이면 white
        },{
            "text-field": [ //symbol 글자 
                "number-format",
                ["get", "mag"], // source의 mag값을 글자로 표시
                {"min-fraction-digits": 1, "max-fraction-digits": 1}
            ],
            "text-size": 10 //글자 크기
        }),
        "custom-cluster-source",
        "",
        { filter: ["!=", "cluster", true] } //cluster가 되지 않은 것들만 표시 되도록 필터
    ));

    //커스텀 클러스터 (마커)
    const markers = {}; //총 마커
    let markersOnScreen = {}; //화면에 보이는 마커

    //지도 움직일 때마다 마커를 업데이트 해줄 함수
    function updateMarkers() {
        const newMarkers = {};
        const features = map.querySourceFeatures("custom-cluster-source");
        for (let i = 0; i < features.length; i++) {
            const property = features[i].properties;
            const coords = features[i].geometry.coordinates;
            if (!property.cluster)
                continue;
            const id = property.cluster_id;
            let marker = markers[id];
            if (!marker) {
                const el = createDonutChart(property, colors);
                marker = markers[id] = new ktGms.overlay.Marker({
                    element: el,
                    lngLat: coords
                });
            }
            newMarkers[id] = marker;
            if (!markersOnScreen[id])
                marker.addTo(map);
        }
        for (let id in markersOnScreen) {
            if (!newMarkers[id])
                markersOnScreen[id].remove();
        }
        markersOnScreen = newMarkers;
    }

    //데이터가 로드되면, 커스텀 마커가 로딩되도록 합니다. 
    map.on("data", (e) => {
        if (e.sourceId !== "custom-cluster-source" || !e.isSourceLoaded) return;
        map.on("move", updateMarkers);
        map.on("moveend", updateMarkers);
        updateMarkers();
    });
});
