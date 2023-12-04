import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.   
const map: ktGms.Map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68
});
  
let drawControl:ktGms.control.DrawControl = new ktGms.control.DrawControl({
  keybindings: false, // 키보드를 이용한 drawControl 조작 설정 활성화 여부 (default: true)
  boxSelect: false, // 클릭 & 드래그를 이용한 feature 선택 기능 활성화 여부 (default: true)
  clickBuffer: 2, // 도형이나 특정 포인트를 클릭할 때 반응하는 영역의 범위 (default: 2)
  displayControlsDefault: false, // drawControl 특정 기능 표출 커스터마이징 여부 (default: true)
  controls: { // drawControl 표출할 기능 (default: {})
    // "point": true,
    // "line_string": true,
    // "polygon": true,
    // "trash": true,
    // "combine_features": true,
    // "uncombine_features": true,
    // "srmode": true
  } 
});

//지도에 DrawControl을 추가합니다. 
map.addControl(drawControl, "top-left");

map.on(ktGms.event.MapDefaultEvent.eventName.load, ()=> {
  //Polygon 내부 Paint 옵션을 변경합니다.
  drawControl.setPaintOption("fill", true, "fill-color", "#FF2400");
  drawControl.setPaintOption("fill", false, "fill-color", "#FF2400");

  //커스텀 버튼에 클릭 이벤트를 추가합니다.
  (document.getElementById("point") as HTMLButtonElement).addEventListener("click", () => {
    //현재 활성화된 모드가 draw_point인 경우 simple_select 모드로 돌아갑니다.
    if(drawControl.getMode() === "draw_point"){
      drawControl.changeMode("simple_select");
    }
    else drawControl.changeMode("draw_point");
  });
  (document.getElementById("lineString") as HTMLButtonElement).addEventListener("click", () => {
    //현재 활성화된 모드가 draw_line_string인 경우 simple_select 모드로 돌아갑니다.
    if(drawControl.getMode() === "draw_line_string"){
      drawControl.changeMode("simple_select");
    }
    else drawControl.changeMode("draw_line_string");
  });
  (document.getElementById("polygon") as HTMLButtonElement).addEventListener("click", () => {
    //현재 활성화된 모드가 draw_polygon인 경우 simple_select 모드로 돌아갑니다.
    if(drawControl.getMode() === "draw_polygon"){
      drawControl.changeMode("simple_select");
    }
    else drawControl.changeMode("draw_polygon");
  });
  (document.getElementById("trash") as HTMLButtonElement).addEventListener("click", () => {
    //feature 삭제 함수를 호출합니다.
    drawControl.trash();
  });
  (document.getElementById("combine") as HTMLButtonElement).addEventListener("click", () => {
    //feature 결합 함수를 호출합니다.
    drawControl.combineFeatures();
  });
  (document.getElementById("uncombine") as HTMLButtonElement).addEventListener("click", () => {
    //feature 분해 함수를 호출합니다.
    drawControl.uncombineFeatures();
  });
  
  //지도에 keydown 이벤트를 추가합니다.
  map.getCanvas().addEventListener("keydown", (e:KeyboardEvent) => {
    e.preventDefault();
    let keyValue:number = e.keyCode || e.which || 0;
    //키보드 "r" 키 입력 시
    if(keyValue === 82){
      //SRMode로 전환합니다.
      drawControl.changeMode("SRMode");
    }
  });
});