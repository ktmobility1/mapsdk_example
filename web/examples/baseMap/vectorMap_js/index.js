import ktGms from "kt-map-sdk-js";
const map = new ktGms.Map({
    container: "map",
    style: "https://map.gis.kt.com/mapsdk/data/basicStyle.json",
    center: [127.017422, 37.49144],
    zoom: 16,
    maxPitch: 68
});
const buttons = document.querySelectorAll(".js-button");
const buttonsContainer = document.querySelector(".js-button-list");
const buttonsArray = Array.prototype.slice.call(buttons);
const changeMap = (element) => {
    buttonsArray.forEach(function (button) {
        button.classList.remove("-active");
    });
    element === null || element === void 0 ? void 0 : element.classList.add("-active");
    map.setStyle(`https://map.gis.kt.com/mapsdk/data/${element === null || element === void 0 ? void 0 : element.value}Style.json`);
};
buttonsContainer.addEventListener("click", function (event) {
    let target = event.target;
    if (target === null || target === void 0 ? void 0 : target.classList.contains("js-button")) {
        changeMap(target);
    }
});
