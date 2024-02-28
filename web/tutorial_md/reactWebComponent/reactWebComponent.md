# React에서 KTMapSDK WebComponent 시작하기

<aside>
💡 튜토리얼의 목표      

**React 프로젝트를 생성하고 KTMapSDK를 npm 으로 설치 후 개발하는 방법을 이 튜토리얼에서 설명합니다. Map을 화면에 띄우고, Control을 추가하고, Overlay 추가 후 Layer를 사용하는 과정을 설명합니다.**

</aside>        
<br/>  

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
    
<br/>  

# Create an App using React

create-react-app으로 React 앱을 생성하지 않고, `vite`를 통해 React 프로젝트 생성하는 과정을 보여드리겠습니다. 저희 본 튜토리얼은 `typescript`로 진행합니다. 

리액트 환경설정을 잘 아시는 분이면 Create Navbar Component 챕터로 바로 넘어가셔도 됩니다.

### **Vite로 React 프로젝트 생성**

mac 기준 프롬프트 창에서 vite를 통해 react 프로젝트 생성하는 과정을 보여드리겠습니다. 

1. cmd에 아래와 같이 vite로 react 프로젝트 생성하는 명령어를 입력합니다
    
    ```bash
    npm create vite@latest
    ```
    
2. 프로젝트 이름을 설정합니다
    
    ![Untitled](./img/Untitled.png)
    
3. 프레임워크를 React로 선택합니다
    
    ![Untitled](./img/Untitled%201.png)
    
4. 언어를 Typescript로 선택합니다
    
    ![Untitled](./img/Untitled%202.png)
    
5. 아래와 같은 화면이 나오면 react 프로젝트가 생성된 것입니다.
    
    ![Untitled](./img/Untitled%203.png)
    

### **디렉토리 이동 후 시작**

생성된 프로젝트로 디렉토리를 이동하고, 필요한 모듈을 설치하고, React 프로젝트를 start 하는 과정을 설명드리겠습니다. 

cmd에 아래 명령어 3개를 순서대로 입력합니다. 

```bash
cd ktmap-react-tutorial //디렉토리 이동
npm install //필요한 모듈 설치
npm run dev //프로젝트 start
```

아래와 같이 react 초기 화면을 브라우저에서 확인하시면 환경셋팅에 성공하신겁니다

### 설치 및 설정

`kt-map-sdk-webcomponent`는 `kt-map-sdk-js`를 캡슐화하여 웹 컴포넌트로 제공하는 라이브러리입니다.

<aside>
💡 웹 컴포넌트란

웹 컴포넌트는 재사용 가능한 **사용자 정의 HTML 요소**에 HTML, CSS 및 JS를 캡슐화하는 널리 사용되는 W3C 표준입니다. 이러한 재사용 가능한 컴포넌트는 지도 표시와 같은 기능부터 보다 복잡한 비즈니스 로직까지 다양한 기능을 캡슐화합니다. 이 가이드에서는 kt map sdk 에서 사용할 수 있는 웹 컴포넌트를 설명합니다.

</aside>

npm으로 kt-map-sdk-webcomponent 라이브러리를 설치합니다

```bash
npm install kt-map-sdk-webcomponent
```

React 프로젝트의 레이아웃을 구성하겠습니다.

App 컴포넌트를 생성하여 화면 영역을 구성합니다.

> App.tsx
> 

```jsx
import './App.css';

function App() {
	return (
		<div className="App">
			{/* 네비바와 지도가 들어갈 영역입니다 */}
		</div>
	);
}

export default App;
```

전체적인 구조의 css를 정의합니다.

> App.css
> 

```css
body {
    margin: 0;
    padding: 0;
}
```

### **Create a navbar component**

화면 상단에 navbar 컴포넌트를 만드는 과정은 아래와 같습니다.

Navbar 컴포넌트를 생성하여 컨텐츠를 구성합니다.

> Navbar.tsx
> 

```tsx
import './navbar.css';

export default function Navbar() {
    return (
        <div className="heading">
            <h1>KT Map 튜토리얼</h1>
        </div>
    );
}
```

상단 Navbar의 스타일은 아래와 같이 정의합니다.

> Navbar.css
> 

```css
.heading {
    margin: 0;
    padding: 0px;
    background-color: black;
    color: white;
    text-align: center;
}

.heading>h1 {
    padding: 20px;
    margin: 0;
}
```

App 컴포넌트에 Navbar 컴포넌트를 넣고 Navbar의 렌더링을 확인합니다

> App.tsx
> 

```tsx
import './App.css';
import Navbar from './Navbar';

export default function App() {
	return (
		<div className="App">
			{/* 네비바와 지도가 들어갈 영역입니다 */}
			<Navbar/>
		</div>
	);
}
```

아래와 같이 Navbar가 추가된 화면을 브라우저에서 확인할 수 있습니다.

### create a map component

Navbar 아래에 전체 사이즈로 KT Map을 넣겠습니다.

