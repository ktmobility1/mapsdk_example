import ktGms from "kt-map-sdk-js";

//지도를 생성합니다
const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68
})

//도로 라인 벡터 소스를 생성합니다
const source = new ktGms.source.VectorSource("road-source", {
    tiles: ["https://map.gis.kt.com/vtile/mvt3/ctt/{z}/{x}/{y}.pbf"],
    minzoom: 6,
    maxzoom: 24,
})

//흰색 라인 스타일을 설정합니다
const whiteLineStyle = new ktGms.style.LineStyle(
	{
		"line-color": "#ffffff", //라인 색상
		"line-opacity": 0.9, //라인 투명도 (0이면 투명, 1이면 반투명)
		"line-width": 10 //라인 두께
	},
	{
		"visibility": "visible"
	}
)

//컬러 라인 스타일을 설정합니다. 소스의 road_rank 값에 따라 다른 색상이 나타납니다
const colorLineStyle = new ktGms.style.LineStyle(
	{
		"line-color": 
		[
			"step",
			["get", "road_rank"],
			"#0058ff", //road_rank가 104 이하이면 파란색
			104,
			"#00ff34", //road_rank가 104와 106 사이이면 초록색
			106,
			"#ff0000" //road_rank가 106 이상이면 빨강색
		],
		"line-opacity": 0.8, //라인 투명도
		"line-width": 1.8 //라인 두께
	}, 
	{
		"visibility": "visible"
	}
)

//라인 위에 올릴 심볼 스타일을 설정합니다. 라인의 road_rank 값이 라인 위에 나타납니다
const symbolStyle = new ktGms.style.SymbolStyle(
	{
		"text-color": "#3e3e3e", //글자 색상
		"text-halo-color": "#3e3e3e", //글자 그림자 색상
		"text-halo-width": 0.3 //글자 그림자 두께
	},
	{
		"visibility": "visible",
        "text-field": "{slink_id}", //글자 내용 : 소스의 road_rank 값
		"text-size": 12, //글자 크기
		"symbol-placement": "line-center", //글자 위치 : 라인의 가운데에 위치
	}
)

map.on(ktGms.event.MapDefaultEvent.eventName.load, (event) => {
    //map에 "road-source"라는 ID로 벡터 소스를 추가합니다
    map.addSource("road-source", source);

    //흰색 라인 레이어를 지도에 추가합니다
    const whiteLineLayer = new ktGms.layer.LineLayer("white-line", whiteLineStyle, "road-source", "ctt");
    map.addLayer(whiteLineLayer);

    //컬러 라인 레이어를 지도에 추가합니다
    const colorLineLayer = new ktGms.layer.LineLayer("color-line", colorLineStyle, "road-source", "ctt");
    map.addLayer(colorLineLayer);

    //라인의 id를 텍스트로 표시하는 심볼 레이어를 지도에 추가합니다
    const symbolLayer = new ktGms.layer.LineLayer("symbol", symbolStyle, "road-source", "ctt");
    map.addLayer(symbolLayer);
})
