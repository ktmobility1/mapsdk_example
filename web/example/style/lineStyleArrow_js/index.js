import ktGms from "kt-map-sdk-js";

//지도를 생성합니다
const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.243795, 37.654669],
    zoom: 16,
    maxPitch: 68
});

map.on("load", () => {
    //"route" 이름으로 경로 좌표 저장
    map.addSource("route", new ktGms.source.GeoJSONSource("route", {
        data: "https://map.gis.kt.com/mapsdk/data/lineData.geojson",
    }));

    //흰색 라인 레이어
    map.addLayer(new ktGms.layer.LineLayer("background-route", 
        new ktGms.style.LineStyle({
            "line-width": 15, //라인 두께
            "line-color": "#ffffff", //라인 색상
			"line-opacity": 0.8 //라인 투명도
        },{}),
		"route" //"route" 소스 데이터 사용
    ));

    //길 표시 하는 라인 레이어
    map.addLayer(new ktGms.layer.LineLayer("route", 
        new ktGms.style.LineStyle({
            "line-width": 1.5, //라인 두께
            "line-color": "#007cbf" //라인 색상
        },{}),
		"route" //"route" 소스 데이터 사용
    ));

    //화살표 표시하는 SymbolStyle의 라인 레이어
    map.addLayer(new ktGms.layer.LineSymbolicLayer("arrow", 
		new ktGms.style.SymbolStyle(
		{
			"text-color": "#007cbf", //글자 색상
			"text-halo-color": "#007cbf", //글자 그림자 색상
			"text-halo-width": 0.5 //글자 두께
		},
		{
			"visibility": "visible",
			"text-field": "<", //화살표로 사용할 글자
			"text-size": 12, //글자 크기
			"text-rotation-alignment": "map", //map이 회전될 때 text도 map과 같이 회전되도록 
			"symbol-placement": "line", //글자 위치 : 라인 위에 위치
			"symbol-spacing": 180 //180px 간격으로 심볼이 라인 위에 반복적으로 나타나도록 설정
		}),
		"route" //"route" 소스 데이터 사용
	))
});
