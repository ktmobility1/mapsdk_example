import ktGms from "kt-map-sdk-js";

let map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [126.990368, 37.550696],
    zoom: 10,
    maxPitch: 68,
});

map.on("mousemove", (e:ktGms.event.MapMouseEvent) => {
    const features = map.queryRenderedFeatures(e.point);

    // 가독성과 성능을 위해 표시되는 속성 수를 제한합니다.
    const displayProperties = [
        "type",
        "properties",
        "id",
        "layer",
        "source",
        "sourceLayer",
        "state"
    ];

    // 마우스를 올려놓은 지도 요소의 속성을 가져옵니다.
    const displayFeatures = features.map((feat:any) => {
        const displayFeat = { } as any;
        displayProperties.forEach((prop) => {
            displayFeat[prop] = feat[prop];
        });
        return displayFeat;
    });

    if(document.getElementById("features")){
        document.getElementById("features")!.innerText = JSON.stringify(
            displayFeatures,
            null,
            2
        );
    }
    
});