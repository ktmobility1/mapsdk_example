import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.   
const map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68
});

let drawControl = new ktGms.control.DrawControl({
  displayControlsDefault: false,
  controls: {}, // default 버튼 숨김
  measure: true, // 측정 옵션 & 함수 사용
  showIcon: false, // infoIcon을 표출하지 않음
  resultPosition: "none", // 최종 측정 결과를 표출하지 않음
  lengthUnit: "kilometers", 
  boxPosition: "none", // 중간 측정 결과를 표출하지 않음 
})

//지도에 DrawControl을 추가합니다. 
map.addControl(drawControl, "top-left");

//선택된 feature들의 id를 저장하는 리스트입니다.
let activeSectionId = [];

//커스텀 버튼에 클릭 이벤트를 추가합니다.
document.getElementById("lineString").addEventListener("click", () => {
  //현재 활성화된 모드가 draw_line_string인 경우 simple_select 모드로 돌아갑니다.
  if(drawControl.getMode() === "draw_line_string"){
    drawControl.changeMode("simple_select");
  }
  else drawControl.changeMode("draw_line_string");
});
document.getElementById("polygon").addEventListener("click", () => {
  //현재 활성화된 모드가 draw_polygon인 경우 simple_select 모드로 돌아갑니다.
  if(drawControl.getMode() === "draw_polygon"){
    drawControl.changeMode("simple_select");
  }
  else drawControl.changeMode("draw_polygon");
});
document.getElementById("trash").addEventListener("click", () => {
  //feature 삭제 함수를 호출합니다.
  drawControl.trash();
});

//create 이벤트를 생성합니다.
drawControl.addDrawEventListener("create", (e) => {
  let id = e.features[0].id;

  let section_inp = document.createElement("section");
  section_inp.setAttribute("id", id);

  let h4_inp = document.createElement("h4");
  h4_inp.innerHTML = `ID : ${id}`;

  let p_inp = document.createElement("p");
  p_inp.innerHTML = `타입 : ${e.features[0].geometry.type}<br>면적 : ${e.area} ${"m&#178"}<br>길이 : ${e.length} ${e.lengthUnit}`;

  section_inp.appendChild(h4_inp);
  section_inp.appendChild(p_inp);

  //index.html <div id="list">에 이벤트 결과를 append 시킵니다.
  document.getElementById("list").appendChild(section_inp);
});

//update 이벤트를 생성합니다.
drawControl.addDrawEventListener("update", (e) => {
  if(e && e.features && e.features.length){  
    e.features.forEach(item => {
      let id = item.id;
      let new_section_inp = document.createElement("section");

      let h4_inp = document.createElement("h4");
      h4_inp.innerHTML = `ID : ${id}`;

      let p_inp = document.createElement("p");
      p_inp.innerHTML = `타입 : ${e.features[0].geometry.type}<br>면적 : ${e.area} ${"m&#178"}<br>길이 : ${e.length} ${e.lengthUnit}`;

      // 발생한 이벤트를 통해 새롭게 측정된 값들을 저장합니다.
      new_section_inp.appendChild(h4_inp);
      new_section_inp.appendChild(p_inp);

      let list = document.getElementById("list");

      // List에서 기존의 결과값을 삭제하고 새로운 결과로 대체합니다.
      list.replaceChild(new_section_inp, document.getElementById(id));
      //선택된 feature의 section에 active 속성을 설정합니다.
      new_section_inp.setAttribute("class", "active");
      activeSectionId.push(id);   
      new_section_inp.setAttribute("id", id);         
    })
  }
});

//delete listener 함수입니다.
function delete_listener (e) {
  if(e && e.features && e.features.length){  
    e.features.forEach(item => {
      let id = item.id;
      //index.html <div id="list">에서 삭제된 feature의 정보를 제거합니다.
      document.getElementById(id).remove();
    })
  }
}

//delete 이벤트를 생성합니다. 
drawControl.addDrawEventListener("delete", delete_listener);

// 주석 해제 시 delete 이벤트가 삭제됩니다.
//drawControl.removeDrawEventListener("delete", delete_listener);

//선택되지 않은 feature의 section active 속성을 해제하는 함수입니다.
function deActiveFunction() {
  activeSectionId.forEach(id => {
    document.getElementById(id)?.setAttribute("class", "");
  })
  activeSectionId = [];  
}

//선택한 feature가 변경될 때 호출되는 이벤트입니다.
drawControl.addDrawEventListener("selectionchange", (e)=>{
  //선택된 feature가 없을때 active 속성을 제거합니다.
  if(e.features.length === 0) {
    deActiveFunction();
    return;
  }
  if(e && e.features && e.features.length){  
    //기존의 active section의 active 속성을 해제합니다.
    deActiveFunction();
    e.features.forEach(item => {
      let id = item.id;
      //선택된 feature의 section에 active 속성을 설정합니다.
      document.getElementById(id)?.setAttribute("class", "active");
      activeSectionId.push(id);
    })
  }
});

