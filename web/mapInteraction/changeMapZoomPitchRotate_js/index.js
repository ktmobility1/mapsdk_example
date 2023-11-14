import ktGms from "kt-map-sdk-js";

//지도를 생성합니다
const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 14,
    maxPitch: 68,
});

const nowZoomText = document.getElementById("nowZoom"); //현재 zoom text
const zoomSelect = document.getElementById("zoom"); //zoom 선택 
const nowBearingText = document.getElementById("nowBearing"); //현재 bearing text
const bearingSelect = document.getElementById("bearing"); //bearing 선택 
const nowPitchText = document.getElementById("nowPitch"); //현재 pitch text
const pitchSelect = document.getElementById("pitch"); //pitch 선택 

map.on("load", () => {
    changeZoom(); 
    changeBearing();
    changePitch();
})

function changeZoom() {
    //ZOOM CHANGE
    const minZoom = map.getMinZoom(); //지도의 최소 줌
    const maxZoom = map.getMaxZoom(); //지도의 최대 줌
    const nowZoom = map.getZoom(); //현재 지도 줌

    //화면에 minZoom/maxZoom/nowZoom 표시
    document.getElementById("minZoom").innerText = minZoom + " ";
    document.getElementById("maxZoom").innerText = maxZoom + " ";
    nowZoomText.innerText = nowZoom + " ";

    //input range의 min/max/현재값 설정
    zoomSelect.min = minZoom + '';
    zoomSelect.max = maxZoom + '';
    zoomSelect.value = nowZoom + '';

    //zoom slider를 변경했을 때 지도의 zoom 레벨을 변경합니다
    zoomSelect.oninput = function(){
        let changeZoom = Number(zoomSelect.value)
        nowZoomText.innerText = zoomSelect.value
        
        // map.setZoom(changeZoom); // 애니메이션 없이 zoom레벨을 변경합니다
        map.easeTo({ // 50ms 동안 애니메이션 전환과 함께 줌 레벨을 변경합니다
            duration: 50,
            zoom: changeZoom
        })
    }
}

function changeBearing() {
    //BEARING CHANGE
    const nowBearing = map.getBearing(); //현재 지도 기울기

    //화면에 minBearing/maxBearing/nowBearing 표시
    document.getElementById("minBearing").innerText = 0 + " ";
    document.getElementById("maxBearing").innerText = 360 + " ";
    nowBearingText.innerText = nowBearing + " ";

    //input range의 min/max/현재값 설정
    bearingSelect.min = 0 + '';
    bearingSelect.max = 360 + '';
    bearingSelect.value = nowBearing + '';

    //bearing slider를 변경했을 때 bearing 값(회전 각도)을 변경합니다
    bearingSelect.oninput = function(){
        let bearingZoom = Number(bearingSelect.value)
        nowBearingText.innerText = bearingSelect.value

        // map.setBearing(bearingZoom); // 애니메이션 없이 회전 각도를 변경합니다
        map.easeTo({ // 50ms 동안 애니메이션 전환과 함께 회전 각도를 변경합니다
            duration: 50,
            bearing: bearingZoom
        })
    }
}

function changePitch() {
    //PITCH CHANGE
    const minPitch = map.getMinPitch(); //지도의 최대 pitch
    const maxPitch = map.getMaxPitch(); //지도의 최소 pitch
    const nowPitch = map.getPitch(); //현재 지도 pitch

    //화면에 minPitch/maxPitch/nowPitch 표시
    document.getElementById("minPitch").innerText = minPitch + " ";
    document.getElementById("maxPitch").innerText = maxPitch + " ";
    nowPitchText.innerText = nowPitch + " ";

    //input range의 min/max/현재값 설정
    pitchSelect.min = minPitch + '';
    pitchSelect.max = maxPitch + '';
    pitchSelect.value = nowPitch + '';

    //pitch select를 선택했을 때 지도의 pitch(기울기)를 변경합니다
    pitchSelect.oninput = function(){
        let changePitch = Number(pitchSelect.value)
        nowPitchText.innerText = pitchSelect.value

        // map.setPitch(changePitch); // 애니메이션 없이 기울기를 변경합니다
        map.easeTo({ // 50ms 동안 애니메이션 전환과 함께 기울기를 변경합니다
            duration: 50,
            pitch: changePitch
        })
    }
}