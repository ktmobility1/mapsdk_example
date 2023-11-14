import ktGms from "kt-map-sdk-js";

let map = new ktGms.Map({
	container: "map",
	style: "normal",
	center: [126.990368, 37.550696],
	zoom: 10,
	maxPitch: 68,
});
let hoveredStateId = null;

map.on("load", () => {
	// 서울시 행정동 구역의 geoJson 데이터로 소스를 생성합니다.
	map.addSource("states", new ktGms.source.GeoJSONSource("states", { data: "https://map.gis.kt.com/mapsdk/data/seoul_event.geojson", generateId: true }))

	// feature의 hover 효과를 만들기 위한 레이어를 추가합니다
	// "feature-state"에 따른 채우기 불투명도 표현식은 hover 효과를 렌더링합니다.
	map.addLayer(
		new ktGms.layer.PolygonLayer(
			"state-fills",
			new ktGms.style.FillStyle({
				"fill-color": "#4ba3e3",
				"fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.3],
			}, {}),
			"states"
		)
	)

	// 서울특별시 행정동 기준으로 나누기 위한 라인 레이어를 추가합니다
	map.addLayer(
		new ktGms.layer.LineLayer(
			"state-borders",
			new ktGms.style.LineStyle({
				"line-color": "#4ba3e3",
				"line-width": 2,
			}, {}),
			"states"
		)
	)

	// 사용자가 상태 채우기 레이어 위로 마우스를 이동하면 hover:true로 만듭니다
	// 마우스 아래의 Feature에 대한 "feature-state"입니다.
	map.onLayer("mousemove", "state-fills", (e) => {
		if (e.features.length > 0) {
			if (hoveredStateId == 0 || hoveredStateId) {
				map.setFeatureState({ source: "states", id: hoveredStateId }, { hover: false });
			}
			hoveredStateId = e.features[0].id;
			map.setFeatureState({ source: "states", id: hoveredStateId }, { hover: true });
		}
	});

	// 마우스가 상태 채우기 레이어를 벗어나면 해당 레이어의 "feature-state"를 hover:false로 업데이트합니다.
	// 이전에 마우스를 올렸던 Feature입니다.
	map.onLayer("mouseleave", "state-fills", () => {
		if (hoveredStateId) {
			map.setFeatureState({ source: "states", id: hoveredStateId }, { hover: false });
		}
		hoveredStateId = null;
	});
});
