# 분석튜토리얼 (도로주변 편의점)

출발지와 목적지를 선택한 도로 근처에 편의점의 분포를 찾고, 길찾기한 도로의 2/3지점이

어디인지, 그리고 2/3 지점 근처에는 편의점 분포가 분석하는 튜토리얼입니다.

또한 이번 튜토리얼에는 로컬에 파일을 로딩 하여 지도에 표출하는 법

GeoJSON이 아닌 ArcGIS에서 사용하는 Shapre파일을 파싱하여 지도에 표출하는 방법도 소개합니다.

문제요약

<aside>
💡 -. 출발지, 도착지를 기반으로 길찾기API를 사용하여 경로를 표시하는법

</aside>

<aside>
💡 -. 경로(라인)의 버퍼를 만들어 폴리곤으로 변화하는법

</aside>

<aside>
💡 -. 경로(라인)상에 특정 거리가 어디인지 포인트를 추출하는법

</aside>

<aside>
💡 -. 로컬파일이 로딩방법과 Shape파일 핸들하는 방법

</aside>

## 1.  Shape파일 편의점위치 표출

  로컬 파일시스템에 있는 shape을 선택하여 지도상에 PointLayer로 표출하는 방법은 

  getShapefromLocal함수를 이용합니다.

```html
<label for="shpfile">
  <div class="btn-upload">편의점 업로드</div>
</label>
```

```tsx
const pointDisplay = async(geoJson:any) => {
  const source = new ktGms.source.GeoJSONSource( "storePoint", {data: geoJson});
  map.addLayer(
    new ktGms.layer.PointLayer(
      "storePoint", 
      new ktGms.style.CircleStyle({
          "circle-radius": 4,
          "circle-opacity": 0.5,
          "circle-color": "#ff0000",
        },{}
      ),
      source
    )
  )
}

document.getElementById("shpfile")?.addEventListener("change", async(event:any) => {
  var file =event.target.files[0];
  storeGeoJson = await analysis.utils.getShapefromLocal(file);
  pointDisplay(storeGeoJson);
});
```

결과

![스크린샷 2024-03-08 오후 4.06.28.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis2/img/a2_1.png?raw=true)

