# 분석 튜토리얼 (전국 동물병원)

서울시 행정구역 중 법정동에 동물 병원이 위치를 분석하려합니다.

각 법정동안에 있는 동물병원이 몇개인지?  많은 순서대로 리스트를 추출하고 이렇게 추출된 정보를 기반으로 각각의 법정동에 색깔로 표시하려 합니다.

더 나아가 특정 위치를 선택하여 반경을 설정하면 그 안에 포함되는 동물병원을 찾으려 합니다. 

주어진 데이터는 서울시 행정동 Polygon과 전국 동물 병원에 Point 정보입니다.

이 2개의 데이터(GeoJSON)을 기반으로 위의 문제를 해결하는 튜토리얼입니다.

> 문제요약
> 

<aside>
💡 -. 각각의 법정동에 동물병원 갯수를 기반으로 폴리곤에 색상을 표출한다.

</aside>

<aside>
💡 -. 특정 위치를 선택하면 1km짜리 반경이 생성되고, 반경에 동물병원 찾아준다.

</aside>

## 1. 서울시 법정동 폴리곤 표출

지도상에 서울시 법정동정보를 표시합니다. 사용자는 리모트 환경에서 geoJson을 연결하여 지도상에 표출하는 방식으로 하겠습니다.

```tsx
import ktGms from "kt-map-sdk-js";

const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [126.990368, 37.550696],
    zoom: 10,
    maxPitch: 68,
});

let stateGeoJSON:any; //서울시 법정동 폴리곤
let stateSource:ktGms.source.GeoJSONSource;

//서울시 법정동 폴리곤을 지도에 표출.
const seoulPolygonDisplay = async() => {
  stateGeoJSON = await analysis.utils.getGeoJSONfromRemote("https://ktmobility1.github.io/mapsdk_example/map_resource/data/seoul_sub.geojson")
  stateSource = new ktGms.source.GeoJSONSource("states",{data: stateGeoJSON, generateId: true});
  map.addLayer(
    new ktGms.layer.PolygonLayer(
      "state-fills", 
      new ktGms.style.FillStyle({
        "fill-color" : "#888",
        "fill-opacity": 0.4,
      },{}),
      stateSource
    )
  )
  map.addLayer(
    new ktGms.layer.LineLayer(
      "state-borders",
      new ktGms.style.LineStyle({
        "line-color": "#777",
        "line-width": 1.5,
        "line-opacity": 0.7,
      },{}),
      stateSource
    )
  )
}
    
//지도가 로딩이 되면 발생하는 이벤트
map.on("load", () => {
    seoulPolygonDisplay(); //서울시 법정동 폴리곤을 표시
}
```

결과

