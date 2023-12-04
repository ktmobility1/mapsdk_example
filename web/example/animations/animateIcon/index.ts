import ktGms from "kt-map-sdk-js";
import { pulsingDot } from "./makeImage.js";

let map:ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68
});

map.on("load", () => {
    // 애니메이션 도트 객체 생성
    let dot = new pulsingDot({size:50, map:map});

    // 위에서 구현한 도트 객체를 지도에 추가
    map.addImage("pulsing-dot", dot, {pixelRatio: 2});

    // 지도에 image 표출을 위한 symbol GeoJSON 객체 및 PointLayer 추가
    map.addLayer(
        new ktGms.layer.PointLayer(
            //Layer ID
            "point_layer", 
            //Layer Style
            new ktGms.style.SymbolStyle({},{
                "icon-image": "pulsing-dot"
            }), 
            //Layer Source
            new ktGms.geometry.PointGeo([127.029414, 37.471401],{})
        )
    );
});