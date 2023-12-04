import ktGms from "kt-map-sdk-js";

const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 10,
    maxPitch: 68,
})

// idle event가 발생했을 때 호출됩니다.
map.on("idle",(e:any)=>{
    addInnerText("idle 이벤트가 발생하였습니다.\n")
})

// move event가 발생했을 때 호출됩니다.
map.on("move",(e:any)=>{
    addInnerText("move 이벤트가 발생하였습니다.\n")
})

// pitch event가 발생했을 때 호출됩니다.
map.on("pitch",(e:any)=>{
    addInnerText("pitch 이벤트가 발생하였습니다.\n")
})

// rotate event가 발생했을 때 호출됩니다.
map.on("rotate",(e:any)=>{
    addInnerText("rotate 이벤트가 발생하였습니다.\n")
})

// drag event가 발생했을 때 호출됩니다.
map.on("drag",(e:any)=>{
    addInnerText("drag 이벤트가 발생하였습니다.\n")
})

const addInnerText = (str:string) => {
    let resElement = document.getElementById("res")
    if(resElement){
        resElement.innerText += str
    }

    let eventsBox = document.getElementById("events")
    if(eventsBox){
        // 스크롤을 div의 맨 아래로 이동
        eventsBox.scrollTop = eventsBox.scrollHeight;
    }
}
