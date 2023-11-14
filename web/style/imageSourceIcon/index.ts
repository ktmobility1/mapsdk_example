import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68,
});

map.on("load", () => {
    const width = 64; // 이미지 크기를 64px * 64px로 설정합니다
    const bytesPerPixel = 4; // 픽셀의 바이트 크기(r,g,b,a)
    const data = new Uint8Array(width * width * bytesPerPixel);

    //그라데이션 색상의 rgba값으로 변환합니다
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < width; y++) {
            const offset = (y * width + x) * bytesPerPixel;
            data[offset + 0] = (y / width) * 255; // red
            data[offset + 1] = (x / width) * 255; // green
            data[offset + 2] = 128; // blue
            data[offset + 3] = 255; // alpha
        }
    }

    //그라데이션 색상의 데이터를 image로 추가합니다
    map.addImage("gradient", {width, height: width, data});

    //지도에 포인트 레이어를 추가합니다
    map.addLayer(new ktGms.layer.PointLayer(
        "points", //layer id
        new ktGms.style.SymbolStyle(
            {},
            {"icon-image": "gradient"}
        ),
        new ktGms.geometry.PointGeo([127.029414, 37.471401])
    ));
});