- 로컬파일에서 선택할때 이벤트 addEventListener("change”, 콜백함수)로 처리합니다.
    
    이벤트에 콜백함수로 전달되는 객체에서 파일객체를 변수에 저장합니다.
    
    var file = event.target.files[0];
    
- await analysis.utils.getShapefromLocal(file) 비동기 함수인 getShapefromLocal파일을 실행시켜
    
    geoJSON을 로딩합니다.
    
- pointDisplay함수에서 전달받은 geoJSON을 기반으로 PointLayer에 CircleStyle를 세팅하여 지도상에
    
    붉은색 점으로 표출합니다.
    

## 2. 출발지/도착지 지도에서 선택

  출발지와 도착지 버튼을 클릭하면 마우스 포커스가 cross로 변경되며 지도상에 원하는 위치를 선택하면

  출발지, 도착지 마커를 표출하는 방법입니다.

```tsx
document.getElementById("startBtn")?.addEventListener("click", () => {
  map.getCanvas().style.cursor = "cell";
  if(startMarker){
    startMarker.remove()
  }
  map.once("click", (event:ktGms.event.MapMouseEvent) => {
    startMarker = new ktGms.overlay.Marker({
      lngLat: event.lngLat, //좌표
      label: '출발',
      labelOptions: {
        color: "#770077", //라벨 색상
        position: "bottom", //라벨 위치
        offset: [0,-1], //오프셋
        size: 18 //글자 크기
      }
    }).addTo(map);
    map.getCanvas().style.cursor = "";
  })
});

document.getElementById("endBtn")?.addEventListener("click", () => {
  map.getCanvas().style.cursor = "cell";
  if(endMarker){
    endMarker.remove()
  }
  map.once("click", (event:ktGms.event.MapMouseEvent) => {
    endMarker = new ktGms.overlay.Marker({
      lngLat: event.lngLat,
      label: '도착',
      labelOptions: {
        color: "#007700", //라벨 색상
        position: "bottom", //라벨 위치
        offset: [0,-1], //오프셋
        size: 18 //글자 크기
      }
    }).addTo(map);
    map.getCanvas().style.cursor = "";
  })
});
```

![스크린샷 2024-03-08 오후 4.38.12.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis2/img/a2_2.png?raw=true)

- 출발점, 도착점 버튼에 click이벤트 바인딩하고 콜백함수에서 map의 click 이벤트를 일시적으로 설정합니다
- map.on이 아닌 map.once로 click를 하는 이유이는 출발, 도착을 항상하는 것이 아니므로 한번만 이벤트를 감지하고 바로 이벤트를 해제하려면 “on” 함수가 아닌 “once”를 사용합니다.
- 지도상에 click한 곳의 포인트 정보를 이벤트에 전달되는 객체를 통해서 알 수 있습니다. event.lnglat 를 이용하여 Marker를 지도상에 표출합니다.

## 3. 길찾기 실행 및 경로 표시

  출발점, 도착점을 정보를 기반으로 실시간 경로를 정보를 얻으려면 kt-map-sdk-geomaster 

  모듈을 사용합니  다. KT의 Geomaster의 restful API를 사용 할 수 있는 라이센스가 있어야 합니다.

  직접 개발자가 restful API를 호출하여 처리 할 수 있지만, 각각의 API의 스펙을 알아야하고

  길찾기 API의 결과는 

  복잡한 많은 정보의 스키마를 직접 알아야 하는 어려움, 그리고 pbf를 직접 파싱하는것은 

  어려움을 쉽게 하기위 해서 javascript 환경에서 사용 할 수 있는 kt-map-sdk-geomaster 모듈을 사용합니다.

```bash
npm intall kt-map-sdk-geomaster
```

설치가 끝나면 다음과 같이 사용합니다.

```tsx
import ktGms from "kt-map-sdk-js"; 
import analysis from "kt-map-sdk-geoanalysis";
import geomaster from "kt-map-sdk-geomaster"; //길찾기, Geomaster을 쉽게 사용하는 모듈

const routeDisplay = async() => {
  if(!startMarker) {alert("출발지를 선택하세요.")}
  if(!endMarker) {alert("도착지를 선택하세요.")}
  if(startMarker && endMarker){
    const routeService = new geomaster.RouteService({accessKey:"<사용자 라이센스키>"})
    const result = await routeService.route({start:startMarker.getLngLat(), end:endMarker.getLngLat()});
    (document.getElementById("list") as HTMLElement).innerHTML = '<h4>길 찾기완료</h4>'
    routeGeoJSON = result[0].geoJSON;

    const source = new ktGms.source.GeoJSONSource( "route", {data: routeGeoJSON});
    map.addLayer(new ktGms.layer.LineLayer(
      "line", 
      new ktGms.style.LineStyle({
        "line-width": 6, 
        "line-color": "#007cbf" 
      },{}),
      source
    ));

    map.addLayer(new ktGms.layer.LineSymbolicLayer(
      "arrow", 
      new ktGms.style.SymbolStyle({},{
        "visibility": "visible",
        "symbol-placement": "line",
        "icon-image": "arrow-head",
        "symbol-spacing": 70,
        "icon-offset": [0, 0],
      }),
		  source 
	  ));
  }
}

document.getElementById("routeBtn")?.addEventListener("click", async() => {
  (document.getElementById("list") as HTMLElement).innerHTML = '<h4>길 찾는중...</h4>'
  map.removeLayer('line', true);
  map.removeLayer('arrow', true);
  map.removeLayer('bufferFill', true);
  map.removeLayer('circleFills', true);
  if(twoDtheeMarker) twoDtheeMarker.remove()
  routeGeoJSON = null;
  routeDisplay();
});
```

결과

![스크린샷 2024-03-08 오후 5.15.24.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis2/img/a2_3.png?raw=true)

- const routeService = new geomaster.RouteService({accessKey:"<사용자 라이센스키>"})
    
    사용자 라이센스키를 세팅하하고 geomaster에 모듈중에 길찾기 기능을 사용하려면 RouteService를 객체를 생성합니다.
    
- routeService객체에 route함수를 사용하여 길찾기 정보를 얻습니다. 비동기 함수로 반환되는 결과는 json 입니다.
- 반환받은 json에는 출발점, 도착점의 실시간 경로, 교통정보, 도로정보등의 다양한 내용이 있습니다. 이 튜토리얼에서는 경로의 Geometry인 라인정보를 사용합니다. 경로 Linstring정보는 “geoJSON” 프로퍼티에 있습니다.  “result[0].geoJSON”
- LineLayer, LineStyle를 생성하여 지도상에 선형으로 표출합니다.
    
    또한 LineSymbolicLayer, SymbolStyle를 사용하여 선형상에 일정한 간격으로 화살표를 표출합니다.
    

## 4. 경로주변 편의점 검색

  경로상에 주변의 편의점 정보를 공간검색하기 위해서는 라인 정보로는 불가합니다. 

  그래서 경로의 라인에 buffer를 씌어서 폴리곤으로 만듭니다. buffer는 200미터로 설정합니다. 

  그러면 선형의 양쪽으로 생기 때문에 라인을 중심으로 양쪽 200미터씩 두께 400미터  

  선형의 폴리곤이 만들어 지고  그 폴리곤안에 포함되는 편의점을 공간조인을 통해서 찾습니다.

```tsx
const bufferSearch = async() => {
  if(routeGeoJSON){
    const bufferRes:Feature<Polygon | MultiPolygon> = analysis.transformation.buffer(routeGeoJSON, 0.2, {units: 'kilometers',steps: 0}) as Feature<Polygon | MultiPolygon>;
    const source = new ktGms.source.GeoJSONSource( "buffer", {data: bufferRes});
    map.addLayer(
      new ktGms.layer.PolygonLayer(
        "bufferFill", 
        new ktGms.style.FillStyle({
          "fill-color" : "#888",
          "fill-opacity": 0.7,
        },{}),
        source
      )
    )
    if(storeGeoJson){
      const result:FeatureCollection <(Point|MultiPoint)> = await analysis.joins.asyncPointsWithinPolygon(storeGeoJson as FeatureCollection, bufferRes.geometry);
      bufferResutDisplay(result)
    }
  }
}
```

결과

![스크린샷 2024-03-08 오후 5.20.40.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis2/img/a2_4.png?raw=true)

- analysis.transformation.buffer를 이용하면 라인에 buffer를 생성하여 폴리곤을 생성합니다.
- 생성한 폴리곤을 투명도 0.7의 회색으로 표출합니다. PolygonLayer + FillStyle를 이용하여
- analysis.joins.asyncPointsWithinPolygon 비동기 함수로 buffer안에 들어오는 편의점을 찾아서
    
    오른쪽 리스트에 편의점 종류별 갯수를 표시합니다.
    

## 5. 경로상 특정위치 포인트 얻기

   경로 선형상에 30km되는 지점은 어디인지? 100km 되는 지점이 어디인지? 

   알기위해서는 along기능을 사용합니다. 튜토리얼에서 경로상 2/3가 되는 지점을 찾아서 마커를 표출합니다.

```tsx
const alongSearch = () => {
  if(routeGeoJSON){
    const length = analysis.measurement.length(routeGeoJSON as LineString, {units: 'kilometers'});
    twoDtheePoint = analysis.measurement.along(routeGeoJSON as LineString, length*2/3, {units: 'kilometers'});
    map.setCenter({lng:twoDtheePoint.geometry.coordinates[0], lat:twoDtheePoint.geometry.coordinates[1]})

    twoDtheeMarker = new ktGms.overlay.Marker({
      lngLat: twoDtheePoint?.geometry.coordinates as [number, number], //좌표
      label: '2/3',
      labelOptions: {
        color: "#0000ff", //라벨 색상
        position: "bottom", //라벨 위치
        offset: [0,-1], //오프셋
        size: 18 //글자 크기
      }
    }).addTo(map);
    (document.getElementById("list") as HTMLElement).innerHTML = '<h4>왼쪽 상단에 원하는 버튼을 클릭하세요.</h4>'
  }
}
```

결과

![스크린샷 2024-03-08 오후 5.44.01.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis2/img/a2_5.png?raw=true)

- analysis.measurement.length를 사용해서 경로의 총길이를 알아냅니다.
    
    2/3길이 = 총길이 * 2 / 3 으로 출발점에서 거리를 알아냅니다.
    
- analysis.measurement.along을 사용하여 2/3지점을 찾습니다. 인수를 설명하면
    
    -. 첫번째 : GeoJSON(LineString
    
    -. 두번째 : 출발점에서 거리 number
    
    -. 세번째 : 단위 정보 (이 튜토리얼에서는 ‘kilometers’ 사용)
    
- 찾아낸 포인트를 지도상에 마커로 표출합니다.

## 6. 2/3의 지점의 2km반경의 편의점 정보

경로상에 2/3지점의 중심으로 2km반경안에 편의점 정보를 분석해서 오른쪽에 리스트에 표시합니다.

```tsx
const twoDthreeSearh = async() => {
  const circle = analysis.transformation.circle(twoDtheePoint?.geometry.coordinates as [number, number], 2, {units: 'kilometers', steps:128, properties:{}}); 
  new ktGms.layer.PolygonLayer(
    "circleFills", 
    new ktGms.style.FillStyle({
     "fill-color": "#00ff00",
     "fill-opacity": 0.5,
    },{}),
    new ktGms.source.GeoJSONSource("circle",{data: circle})
  ).addTo(map)
  const result:FeatureCollection<(Point|MultiPoint)>  = await analysis.joins.asyncPointsWithinPolygon(storeGeoJson as FeatureCollection, circle.geometry);
  bufferResutDisplay(result)
}
```

결과

![스크린샷 2024-03-08 오후 5.54.33.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis2/img/a2_6.png?raw=true)

- [analysis.transformation.circle](http://analysis.transformation.circle) 를 이용하여 포인터를 기준으로 Circle 폴리곤을 생성합니다.
- PolygonLayer + FillStyle을 이용해서 Circle 폴리곤을 초록색의 0.5투명도로 표출합니다.
- 위해서 사용했던 analysis.joins.asyncPointsWithinPolygon를 이용해서 2km반경 안에 편의점정보를
    
    오른쪽 리스트에 종류별 편의점 갯수를 표시합니다.

[https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis2/analysis2.mp4](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis2/analysis2.mp4)