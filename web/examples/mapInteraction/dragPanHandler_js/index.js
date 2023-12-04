import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map = new ktGms.Map({
	container: "map",
	style: "normal",
	center: [127.029414, 37.471401],
	zoom: 16,
	maxPitch: 68
});

const isEnable = document.getElementById("switch");

// switch가 변경되면 checked여부에 따라 dragPan 가능여부를 설정합니다.
isEnable?.addEventListener("change", () => {
	if (isEnable.checked) {
		map.dragPan.enable() // switch checked가 true이면 dragPan 활성화
	} else {
		map.dragPan.disable() // switch checked가 false이면 dragPan 비활성화
	}
});