Map.tsx 파일 생성 후 KT Map Component에 관련된 모듈을 import를 통해 셋팅합니다.

```tsx
import { useState } from 'react';
import 'kt-map-sdk-webcomponent';
import './Map.css';
```

React의 Map 컴포넌트를 정의합니다. 위도, 경도, 줌 레벨을 useState로 생성하고, 내부적으로 `kt-map-sdk-webcomponent` 모듈을 통해 kt-map 컴포넌트로 지도를 생성합니다. css를 쉽게 적용하기 위해서 `<kt-map>` 웹 컴포넌트를 생성하고 `<div id="map-wrap">` 태그로 감싸겠습니다.

> Map.tsx
> 

```tsx
import { useState } from 'react';
import 'kt-map-sdk-webcomponent';
import './Map.css';

export default function Map() {
    const [lng] = useState(127.029414); //경도
    const [lat] = useState(37.471401); //위도
    const [zoom] = useState(14); //줌 레벨
    const [API_KEY] = useState('YOUR_KTMAP_API_KEY_HERE'); //인증키

    return (
        <div id="map-wrap">
            {/* 줌 레벨, 위도, 경도 설정  */}
            <kt-map id="map" zoomValue={zoom} mapStyle="normal" lng={lng} lat={lat} bearingValue={0} pitchValue={0}></kt-map>
        </div>
    );
}
```

추가적으로 Map에 대한 스타일 css입니다.

> Map.css
> 

```css
#map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh - 77px); /* 전체 높이에서 Navbar 높이를 뺀 값으로 설정합니다 */
}

#map {
    position: absolute;
    width: 100vw;
    height: 100vh;
}
```

### **Render a map**

생성한 Map 컴포넌트를 App.tsx에 추가합니다. 

> App.tsx
> 

```tsx
import './App.css';
import Map from './Map';
import Navbar from './Navbar';

export default function App() {
	return (
		<div className="App">
			{/* 네비바와 지도가 들어갈 영역입니다 */}
			<Navbar/>
			<Map/>
		</div>
	);
}
```

Navbar와 KT Map이 렌더링 된 화면은 아래와 같습니다.

### Map Options

map 생성 시 map을 설정하기 위한 option들이 있습니다. KTMapSDK WebComponent는 다음과 같은 프로퍼티를 사용할 수 있습니다.

- `id` : 지도의 문자열 id입니다.
- `mapStyle` : 지도의 스타일입니다. 기본지도, 위성지도, 하이브리드지도 등을 설정할 수 있습니다.
- `lng` : 지도의 경도입니다.
- `lat` : 지도의 위도입니다.
- `zoomValue` : 지도의 초기 확대/축소 수준입니다.
- `bearingValue` : 지도의 초기 회전 각도입니다.
- `pitchValue` : 지도의 초기 pitch(기울기)입니다.

이 option 외에도 다른 option들이 많으며, 더 자세한 것은 Map 및 Map Options API DOCS를 확인해주세요

→ [Map API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/classes/Map.Map.html)

→ [MapOptions API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/types/MapOptions.MapOptions.html)

### Map Event

KTMapSDK WebComponent를 활용하여 지도에 이벤트를 추가하기 위해선 총 3가지 단계를 거쳐야합니다.

1. 이벤트 사용을 위한 모듈 불러오기
    - `ktGms` 는 kt map sdk의 기본 모듈입니다. 타입을 정의해주거나, kt map의 더 많은 옵션과 기능을 사용하고 싶을 때 불러서 사용할 수 있습니다.
    - `ktMapComponent` 는 kt map sdk의 컴포넌트 모듈입니다. `ktMapComponent.ktMapCatalog`를 통해 컴포넌트로 정의했던 기능 객체들을 확인/추가/삭제 할 수 있습니다.
    
    ```tsx
    import ktGms from 'kt-map-sdk-js';
    import ktMapComponent from 'kt-map-sdk-webcomponent';
    ```
    
2. 함수 선언하기
    
    지도를 클릭하면 클릭한 좌표의 위경도 정보를 alert로 출력하도록 함수를 선언하겠습니다.
    
    ```jsx
    // Map Event
    function mapClick(event:ktGms.event.MapMouseEvent){
        alert(event.lngLat);
    }
    ```
    
3. ktMapCatalog에 이벤트 등록하기
    
    ```jsx
    // 'mapClick'라는 Id로 mapClick 함수 등록
    useEffect(()=>{
        ktMapComponent.ktMapCatalog.addEvent('mapClick', mapClick)
    }, [])
    ```
    
4. `<kt-map>` 웹 컴포넌트에 eventId인 ‘mapClick’을 click이벤트 property로 전달해주기
    
    ```html
    <kt-map **click="mapClick"** id="map" zoomValue={zoom} mapStyle="normal" lng={lng} lat={lat} bearingValue={0} pitchValue={0}></kt-map>
    ```
    

Map Event까지 추가한 코드는 아래와 같습니다. 

