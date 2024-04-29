# 분석 튜토리얼 (신규도로 가로수 갯수)

기존 고속도로 아래로 끊어져 있는 도로를 연결하는 신규도로를 건설하려 합니다.

이때 도로 양쪽에 가로수를 3.5미터 간격으로 심으려 합니다. 이 때 신규도로가 고속도로 아래로 지나가는 

곳은 햇빛이 들지 않기때문에 가로수를 심지 않으려 합니다. 

이런 조건을 감안해서 신규도로 양쪽에 각각 몇개의 가로수 필요하지? 분석하는 튜토리얼입니다.

문제요약

<aside>
💡 -. 신규도로Lins을 의 양쪽(2개)의 Line으로 생성하는 방법

</aside>

<aside>
💡 -. 양쪽 Line을 고속도로Polygon으로 Line을 분리하는 방법

</aside>

<aside>
💡 -. 분리된 Line중에 고속도로와 겹쳐지 않고, 3.5미터이상인 Line만 추출하는 방법

</aside>

<aside>
💡 -. 추출된 Line들에 3.5미터로 가로수를 심을때 갯수 알아내는 방법

</aside>

<aside>
💡 -. 신규도로를 폭 18미터로 Polygon을 만드는 방법

</aside>

<aside>
💡 -. 신규도로 양쪽에 3.5미터 간격으로 위치의 Points추출하고 지도에 표출하는 방법

</aside>

## 1. 기존 고속도로 및 신규도로 지도에 표출

   기존 고속도로는 Polgygon으로 이미지를 이용하여 패턴으로 표출하고, 

   신규도로 Line을 지도 표출하는 코드입니다.

```tsx
// 지도가 로딩된 후 Line에 화살표 이미지 로딩 및 폴리곤에 패턴으로 세팅할 이미지로딩
map.on("load", async() => {
  const is = await arrowHeadImage("#fff"); //Line에 화살표를 로딩하는 함수호출
  map.addImage('arrow-head', is as any);
  map.loadImage("https://ktmobility1.github.io/mapsdk_example/map_resource/images/asphalt.jpeg",(_err:Error, image:ImageBitmap) => {
    map.addImage("roadPattern", image);
  })
})

//화살표를 표시할 SVG 정의하는 함수
const arrowHeadImage = (color:any) => {
	const param = {"color": color, "size": 16, "rotation": 90};
	const data = `<svg width='${param.size}' height='${param.size}' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' version='1.1'><polygon fill='${param.color}' stroke='gray' stroke-width='1' points='20,90 50,10 80,90 50,70' transform='rotate(${param.rotation} 50 50)'/></svg>`;
	return new Promise((resolve) => {
		const img = new Image(param.size, param.size);
		img.src = "data:image/svg+xml;base64," + btoa(data);
		img.onload = () => resolve(createImageBitmap(img));
	});
}

const roadDisplay = () => {
  const source = new ktGms.source.GeoJSONSource( "road", {data: roadGeoJson});
  map.addLayer(
    new ktGms.layer.PolygonLayer(
      "roadFill", 
      new ktGms.style.FillStyle({
        "fill-pattern": "roadPattern",
      },{}),
      source
    )
  )
}

const lineDisplay = () => {
  const source = new ktGms.source.GeoJSONSource( "route", {data: lineGeoJson});
  map.addLayer(new ktGms.layer.LineLayer(
    "line", 
    new ktGms.style.LineStyle({
      "line-width": 10, //라인 두께
      "line-color": "#007cbf" //라인 색상
    },{}),
    source
  ));

  map.addLayer(new ktGms.layer.LineSymbolicLayer(
    "arrow", 
    new ktGms.style.SymbolStyle({},{
      "visibility": "visible",
      "symbol-placement": "line",
      "icon-image": "arrow-head",
      "symbol-spacing": 30,
      "icon-offset": [0, 0],
    }),
    source 
  ));
}

