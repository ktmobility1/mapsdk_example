import ktGms from "kt-map-sdk-js";

let map:ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68,
    pitch: 50
});

// data를 받아오는 비동기 함수
async function getData(url:string):Promise<any>{
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

map.on("load", () => {
    let geojson:Promise<any> = getData("https://map.gis.kt.com/mapsdk/data/lineData.geojson");
    geojson
    .then((data) => {
        // 전체 좌표 array로 저장
        const coordinates:number[] = data.features[0].geometry.coordinates;
        data.features[0].geometry.coordinates = [coordinates[400]];

        // lineString Geometry 스타일 지정
        let style:ktGms.style.LineStyle = new ktGms.style.LineStyle( 
            {
                "line-color": "red", //라인 색상 
                "line-opacity": 0.75, //라인 투명도
                "line-width": 5 //라인 두께
            }, {}
        );

        // LineString GeoJSONSource 생성
        let source = new ktGms.source.GeoJSONSource("trace", {
            data: data
        });  

        // map에 layer 추가
        map.addLayer(new ktGms.layer.LineLayer("trace_layer", style, source))

        // 카메라 시점 이동
        map.jumpTo({"center": new ktGms.utils.LngLat(coordinates[400][0], coordinates[400][1]), "zoom": 14, "pitch" : 50});

        // setInterval 함수를 통해 시간 간격을 두고 source에 좌표 추가 + 카메라 시점 이동
        let i:number = 400;
        const timer = window.setInterval(() => {
            if (i < coordinates.length) {
                // source에 좌표 추가
                data.features[0].geometry.coordinates.push(
                    coordinates[i]
                );
                (map.getSource("trace") as ktGms.source.GeoJSONSource).setData(data);

                // 카메라 시점 이동
                map.panTo(new ktGms.utils.LngLat(coordinates[i][0], coordinates[i][1]));
                i++;
            } else {
                window.clearInterval(timer);
            }
        }, 50);
    })
    .catch((e) => console.error(e.message))
    
});