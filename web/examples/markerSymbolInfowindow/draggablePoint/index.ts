import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68,
    navigationControl: true,
});

//지도 canvas를 받아옵니다
const canvas = map.getCanvasContainer();

//point 좌표 source를 생성합니다
let source = new ktGms.geometry.PointGeo([127.029414, 37.471401]);

//point style을 설정합니다
let style = new ktGms.style.CircleStyle(
    {
        "circle-radius": 10, 
        "circle-color": "#3887be"
    }, 
    {
        "visibility": "visible"
    }
)

//드래그 끝났을 때 띄울 infowindow를 선언합니다
let infoWindow:ktGms.overlay.InfoWindow;

//포인트를 마우스로 클릭 중일 때 수행할 함수입니다. 
//포인트를 마우스로 드래그하여 옮길 수 있습니다.
function onMove(e) {
    const coords = e.lngLat;
    canvas.style.cursor = "grabbing";
    source["coordinates"] = [coords.lng, coords.lat];
    map.getSource("pointSource").setData(source)
}

//포인트에서 마우스 뗄 때 수행할 함수입니다.
//포인트의 좌표를 InfoWindow로 나타냅니다.
function onUp(e) {
    canvas.style.cursor = "";
    const coords = e.lngLat;

    infoWindow = 
        new ktGms.overlay.InfoWindow().setLngLat(coords)
            .setHTML(`Longitude: ${coords.lng}<br />Latitude: ${coords.lat}`)
    infoWindow.addTo(map);

    map.off("mousemove", onMove);
};

//지도가 로드된 후 수행합니다.
map.on("load", () => {
    //포인트 좌표를 추가합니다
    map.addSource("pointSource", {
        "type": "geojson",
        "data": source,
    });

    //지도에 포인트 레이어를 추가합니다
    map.addLayer(new ktGms.layer.PointLayer("point", style, "pointSource"));

    //포인트 레이어 위에 마우스를 올렸을 때 수행할 동작을 설정합니다
    map.onLayer("mouseenter", "point", () => {
        map.setPaintProperty("point", "circle-color", "#3bb2d0");
        canvas.style.cursor = "move";
    });

    //포인트 레이어에서 마우스를 뗄 때 수행할 동작을 설정합니다.
    map.onLayer("mouseleave", "point", () => {
        map.setPaintProperty("point", "circle-color", "#3887be");
        canvas.style.cursor = "";
    });

    //포인트 레이어를 마우스로 클릭했을 때 수행할 동작을 설정합니다.
    map.onLayer("mousedown", "point", (e) => {
        // Prevent the default map drag behavior.
        e.preventDefault();

        canvas.style.cursor = "grab";
        if (infoWindow) infoWindow.remove();

        map.on("mousemove", onMove);
        map.once("mouseup", onUp);
    });
});