//통과되는 고속도로 업로드버튼
document.getElementById("roadPolygon")?.addEventListener("change", async(event:any) => {
  var file =event.target.files[0];
  roadGeoJson = await analysis.utils.getGeoJSONfromLocal(file);
  roadDisplay();
});

//새로운길경로 업로드버튼
document.getElementById("newRoadLine")?.addEventListener("change", async(event:any) => {
  var file =event.target.files[0];
  lineGeoJson = await analysis.utils.getGeoJSONfromLocal(file);
  lineDisplay();
});
```

결과

![스크린샷 2024-03-09 오후 10.09.46.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis3/img/a3_1.png?raw=true)

- map.addImage 는 이미지 리소스를 map인스턴스에 추가하는 함수입니다. 필요할때  사용하려면 첫번째 인수가 string으로 고유 id를 정의하고 이렇게 정의된 고유id를 통해서 접근해서 사용합니다.
- map.loadImage 함수는 리모트에 있는 이미지 로딩하는 비동기 함수이고 콜백함수에서 리모트에서 가져온 이미지를 map.addImage로 추가합니다.
- arrowHeadImage 함수는 javascript에서 SVG를 정의하는 방법입니다.
- 고속로로 Polgygon, 신규도로 Line은 리모트에서 geoJSON으로 로딩하려면 analysis.utils.getGeoJSONfromLocal 함수를 사용합니다.
- 고속도로 Polygon의 이미지패턴으로 표출하려면 addImage로 정의한 고유 id를 FillStyle에 fill-patten에 세팅하면 표출됩니다.

## 2. 신규도로 양쪽라인 생성

   신규도로는 Line(선형) 데이터입니다. 길이 중앙선입니다. 가로수는 길 양쪽 가장자리에 심어야 합니다. 

   도로 양쪽 라인을 추출하는 코드입니다.

```tsx
//오른쪽, 왼쪽 라인을 생성하여 지도에 표출
const twoLineCreate = () => {
  rightLine = lineCreate(-0.01);
  const rightLineSource = new ktGms.source.GeoJSONSource("rightLineSource", {data: rightLine});
  map.addLayer(new ktGms.layer.LineLayer(
    "rightLine", 
    new ktGms.style.LineStyle({
      "line-width": 4, //라인 두께
      "line-color": "#8B4513" //라인 색상
    },{}),
    rightLineSource
  ));

  leftLine = lineCreate(0.01);
  const leftLineSoruce = new ktGms.source.GeoJSONSource("leftLineSoruce", {data: leftLine});
  map.addLayer(new ktGms.layer.LineLayer(
    "leftLine", 
    new ktGms.style.LineStyle({
      "line-width": 4, //라인 두께
      "line-color": "#8B4513" //라인 색상
    },{}),
    leftLineSoruce
  ));
}

// 라인을 기준으로 특정거리, 특정방향 만큼 이동한 라인생성
const lineCreate = (distance:number) => {
  const coordinates = (lineGeoJson as Feature<LineString>).geometry.coordinates
  const start = coordinates[0];
  const end = coordinates[coordinates.length-1]
  const bearing = analysis.measurement.bearing(start, end)
  return analysis.transformation.transformTranslate(lineGeoJson, distance, bearing+90) as Feature<LineString>;
}

