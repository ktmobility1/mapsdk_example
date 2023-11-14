import ktGms from "kt-map-sdk-js";

const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.09634, 37.51145],
    zoom: 16,
    maxPitch: 68,
});

// POI 장소를 찾는 비동기 함수입니다. 
const poiSearch = async (poi_id) => {
    // 헤더를 설정합니다
    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("Accept-Language", "ko-KR");
    requestHeaders.set("Authorization", "Bearer 9886c37a33aca43c88541d669306b8fc431a710760ba0982c524eb30223ecbf657f880a9");

    // POI Search API를 호출합니다
    const response = await fetch(`https://gis.kt.com/search/v1.0/pois/${poi_id}?mode=NAVIGATION`, { method: "Get", headers: requestHeaders });
    const data = await response.json();

    // 찾은 데이터가 없다면 공백을 리턴합니다
    if (data.pois.length === 0) {
        return "";
    }

    // poi 변수에 데이터를 저장합니다
    const poi = data.pois[0];
    const homepage = poi.extension && poi.extension.homepageURL ? poi.extension.homepageURL : "";
    const roadAddress = poi.address.siDo + " " + poi.address.siGunGu + " " + poi.address.street + " " + poi.address.streetNumber;
    const landAddress = poi.address.eupMyeonDong + " " + poi.address.houseNumber;
    const photoURL = poi.extension && poi.extension.photoURL ? poi.extension.photoURL : "";

    // InfoWindow에 들어갈 HTML 내용을 리턴합니다
    return `
        <div>
            <div style="font-weight:bold;">${poi.name}</div>
            <hr></hr>
            <div style="display:flex">
                <div>
                    <div class="info">
                        <span class="kind">${poi.category.masterName}</span>
                        <span class="tel"></span>
                        <a href="${homepage}" target="_blank" class="web" style="display:${homepage === "" ? "none" : "inline"}">홈페이지</a>
                    </div>
                    <div class="address">${roadAddress}</div>
                    <div class="address">
                        <span style="background-color:#777; color:white; margin-right:2px; padding:2px; border-radius:4px;">지번</span>${landAddress}
                    </div>
                </div>
                <div style="width:8px"></div>
                <div>
                    <img src="${photoURL}" alt="" style="width: 64px; height: 64px; border-radius: 12px;"/>
                </div>
            <div>
        </div>
    `
}

// POI 라벨 위에서 마우스 커서가 포인터로 되게 합니다
map.onLayer("mousemove", "poi_label", async (e) => {
    const features = map.queryRenderedFeatures(e.point);
    const pois = features.filter((info) => info.layer.id === "poi_label");
    if (pois.length > 0) {
        map.getCanvas().style.cursor = "pointer";
    }
    else {
    }
})

// POI 라벨에서 마우스가 떠날 때 커서가 grab으로 되게 합니다
map.onLayer("mouseleave", "poi_label", async (e) => {
    map.getCanvas().style.cursor = "grab";
})

// POI 라벨을 클릭했을 때 POI Search API를 호출하여 해당 장소에 대한 정보를 받아와서 InfoWindow로 표출합니다
map.onLayer("click", "poi_label", async (e) => {
    const features = map.queryRenderedFeatures(e.point);
    const pois = features.filter((info) => info.layer.id === "poi_label");
    if (pois.length > 0) {
        const htmlStr = await poiSearch(pois[0].properties.poi_id);
        new ktGms.overlay.InfoWindow().setLngLat(e.lngLat).setHTML(htmlStr).addTo(map);
    }
});
