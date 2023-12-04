import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map = new ktGms.Map({
	container: "map",
	style: "normal",
	center: [127.029414, 37.471401],
	zoom: 16,
	maxPitch: 68,
});

map.on("load", () => {

	// 패턴으로 사용할 이미지를 로드합니다
	map.loadImage(
		"https://map.gis.kt.com/mapsdk/images/blackcat.png",
		(err, image) => {
			// 에러 핸들링
			if (err) throw err;

			// 이미지를 "pattern"의 이름으로 추가합니다
			map.addImage("pattern", image);

			// 폴리곤 레이어를 추가합니다
			map.addLayer(
				new ktGms.layer.PolygonLayer(
					//폴리곤 레이어 ID
					"pattern-polygon",

					//폴리곤 레이어를 채울 style
					new ktGms.style.FillStyle(
						{
							"fill-pattern": "pattern" //패턴으로 사용할 이미지의 이름
						},
						{
							"visibility": "visible",
						}
					),

					//폴리곤 좌표 source
					new ktGms.geometry.Polygon(
						[[
							[127.0285028, 37.4718480],
							[127.0285445, 37.4707325],
							[127.0302729, 37.4707581],
							[127.0302293, 37.4719246],
							[127.0285028, 37.4718480],
						]]
					)
				)
			);
		});
});