//양쪽라인생성 버튼
document.getElementById("twoLineCreate")?.addEventListener("click", async() => {
  twoLineCreate();
});
```

결과

![스크린샷 2024-03-09 오후 10.10.35.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis3/img/a3_2.png?raw=true)

- analysis.transformation.transformTranslate 함수를 사용해서 Line을 양쪽으로 10미터 씩 이동된 라인을 생성 합니다. transformTranslate함수에 두번째 인수는 이동되어진 수치입니다 단위가 km이기 때문에  -0.01(오른쪽), 왼쪽(0.01), 셋번째 인수는 방향입니다. 기존 라인과 평행선을 생성하려면 정확한 direction으로 세팅해야합니다.
- analysis.measurement.bearing 함수를 이용해서 정확한 direction을 찾습니다. 신규도로 Line에 시작점, 끝점을 통해서 방향을 얻어내고 평행으로 이동해야 하므로 90을 더해줍니다.
- LineLayer + LineStyle을 이용해서 생성된 양쪽 선을 지도에 표출합니다.

## 3. 라인분리

   양쪽으로 분리되어 생성 라인은 고속도로와 겹치지 않는 부분을 찾아야합니다. 그러기 위해서 선들이 고속도로     

   Polygon을 이용해서 라인을 분리해야합니다. analysis에는 라인을 폴리곤으로 분리하는 함수가 제공됩니다.

```tsx
const lineSplit = () => {
  map.removeLayer("rightLine");
  map.removeLayer("leftLine");
  const colorAtIndexTwo = ["#ff0000", "#ff8c00", "#ffff00", "#008000", "#0000ff", "#4b0082", "#800080"]

  rightSplitLines = analysis.miscellaneous.lineSplit(rightLine, (roadGeoJson as Feature).geometry);
  rightSplitLines.features = rightSplitLines.features.sort((a:Feature, b:Feature) => (a.geometry as LineString).coordinates[0][0] - (b.geometry as LineString).coordinates[0][0])
  rightSplitLines.features.forEach((feature:Feature, idx:number) => {
    map.addLayer(new ktGms.layer.LineLayer(
      `rightSplitLines_${idx}`, 
      new ktGms.style.LineStyle({
        "line-width": 6, //라인 두께
        "line-color": colorAtIndexTwo[idx%7]
      },{}),
      feature.geometry as ktGms.geometry.Geometry
    ));
  });

  leftSplitLines = analysis.miscellaneous.lineSplit(leftLine, (roadGeoJson as Feature).geometry);
  leftSplitLines.features = leftSplitLines.features.sort((a:Feature, b:Feature) => (a.geometry as LineString).coordinates[0][0] - (b.geometry as LineString).coordinates[0][0])
  leftSplitLines.features.forEach((feature:Feature, idx:number) => {
    map.addLayer(new ktGms.layer.LineLayer(
      `leftSplitLines_${idx}`, 
      new ktGms.style.LineStyle({
        "line-width": 6, //라인 두께
        "line-color": colorAtIndexTwo[idx%7]
      },{}),
      feature.geometry as ktGms.geometry.Geometry
    ));
  });
}

//라인분리 버튼
document.getElementById("lineSplit")?.addEventListener("click", async() => {
  lineSplit();
});
```

결과

![스크린샷 2024-03-09 오후 10.11.12.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis3/img/a3_3.png?raw=true)

- analysis.miscellaneous.lineSplit 함수를 사용해서 Line을 분리합니다. 분리된 Line들은 FeatureCollection으로 반환됩니다.
- 반환된 FeatureCollection 안에 라인들은 선형의 모습대로 정렬이 되어지 있지 않습니다. 가로수 산정하는데는 문제가 없지만 7개 색깔로 분리해서 지도에 표출할때 제대로 분리되어 있는지 혼선이 있을 수 있어 라인들을 선형 모습대로 정렬합니다.
- FeatureCollection을 순회를 하면서 7가지 색깔이 순차적으로 적용하여 라인을 표출합니다.

## 4. 겹쳐지않는 3.5미터이상 라인찾기

   분리된 Line들 중에 고속도로와 겹쳐지 않고 3.5미터 Line들 찾기 위한 코드입니다.

```tsx
const notOverlapSearch = () => {
  rightNotOverLines = <Array<Feature>> rightSplitLines?.features.filter((feature:Feature, idx:number) => {
    map.removeLayer(`rightSplitLines_${idx}`);
    const length = analysis.measurement.length(feature, {units: 'kilometers'});
    if(length < 0.0035) return false;
    const ptMiddle = analysis.measurement.along(feature, length/2, {units: 'kilometers'});
    if(analysis.joins.pointsWithinPolygon(ptMiddle, roadGeoJson).features.length > 0) {
      return false;
    }
    return true;
  }) 

  leftNotOverLines = <Array<Feature>> leftSplitLines?.features.filter((feature:Feature, idx:number) => {
    map.removeLayer(`leftSplitLines_${idx}`);
    const length = analysis.measurement.length(feature, {units: 'kilometers'});
    if(length < 0.0035) return false;
    const ptMiddle = analysis.measurement.along(feature, length/2, {units: 'kilometers'});
    if(analysis.joins.pointsWithinPolygon(ptMiddle, roadGeoJson).features.length > 0) {
      return false;
    }
    return true;
  }) 

  rightNotOverLines.forEach((feature:Feature, idx:number) => {
    map.addLayer(new ktGms.layer.LineLayer(
      `rightNotOverLines_${idx}`, 
      new ktGms.style.LineStyle({
        "line-width": 10, //라인 두께
        "line-color": "#006400"
      },{}),
      feature.geometry as ktGms.geometry.Geometry
    ));
  });

  leftNotOverLines.forEach((feature:Feature, idx:number) => {
    map.addLayer(new ktGms.layer.LineLayer(
      `leftNotOverLines_${idx}`, 
      new ktGms.style.LineStyle({
        "line-width": 10, //라인 두께
        "line-color": "#006400"
      },{}),
      feature.geometry as ktGms.geometry.Geometry
    ));
  });
}

