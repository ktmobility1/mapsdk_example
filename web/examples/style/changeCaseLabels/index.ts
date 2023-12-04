import ktGms from "kt-map-sdk-js";

//지도를 생성합니다
const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 10,
    maxPitch: 68,
});

//symbol style을 설정합니다
const style = new ktGms.style.SymbolStyle(
    {
        "text-color": "#000", //글자 색상
        "text-halo-color": "#000", //글자 그림자 색상
        "text-halo-width": 0.3 //글자 그림자 두께
    },
    {
        "visibility": "visible",
        "text-field":
            [
                "format",
                ["upcase", ["get", "FacilityName"]], //소스의 FacilityName 글자는 대문자로 변환
                { "font-scale": 1 },
                "\n",
                {},
                ["downcase", ["get", "Address"]], //소스의 Address 글자는 소문자로 변환
                { "font-scale": 0.7 }
            ],
    }
);

//포인트 좌표를 속성정보와 함께 정의합니다
const pointCoordinates = [
    new ktGms.geometry.PointGeo([127.029414, 37.471401], {
        "FacilityName": "Umyeon",
        "Address": "151, Taebong-ro, Seocho-gu, Seoul, Republic of Korea"
    }),
    new ktGms.geometry.PointGeo([126.978916, 37.572020], {
        "FacilityName": "Gwanghwamun",
        "Address": "33, Jong-ro 3-gil, Jongno-gu, Seoul, Republic of Korea"
    }),
    new ktGms.geometry.PointGeo([127.114931, 37.358817], {
        "FacilityName": "bundang",
        "Address": "90, Buljeong-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea"
    }),  
    new ktGms.geometry.PointGeo([127.106357, 37.513864], {
        "FacilityName": "songpa",
        "Address": "209, Jamsil-ro, Songpa-gu, Seoul, Republic of Korea"
    }), 
];

//지도가 로드된 후 수행합니다
map.on("load", () => {
    //지도에 포인트 레이어를 추가합니다
    map.addLayer(new ktGms.layer.PointLayer("labelLayer", style, pointCoordinates));
});
