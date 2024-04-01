import ktGms from "kt-map-sdk-js";

//지도를 생성합니다
const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 14,
    maxPitch: 68,
});

const swatches = document.getElementById("swatches"); //색상 선택 div
const layer = document.getElementById("layer"); //레이어 선택 selectbox
const colors = [
    "#ffffcc", //노란색
    "#a1dab4", //연두색
    "#41b6c4", //하늘색
    "#2c7fb8", //파란색
    "#253494", //남색
    "#f2e6ff", //연한 보라색
    "#feb24c", //연한 주황색
    "#fd8d3c", //주황색
    "#f03b20", //다홍색
    "#bd0026" //빨간색
];

map.on("load", () => {
    //색상 버튼을 생성합니다
    colors.forEach((color) => {
        const swatch = document.createElement("button");
        swatch.style.backgroundColor = color; //버튼의 배경색상을 지정합니다

        //색상 버튼 클릭 시 레이어의 색상을 변경하도록 콜백함수를 지정합니다
        swatch.addEventListener("click", () => {
            layer.value == "water" ? changeWaterColor(map, color) : changeBuildingColor(map, color);
        });
        swatches.appendChild(swatch);
    });
})

//물 레이어 색상을 지정한 색상으로 바꾸는 함수입니다
const changeWaterColor = (map, color) => {
    //물 레이어 피쳐를 가져옵니다
    const waterLayers = map.queryRenderedFeatures({layers:["water_poly_308_:1001", "water_poly_313_:1010", "water_poly_312_:1010", "water_poly_311_:1010"]})

    //물 레이어의 색상을 변경합니다
    waterLayers.forEach((water) => {
        map.setPaintProperty(water.layer.id, "fill-color", color);
    });
}

//아파트 건물 레이어 색상을 지정한 색상으로 바꾸는 함수입니다
const changeBuildingColor = (map, color) => {
    //건물 레이어 피쳐를 가져옵니다
    const buildingLayers = map.queryRenderedFeatures({layers:["bld_poly_706_:1142", "bld_poly_713_:1143","bld_poly_714_:1141", "bld_poly_703_:1147", "bld_poly_704_:1148", "bld_poly_705_:1148", "bld_poly_709_:1147"]})

    //건물 레이어 색상을 변경합니다
    buildingLayers.forEach((building) => {
        if(building.layer.type === "fill-extrusion") { //3D 건물 색상 변경
            map.setPaintProperty(building.layer.id, "fill-extrusion-color", color) 
        }
        else if(building.layer.type === "line") { //건물 라인 색상 변경
            map.setPaintProperty(building.layer.id, "line-color", color) 
        }
    });
}
