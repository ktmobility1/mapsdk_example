import ktGms from "kt-map-sdk-js";

let map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 17,
    maxPitch: 68
});

// 이동할 좌표들 선언
const destination = [
    [127.106357, 37.513864], // kt송파 사옥
    [127.029414, 37.471401], // kt우면연구개발센터
    [127.114931, 37.358817], // kt분당 사옥
    [126.978916, 37.572020]  // kt광화문 사옥
];

for(let i=1; i<=4;i++){
    // HTML에서 선언한 버튼 접근
    document.getElementById("fly"+i).addEventListener("click", () => {
        // flyTo 함수를 활용해 선언한 destination 중 하나의 좌표로 이동
        map.flyTo({
            center: destination[i-1],
            essential: true,
            zoom: 17
        });
    });
}