![스크린샷 2024-02-27 오후 8.21.35.png](https://github.com/ktmobility1/mapsdk_example/blob/feature/web-tutorial-md/web/tutorial_md/analysis1/img/a1_1.png?raw=true.png)

- analysis.utils.getGeoJSONfromRemote 는 외부 geoJSON을 가져오는 기능입니다.
    
    Promise<GeoJSON>을 반환하는 function입니다. 이 function을 통해서 서울시 법정동 폴리곤을
    
    가져와서 stateGeoJSON 변수에 저장합니다.
    
- geoJSON을 소스로 해서  ktGms.source.GeoJSONSource 객체를 생성합니다.
- ktGms.layer.PolygonLayer을 생성하여 map에 addLayer하면 각각의 법정동을 “#888” 색으로 영영을 fill해서 표시됩니다. 또한 ktGms.layer.LineLayer을 생성하고 map에 addLayer하여 법정동의 경계선 1.5크기로 표시합니다 (PolygonLayer의 outLine은 1크기 밖에 안됩니다.) 다양향 효과를 표시하기 위해서는
    
    LineLayer를 이용합니다.
    

## 2. 전국 동물병원 포인트를 표츌

지도상에 전국 동물병원(6622개)를 표시합니다. 사용자는 리모트 환경에서 geoJson을 연결하여 지도상에 표출하는 방식으로 하겠습니다. 

```tsx

const animalHospitalDisplay = async() => {
  animalGeoJSON = await analysis.utils.getGeoJSONfromRemote("https://ktmobility1.github.io/mapsdk_example/map_resource/data/hospSample.geojson")
  const source = new ktGms.source.GeoJSONSource( "animalHospital", {data: animalGeoJSON, generateId: true});
  
  map.addLayer(
    new ktGms.layer.PointLayer(
      "animalHospitalPoint", 
      new ktGms.style.CircleStyle({
          "circle-radius": 4,
          "circle-opacity": 0.5,
          "circle-color": "#134f2c",
        },{}
      ),
      source
    )
  )
}

//지도가 로딩이 되면 발생하는 이벤트
map.on("load", async() => {
  await seoulPolygonDisplay(); //서울시 법정동 폴리곤을 표시
  await animalHospitalDisplay(); //전국 동물병원 포인트를 표시
});
```

결과

![스크린샷 2024-02-27 오후 8.52.49.png](%E1%84%87%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%E1%86%A8%20%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF%20(%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8%20%E1%84%83%E1%85%A9%E1%86%BC%E1%84%86%E1%85%AE%E1%86%AF%E1%84%87%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB)%20d057d62859dc4f14951b84188e91ba2e/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-02-27_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_8.52.49.png)

코드설명

- PointLayer 에 CircleStyle을 세팅하여 지도상에 전국 병원 포인트를 4 크기의 초록색 원으로 표시합니다.

## 3. 법정동별 동물병원 갯수 구하기

왼쪽 상단에 “법정동별 동물병원갯수” 를 클릭하면 법정동 폴리곤 안에 동물병원의 갯수를 카운팅하여 오른쪽 리스트에 법정동 동물병원 갯수를 큰 순서부터 정렬하여 표시합니다.

이 기능은 공간분석 tool을 사용해야합니다. KT의 지도 라이브러에서는 기본적으로 지도에 기능 kt-map-sdk-js

의 패키지가 담당합니다. 그러나 부가적인 기능들은 별도의 플러그인 패키지들을 제공합니다.

그것이 바로 kt-map-sdk-geoanalysis 패키지입니다.  먼저 이 패키지를 설치 하겠습니다.

```bash
> npm i kt-map-sdk-geoanalysis
```

설치가 되면 아래와 같이 코드를 작성합니다.

```tsx
import ktGms from "kt-map-sdk-js";
import analysis from "kt-map-sdk-geoanalysis"; //추가합니다.

...생략

const stateAnalysis = async() => {
  const result = await analysis.joins.asyncPointsWithinPolygonCollection(animalGeoJSON, stateGeoJSON)
  resultListDisplay(result)
}

const resultListDisplay = (result:any) => {
  const sortData = result.sort((a:any, b:any) => b.features.length - a.features.length);
  const list = (document.getElementById("list") as HTMLElement);
  //오른쪽 리스트 표시
  list.innerHTML = '<h5>[법정동별 동물병원]</h5>';
  sortData.forEach((item:any) => {
    let new_section_inp = document.createElement("section");
    let h4_inp = document.createElement("span");
    h4_inp.innerHTML = `${item.propertyAppend.name} : ${item.features.length} 곳`;
    new_section_inp.appendChild(h4_inp);
    list.appendChild(new_section_inp);
  })
}

map.on("load", async() => {
	await seoulPolygonDisplay();
  await animalHospitalDisplay();
  
	//버튼에 이벤트
  document.getElementById("btn1")?.addEventListener("click", () => {
    (document.getElementById("list") as HTMLElement).innerHTML = '<h4>실행중...</h4>'
    stateAnalysis()
  });
});
```

결과

![스크린샷 2024-02-27 오후 9.27.09.png](%E1%84%87%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%E1%86%A8%20%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF%20(%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8%20%E1%84%83%E1%85%A9%E1%86%BC%E1%84%86%E1%85%AE%E1%86%AF%E1%84%87%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB)%20d057d62859dc4f14951b84188e91ba2e/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-02-27_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_9.27.09.png)

코드설명

- 오른쪽에 List 가 보여지게 될 부분을  “실행중” 으로 변경합니다. 그리고 stateAnalysis 함수를 호출하여 분석을 시작합니다.
- stateAnalysis 함수에서는 analysis.joins.asyncPointsWithinPolygonCollection 함수를 사용합니다.
    
    함수명이 깁니다. 이 함수는 폴리곤(들) 안에 포인트(들)이 공간적으로 포함되는 포인트를 찾습니다.
    
    결과는 폴리곤 갯수 만큼의 배열에 FeatureCollection들이 반환됩니다. 이 배열 안에 있는 각각의 FeatureCollection는 폴리곤에 포함된 Point들의 Feature가 들어 있습니다. 그리고 FeatureCollection 의 객체에는 **propertyAppend** 맴버변수가 존재하는데 여기에 폴리곤의 propertes가 들어 있습니다.
    
- asyncPointsWithinPolygonCollection는 Promise를 반환하기 때문에 비동기처리를 해주어야 합니다.
    
    하지만 pointsWithinPolygonCollection라는 앞부분에 “async” 빠진 함수가 제공되는 이것은 동기로 처리되어 반환됩니다.
    
    그렇지만 Javascript의 단일쓰레드에서 실행이 길어지면 화면이 동작이 되지 않습니다. 하지만 asyncPointsWithinPolygonCollection 처럼 함수명 앞에 “async” 가 붙은 함수는 WebWorker로 별도의 쓰레드에서 동작하므로 메인쓰레드에 영향을 주지 않아서 화면 동작이 정상적으로 가능합니다.
    
    그래서 “async” 붙은 함수는 비동기로 동작합니다.
    
- resultListDisplay 함수를 호출하여 오른쪽 리스트에 표시합니다. 표시하기전에 큰순서로 정렬하여
    
    dom에 innerHTML과 부모 dom에 appendChild하여 리스트를 표출합니다.
    

## 4. 법정동 폴리곤에 빈도에 맞게 색상표시

오른쪽에 동물병원에 갯수를 표시 했지만, 고객이 지도상에 법정동 폴리곤에 어디가 동물병원이 많이 있는지

색상으로 표시하면 한눈에 서울시의 동물병원 분포를 확인 할 수 있습니다.

이제 법정동별 동물병원 갯수를 구간화하고 많은 곳에는 빨간색, 없는 곳에는 흰색으로 색상을 그라데이션 하여 표출 하겠습니다.

```tsx
import ktGms from "kt-map-sdk-js";
import analysis from "kt-map-sdk-geoanalysis";
import Gradient from "javascript-color-gradient"; //두 색깔사이이 중간색을 생성주는 패키지

... 생략

const seoulPolygonDisplay = async() => {
  stateGeoJSON = await analysis.utils.getGeoJSONfromRemote("https://ktmobility1.github.io/mapsdk_example/map_resource/data/seoul_sub.geojson")
  stateSource = new ktGms.source.GeoJSONSource("states",{data: stateGeoJSON, generateId: true});
  map.addLayer(
    new ktGms.layer.PolygonLayer(
      "state-fills", 
      new ktGms.style.FillStyle({
        "fill-color" : ["case", ["==", ["get", "color"], null], "#888", ["get" , "color"]],
        "fill-opacity": ["case", ["==", ["get", "color"], null], 0.4, 0.8],
      },{}),
      stateSource
    )
  )
  map.addLayer(
    new ktGms.layer.LineLayer(
      "state-borders",
      new ktGms.style.LineStyle({
        "line-color": "#777",
        "line-width": ["case", ["==", ["get", "color"], null], 1.5, 0.2],
        "line-opacity": 0.7,
      },{}),
      stateSource
    )
  )
}

const resultListDisplay = (result:any) => {
  const sortData = result.sort((a:any, b:any) => b.features.length - a.features.length);
  const list = (document.getElementById("list") as HTMLElement);
  
  //오른쪽 리스트 표시
  list.innerHTML = '<h5>[법정동별 동물병원]</h5>';
  sortData.forEach((item:any) => {
    let new_section_inp = document.createElement("section");
    let h4_inp = document.createElement("span");
    h4_inp.innerHTML = `${item.propertyAppend.name} : ${item.features.length} 곳`;
    new_section_inp.appendChild(h4_inp);
    list.appendChild(new_section_inp);
  })

  resultMapDisplay(sortData) //법정동에 폴리리곤 색상을 표출하는 함수 호출
}

//법정동에 폴리리곤 색상을 표출
const resultMapDisplay = (sordData:Array<any>) => {
  const setData = new Set();
  const stateCntInfo:any = {}
  sordData.forEach((item:any) => {
    setData.add(item.features.length);
    stateCntInfo[item.propertyAppend.name] = item.features.length;
  })
  //법정동 폴리곤에 색칠할 색깔 추출계산
  const arr:Array<number> = [...setData] as Array<number>;
  const gradientArray = new Gradient().setColorGradient("#FF0000", "#FFFFFF").setMidpoint(arr.length).getColors();
  const colorInfos:any = arr.reduce((acc, curr, idx:number) => {
    let obj:any = {}
    obj[curr] = gradientArray[idx];
    return {...acc, ...obj};
  }, {})

  //계산된 법정동의 색깔 부여
  stateGeoJSON.features = stateGeoJSON.features.map((feature:any) => {
    return {...feature, properties:{...feature.properties, color:colorInfos[stateCntInfo[feature.properties.name]]}}
  })
  //법정동을 소스갱신, 그러면 다시 렌더링됨.
  stateSource.setData(stateGeoJSON)
}
```

결과

![스크린샷 2024-02-27 오후 10.09.42.png](%E1%84%87%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%E1%86%A8%20%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF%20(%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8%20%E1%84%83%E1%85%A9%E1%86%BC%E1%84%86%E1%85%AE%E1%86%AF%E1%84%87%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB)%20d057d62859dc4f14951b84188e91ba2e/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-02-27_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_10.09.42.png)

코드설명

- 먼저 법정동 폴리곤들이 색상을 동물병원의 갯수의 빈도에 따라 표시하려면 PolygonLayer에 세팅된 FillStyle를 변경합니다. 또한 폴리곤 색상이 변경되면서 폴리곤의 외곽선의 얇고 투명하게 변경합니다.
    
    그리기 위해서는 seoulPolygonDisplay 을 위에 코드와 같이 변경해야합니다.
    
    자신의 properties에 color의 값을 이용해서 색상을 지정하기 위한 expression은 ["get", "color"]
    
    처럼 표현하면 됩니다.
    
    fill-color에 표현한 ["case", ["==", ["get", "color"], null], "#888", ["get" , "color"]] 은 풀어서
    
    설명하면 삼항연산자와 비슷함 표현으로 properties에 color값이 null이면 “#888”로 null이 아니면 
    
    properties의 color값을 이용하여 색상을 표출해라 하는 표현식입니다.
    
- resultListDisplay에서 정렬된 sortData(배열로 FeatureCollection) 을 인수로 resultMapDisplay 함수를 호출합니다.
- resultMapDisplay에서는 일단 sortData를 루프를 돌리며 갯수가 중복되지 않는 값으로 Set객체 setData를 생성하고, stateCntInfo라는 객체에 법정동이름을 맴버변수로 생성하고 동물병원갯수(number)을 저장합니다.
- **npm i javascript-color-gradient** 를 실행 시키고 **import javascript-color-gradient** 한 함수들을 이용해서 색상을 split하여 gradientArray변수에 가지고 있고
    
    최종적으로 colorInfos객체에 동물병원 갯수별을 맴버변수하고 각각의 맴버변수에 color을 저장된 객체를 생성합니다.
    
- stateGeoJSON의 각각의 feature들의 값에 속성으로 color을 추가합니다. stateGeoJSON의 features배열을 맴핑(map함수를 실행) 이 때 stateCntInfo 객체에서 법정동이름에 해당하는 동물병원갯수(number)을 찾아 개수에 해당하는 색상을 colorInfos에서 찾습니다. 그리고 이 색상값을 properties에 color 속성을 추가합니다.
- 이렇게 stateGeoJSON은 각각의 properties에 color이 갱신되어 있고 PolygonLayer의 source 세팅된
    
    stateSource에 stateGeoJSON을 setData함수를 통해서 갱신합니다. **stateSource.setData(stateGeoJSON)**  갱 그러면 map은 법정동별 색상이 반영되어 표출됩니다.
    

## 5. 원하는 위치에 선택하고 1km 반경 원그리기

지도상에 원하는 지점을 클릭하면 1km 반경원을 그리기 위해서는 analysis을 함수를 이용해야 합니다.

다음 코드는 원을 그리는 코드입니다. 이렇게 그려진 원은 다음 챕터에서 원에 포함되는 동물병원 공간검색 할 것입니다.

```tsx
//전달 받은 경위도를 기반으로 지도상에 지도표출
const circleMapDisplay = (lng:number, lat:number) => {
  const circle = analysis.transformation.circle([lng, lat], 1, {units: 'kilometers', steps:128, properties:{}}); 
  new ktGms.layer.PolygonLayer(
    "circle-fills", 
    new ktGms.style.FillStyle({
     "fill-color": "#00ff00",
     "fill-opacity": 0.5,
    },{}),
    new ktGms.source.GeoJSONSource("circle",{data: circle})
  ).addTo(map)
}

map.on("load", async() => {
  await seoulPolygonDisplay();
  await animalHospitalDisplay();
  
  document.getElementById("btn1")?.addEventListener("click", () => {
    (document.getElementById("list") as HTMLElement).innerHTML = '<h4>실행중...</h4>'
    map.removeLayer('circle-fills', true);
    stateAnalysis()
  });
  document.getElementById("btn2")?.addEventListener("click", () => {
    (document.getElementById("list") as HTMLElement).innerHTML = '<h4>지도에 위치를 선택하세요.</h4>'
    map.removeLayer('circle-fills', true);
    map.once("click",(e:ktGms.event.MapMouseEvent)=>{
      circleMapDisplay(e.lngLat.lng, e.lngLat.lat); //지도상에 클릭한 포인트를 전달
    })
  });
});
```

결과

![스크린샷 2024-02-27 오후 10.44.57.png](%E1%84%87%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%E1%86%A8%20%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF%20(%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8%20%E1%84%83%E1%85%A9%E1%86%BC%E1%84%86%E1%85%AE%E1%86%AF%E1%84%87%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB)%20d057d62859dc4f14951b84188e91ba2e/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-02-27_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_10.44.57.png)

코드설명

- [analysis.transformation.circle](http://analysis.transformation.circle) 함수를 이용하여 원의 정보를 가지고 있는 GeoJSON(폴리곤타입)을 생성합니다.
    
    첫번째 인수 - point, [lnt, lat]의 number 2개를 가지는 배열타입으로 입력
    
    두번째 인수 - 원이 그려지는 반지름 길이 number
    
    세번째 인수 - circle의 옵션, 객체타입 units: 단위, step:원이그려지는 점의갯수 많을수로 매끈한원, properties: 속성정보
    
- 법정동폴리곤처럼 PolygonLayer과 FillStyle을 사용하여 초록원을 지도상에 표출합니다.

## 6. 원안에 포함되는 동물병원  출력

초록색으로 그려진 원안에 포함되는 동물병원을 찾아서 오른쪽에 리스트에 병원 이름을 출력합니다.

```tsx
const circleMapDisplay = (lng:number, lat:number) => {
  const circle = analysis.transformation.circle([lng, lat], 1, {units: 'kilometers', steps:128, properties:{}}); 
  new ktGms.layer.PolygonLayer(
    "circle-fills", 
    new ktGms.style.FillStyle({
     "fill-color": "#00ff00",
     "fill-opacity": 0.5,
    },{}),
    new ktGms.source.GeoJSONSource("circle",{data: circle})
  ).addTo(map)

  circleAnalysis(circle) // 분석함수를 호출
}
    
//전달받은 원을 기반으로 공간조인
const circleAnalysis = async(circle:any) => {
  const res = await analysis.joins.asyncPointsWithinPolygon(animalGeoJSON, circle);
  circleResultDisplay(res)
}
    
//결과를 오른쪽에 표출합니다.
const circleResultDisplay = (res:any) => {
  const list = (document.getElementById("list") as HTMLElement);
  list.innerHTML = `<h5>[반경안에 동물병원들] ${res.features.length} 곳</h5>`;
  res.features.forEach((feature:any) => {
    const item = feature.properties;
    let new_section_inp = document.createElement("section");
    let h4_inp = document.createElement("span");
    h4_inp.innerHTML = `${item.name}`;
    new_section_inp.appendChild(h4_inp);
    list.appendChild(new_section_inp);
  })
}
```

결과

![스크린샷 2024-02-27 오후 10.56.58.png](%E1%84%87%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%E1%86%A8%20%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF%20(%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8%20%E1%84%83%E1%85%A9%E1%86%BC%E1%84%86%E1%85%AE%E1%86%AF%E1%84%87%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB)%20d057d62859dc4f14951b84188e91ba2e/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-02-27_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_10.56.58.png)

코드설명

- circleMapDisplay에서 원을 그린 후에 circleAnalysis호출하며 circle을 전달합니다.
- circleAnalysis 함수는 전달받은 circle 폴리곤을 analysis.joins.asyncPointsWithinPolygon 함수를 호출하여 원안에 포함되는 동물병원 찾습니다. 여기에서는 폴리곤이 1개인 feature의 GeoJSON이기 때문에
    
    asyncPointsWithinPolygonCollenction 함수가 아닌 asyncPointsWithinPolygon를 호출해야 합니다
    
- circleResultDisplay 함수에서는 전달받은 동물병원 포인트 GeoJSON을 오른쪽 리스트에 동물병원 명칭을 표출합니다.