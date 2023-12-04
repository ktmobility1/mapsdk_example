import ktGms from "kt-map-sdk-js";

let map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [126.98224, 37.573761],
    zoom: 13,
    maxPitch: 68,
});

// 조선시대 5대 궁궐에 대한 geoJson
let source = new ktGms.source.GeoJSONSource("places", {
    data: [
        new ktGms.geometry.PointGeo([126.977041, 37.579617], { description : "<strong>경복궁</strong><p>서울특별시 종로구 사직로 161 (세종로)에 있는 조선시대의 궁궐 중 하나이자 조선의 정궁(법궁)이다. 사적 제117호로 지정받았다. 태조가 조선을 건국하고 한양 천도를 단행하면서 조선 시대에 가장 먼저 지은 궁궐이다.</p>"}),
        new ktGms.geometry.PointGeo([126.9910426, 37.5794309], { description : "<strong>창덕궁</strong><p>조선 - 대한제국시대의 궁궐. 1997년 조선 5대 궁궐 중 유일하게 유네스코 세계유산으로 등재되었다. 서울특별시 종로구 율곡로 99 (와룡동)에 있다.</p>"}),
        new ktGms.geometry.PointGeo([126.994868, 37.578764], { description : "<strong>창경궁</strong><p>서울특별시 종로구 와룡동에 위치한 조선시대의 궁궐. 일제강점기 및 해방 후 40여 년 동안 창경원(昌慶苑)이라는 이름으로 불렸으나 1986년 궁궐 복원에 따라 창경궁으로 환원되었다. 조선시대에는 창덕궁과 연결되어 동궐로 불리면서 실질적으로 하나의 궁궐 역할을 했다.</p>"}),
        new ktGms.geometry.PointGeo([126.968168, 37.571206], { description : "<strong>경희궁</strong><p>서울특별시 종로구 신문로2가에 위치한 조선시대의 궁궐. 사적 제271호이다. 광해군 재위 기에 새로 지은 3궁(인경궁, 자수궁, 경희궁) 중 한 곳이며 인조 시기부터 철종 시기까지 이궁으로 기능했던 곳이다.</p>"}),
        new ktGms.geometry.PointGeo([126.975137, 37.565839], { description : "<strong>덕수궁</strong><p>조선시대의 궁궐이다. 원래 왕가의 별궁인 명례궁이었으나, 임진왜란 직후 행궁으로써 정궁 역할을 했으며, 광해군 때 정식 궁궐로 승격 경운궁이 되었고 대한제국 때는 황궁(皇宮)으로 쓰였다. 1907년 고종 퇴위, 순종 즉위 이후 이름이 덕수궁으로 바뀌었다. 현재 서울특별시 중구 세종대로 99 (정동) 서울특별시청 건너편에 위치해 있다.</p>"}),
    ]
})

map.on("load", () => {
    // geoJson Source를 추가합니다.
    map.addSource("places", source);

    // 심볼 스타일을 추가합니다.
    const style = new ktGms.style.SymbolStyle({},{
        "icon-overlap": "always",
        "icon-size": 0.1,
    }, "https://map.gis.kt.com/mapsdk/data/favicon.ico");

    // 장소를 표시하는 포인트 레이어를 추가합니다.
    const layer = new ktGms.layer.PointLayer("places", style, "places");
    map.addLayer(layer);
    
    // 인포윈도우를 생성하되 아직 지도에 추가하지 마세요.
    const infoWindow = new ktGms.overlay.InfoWindow({
        closeButton: false,
        closeOnClick: false,
    });
    
    // 장소 레이어의 피처에서 mouseenter 이벤트가 발생하면 해당 속성의 설명 HTML과 함께 피처 위치에서 인포윈도우를 엽니다.
    map.onLayer("mouseenter", "places", (e: any) => {
        // 마우스가 장소 레이어 위에 있으면 커서를 포인터로 변경합니다.
        map.getCanvas().style.cursor = "pointer";

        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        infoWindow.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.onLayer("mouseleave", "places", () => {
        // 마우스가 떠날 때 커서를 원상태로 다시 변경합니다.
        map.getCanvas().style.cursor = "";

        // 마우스가 떠날 때 인포윈도우를 제거합니다.
        infoWindow.remove();
    });
});
