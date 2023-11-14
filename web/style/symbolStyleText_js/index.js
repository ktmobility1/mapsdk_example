import ktGms from "kt-map-sdk-js";

//지도를 생성합니다
const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 10,
    maxPitch: 68,
});

//symbol style을 설정합니다
const style = new ktGms.style.SymbolStyle(
    {
        "text-color": "#b407b9",
    }, 
    {
        "visibility": "visible",
        "text-field": 
            [
                "format",
                ["get", "FacilityName"],
                { "font-scale": 0.9 },
                "\n",
                {},
                ["get", "Address"],
                { "font-scale": 0.6 }
            ],
    }
);

//포인트 좌표를 속성정보와 함께 정의합니다
const pointCoordinates = [
    new ktGms.geometry.PointGeo([127.029414, 37.471401], {
        "FacilityName": "우면사옥",
        "Address": "서울특별시 서초구 태봉로 151"
    }),
    new ktGms.geometry.PointGeo([126.978916, 37.572020], {
        "FacilityName": "광화문사옥",
        "Address": "서울특별시 종로구 종로3길 33"
    }),
    new ktGms.geometry.PointGeo([127.114931, 37.358817], {
        "FacilityName": "분당사옥",
        "Address": "경기도 성남시 분당구 불정로 90"
    }),
    new ktGms.geometry.PointGeo([127.106357, 37.513864], {
        "FacilityName": "송파사옥",
        "Address": "서울특별시 송파구 잠실로 209"
    }),
];

//지도가 로드된 후 수행합니다
map.on("load", () => {
    //지도에 포인트 레이어를 추가합니다
    map.addLayer(new ktGms.layer.PointLayer("textLayer", style, pointCoordinates));
});
