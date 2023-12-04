import ktGms from "kt-map-sdk-js";

//지도를 생성합니다
const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 10,
    maxPitch: 68,
    navigationControl: true,
});

//소스 데이터를 생성합니다
const source = new ktGms.source.GeoJSONSource("animalHospital", {
    data: "https://map.gis.kt.com/mapsdk/data/hospSample.geojson",
    cluster: true,
    attribution: "Animal Hospital Cluster",
    buffer: 128,
    clusterRadius: 200,
    clusterMaxZoom: 14
});

map.on("load", () => {
    //소스 데이터를 추가합니다
    map.addSource("animalHospital", source);

    //클러스터로 묶을 원 모양의 레이어를 추가합니다
    map.addLayer(
        new ktGms.layer.PointLayer(
            //layer id
            "clusters",

            //layer circle style 
            // 데이터 개수가 100개 이하이면, 20px의 파란색 원
            // 데이터 개수가 100개와 500개 사이이면, 30px의 노란색 원
            // 데이터 개수가 500개 이상이면, 40px의 분홍색 원 
            new ktGms.style.CircleStyle({
                "circle-color": [
                    "step",
                    ["get", "point_count"],
                    "#51bbd6",
                    100,
                    "#f1f075",
                    500,
                    "#f28cb1"
                ],
                "circle-radius": [
                    "step",
                    ["get", "point_count"],
                    20,
                    100, 
                    30,
                    500, 
                    40
                ]
            },{}), 

            //layer source id
            "animalHospital", 

            "",

            //layer option
            { filter: ["has", "point_count"] }
        )
    );

    //클러스터 된 데이터 개수를 표출할 symbol 레이어를 추가합니다
    map.addLayer(
        new ktGms.layer.PointLayer(
            "cluster-count",
            new ktGms.style.SymbolStyle({},{
                "text-field": "{point_count_abbreviated}",
                "text-size": 12
            }),
            "animalHospital",
            "",
            { filter: ["has", "point_count"] }
        )
    );

    //클러스터 되지 않은 데이터를 작은 원 모양의 레이어로 추가합니다.
    map.addLayer(
        new ktGms.layer.PointLayer(
            "unclustered-point",
            new ktGms.style.CircleStyle({
                "circle-color": "#11b4da",
                "circle-radius": 5,
                "circle-stroke-width": 1,
                "circle-stroke-color": "#fff"
            },{}),
            "animalHospital",
            "",
            { filter: ["!", ["has", "point_count"]] }
        )
    );

    // 클러스터 된 원 레이어(clusters)을 클릭했을 때 줌인 됩니다
    map.onLayer("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"]
        });
        const clusterId = features[0].properties.cluster_id;

        map.getSource("animalHospital").getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom
                });
            }
        );
    });

    // 클러스터 되지 않은 작은 원(unclustered-point)을 클릭했을 때 InfoWindow로 정보가 표출됩니다
    map.onLayer("click", "unclustered-point", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const name = e.features[0].properties.name;
        const address = e.features[0].properties.address;

        new ktGms.overlay.InfoWindow()
            .setLngLat(coordinates)
            .setHTML(`<h3 style="text-align:center">${name}</h3> ${address}`)
            .addTo(map);
    });

    //클러스터 된 원에 마우스를 올렸을 때 마우스 커서가 포인터로 바뀝니다
    map.onLayer("mouseenter", "clusters", () => {
        map.getCanvas().style.cursor = "pointer";
    });

    //클러스터 된 원에서 마우스를 떠날 때 마우스 커서가 원래대로 바뀝니다
    map.onLayer("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = "";
    });
})
