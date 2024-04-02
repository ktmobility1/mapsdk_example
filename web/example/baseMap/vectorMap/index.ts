import ktGms from "kt-map-sdk-js";

const map = new ktGms.Map({
    container: "map",
    style: "https://ktmobility1.github.io/mapsdk_example/map_resource/maptiler/basicStyle.json",
    center: [127.017422, 37.49144],
    zoom: 16,
    maxPitch: 68
});

const buttons = document.querySelectorAll(".js-button");
const buttonsContainer = document.querySelector(".js-button-list");
const buttonsArray = Array.prototype.slice.call(buttons);

const changeMap = (element: HTMLButtonElement): void => {
    buttonsArray.forEach(function (button) {
        button.classList.remove("-active");
    });
    element?.classList.add("-active");
    map.setStyle(`https://ktmobility1.github.io/mapsdk_example/map_resource/maptiler/${element?.value}Style.json`)
};

buttonsContainer.addEventListener("click", function (event) {
  let target = event.target as HTMLButtonElement;
  if (target?.classList.contains("js-button")) {
    changeMap(target);
  }
});