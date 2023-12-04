import ktGms from "kt-map-sdk-js";

let map = new ktGms.Map({
    container: "map",
    style: "satellite",
    center: [127.017422, 37.49144],
    zoom: 16,
    maxPitch: 68
});