12~18라인에서 Map Event 추가 코드를 볼 수 있습니다.

```jsx
import { useEffect, useState } from 'react';
import ktGms from 'kt-map-sdk-js';
import ktMapComponent from 'kt-map-sdk-webcomponent';
import './Map.css';

export default function Map() {
    const [lng] = useState(127.029414); //경도
    const [lat] = useState(37.471401); //위도
    const [zoom] = useState(14); //줌 레벨
    const [API_KEY] = useState('YOUR_KTMAP_API_KEY_HERE'); //인증키

    useEffect(()=>{
        ktMapComponent.ktMapCatalog.addEvent('mapClick', mapClick)
    }, [])

    function mapClick(event:ktGms.event.MapMouseEvent){
        alert(event.lngLat);
    }

    return (
        <div id="map-wrap">
            {/* 줌 레벨, 위도, 경도 설정  */}
            <kt-map click="mapClick" id="map" zoomValue={zoom} mapStyle="normal" lng={lng} lat={lat} bearingValue={0} pitchValue={0}></kt-map>
        </div>
    );
}
```

# Add Control

Control은 지도 핸들링 및 지도 사용을 도와주는 기능입니다. 

Control을 지도에 추가하기 위해선 아래와 같이 `<kt-map>` 웹 컴포넌트 태그 안에 특정 컨트롤 컴포넌트 태그를 추가해주면 됩니다.

```tsx
<kt-map click="mapClick" id="map" zoomValue={zoom} mapStyle="normal" lng={lng} lat={lat} bearingValue={0} pitchValue={0}>
    <kt-navigation-control position="top-right"></kt-navigation-control>
</kt-map>
```

Map 컴포넌트의 우측 상단에 네비게이션 컨트롤을 추가하겠습니다.

23번째 라인에서 추가하였습니다.

```tsx
import { useEffect, useState } from 'react';
import ktGms from 'kt-map-sdk-js';
import ktMapComponent from 'kt-map-sdk-webcomponent';
import './Map.css';

export default function Map() {
    const [lng] = useState(127.029414); //경도
    const [lat] = useState(37.471401); //위도
    const [zoom] = useState(14); //줌 레벨
    const [API_KEY] = useState('YOUR_KTMAP_API_KEY_HERE'); //인증키

    useEffect(()=>{
        ktMapComponent.ktMapCatalog.addEvent('mapClick', mapClick)
    }, [])

    function mapClick(event:ktGms.event.MapMouseEvent){
        alert(event.lngLat);
    }

    return (
        <div id="map-wrap">
            <kt-map click="mapClick" id="map" zoomValue={zoom} mapStyle="normal" lng={lng} lat={lat} bearingValue={0} pitchValue={0}>
                <kt-navigation-control position="top-right"></kt-navigation-control> // 추가
            </kt-map>
        </div>
    );
}
```

### 각 종류별 control 설명 및 추가

- Navigation Control : 지도의 zoom, bearing, pitch를 조정할 수 있는 컨트롤입니다.
- Minimap Control : 현재 지도의 미니어처 오버뷰를 표시하는 컨트롤입니다.
- Draw Control : 지도 위에서 도형을 그리고 측정할 수 있는 컨트롤입니다.
- Scale Control : 지도 축척(지면의 해당 거리에 대한 지도의 거리 비율)을 표시하는 컨트롤입니다.

위의 4개의 컨트롤러를 추가하겠습니다.

23~26라인에서 추가하였습니다.

```tsx
import { useEffect, useState } from 'react';
import ktGms from 'kt-map-sdk-js';
import ktMapComponent from 'kt-map-sdk-webcomponent';
import './Map.css';

export default function Map() {
    const [lng] = useState(127.029414); //경도
    const [lat] = useState(37.471401); //위도
    const [zoom] = useState(14); //줌 레벨
    const [API_KEY] = useState('YOUR_KTMAP_API_KEY_HERE'); //인증키

    useEffect(() => {
        ktMapComponent.ktMapCatalog.addEvent('mapClick', mapClick)
    }, [])

    function mapClick(event: ktGms.event.MapMouseEvent) {
        alert(event.lngLat);
    }

    return (
        <div id="map-wrap">
            <kt-map click="mapClick" id="map" zoomValue={zoom} mapStyle="normal" lng={lng} lat={lat} bearingValue={0} pitchValue={0}>
                <kt-navigation-control position="top-right"></kt-navigation-control>
                <kt-minimap-control position="bottom-right"></kt-minimap-control>
                <kt-draw-control position="top-left"></kt-draw-control>
                <kt-scale-control position="bottom-left"></kt-scale-control>
            </kt-map>
        </div>
    );
}
```

Navbar와 KT Map과 4개의 컨트롤러들이 추가된 화면은 아래와 같습니다. 

왼쪽 상단에 Draw Control, 왼쪽 하단에 Scale Control, 오른쪽 상단에 Navigation Control, 오른쪽 하단에 Minimap Control이 추가된 것을 확인할 수 있습니다.

