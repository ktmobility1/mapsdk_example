# kt-map-sdk-geomaster로 주소 검색하기

**💡 튜토리얼의 목표**

**Vite로 Vanilla Typescript 프로젝트를 생성하고 `kt-map-sdk-js`와`kt-map-sdk-geomaster` 를 npm 으로 설치 후 주소와 관련 메소드 사용하는 방법을 이 튜토리얼에서 설명합니다. 주소를 단계별로 검색하고, 현재 위치의 주소를 찾는 과정을 설명합니다.**

- `kt-map-sdk-js` 사용에 대한 자세한 설명은 kt-map-sdk-js의 설명을 참고해주세요

# Getting Start

### API key 발급

1. KT API 사이트 *[(https://apilink.kt.co.kr/)](https://apilink.kt.co.kr/)* 접속

2. 계정 가입 및 로그인

3. 권한신청 메뉴로 이동

4. API 신청 > 일반개발자 | 개인사업자 | 법인사업자 | GiGA Genie 제휴법인 중 해당 소속 선택

5. 정보입력 후 권한 신청

### Node.js and npm 준비

1. [https://nodejs.org/en](https://nodejs.org/en) 에 접속하여 node.js 설치합니다 
2. npm 및 node 버전 확인을 통해 설치가 잘 되었는지 확인합니다

```jsx
//npm 버전 확인
cmd > npm -v 

//node 버전 확인
cmd > node -v
```

# Project Setting

vite를 사용하여 Vanilla Typescript 프로젝트를 생성합니다. 

### 프로젝트 초기 셋팅 및 지도 띄우기

Vanilla Typescript 프로젝트의 레이아웃을 구성하겠습니다.

index.html 파일에 `<body>` 태그를 활용하여 화면 영역을 구성합니다.

지도가 들어갈 수 있도록 `<div>` 태그를 활용하여 id=”map”으로 설정하여 지도 영역을 구성합니다.

> index.html
> 

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link type="text/css" rel="stylesheet" href="index.css" />
    <title>ktmap-geomaster-searchaddress-tutorial</title>
  </head>
  <body>
    <div id="map"></div>
  </body>
  <script type="module" src="/src/index.ts" ></script>
</html>
```

전체적인 구조의 css를 정의합니다.

> index.css
> 

```css
body {
  margin: 0;
  padding: 0;
}

html,
body,
#map {
  width: 100%;
  height: 100%;
}
```

npm으로 kt-map-sdk-js 라이브러리를 설치합니다.

```bash
npm install kt-map-sdk-js
```

src 폴더에 index.ts 파일을 생성하고, ktGms.Map을 생성합니다.

> index.ts
> 

```tsx
import ktGms from 'kt-map-sdk-js'

let map = new ktGms.Map({
  container: 'map',
  style: 'normal',
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68,
  access_token: 'YOUR_ACCESS_TOKEN',
})
```

KT Map이 렌더링 된 화면은 아래와 같습니다

![image0](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/searchaddress/img/image0.png?raw=true)

### geomaster 패키지 설치

npm으로 kt-map-sdk-geomaster 패키지를 설치합니다

```bash
npm install kt-map-sdk-geomaster
```

# stepbystep(단계별 주소 검색) 기능 추가하기

### 화면 영역 셋팅

단계별 주소 검색할 수 있도록 html과 css로 화면 영역을 먼저 셋팅합니다

> index.html
> 

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link type="text/css" rel="stylesheet" href="index.css" />
    <title>ktmap-geomaster-searchaddress-tutorial</title>
  </head>
  <body>
    <div id="map">
      <div id="addressSetting">
        <div id="address">
          <div id="current">
            <span class="sido addr">시도</span>
            <span class="divider addr">></span>
            <span class="sigungu addr">시/군/구</span>
            <span class="divider addr">></span>
            <span class="eupmyeondong addr">읍/면/동</span>
          </div>
          <div id="expand" style="display: none">
            <div id="choice-sido" class="choice"></div>
            <div id="choice-sigungu" class="choice"></div>
            <div id="choice-eupmyeondong" class="choice"></div>
          </div>
        </div>
      </div>
    </div>
  </body>
  <script type="module" src="/src/index.ts" ></script>
</html>
```

> index.css
> 

```css
#addressSetting {
  z-index: 1;
  position: absolute;
  left: 12px;
  margin-top: 12px;
}

#current {
  background-color: #fff;
  font: 14px "KTfontMedium";
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12);
  border-radius: 5px;
  min-height: 30px;
  padding: 6px;
  display: flex;
  align-items: center;
}

#current .sido, #current .sigungu, #current .eupmyeondong {
  width: 100px;
  text-align: center;
  cursor: pointer;
} 

#expand {
  margin-top: 4px;
  background-color: #fff;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, .12);
  display: flex;
}

.choice {
  width: 110px;
  text-align: center;
  height: 200px;
  overflow-y:scroll;
}
.choice div {
  cursor: pointer;
  height: 20px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.choice div:hover {
  background-color: #efefef;
}
.choice .select {
  background-color: #dbdbdb;
}
```

주소 검색 영역이 렌더링 된 화면은 아래와 같습니다

![image1](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/searchaddress/img/image1.png?raw=true)

### stepbystep 기능 추가하기

stepbystep은 서울 > 강남구 > 개포동 과 같이 단계별로 주소를 검색할 수 있는 기능입니다. 

'시도' > '시군구' > '읍면동'을 단계별로 선택할 수 있도록 이벤트 리스너를 설정하고, 읍면동까지 모두 선택했다면 선택한 읍면동으로 지도가 이동합니다.

```tsx
//...지도 추가

// SearchService 객체를 생성합니다
const searchService = new geomaster.SearchService({ accessKey: "YOUR_ACCESS_TOKEN" });

let currentSido = document.querySelector("#current .sido") as HTMLDivElement; //선택된 시도
let currentSigungu = document.querySelector("#current .sigungu") as HTMLDivElement; // 선택된 시군구
let currentEupmyeondong = document.querySelector("#current .eupmyeondong") as HTMLDivElement; //선택된 읍면동
let choiceSido = document.querySelector("#choice-sido") as HTMLDivElement; //시도 리스트
let choiceSigungu = document.querySelector("#choice-sigungu") as HTMLDivElement; //시군구 리스트
let choiceEupmyeondong = document.querySelector("#choice-eupmyeondong") as HTMLDivElement; //읍면동 리스트

// '시도' 값을 가져오는 함수입니다
async function getSido() {
  const sidoResult = await searchService.stepByStep();
  sidoResult.address?.forEach((a) => {
    appendOption(a.siDo, choiceSido, () => {
      currentSigungu.innerText = "시/군/구";
      currentEupmyeondong.innerText = "읍/면/동";
      getSigungu(a.siDo);
      currentSido.innerText = a.siDo;
    });
  });
}

// 선택한 '시도'에 맞는 '시군구' 데이터를 가져오는 함수입니다
async function getSigungu(selectedSido: string) {
  // '시군구' selectbox가 있다면 삭제하고 새로 생성합니다
  choiceSigungu.innerHTML = "";

  // searchService.stepByStep를 사용하여 선택한 '시도'에 맞는 '시군구' 데이터를 가져옵니다
  const sigunguResult = await searchService.stepByStep({ siDo: selectedSido });

  // '시군구'데이터를 option으로 추가합니다
  sigunguResult.address?.forEach((a) => {
    appendOption(a.siGunGu, choiceSigungu, () => {
      currentEupmyeondong.innerText = "읍/면/동";
      getEupmyeondong(currentSido.innerText, a.siGunGu);
      currentSigungu.innerText = a.siGunGu;
    });
  });
}

// 선택한 '시도'와 '시군구'에 맞는 '읍면동' 데이터를 가져오는 함수입니다
async function getEupmyeondong(selectedSido: string, selectedSigungu: string) {
  // '시군구' selectbox가 있다면 삭제하고 새로 생성합니다
  choiceEupmyeondong.innerHTML = "";

  // searchService.stepByStep를 사용하여 선택한 '시군구'에 맞는 '읍면동' 데이터를 가져옵니다
  const eupmyeondongResult = await searchService.stepByStep({
    siDo: selectedSido,
    siGunGu: selectedSigungu,
  });

  // '시군구'데이터를 option으로 추가합니다
  eupmyeondongResult.address?.forEach((a) => {
    appendOption(a.eupMyeonDong, choiceEupmyeondong, () => {
      currentEupmyeondong.innerText = a.eupMyeonDong;
      moveMap(currentSido.innerText, currentSigungu.innerText, a.eupMyeonDong);
    });
  });
}

let marker: ktGms.overlay.Marker;
// 선택한 '시도', '시군구', '읍면동'에 맞는 주소로 지도를 이동하는 함수입니다
async function moveMap(
  selectedSido: string,
  selectedSigungu: string,
  selectedEupmyeondong: string
) {
  // searchService.stepByStep를 사용하여 선택한 주소에 맞는 데이터를 가져옵니다
  const eupmyeondongResult = await searchService.stepByStep({
    siDo: selectedSido,
    siGunGu: selectedSigungu,
    eupMyeonDong: selectedEupmyeondong,
  });
  const latLng = eupmyeondongResult.address[0].geographicInformation?.point;
  if (!latLng) return;

  // 지도에 마커로 표시합니다
  marker?.remove();
  marker = new ktGms.overlay.Marker({
    lngLat: [latLng.lng, latLng.lat],
    label: `${selectedSido} ${selectedSigungu} ${selectedEupmyeondong}`,
  }).addTo(map);

  // place 좌표로 지도를 이동합니다
  map.flyTo({ center: [latLng.lng, latLng.lat], speed: 2 });
}

// select에 option 태그를 추가하는 함수입니다
function appendOption(text: string, parentChild: Element | HTMLElement, eventFunc: any) {
  if (!text || !parentChild) return;
  let option = document.createElement("div") as HTMLElement;
  option.innerText = text;
  option.dataset.name = text;
  option.classList.add("addr");

  parentChild.innerHTML.replace("select", "");

  option.addEventListener("click", () => {
    // 기존에 선택된 요소를 선택 해제 합니다
    Array.prototype.forEach.call(parentChild.children, (element) => {
      if (element.classList.contains("select"))
        element.classList.remove("select");
    });
    // 클릭 시 선택되도록 합니다
    option.classList.add("select");
  });

  // 클릭 이벤트리스너를 추가합니다
  option.addEventListener("click", eventFunc);
  parentChild?.appendChild(option);
}

getSido(); // '시도' 정보를 가져옵니다

// 주소 외 다른 영역 클릭 시 주소 선택 영역이 사라지도록 합니다
function removeAddressDivByMouseClick() {
  document.addEventListener("click", (e: any) => {
    let target = e.target;
    if (!target.className.includes("addr")) {
      document.getElementById("expand")!.style.display = "none";
    }
  });
}
removeAddressDivByMouseClick();

// 주소 현황 클릭했을 때 주소 선택할 수 있는 영역이 뜨도록 합니다
document.getElementById("current")?.addEventListener("click", () => {
  document.getElementById("expand")!.style.display = "flex";
});
```

# 현재 주소 찾기 기능 추가하기

### Reverse Geocode 기능 추가하기

geomaster의 SearchService의 geocode 메소드를 사용하여 reverse geocode 기능을 추가하겠습니다. 현재 지도 위치의 중심이 어디인지 찾아서 화면에 렌더링합니다. 

```tsx
//... 생략
// Reverse Geocode로 현재 주소 찾기
async function searchNowAddress() {
  let lngLat = map.getCenter();
  let geocodeResult = await searchService.geocode({ geocodeTerm: lngLat });
  let address = geocodeResult.residentialAddress[0].parcelAddress[0];
  currentSido.innerText = address.siDo;
  currentSigungu.innerText = address.siGunGu;
  currentEupmyeondong.innerText = address.eupMyeonDong;
}

searchNowAddress(); 

// 지도 드래그 끝났을 때의 주소를 찾습니다
map.on("dragend", () => {
  searchNowAddress();
});

```

주소가 렌더링 된 화면은 다음과 같습니다

![image2](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/searchaddress/img/image2.png?raw=true)

# 지오코딩 기능 추가하기

### geocode 기능을 사용하여 클릭 위치 infowindow로 띄우기

지도를 클릭했을 때 그 곳의 주소를 인포윈도우로 띄우겠습니다. geomaster의 SearchService의 geocode 메소드를 사용하겠습니다.

```tsx
let infoWindow: ktGms.overlay.InfoWindow;

map.on("click", async (e: any) => {
  //지도를 클릭했을 때의 위경도 좌표를 저장합니다
  const lngLat = e.lngLat;

  // geocoding 메소드를 호출합니다
  const data = await searchService.geocode({
    geocodeTerm: { lng: lngLat.lng, lat: lngLat.lat },
  });
  const address = data.residentialAddress[0];

  // 기존 마커가 있으면 삭제하고, 새로 클릭한 곳에 마커를 생성합니다
  if (marker) marker.remove();
  marker = new ktGms.overlay.Marker({
    lngLat: [lngLat.lng, lngLat.lat],
  }).addTo(map);

  let html = `
  <h3>${address.parcelAddress ? address.parcelAddress[0].fullAddress : ""}</h3>
  ${
    address.roadAddress && address.roadAddress?.length > 0
      ? "<h4>[지번]" + address.roadAddress[0].fullAddress + "</h4>"
      : ""
  }
    (위도: ${lngLat.lat}  경도: ${lngLat.lng})
  `;
  // geocoding 메소드를 호출하여 얻은 주소를 infoWindow로 표출합니다
  infoWindow = new ktGms.overlay.InfoWindow().setHTML(html);
  marker.setInfoWindow(infoWindow, true);
});

```

지도를 클릭하여 인포윈도우로 주소가 표출된 화면은 다음과 같습니다

![image3](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/searchaddress/img/image3.png?raw=true)

# 전체코드

전체 코드는 깃에서 확인할 수 있습니다