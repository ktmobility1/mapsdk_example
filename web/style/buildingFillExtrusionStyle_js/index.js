import ktGms from "kt-map-sdk-js";

// 지도를 생성합니다.
const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.101082, 37.511963],
    zoom: 16,
    maxPitch: 68,
    pitch: 60, // 초기 지도의 기울기 60으로 설정
});

const is3D = document.getElementById("switch"); //3D 건물 표시 설정하는 스위치
const swatches = document.getElementById("swatches"); //색상 선택 div
const colors = ["#ffffcc", /* 노란색 */ "#a1dab4", /* 연두색 */ "#41b6c4", /* 하늘색 */];

// 지도 최초 로드 시 3D 건물 가시성 설정합니다.
map.on("load", function () {
    const extrusionLayers = getExtrussionLayers(map); //3D 건물 레이어

    //color 버튼을 추가하고, color 클릭 시 건물 색상이 바뀌도록 설정합니다
    colors.forEach((color) => {
        const swatch = document.createElement("button"); //버튼을 생성합니다
        swatch.style.backgroundColor = color; //버튼의 배경색상을 지정합니다
        //색상 버튼 클릭 시 레이어의 색상을 변경하도록 콜백함수를 지정합니다
        swatch.addEventListener("click", () => {
            changeBuildingColor(map, extrusionLayers, color);
        });
        swatches.appendChild(swatch);
    });

    // switch가 변경되면 checked여부에 따라 3D 건물 가시성 여부를 설정합니다.
    is3D.addEventListener("change", () => {
        if (is3D.checked) {
            switchMap(1, extrusionLayers);
        }
        else {
            switchMap(0, extrusionLayers);
        }
    });
    switchMap(is3D.checked ? 1 : 0, extrusionLayers);
});

//3d 건물 레이어 가져오는 메소드입니다
function getExtrussionLayers(map) {
    return map.getStyle().layers.filter((layer) => { if (layer.type === "fill-extrusion" || layer.metadata === "group:area_3d") return layer; });
}

//opacity 값에 따라 건물을 3d로 보여줄지, 2d로 보여줄지 설정합니다
function switchMap(opacity, layers) {
    switchExtrusionVisibility(map, layers, opacity);
}

//opacity값으로 3D 건물 레이어의 가시성을 설정합니다
function switchExtrusionVisibility(map, layers, opacity) {
    layers.forEach(function (layer) {
        map.setPaintProperty(layer.id, "fill-extrusion-opacity", opacity); //3D 건물 불투명도를 변경합니다
        map.setPaintProperty(layer.id, "fill-extrusion-opacity-transition", { //3D 건물 불투명도를 1ms 동안 애니메이션과 함께 변경합니다
            delay: 0,
            duration: 1000,
        });
    });
}

//선택한 color에 맞게 3D 건물 layer의 색상을 변경합니다
function changeBuildingColor(map, layers, color) {
    layers.forEach((layer) => {
        map.setPaintProperty(layer.id, "fill-extrusion-color", color); //3D 건물 색상을 변경합니다
    });
}