4개의 컨트롤 이외에도 다른 컨트롤들이 있으며, 더 자세한 사항은 API DOCS를 확인해주세요

→ [Control API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/classes/Map.Map.html#addControl)

# Add Overlay

### Add Marker

Marker는 지도 상에 특정 위치에 원하는 아이콘 또는 이미지를 표출하는 기능입니다.

기본 Marker를 생성하여 지도에 추가하는 코드는 아래와 같습니다. 

```tsx
<kt-marker id="defaultMarkerId" lng="127.037414" lat="37.471401" color="#FF0000" ></kt-marker>
```

커스텀 Marker를 추가해보겠습니다. 기본 마커 대신 이미지를 표출하기 위해선 `<kt-marker>` 태그 사이에 표출하고 싶은 `<img>` 태그를 넣으면 됩니다.

```tsx
<kt-marker id="imgMarkerId" lng="127.047414" lat="37.475401" offset="[0,0]" label="위스키" labelOffset="[0,12]" labelColor="#0000ff" labelSize="16">
    <img src="https://map.gis.kt.com/mapsdk/images/bar.png" style={{height:'50px', width:'50px'}} alt="marker-image"/>
</kt-marker>
```

Map 컴포넌트에 기본 Marker와 커스텀 Marker를 추가하겠습니다.

27~30라인에서 Marker 추가 코드를 볼 수 있습니다.

```tsx
import { useEffect, useState } from 'react';
import ktGms from 'kt-map-sdk-js';
import ktMapComponent from 'kt-map-sdk-webcomponent';
import './Map.css';

export default function Map() {
    const [lng] = useState(127.029414); //경도
    const [lat] = useState(37.471401); //위도
    const [zoom] = useState(14); //줌 레벨
    const [API_KEY] = useState('YOUR_KTMAP_API_KEY_HERE'); //인증키

    useEffect(() => {
        ktMapComponent.ktMapCatalog.addEvent('mapClick', mapClick)
    }, [])

    function mapClick(event: ktGms.event.MapMouseEvent) {
        alert(event.lngLat);
    }

    return (
        <div id="map-wrap">
            <kt-map click="mapClick" id="map" zoomValue={zoom} mapStyle="normal" lng={lng} lat={lat} bearingValue={0} pitchValue={0}>
                <kt-navigation-control position="top-right"></kt-navigation-control>
                <kt-minimap-control position="bottom-right"></kt-minimap-control>
                <kt-draw-control position="top-left"></kt-draw-control>
                <kt-scale-control position="bottom-left"></kt-scale-control>
                <kt-marker id="defaultMarkerId" lng="127.037414" lat="37.471401" color="#FF0000" ></kt-marker>
                <kt-marker id="imgMarkerId" lng="127.047414" lat="37.475401" offset="[0,0]" label="위스키" labelOffset="[0,12]" labelColor="#0000ff" labelSize="16">
                    <img src="https://map.gis.kt.com/mapsdk/images/bar.png" style={{height:'50px', width:'50px'}} alt="marker-image"/>
                </kt-marker>
            </kt-map>
        </div>
    );
}
```

마커가 추가된 화면은 아래와 같습니다.

![Untitled](./img/Untitled%204.png)

마커에 대한 더 자세한 사항은 API DOCS를 확인해주세요

→ [Marker API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/classes/overlay_Marker.Marker.html)

### Add InfoWindow

InfoWindow는 지도 위의 특정 지점에 대한 상세정보를 제공하기 위한 기능입니다.

InfoWindow는 말풍선과 같은 형태를 가지며 정보를 기술하는 영역과 지도상의 특정 지점과 연결되는 말풍선 anchor로 구성됩니다.

일반적으로 인포윈도우는 지도상의 특정지점(POI)상에 직접 출력되거나 마커 상단에 출력되는 형태를 가집니다.

InfoWindow를 생성하여 지도에 추가하는 코드는 아래와 같습니다. 

```tsx
<kt-infowindow lng="127.029414" lat="37.471401">
    <h1>InfoWindow</h1>
</kt-infowindow>
```

Map 컴포넌트에 InfoWindow를 추가하겠습니다.

31~33라인에서 InfoWindow 추가 코드를 볼 수 있습니다.

```tsx
import { useEffect, useState } from 'react';
import ktGms from 'kt-map-sdk-js';
import ktMapComponent from 'kt-map-sdk-webcomponent';
import './Map.css';

export default function Map() {
    const [lng] = useState(127.029414); //경도
    const [lat] = useState(37.471401); //위도
    const [zoom] = useState(14); //줌 레벨
    const [API_KEY] = useState('YOUR_KTMAP_API_KEY_HERE'); //인증키

    useEffect(() => {
        ktMapComponent.ktMapCatalog.addEvent('mapClick', mapClick)
    }, [])

    function mapClick(event: ktGms.event.MapMouseEvent) {
        alert(event.lngLat);
    }

    return (
        <div id="map-wrap">
            <kt-map click="mapClick" id="map" zoomValue={zoom} mapStyle="normal" lng={lng} lat={lat} bearingValue={0} pitchValue={0}>
                <kt-navigation-control position="top-right"></kt-navigation-control>
                <kt-minimap-control position="bottom-right"></kt-minimap-control>
                <kt-draw-control position="top-left"></kt-draw-control>
                <kt-scale-control position="bottom-left"></kt-scale-control>
                <kt-marker id="defaultMarkerId" lng="127.037414" lat="37.471401" color="#FF0000" ></kt-marker>
                <kt-marker id="imgMarkerId" lng="127.047414" lat="37.475401" offset="[0,0]" label="위스키" labelOffset="[0,12]" labelColor="#0000ff" labelSize="16">
                    <img src="https://map.gis.kt.com/mapsdk/images/bar.png" style={{height:'50px', width:'50px'}} alt="marker-image"/>
                </kt-marker>
                <kt-infowindow lng="127.029414" lat="37.471401">
                    <h1>InfoWindow</h1>
                </kt-infowindow>
            </kt-map>
        </div>
    );
}
```

인포윈도우가 추가된 화면은 아래와 같습니다.

### Custom InfoWindow

data property를 사용하여 InfoWindow를 커스텀할 수 있습니다.

`kt-infowindow` 컴포넌트에 data property로 JSON 문자열 형태의 데이터를 넘겨주고, `<kt-infowindow>` 태그 사이에서 원하는 html 템플릿을 작성하고, 템플릿 내에서 `#{key}` 방식으로 데이터에 접근할 수 있습니다.

Custom InfoWindow를 생성하여 지도에 추가하는 코드는 아래와 같습니다. 

```tsx
<kt-infowindow lng="127.029414" lat="37.471401" closeOnClick="false"
    data={JSON.stringify({"title":"KT연구개발센터","category":"산업/기간시설","url":"https://map.gis.kt.com","addr":"서울특별시 서초구 태봉로 151","tel":"02-526-5114"})}>
    <div style={{padding: '10px 10px 15px', width:'180px'}}>
        <div style={{display:'inline-block', verticalAlign:'top'}}>
            <strong style={{marginRight: '6px', fontSize: '16px', fontWeight: '700', letterSpacing: '-1px', color: '#0068c3', lineHeight: '23px'}}>#{'{'}title{'}'}</strong>
            <span style={{fontSize: '13px', lineHeight: '19px', color: '#8f8f8f'}}>#{'{'}category{'}'}</span>
        </div>
        <div style={{marginTop: '5px'}}>
            <span style={{fontSize: '14px', lineHeight: '22px', color: '#424242'}}>#{'{'}addr{'}'}</span>
        </div>
    </div>
</kt-infowindow>
```

Map 컴포넌트에 기존의 InfoWindow는 삭제하고 Custom InfoWindow를 추가하겠습니다.

31~42라인에서 Custom InfoWindow 추가 코드를 볼 수 있습니다.

```tsx
import { useEffect, useState } from 'react';
import ktGms from 'kt-map-sdk-js';
import ktMapComponent from 'kt-map-sdk-webcomponent';
import './Map.css';

export default function Map() {
    const [lng] = useState(127.029414); //경도
    const [lat] = useState(37.471401); //위도
    const [zoom] = useState(14); //줌 레벨
    const [API_KEY] = useState('YOUR_KTMAP_API_KEY_HERE'); //인증키

    useEffect(() => {
        ktMapComponent.ktMapCatalog.addEvent('mapClick', mapClick)
    }, [])

    function mapClick(event: ktGms.event.MapMouseEvent) {
        alert(event.lngLat);
    }

    return (
        <div id="map-wrap">
            <kt-map click="mapClick" id="map" zoomValue={zoom} mapStyle="normal" lng={lng} lat={lat} bearingValue={0} pitchValue={0}>
                <kt-navigation-control position="top-right"></kt-navigation-control>
                <kt-minimap-control position="bottom-right"></kt-minimap-control>
                <kt-draw-control position="top-left"></kt-draw-control>
                <kt-scale-control position="bottom-left"></kt-scale-control>
                <kt-marker id="defaultMarkerId" lng="127.037414" lat="37.471401" color="#FF0000" ></kt-marker>
                <kt-marker id="imgMarkerId" lng="127.047414" lat="37.475401" offset="[0,0]" label="위스키" labelOffset="[0,12]" labelColor="#0000ff" labelSize="16">
                    <img src="https://map.gis.kt.com/mapsdk/images/bar.png" style={{ height: '50px', width: '50px' }} alt="marker-image" />
                </kt-marker>
                **<kt-infowindow lng="127.029414" lat="37.471401" closeOnClick="false"
                    data={JSON.stringify({"title":"KT연구개발센터","category":"산업/기간시설","url":"https://map.gis.kt.com","addr":"서울특별시 서초구 태봉로 151","tel":"02-526-5114"})}>
                    <div style={{padding: '10px 10px 15px', width:'180px'}}>
                        <div style={{display:'inline-block', verticalAlign:'top'}}>
                            <strong style={{marginRight: '6px', fontSize: '16px', fontWeight: '700', letterSpacing: '-1px', color: '#0068c3', lineHeight: '23px'}}>#{'{'}title{'}'}</strong>
                            <span style={{fontSize: '13px', lineHeight: '19px', color: '#8f8f8f'}}>#{'{'}category{'}'}</span>
                        </div>
                        <div style={{marginTop: '5px'}}>
                            <span style={{fontSize: '14px', lineHeight: '22px', color: '#424242'}}>#{'{'}addr{'}'}</span>
                        </div>
                    </div>
                </kt-infowindow>**
            </kt-map>
        </div>
    );
}
```

커스텀한 인포윈도우가 추가된 화면은 아래와 같습니다.

![Untitled](./img/Untitled%205.png)

인포윈도우에 대한 더 자세한 사항은 API DOCS를 확인해주세요

→ [InfoWindow API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/classes/overlay_InfoWindow.InfoWindow.html)

# Add Layer

Layer는 Geography 데이터를 지도 상에 시각적으로 표현하는 기능입니다. 

Layer는 Source와 Style 요소로 정의됩니다. 

Polygon Layer를 예시로 설명 드리겠습니다. Polygon Layer는 데이터인 GeoJSON Source와 시각적 요소인 Fill Style로 구성됩니다. 그리고 GeoJSON Source는 Polygon 형태의 Geometry로 구성되어 있습니다. 

![Untitled](./img/Untitled%206.png)

### Source, Style, Layer

**Source**

Source는 지도에 표출되어야하는 데이터를 나타냅니다. 소스에는 스타일 세부정보가 포함되어 있지 않기 때문에 소스를 추가하는 것으로는 맵에 데이터를 표시하기 충분하지 않습니다. 

따라서 레이어가 소스를 참고하여 시각적 표현을 제공합니다.

KTMapSDK WebComponent 에서는 `GeoJSONSource` 타입, `VectorSource`타입을 지원합니다. 그리고 `dataUrl` 프로퍼티를 통해 source data를 불러옵니다.

GeoJSON Source의 데이터를 바인딩하는 코드는 아래와 같습니다.

```html
<kt-geojson-source id="geoJsonSource" dataUrl="https://map.gis.kt.com/mapsdk/data/seoul_sub.geojson"></kt-geojson-source>
```

→ [Source API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/classes/source_GeoJSONSource.GeoJSONSource.html)

**Style**

Layer 설정 시 시각적인 요소들은 Style 객체로 정의합니다. 

KTMapSDK WebComponent 에서는 Paint 요소와 Layout 요소를 Layer의 프로퍼티로 전달해서 Layer에 style을 적용합니다.

폴리곤 레이어에 Fill Style을 적용하는 코드는 아래와 같습니다.

```jsx
<kt-polygon-layer id="polygonLayer" source="geoJsonSource"
    paint="fill-antialias:true; fill-color:#0000ff; fill-outline-color:#ff0000; fill-opacity:0.1"
    layout="visibility:visible">
</kt-polygon-layer>
```

→ [Style API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/classes/style_FillStyle.FillStyle.html)

**Layer**

KTMapSDK WebComponent에서 Layer에 Source를 적용하는 두가지 방법에 대해 소개해드리겠습니다.

1. 맵에 GeoJSONSource를 추가하고, 해당 소스의 아이디를 `source` 이름의 Layer 프로퍼티로 넘겨주는 경우
    
    (해당 경우에는 dataUrl을 통해서만 source의 geometry 정보를 넘겨줄 수 있습니다.)
    
    ```html
    <kt-geojson-source id="geoJsonSource" dataUrl="https://map.gis.kt.com/mapsdk/data/seoul_sub.geojson"></kt-geojson-source>
    <kt-polygon-layer id="polygonLayer" source="geoJsonSource" 
        paint="fill-antialias:true; fill-color:#0000ff; fill-outline-color:#ff0000; fill-opacity:0.1"
        layout="visibility:visible">
    </kt-polygon-layer>
    ```
    
2. Layer 컴포넌트에 `source` 프로퍼티로 geometry 정보를 넘겨주는 경우
    
    (sourceProperty로 geometry의 속성을 넘겨줄 수도 있습니다. dataProperty 활용 예시는 Layer Event에서 확인하실 수 있습니다.)
    
    ```html
    <kt-polygon-layer id="polygonLayer2" source='[[[127.044414, 37.479701], [127.044414, 37.469701], [127.035514, 37.469701], [127.044414, 37.479701]]]'
        sourceProperty='{ "id": "06740", "area": "서울시 서초구", "description": "핫플레이스 상권" }'
    	  paint="fill-antialias:true; fill-color:#FF0000; fill-outline-color:#ff0000; fill-opacity:0.35"
    	  layout="visibility:visible">
    </kt-polygon-layer>
    ```
    

Layer 추가까지 한 코드는 아래와 같습니다.

43~52라인에서 Layer 추가 코드를 볼 수 있습니다.

```tsx
import { useEffect, useState } from 'react';
import ktGms from 'kt-map-sdk-js';
import ktMapComponent from 'kt-map-sdk-webcomponent';
import './Map.css';

export default function Map() {
    const [lng] = useState(127.029414); //경도
    const [lat] = useState(37.471401); //위도
    const [zoom] = useState(14); //줌 레벨
    const [API_KEY] = useState('YOUR_KTMAP_API_KEY_HERE'); //인증키

    useEffect(() => {
        ktMapComponent.ktMapCatalog.addEvent('mapClick', mapClick)
    }, [])

    function mapClick(event: ktGms.event.MapMouseEvent) {
        alert(event.lngLat);
    }

    return (
        <div id="map-wrap">
            <kt-map click="mapClick" id="map" zoomValue={zoom} mapStyle="normal" lng={lng} lat={lat} bearingValue={0} pitchValue={0}>
                <kt-navigation-control position="top-right"></kt-navigation-control>
                <kt-minimap-control position="bottom-right"></kt-minimap-control>
                <kt-draw-control position="top-left"></kt-draw-control>
                <kt-scale-control position="bottom-left"></kt-scale-control>
                <kt-marker id="defaultMarkerId" lng="127.037414" lat="37.471401" color="#FF0000" ></kt-marker>
                <kt-marker id="imgMarkerId" lng="127.047414" lat="37.475401" offset="[0,0]" label="위스키" labelOffset="[0,12]" labelColor="#0000ff" labelSize="16">
                    <img src="https://map.gis.kt.com/mapsdk/images/bar.png" style={{ height: '50px', width: '50px' }} alt="marker-image" />
                </kt-marker>
                <kt-infowindow lng="127.029414" lat="37.471401" closeOnClick="false"
                    data={JSON.stringify({ "title": "KT연구개발센터", "category": "산업/기간시설", "url": "https://map.gis.kt.com", "addr": "서울특별시 서초구 태봉로 151", "tel": "02-526-5114" })}>
                    <div style={{ padding: '10px 10px 15px', width: '180px' }}>
                        <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                            <strong style={{ marginRight: '6px', fontSize: '16px', fontWeight: '700', letterSpacing: '-1px', color: '#0068c3', lineHeight: '23px' }}>#{'{'}title{'}'}</strong>
                            <span style={{ fontSize: '13px', lineHeight: '19px', color: '#8f8f8f' }}>#{'{'}category{'}'}</span>
                        </div>
                        <div style={{ marginTop: '5px' }}>
                            <span style={{ fontSize: '14px', lineHeight: '22px', color: '#424242' }}>#{'{'}addr{'}'}</span>
                        </div>
                    </div>
                </kt-infowindow>
                **<kt-geojson-source id="geoJsonSource" dataUrl="https://map.gis.kt.com/mapsdk/data/seoul_sub.geojson"></kt-geojson-source>
                <kt-polygon-layer id="polygonLayer" source="geoJsonSource"
                    paint="fill-antialias:true; fill-color:#0000ff; fill-outline-color:#ff0000; fill-opacity:0.1"
                    layout="visibility:visible">
                </kt-polygon-layer>
                <kt-polygon-layer id="polygonLayer2" source='[[[127.044414, 37.479701], [127.044414, 37.469701], [127.035514, 37.469701], [127.044414, 37.479701]]]'
                    sourceProperty='{ "id": "06740", "area": "서울시 서초구", "description": "핫플레이스 상권" }'
                    paint="fill-antialias:true; fill-color:#FF0000; fill-outline-color:#ff0000; fill-opacity:0.35"
                    layout="visibility:visible">
                </kt-polygon-layer>**
            </kt-map>
        </div>
    );
}
```

 두 개의 레이어를 추가한 결과입니다.

![Untitled](./img/Untitled%207.png)

### Layer Event

KTMapSDK WebComponent에서 레이어에 이벤트를 추가하는 방식은 맵에 이벤트를 추가하는 방식과 동일합니다. 

1. 함수 선언하기
    
    폴리곤 레이어를 클릭하면 Source 내 Property로 등록해뒀던 description이 alert로 출력되도록 이벤트를 추가하겠습니다.
    
    ```jsx
    // Layer Event
    function layerClick(event:any){
        alert(event.features[0].properties["description"]);
    }
    ```
    
2. ktMapCatalog에 이벤트 등록하기
    
    ```jsx
    // 'layerClick'라는 Id로 layerClick 함수 등록
    useEffect(()=>{
        ktMapComponent.ktMapCatalog.addEvent('layerClick', layerClick);
    }, [])
    ```
    
3. `<kt-polygon-layer>` 컴포넌트에 eventId를 property로 전달해주기
    
    ```html
    <kt-polygon-layer id="polygonLayer2" source='[[[127.044414, 37.479701], [127.044414, 37.469701], [127.035514, 37.469701], [127.044414, 37.479701]]]'
        sourceProperty='{ "id": "06740", "area": "서울시 서초구", "description": "핫플레이스 상권" }'
        paint="fill-antialias:true; fill-color:#FF0000; fill-outline-color:#ff0000; fill-opacity:0.35"
        layout="visibility:visible" **click="layerClick"**>
    </kt-polygon-layer>
    ```
    

Layer Event 까지 추가한 완성 코드는 아래와 같습니다. 

> src/Map.tsx
> 

```tsx
import { useEffect, useState } from 'react';
import ktGms from 'kt-map-sdk-js';
import ktMapComponent from 'kt-map-sdk-webcomponent';
import './Map.css';

export default function Map() {
    const [lng] = useState(127.029414); //경도
    const [lat] = useState(37.471401); //위도
    const [zoom] = useState(14); //줌 레벨
    const [API_KEY] = useState('YOUR_KTMAP_API_KEY_HERE'); //인증키

    useEffect(() => {
        ktMapComponent.ktMapCatalog.addEvent('mapClick', mapClick);
        ktMapComponent.ktMapCatalog.addEvent('layerClick', layerClick);
    }, [])

    function mapClick(event: ktGms.event.MapMouseEvent) {
        alert(event.lngLat);
    }

    function layerClick(event: any){
        alert(event.features[0].properties["description"]);
    } 

    return (
        <div id="map-wrap">
            <kt-map click="mapClick" id="map" zoomValue={zoom} mapStyle="normal" lng={lng} lat={lat} bearingValue={0} pitchValue={0}>
                <kt-navigation-control position="top-right"></kt-navigation-control>
                <kt-minimap-control position="bottom-right"></kt-minimap-control>
                <kt-draw-control position="top-left"></kt-draw-control>
                <kt-scale-control position="bottom-left"></kt-scale-control>
                <kt-marker id="defaultMarkerId" lng="127.037414" lat="37.471401" color="#FF0000" ></kt-marker>
                <kt-marker id="imgMarkerId" lng="127.047414" lat="37.475401" offset="[0,0]" label="위스키" labelOffset="[0,12]" labelColor="#0000ff" labelSize="16">
                    <img src="https://map.gis.kt.com/mapsdk/images/bar.png" style={{ height: '50px', width: '50px' }} alt="marker-image" />
                </kt-marker>
                <kt-infowindow lng="127.029414" lat="37.471401" closeOnClick="false"
                    data={JSON.stringify({ "title": "KT연구개발센터", "category": "산업/기간시설", "url": "https://map.gis.kt.com", "addr": "서울특별시 서초구 태봉로 151", "tel": "02-526-5114" })}>
                    <div style={{ padding: '10px 10px 15px', width: '180px' }}>
                        <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                            <strong style={{ marginRight: '6px', fontSize: '16px', fontWeight: '700', letterSpacing: '-1px', color: '#0068c3', lineHeight: '23px' }}>#{'{'}title{'}'}</strong>
                            <span style={{ fontSize: '13px', lineHeight: '19px', color: '#8f8f8f' }}>#{'{'}category{'}'}</span>
                        </div>
                        <div style={{ marginTop: '5px' }}>
                            <span style={{ fontSize: '14px', lineHeight: '22px', color: '#424242' }}>#{'{'}addr{'}'}</span>
                        </div>
                    </div>
                </kt-infowindow>
                <kt-geojson-source id="geoJsonSource" dataUrl="https://map.gis.kt.com/mapsdk/data/seoul_sub.geojson"></kt-geojson-source>
                <kt-polygon-layer id="polygonLayer" source="geoJsonSource"
                    paint="fill-antialias:true; fill-color:#0000ff; fill-outline-color:#ff0000; fill-opacity:0.1"
                    layout="visibility:visible">
                </kt-polygon-layer>
                <kt-polygon-layer id="polygonLayer2" source='[[[127.044414, 37.479701], [127.044414, 37.469701], [127.035514, 37.469701], [127.044414, 37.479701]]]'
                    sourceProperty='{ "id": "06740", "area": "서울시 서초구", "description": "핫플레이스 상권" }'
                    paint="fill-antialias:true; fill-color:#FF0000; fill-outline-color:#ff0000; fill-opacity:0.35"
                    layout="visibility:visible" click="layerClick">
                </kt-polygon-layer>
            </kt-map>
        </div>
    );
}
```

Layer가 추가된 최종화면은 아래와 같습니다.

![Untitled](./img/Untitled%207.png)

레이어에 대한 더 자세한 사항은 API Document를 확인해주세요.

→ [Layer API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/classes/overlay_InfoWindow.InfoWindow.html)

이상으로 리액트에서 Web Component를 사용해서 kt map 사용하는 튜토리얼을 끝내겠습니다.