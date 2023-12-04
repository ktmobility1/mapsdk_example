import ktGms from "kt-map-sdk-js";

const map = new ktGms.Map({
	container: "map",
	style: "normal", 
	center: [127.017422, 37.49144],
	zoom: 8,
	maxPitch: 68,
	navigationControl: true
});

map.on(ktGms.event.MapDefaultEvent.eventName.load, () => {
	// 동물병원 데이터를 추가합니다
	const source = new ktGms.source.GeoJSONSource("hosp", {
		data: "https://map.gis.kt.com/mapsdk/data/hospSample.geojson"
	})
	map.addSource("hosp", source);

	// 6~15 레벨까지 동물병원 데이터를 히트맵 스타일로 표현합니다
	const heatmapStyle = new ktGms.style.HeatmapStyle(
		// HeatmapStylePaint
		{
			//히트맵 강도 : 줌레벨 6~15일때 강도 1 , 줌레벨 15~ 일때 강도 3
			"heatmap-intensity": [
				"interpolate", ["linear"], ["zoom"], 6, 1, 15, 3
			],
			//히트맵 색상
			"heatmap-color": [
				"interpolate", ["linear"], ["heatmap-density"],
				0, "rgba(33,102,172,0)",
				0.2, "rgb(103,169,207)",
				0.4, "rgb(209,229,240)",
				0.6, "rgb(253,219,199)",
				0.8, "rgb(239,138,98)",
				1, "rgb(178,24,43)"
			],
			//히트맵 포인트의 반지름 : 줌레벨 6~15일때 반지름 2, 줌레벨 15~ 일때 반지름 20
			"heatmap-radius": [
				"interpolate", ["linear"], ["zoom"], 6, 2, 15, 20
			],
			//히트맵 불투명도 : 줌레벨 6~15일때 불투명도 1, 줌레벨 15~ 일때 불투명도 0.1
			"heatmap-opacity": [
				"interpolate", ["linear"], ["zoom"], 13, 1, 15, 0.1
			]
		},
		{
			"visibility": "visible",
		}
	)

	//히트맵 스타일의 포인트 레이어를 지도에 추가합니다
	new ktGms.layer.HeatmapLayer("heatmapLayer", heatmapStyle, source).addTo(map)
});