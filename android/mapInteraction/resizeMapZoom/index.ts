import ktGms from "kt-map-sdk-js";

const mapElement = document.getElementById("map");
const resizeButtons = document.querySelectorAll(".js-button");
const resizeButtonsContainer = document.querySelector(".js-button-list");
const resizeButtonsArray = Array.prototype.slice.call(resizeButtons);

//지도를 생성합니다.
const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68,
});

// 지도 크기 변경 함수
const resizeMap = (element: HTMLButtonElement): void => {
    resizeButtonsArray.forEach(function (button) {
        button.classList.remove("-active");
    });
    element?.classList.add("-active");
    if (mapElement) {
        mapElement.style.width = element.value;
        mapElement.style.height = element.value
    }
    map.resize(); // 컨테이너 크기가 변경된 후 resize() 호출해야 합니다.
};
const bindEvents = (): void => {
    resizeButtonsContainer &&
        resizeButtonsContainer.addEventListener("click", function (event) {
            let target = event.target as HTMLButtonElement;
            if (target?.classList.contains("js-button")) {
                resizeMap(target);
            }
        });
};
bindEvents();