//겹치지않는 라인찾기 버튼
document.getElementById("notOverlapSearch")?.addEventListener("click", async() => {
  notOverlapSearch();
});
```

결과

![스크린샷 2024-03-09 오후 10.11.44.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis3/img/a3_4.png?raw=true)

- 양쪽의 분리된 FeatureCollection을 순회하면서 각각의 Line 고속도로와 겹치는지, 3.5미터 이상인지 검사합니다.
    - analysis.measurement.length 로 길이를 검사합니다.
    - analysis.measurement.along(feature, length/2, {units: 'kilometers'}); 라인의 중앙점을 찾습니다.
    - 찾은 Line의 중앙점이 고속도로 Polgygon에 포함되는지 체크를 하면 Line이 고속도로Polygon에 겹치는지 알 수 있습니다.  analysis.joins.pointsWithinPolygon 함수를 사용합니다.
- 선별한 Line들을 초록색으로 LineLayer + LineStyle를 이용해서 표출합니다.

## 5.  가로수갯수 산정

   찾은 라인들을 기반으로 3.5미터 간격으로 필요한 가로수 갯수 및 양쪽의 가로수.

   심을 있는 길이도 산정합니다.

```tsx
const stepCntSearch = () => {
  rightNotOverLines.forEach((feature:Feature) => {
    const length = analysis.measurement.length(feature, {units: 'kilometers'}) * 1000;
    rightLenth += length;
    rightCnt += Math.floor(length/3.5)
  });

  leftNotOverLines.forEach((feature:Feature) => {
    const length = analysis.measurement.length(feature, {units: 'kilometers'}) * 1000;
    leftLenth += length;
    leftCnt += Math.floor(length/3.5)
  });

  const list = (document.getElementById("list") as HTMLElement);
  list.innerHTML = '<h4>필요한가로수 갯수 결과</h4>';

  listResult(list, `오른쪽 필요한 도로길이: ${Math.round(rightLenth)}미터`);
  listResult(list, `오른쪽 가로수 갯수: ${rightCnt}그루`);
  listResult(list, `왼쪽 필요한 도로길이: ${Math.round(leftLenth)}미터`);
  listResult(list, `왼쪽 가로수 갯수: ${leftCnt}그루`);
}

const listResult = (list:HTMLElement, content:string) => {
  let new_section_inp = document.createElement("section");
  let span = document.createElement("span");
  new_section_inp.appendChild(span);
  span.innerHTML = content;
  list.appendChild(new_section_inp);
}

