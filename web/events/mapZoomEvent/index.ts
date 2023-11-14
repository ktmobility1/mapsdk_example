import ktGms from "kt-map-sdk-js";

const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 10,
    maxPitch: 68,
})

// wheel event가 발생했을 때 호출됩니다.
map.on("wheel",(e:any)=>{
    addInnerText("wheel 이벤트가 발생하였습니다.\n")
})

// double click event가 발생했을 때 호출됩니다.
map.on("dblclick",(e:any)=>{
    addInnerText("dblclick 이벤트가 발생하였습니다.\n")
})

// boxzoom event가 발생했을 때 호출됩니다.
map.on("boxzoomend",(e:any)=>{
    addInnerText("boxzoom 이벤트가 발생하였습니다.\n")
})

const addInnerText = (str:string) => {
    if(document.getElementById("res")){
        document.getElementById("res")!.innerText += str
    }
    let eventsBox = document.getElementById("events")
    if(eventsBox){
        // 스크롤을 div의 맨 아래로 이동
        eventsBox.scrollTop = eventsBox.scrollHeight;
    }
}
