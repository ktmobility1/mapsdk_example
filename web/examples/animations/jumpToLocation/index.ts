import ktGms from "kt-map-sdk-js";

let map:ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 17,
    maxPitch: 68
});

// 이동할 좌표들 선언
const destination:Array<[number,number]> = [
    [127.029414, 37.471401], // kt우면연구개발센터
    [127.106357, 37.513864], // kt송파 사옥
    [127.114931, 37.358817], // kt분당 사옥
    [126.978916, 37.572020]  // kt광화문 사옥
];

map.on("load", () => {
    // 각 destination 좌표로 이동
    destination.forEach((position, index) => {
        // setTimeout 함수를 활용해 2초마다 자동적으로 화면 이동
        setTimeout(() => { 
            map.jumpTo({center: position});
            new ktGms.overlay.Marker({
                lngLat: position
            }).addTo(map);
        }, 2000 * index);
    });
});