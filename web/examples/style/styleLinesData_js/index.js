import ktGms from "kt-map-sdk-js";

//지도를 생성합니다
const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68,
    navigationControl: true
});

map.on(ktGms.event.MapDefaultEvent.eventName.load, () => {
    //LineString[] 타입의 소스 데이터를 생성합니다 
    const sourceData = [
        new ktGms.geometry.LineString(
            [
                [ 127.02897812, 37.4719304 ], 
                [ 127.02941466, 37.4719892 ],
                [ 127.02987133, 37.4718400 ], 
                [ 127.02987133, 37.4718400 ], 
                [ 127.03008536, 37.4716460 ],
                [ 127.03012653, 37.4713922 ], 
                [ 127.03004594, 37.4709072 ], 
            ],
            { "color": "#F7455D" } //빨강색
        ),
        new ktGms.geometry.LineString(
            [
                [ 127.0285449, 37.4714457 ],
                [ 127.0285664, 37.4712115 ],
                [ 127.0286361, 37.4710497 ],
                [ 127.0288507, 37.4708326 ],
                [ 127.0291511, 37.4707346 ],
                [ 127.0294622, 37.4707176 ],
                [ 127.0296929, 37.4707644 ],
                [ 127.0298056, 37.4708326 ]
            ],
            { "color": "#33C9EB" } //파란색
        ),
    ];

    //라인 레이어 생성 후 추가합니다
    const lineLayer = new ktGms.layer.LineLayer(
        "lineLayer",
        new ktGms.style.LineStyle(
            {
                "line-width": 5, //라인 두께
                "line-color": ["get", "color"] //라인 색상 (source property의 color 속성 가져와서 지정)
            }, {}),
        sourceData
    );
    map.addLayer(lineLayer);
});