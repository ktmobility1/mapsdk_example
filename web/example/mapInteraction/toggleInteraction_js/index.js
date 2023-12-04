import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map = new ktGms.Map({
	container: "map",
	style: "normal",
	center: [127.029414, 37.471401],
	zoom: 16,
	maxPitch: 68
});

// listing-group이 변경되면 checked여부에 따라 각 핸들러의 가능여부를 설정합니다.
document?.getElementById("listing-group")?.addEventListener("change", e => {
	const handler = e.target
	if (handler.checked) {
		map[handler.id].enable(); // checked가 true이면 해당 핸들러 활성화
	} else {
		map[handler.id].disable(); // checked가 false이면 해당 핸들러 비활성화
	}
});
