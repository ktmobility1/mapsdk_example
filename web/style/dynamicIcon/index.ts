import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68,
});

//스타일 이미지가 누락되었을 때 수행할 함수입니다. 
map.on("styleimagemissing", (e) => {
    const id = e.id; // 누락된 이미지 아이디

    // 누락된 이미지 아이콘을 생성할 수 있는지 체크합니다
    const prefix = "square-rgb-";
    if (id.indexOf(prefix) !== 0) return;

    // 포인트 좌표 내 color 속성을 가져와서 저장합니다
    const rgb = id.replace(prefix, "").split(",").map(Number);

    const width = 64; // 이미지 크기를 64px * 64px로 설정합니다
    const bytesPerPixel = 4; // 픽셀의 바이트 크기(r,g,b,a)
    const data = new Uint8Array(width * width * bytesPerPixel);

    //color 속성을 rgba값으로 변환합니다
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < width; y++) {
            const offset = (y * width + x) * bytesPerPixel;
            data[offset + 0] = rgb[0]; // red
            data[offset + 1] = rgb[1]; // green
            data[offset + 2] = rgb[2]; // blue
            data[offset + 3] = 255; // alpha
        }
    }
    map.addImage(id, {width, height: width, data});
});

map.on("load", () => {
    //포인트 좌표를 속성정보와 함께 정의합니다
    const pointCoordinates = [
        new ktGms.geometry.PointGeo([127.029414, 37.471401], {
            "color": "255,0,0"
        }),
        new ktGms.geometry.PointGeo([127.031414, 37.472401], {
            "color": "255,209,28"
        }),
        new ktGms.geometry.PointGeo([127.028414, 37.473401], {
            "color": "242,127,32"
        }),  
    ];

    //지도에 포인트 레이어를 추가합니다
    map.addLayer(new ktGms.layer.PointLayer(
        "points",
        new ktGms.style.SymbolStyle({},{
            "icon-image": ["concat", "square-rgb-", ["get", "color"]]
        }),
        pointCoordinates
    ));
});