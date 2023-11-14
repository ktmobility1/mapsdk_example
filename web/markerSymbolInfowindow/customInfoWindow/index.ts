import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68
});

//infoWindow의 custom HTML에 들어갈 JSON 데이터 객체입니다
const data = {
    title: "KT연구개발센터",
    category: "산업/기간시설",
    url: "https://map.gis.kt.com/index.html?v=1693543266115",
    addr: "서울특별시 서초구 태봉로 151",
    tel: "02-526-5114",
};

//infoWindow에 보여줄 HTML을 생성합니다. 위에서 선언한 data의 값을 #{title}과 같이 사용할 수 있습니다
const tmpl = `
<div style="padding: 10px 10px 15px; width:180px">
    <div style="display: inline-block;vertical-align: top;">
        <strong style="margin-right: 6px;font-size: 16px;font-weight: 700;letter-spacing: -1px;color: #0068c3;line-height: 23px;">#{title}</strong>
        <span style="font-size: 13px;line-height: 19px;color: #8f8f8f;">#{category}</span>
    </div>
    <div style="margin-top: 5px;">
        <span style="font-size: 14px;line-height: 22px;color: #424242;">#{addr}</span>
    </div>
</div>`;

//infoWindow 생성 후 map에 추가합니다
const infoWindow = 
    new ktGms.overlay.InfoWindow()
        .setLngLat([127.029414, 37.471401])
        .setDataTemplate(tmpl, data)
        .addTo(map);