//가로수 갯수산정 버튼
document.getElementById("stepCntSearch")?.addEventListener("click", async() => {
  stepCntSearch();
});
```

결과

![스크린샷 2024-03-09 오후 9.47.59.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis3/img/a3_5.png?raw=true)

- analysis.measurement.length 로 각각의 라인의 합을 구하고, 라인의 길이 3.5로 나누어 심을 수 있는    가로수 갯수를 산정하여 오른쪽 List에 표시합니다.

## 6. 길생성

   주어진 신규도로 Line을 폭 18미터 폴리곤을 생성하여 지도에 표출합니다.

```tsx
const roadCreate = () => {
  map.removeLayer("line");
  map.removeLayer("arrow");
  const bufferRes:Feature<Polygon | MultiPolygon> = analysis.transformation.buffer(lineGeoJson, 0.009, {units: 'kilometers',steps: 0}) as Feature<Polygon | MultiPolygon>;
  map.addLayer(
    new ktGms.layer.PolygonLayer(
      "bufferFill", 
      new ktGms.style.FillStyle({
        "fill-color" : "#fff",
      },{}),
      bufferRes.geometry
    )
  )
}

//길생성 버튼
document.getElementById("roadCreate")?.addEventListener("click", async() => {
  roadCreate();
});
```

결과

![스크린샷 2024-03-09 오후 9.59.51.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis3/img/a3_6.png?raw=true)

- analysis.transformation.buffer 함수를 사용합니다 18미터로 생성하려면 한쪽을 9미터 이기때문에 0.09로 입력합니다(단위가 km이기때문에)
- 생성된 Polygon을 흰색으로 Polygon + FillStyle로 표출합니다.

## 7. 가로수 표시

   도로를 만들고 또한 양쪽 가로수를 표시 할 수 있는 부분까지 지도에 표시하였습니다. 양쪽 초록색으로 된 부분에 

   가로수를 흰색 점으로 표시하겠습니다.

```tsx
const plantTree = () => {
  rightNotOverLines.forEach((feature:Feature, idx:number) => {
    const length = analysis.measurement.length(feature, {units: 'kilometers'}) * 1000;
    const cnt = Math.floor(length/3.5);
    Array(cnt).fill(0).map((_e,i)=>i).forEach(index=>{
      const treePoint = analysis.measurement.along(feature, 0.0035 * (index+1), {units: 'kilometers'});
      map.addLayer(
        new ktGms.layer.PointLayer(
          `right_tree_${idx}_${index}`, 
          new ktGms.style.CircleStyle({
            "circle-radius": 3,
            "circle-color": "#fff"
          },{}),
          treePoint.geometry
        )
      )
    })
  });

  leftNotOverLines.forEach((feature:Feature, idx:number) => {
    const length = analysis.measurement.length(feature, {units: 'kilometers'}) * 1000;
    const cnt = Math.floor(length/3.5);
    Array(cnt).fill(0).map((_e,i)=>i).forEach(index=>{
      const treePoint = analysis.measurement.along(feature, 0.0035 * (index+1), {units: 'kilometers'});
      map.addLayer(
        new ktGms.layer.PointLayer(
          `left_tree_${idx}_${index}`, 
          new ktGms.style.CircleStyle({
            "circle-radius": 3,
            "circle-color": "#fff"
          },{}),
          treePoint.geometry
        )
      )
    })
  });
}

//가로수 표시 버튼
document.getElementById("plantTree")?.addEventListener("click", async() => {
  plantTree();
});
```

결과

![스크린샷 2024-03-09 오후 10.05.11.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis3/img/a3_7.png?raw=true)

- analysis.measurement.along(feature, 0.0035 * (index+1) 이 코드 처럼 0.0035km(3.5m)로 포인트를 얻기 위해서 along 함수를 이용하여 가로수 심어질 포인트들을 산정합니다.
- 이렇게 산정된 포인트들을 PointLayer + CircleStyle로 흰색 원으로 지도에 표출합니다.

[https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis3/analysis3.mp4](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/analysis3/analysis3.mp4)