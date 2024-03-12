# Vue에서 KTMapSDK 시작하기

<aside>
💡 튜토리얼의 목표      

**Vue 프로젝트를 생성하고 KTMapSDK를 npm 으로 설치 후 개발하는 방법을 이 튜토리얼에서 설명합니다. Map을 화면에 띄우고, Control을 추가하고, Overlay 추가 후 Layer를 사용하는 과정을 설명합니다.**

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

# Create an App using Vue

vue CLI ( 기본적인 vue 개발환경 설정해주는 도구 )를 사용하여 Vue 앱을 생성하지 않고, `vite`를 통해 Vue 프로젝트 생성하는 과정을 보여드리겠습니다. 저희 본 튜토리얼은 `typescript`로 진행합니다. 

Vue 환경설정을 잘 아시는 분이면 [Create Navbar Component](https://www.notion.so/Vue-KTMapSDK-3f23b5da45a84b80865d4078818f7275?pvs=21) 챕터로 바로 넘어가셔도 됩니다.

### **Vite로 Vue 프로젝트 생성**

mac 기준 프롬프트 창에서 vite를 통해 vue 프로젝트 생성하는 과정을 보여드리겠습니다. 

1. cmd에 아래와 같이 vite로 Vue 프로젝트 생성하는 명령어를 입력합니다
    
    ```bash
    npm create vite@latest
    ```
    
2. 프로젝트 이름을 설정합니다
    
    ![ProjectName](https://github.com/ktmobility1/mapsdk_example/blob/feature/web-tutorial-md/web/tutorial_md/vue/img/ProjectName.png)
    
3. framework는 Vue를 선택합니다
    
    ![Framework](https://github.com/ktmobility1/mapsdk_example/blob/feature/web-tutorial-md/web/tutorial_md/vue/img/Framework.png)
    
4. 언어를 Typescript로 선택합니다
    
    ![Typescript](https://github.com/ktmobility1/mapsdk_example/blob/feature/web-tutorial-md/web/tutorial_md/vue/img/Typescript.png)
    
5. 아래와 같은 화면이 나오면 Vue 프로젝트가 생성된 것입니다.
    
    ![ProjectDone](https://github.com/ktmobility1/mapsdk_example/blob/feature/web-tutorial-md/web/tutorial_md/vue/img/ProjectDone.png)
    

### **디렉토리 이동 후 시작**

생성된 프로젝트로 디렉토리를 이동하고, 필요한 모듈을 설치하고, Vue 프로젝트를 start 하는 과정을 설명드리겠습니다. 

cmd에 아래 명령어 3개를 순서대로 입력합니다. 

```bash
cd ktmap-vue-tutorial //디렉토리 이동
npm install //필요한 모듈 설치
npm run dev //프로젝트 start
```

아래와 같이 Vue 초기 화면을 브라우저에서 확인하시면 환경셋팅에 성공하신겁니다

![InitialPage](https://github.com/ktmobility1/mapsdk_example/blob/feature/web-tutorial-md/web/tutorial_md/vue/img/InitialPage.png)

### 설치 및 설정

kt-map-sdk-js 라이브러리는 npm 패키지([kt-map-sdk-js](https://www.npmjs.com/package/kt-map-sdk-js))를 통해 설치할 수 있습니다. kt-map-sdk-js 라이브러리를 설치하려면 라이브러리를 설치하려면 프로젝트 폴더로 이동하여 다음 명령을 실행하십시오. 

```bash
npm install kt-map-sdk-js
```

Vue 프로젝트의 레이아웃을 구성하겠습니다.
src 폴더로 이동하며 파일 App.vue 의 모든 내용을 삭제합니다. App.vue 다음 내용을 작성하세요.

> src/App.tsx
> 

```jsx
<template>
    <div class="app">
        This is KT Map App
				<!-- 네비바와 지도가 들어갈 영역입니다  -->
    </div>
</template>

<script>

export default {
    name: 'App'
};
</script>

<style>
.app {
    text-align: center;
}
</style>
```

style.css 파일을 삭제하세요.

> src/main.ts
> 

main.ts의 `import './style.css'` 한 줄을 삭제하세요.

```tsx
import { createApp } from 'vue'

import App from './App.vue'

createApp(App).mount('#app')
```

이제 브라우저([http://localhost:8080/](http://localhost:8080/))에  "This is KT Map App"가 표시됩니다.

 `src/components`폴더 로 이동하여 `HelloWorld.vue`파일을 삭제하세요.

### **Create a navbar component**

화면 상단에 navbar 컴포넌트를 만드는 과정은 아래와 같습니다.

Navbar 컴포넌트를 생성하여 컨텐츠를 구성합니다.

src/components 폴더로 이동하여 Navbar.vue 파일을 생성하세요. 
Navbar.vue 파일 내에 다음과 같이 작성하세요.

> src/components/Navbar.vue
> 

```tsx
<template>
    <div class="heading">
        <h1>This is KT Vue Map</h1>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
};
</script>

<style>
body {
    margin: 0;
}
.heading {
    margin: 0;
    padding: 0px;
    background-color: black;
    color: white;
}

.heading > h1 {
    padding: 20px;
    margin: 0;
}
</style>
```

Navbar를 표시하기 위해서는

1. Navbar를 import 해야합니다.
2. App.vue의 main component template 안에 Navbar를 추가해야 합니다.

> src/App.tsx
> 

```tsx
<template>
    <div class="app">
        **<Navbar />**
    </div>
</template>

<script>
**import Navbar from './components/Navbar.vue';**
export default {
    name: 'App',
    **components: {
        Navbar,
    },**
};
</script>

<style>
.app {
    text-align: center;
}
</style>
```

아래와 같이 Navbar가 추가된 화면을 브라우저에서 확인할 수 있습니다.

![Navbar1](https://github.com/ktmobility1/mapsdk_example/blob/feature/web-tutorial-md/web/tutorial_md/vue/img/Navbar1.png)

![Navbar2](https://github.com/ktmobility1/mapsdk_example/blob/feature/web-tutorial-md/web/tutorial_md/vue/img/Navbar2.png)

### create a map component

이 단계에서는 간단한 지도 component를 만듭니다.

Navbar 아래에 전체 사이즈로 KT Map을 넣겠습니다.

KT Map에 관련된 모듈을 import를 통해 셋팅합니다.

 `components` 폴더 내부에 `Map.vue`라는 새 파일을 생성합니다.

Vue의 Map 컴포넌트를 정의합니다. 내부적으로 KT Map 라이브러리를 통해 Map을 구성합니다.

Map 컴포넌트에서 KT Map을 초기화하는 코드입니다.

```tsx
<script>
import ktGms from 'kt-map-sdk-js';
import {shallowRef, onMounted, onUnmounted, markRaw} from 'vue';

export default {
    name: 'Map',
    setup() {
        const mapContainer = shallowRef(null); // ktMap이 들어가야 할 DOM
        const map = shallowRef(null); // ktMap 객체

        onMounted(() => {
            const initialState = {lng: 127.017422, lat: 37.49144, zoom: 16}; // 초기 위도, 경도, 확대

            map.value = markRaw( // 지도 생성
                new ktGms.Map({
                    container: mapContainer.value,
                    style: 'normal',
                    center: [initialState.lng, initialState.lat],
                    zoom: initialState.zoom,
                })
            );
        }),

        onUnmounted(() => { 
            map.value?.remove(); // 기존에 생성한 map이 있다면 생성하지 않습니다.
        });

        return {
            map,
            mapContainer,
        };
    },
};
</script
```

KT Map이 들어가야 될 html은 다음과 같습니다.

```tsx
<template>
    <div class="map-wrap">
        <div class="map" ref="mapContainer"></div>
    </div>
</template>
```

위의 내용을 종합적으로 완성된 코드는 아래와 같습니다.

> src/components/Map.vue
> 

```tsx
<template>
    <div class="map-wrap">
        <div class="map" ref="mapContainer"></div>
    </div>
</template>

<script>
import ktGms from 'kt-map-sdk-js';
import {shallowRef, onMounted, onUnmounted, markRaw} from 'vue';

export default {
    name: 'Map',
    setup() {
        const mapContainer = shallowRef(null); // ktMap이 들어가야 할 DOM
        const map = shallowRef(null); // ktMap 객체

        onMounted(() => {
            const initialState = {lng: 127.017422, lat: 37.49144, zoom: 16}; // 초기 위도, 경도, 확대

            map.value = markRaw( // 지도 생성
                new ktGms.Map({
                    container: mapContainer.value,
                    style: 'normal',
                    center: [initialState.lng, initialState.lat],
                    zoom: initialState.zoom,
                })
            );
        }),

        onUnmounted(() => { 
            map.value?.remove(); // 기존에 생성한 map이 있다면 생성하지 않습니다.
        });

        return {
            map,
            mapContainer,
        };
    },
};
</script>

<style>
.map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
}

.map {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>추가적으로 Map에 대한 스타일 css입니다.
```

### **Render a map**

생성한 Map 컴포넌트를 App.tsx에 추가합니다. 

> src/App.vue
> 

```tsx
<template>
    <div class="app">
        <Navbar />
        **<Map />**
    </div>
</template>

<script>
import Navbar from './components/Navbar';
**import Map from './components/Map';**

export default {
    name: 'App',
    components: {
        Navbar,
        **Map,**
    },
};
</script>

<style>
.app {
    text-align: center;
}
</style>
```

Navbar와 KT Map이 렌더링 된 화면은 아래와 같습니다.

![NavMap](https://github.com/ktmobility1/mapsdk_example/blob/feature/web-tutorial-md/web/tutorial_md/vue/img/NavMap.png)

### Map Options

map 생성 시 map을 설정하기 위한 option들이 있습니다. 

- `style` : 지도의 스타일입니다. 기본지도, 위성지도, 하이브리드지도 등을 설정할 수 있습니다.
- `center` : 지도의 초기 중심 위치입니다.
- `zoom` : 지도의 초기 확대/축소 수준입니다.
- `bearing` : 지도의 초기 회전 각도입니다.
- `pitch` : 지도의 초기 pitch(기울기)입니다.

이 option 외에도 다른 option들이 많으며, 더 자세한 것은 Map 및 Map Options API DOCS를 확인해주세요

→ [Map API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/types/MapOptions.MapOptions.html)

→ [MapOptions API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/types/MapOptions.MapOptions.html)

### Map Event

지도에 `on`메소드를 통해 이벤트를 추가할 수 있습니다. 지도를 클릭하면 클릭한 좌표의 위경도 정보를 alert로 출력되도록 이벤트를 추가하겠습니다.

```tsx
// Map Event
map.value.on("click", (e) => {
	alert(map.value.unproject(e.point)) // 클릭한 픽셀좌표를 받아서 위경도 좌표로 변환
})
```

Map Event까지 추가한 코드는 아래와 같습니다. 

30~32라인에서 Map Event 추가 코드를 볼 수 있습니다.

```tsx
<template>
    <div class="map-wrap">
        <div class="map" ref="mapContainer"></div>
    </div>
</template>

<script>
import ktGms from 'kt-map-sdk-js';
import {shallowRef, onMounted, onUnmounted, markRaw} from 'vue';

export default {
    name: 'Map',
    setup() {
        const mapContainer = shallowRef(null); // ktMap이 들어가야 할 DOM
        const map = shallowRef(null); // ktMap 객체

        onMounted(() => {
            const initialState = {lng: 127.029414, lat: 37.471401, zoom: 16}; // 초기 위도, 경도, 확대

            map.value = markRaw( // 지도 생성
                new ktGms.Map({
                    container: mapContainer.value,
                    style: 'normal',
                    center: [initialState.lng, initialState.lat],
                    zoom: initialState.zoom,
                })
            );

            // Map Event
            map.value.on("click", (e) => {
                alert(map.value.unproject(e.point)) // 클릭한 픽셀좌표를 받아서 위경도 좌표로 변환
            })

        }),

        onUnmounted(() => { 
            map.value?.remove(); // 기존에 생성한 map이 있다면 생성하지 않습니다.
        });

        return {
            map,
            mapContainer,
        };
    },
};
</script>

<style>
.map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
}

.map {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
```

# Add Control

Control 이란 지도 영역의 모서리 중 하나에서 발생하는 모든 종류의 버튼과 정보 표시에 일반적으로 사용됩니다. 

지도에 추가할 수 있는 사용자 인터페이스 요소입니다.

NavigationControl을 지도에 추가하는 코드는 아래와 같습니다.

```tsx
map.value.addControl(new ktGms.control.NavigationControl());
```

Map 컴포넌트의 우측 상단에 네비게이션 컨트롤을 추가하겠습니다.

29번째 라인에서 추가하였습니다.

```tsx
<template>
    <div class="map-wrap">
        <div class="map" ref="mapContainer"></div>
    </div>
</template>

<script>
import ktGms from 'kt-map-sdk-js';
import {shallowRef, onMounted, onUnmounted, markRaw} from 'vue';

export default {
    name: 'Map',
    setup() {
        const mapContainer = shallowRef(null); // ktMap이 들어가야 할 DOM
        const map = shallowRef(null); // ktMap 객체

        onMounted(() => {
            const initialState = {lng: 127.017422, lat: 37.49144, zoom: 16}; // 초기 위도, 경도, 확대

            map.value = markRaw( // 지도 생성
                new ktGms.Map({
                    container: mapContainer.value,
                    style: 'normal',
                    center: [initialState.lng, initialState.lat],
                    zoom: initialState.zoom,
                })
            );
            
            **map.value.addControl(new ktGms.control.NavigationControl(),'top-right');**

        }),
        onUnmounted(() => { 
            map.value?.remove(); // 기존에 생성한 map이 있다면 생성하지 않습니다.
        });

        return {
            map,
            mapContainer,
        };
    },
};
</script>

<style>
.map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
}

.map {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
```

컨트롤을 추가하는 다른 방법으로는, 지도를 생성할 때 mapOption을 통해서 간편하게 추가 가능합니다. 이 때 생성되는 기본 위치는 `top-right` 입니다.

```tsx
map.value = markRaw(
	new ktGms.Map({
		container: mapContainer.value,
		style: 'normal',
		center: [initialState.lng, initialState.lat],
		zoom: initialState.zoom,
		**navigationControl: true**
	})
);
```

### 각 종류별 control 설명 및 추가

- Navigation Control : 지도의 zoom, bearing, pitch를 조정할 수 있는 컨트롤입니다.
- Minimap Control : 현재 지도의 미니어처 오버뷰를 표시하는 컨트롤입니다.
- Draw Control : 지도 위에서 도형을 그리고 측정할 수 있는 컨트롤입니다.
- Scale Control : 지도 축척(지면의 해당 거리에 대한 지도의 거리 비율)을 표시하는 컨트롤입니다.

위의 4개의 컨트롤러를 추가하겠습니다.

29~32라인에서 추가하였습니다.

```tsx
<template>
    <div class="map-wrap">
        <div class="map" ref="mapContainer"></div>
    </div>
</template>

<script>
import ktGms from 'kt-map-sdk-js';
import {shallowRef, onMounted, onUnmounted, markRaw} from 'vue';

export default {
    name: 'Map',
    setup() {
        const mapContainer = shallowRef(null); // ktMap이 들어가야 할 DOM
        const map = shallowRef(null); // ktMap 객체

        onMounted(() => {
            const initialState = {lng: 127.017422, lat: 37.49144, zoom: 16}; // 초기 위도, 경도, 확대

            map.value = markRaw( // 지도 생성
                new ktGms.Map({
                    container: mapContainer.value,
                    style: 'normal',
                    center: [initialState.lng, initialState.lat],
                    zoom: initialState.zoom,
                })
            );
            
            **map.value.addControl(new ktGms.control.NavigationControl(),'top-right'); // 추가
            map.value.addControl(new ktGms.control.MinimapControl(),'bottom-right'); // 추가
            map.value.addControl(new ktGms.control.DrawControl(),'top-left'); // 추가
            map.value.addControl(new ktGms.control.ScaleControl(),'bottom-left'); // 추가**

        }),
        onUnmounted(() => { 
            map.value?.remove(); // 기존에 생성한 map이 있다면 생성하지 않습니다.
        });

        return {
            map,
            mapContainer,
        };
    },
};
</script>

<style>
.map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
}

.map {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
```

Navbar와 KT Map과 4개의 컨트롤들이 추가된 화면은 아래와 같습니다. 

![ControlMap](https://github.com/ktmobility1/mapsdk_example/blob/feature/web-tutorial-md/web/tutorial_md/vue/img/ControlMap.png)

왼쪽 상단에 Draw Control, 왼쪽 하단에 Scale Control, 오른쪽 상단에 Navigation Control, 오른쪽 하단에 Minimap Control이 추가된 것을 확인할 수 있습니다.

4개의 컨트롤 이외에도 다른 컨트롤들이 있으며, 더 자세한 사항은 API DOCS를 확인해주세요

→ [Control API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/classes/Map.Map.html#addControl)

# Add Overlay

### Add Marker

Marker는 지도 상에 특정 위치에 원하는 아이콘 또는 이미지를 표출하는 기능입니다.

Marker를 생성하여 지도에 추가하는 코드는 아래와 같습니다. 

```tsx
const marker = new ktGms.overlay.Marker({
	color: "#FF0000", // Marker 옵션으로 색상을 설정합니다
	lngLat: [127.029414, 37.471401] // Marker 위치를 설정합니다
})
map.value.addOverlay(marker)
```

Map 컴포넌트에 Marker를 추가하겠습니다.

36~40라인에서 Marker 추가 코드를 볼 수 있습니다.

> src/components/Map.vue
> 

```tsx
<template>
    <div class="map-wrap">
        <div class="map" ref="mapContainer"></div>
    </div>
</template>

<script>
import ktGms from 'kt-map-sdk-js';
import {shallowRef, onMounted, onUnmounted, markRaw} from 'vue';

export default {
    name: 'Map',
    setup() {
        const mapContainer = shallowRef(null); // ktMap이 들어가야 할 DOM
        const map = shallowRef(null); // ktMap 객체

        onMounted(() => {
            const initialState = {lng: 127.029414, lat: 37.471401, zoom: 16}; // 초기 위도, 경도, 확대

            map.value = markRaw( // 지도 생성
                new ktGms.Map({
                    container: mapContainer.value,
                    style: 'normal',
                    center: [initialState.lng, initialState.lat],
                    zoom: initialState.zoom,
                })
            );

            // Map Event
            map.value.on("click", (e) => {
                alert(map.value.unproject(e.point)) // 클릭한 픽셀좌표를 받아서 위경도 좌표로 변환
            })

            // Control
            map.value.addControl(new ktGms.control.NavigationControl(),'top-right');
            map.value.addControl(new ktGms.control.MinimapControl(),'bottom-right');
            map.value.addControl(new ktGms.control.DrawControl(),'top-left');
            map.value.addControl(new ktGms.control.ScaleControl(),'bottom-left');

            // Marker
            const marker = new ktGms.overlay.Marker({
                color: "#FF0000", // Marker 옵션으로 색상을 설정합니다
                lngLat: [127.029414, 37.471401] // Marker 위치를 설정합니다
            })
            map.value.addOverlay(marker)

        }),

        onUnmounted(() => { 
            map.value?.remove(); // 기존에 생성한 map이 있다면 생성하지 않습니다.
        });

        return {
            map,
            mapContainer,
        };
    },
};
</script>

<style>
.map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
}

.map {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
```

마커가 추가된 화면은 아래와 같습니다.

![Marker](https://github.com/ktmobility1/mapsdk_example/blob/feature/web-tutorial-md/web/tutorial_md/vue/img/Marker.png)

마커에 대한 더 자세한 사항은 API DOCS를 확인해주세요

→ [Marker API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/classes/overlay_Marker.Marker.html)

### Add InfoWindow

InfoWindow는 지도 위의 특정 지점에 대한 상세정보를 제공하기 위한 기능입니다.

InfoWindow는 말풍선과 같은 형태를 가지며 정보를 기술하는 영역과 지도상의 특정 지점과 연결되는 말풍선 anchor로 구성됩니다.

일반적으로 인포윈도우는 지도상의 특정지점(POI)상에 직접 출력되거나 마커 상단에 출력되는 형태를 가집니다.

InfoWindow를 생성하여 지도에 추가하는 코드는 아래와 같습니다. 

```tsx
const infoWindow = new ktGms.overlay.InfoWindow()
                       .setLngLat([127.029414, 37.471701]) // InfoWindow 위치를 설정합니다
                       .setHTML("<h1>InfoWindow</h1>"); 
map.value.addOverlay(infoWindow)
```

Map 컴포넌트에 InfoWindow를 추가하겠습니다.

48~51라인에서 InfoWindow 추가 코드를 볼 수 있습니다.

```tsx
<template>
    <div class="map-wrap">
        <div class="map" ref="mapContainer"></div>
    </div>
</template>

<script>
import ktGms from 'kt-map-sdk-js';
import {shallowRef, onMounted, onUnmounted, markRaw} from 'vue';

export default {
    name: 'Map',
    setup() {
        const mapContainer = shallowRef(null); // ktMap이 들어가야 할 DOM
        const map = shallowRef(null); // ktMap 객체

        onMounted(() => {
            const initialState = {lng: 127.029414, lat: 37.471401, zoom: 16}; // 초기 위도, 경도, 확대

            map.value = markRaw( // 지도 생성
                new ktGms.Map({
                    container: mapContainer.value,
                    style: 'normal',
                    center: [initialState.lng, initialState.lat],
                    zoom: initialState.zoom,
                })
            );

            // Map Event
            map.value.on("click", (e) => {
                alert(map.value.unproject(e.point)) // 클릭한 픽셀좌표를 받아서 위경도 좌표로 변환
            })

            // Control
            map.value.addControl(new ktGms.control.NavigationControl(),'top-right');
            map.value.addControl(new ktGms.control.MinimapControl(),'bottom-right');
            map.value.addControl(new ktGms.control.DrawControl(),'top-left');
            map.value.addControl(new ktGms.control.ScaleControl(),'bottom-left');

            // Marker
            const marker = new ktGms.overlay.Marker({
                color: "#FF0000", // Marker 옵션으로 색상을 설정합니다
                lngLat: [127.029414, 37.471401] // Marker 위치를 설정합니다
            })
            map.value.addOverlay(marker)

            // InfoWindow
            const infoWindow = new ktGms.overlay.InfoWindow()
                                    .setLngLat([127.029414, 37.471701]) // InfoWindow 위치를 설정합니다
                                    .setHTML("<h1>InfoWindow</h1>"); 
            map.value.addOverlay(infoWindow)
        }),

        onUnmounted(() => { 
            map.value?.remove(); // 기존에 생성한 map이 있다면 생성하지 않습니다.
        });

        return {
            map,
            mapContainer,
        };
    },
};
</script>

<style>
.map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
}

.map {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
```

인포윈도우가 추가된 화면은 아래와 같습니다.

![InfoWindow](https://github.com/ktmobility1/mapsdk_example/blob/feature/web-tutorial-md/web/tutorial_md/vue/img/InfoWindow.png)

### Custom InfoWindow

html 템플릿과 데이터를 분리하여 생성하고, InfoWindow의 [setDataTemplate](https://map.gis.kt.com/mapsdk/web/apidoc/classes/overlay_InfoWindow.InfoWindow.html#setDataTemplate) 메소드를 통해 커스텀할 수 있습니다. 

html 템플릿과 데이터를 분리하여 생성하고, setDataTemplate 메소드를 사용하여 생성한 InfoWindow를 지도에 추가하는 코드는 아래와 같습니다. 

```tsx
// InfoWindow
// InfoWindow의 custom HTML에 들어갈 JSON 데이터 객체입니다
const data = {
	title: "KT연구개발센터",
	category: "산업/기간시설",
	url: "https://map.gis.kt.com/index.html?v=1693543266115",
	addr: "서울특별시 서초구 태봉로 151",
	tel: "02-526-5114",
};

// InfoWindow에 보여줄 HTML을 생성합니다. 위에서 선언한 data의 값을 #{title}과 같이 사용할 수 있습니다
const tmpl = `
<div style="padding: 10px 10px 15px; width:180px">
	<div style="display: inline-block;vertical-align: top;">
		<strong style="margin-right: 6px;font-size: 16px;font-weight: 700;letter-spacing: -1px;color: #0068c3;line-height: 23px;">#{title}</strong>
		<span style="font-size: 13px;line-height: 19px;color: #8f8f8f;">#{category}</span>
	</div>
	<div style="margin-top: 5px;">
		<span style="font-size: 14px;line-height: 22px;color: #424242;">#{addr}</span>
	</div>
</div>`;
const infoWindow = new ktGms.overlay.InfoWindow()
                       .setLngLat([127.029414, 37.471701]) // InfoWindow 위치를 설정합니다
                       .setDataTemplate(tmpl, data) // InfoWindow에 들어갈 템플릿과 데이터를 셋팅합니다

map.value.addOverlay(infoWindow) // 지도에 InfoWindow를 추가합니다
```

Map 컴포넌트에 Custom InfoWindow를 추가하겠습니다.

44~67라인에서 Custom InfoWindow 추가 코드를 볼 수 있습니다.

```tsx
<template>
    <div class="map-wrap">
        <div class="map" ref="mapContainer"></div>
    </div>
</template>

<script>
import ktGms from 'kt-map-sdk-js';
import {shallowRef, onMounted, onUnmounted, markRaw} from 'vue';

export default {
    name: 'Map',
    setup() {
        const mapContainer = shallowRef(null); // ktMap이 들어가야 할 DOM
        const map = shallowRef(null); // ktMap 객체

        onMounted(() => {
            const initialState = {lng: 127.029414, lat: 37.471401, zoom: 16}; // 초기 위도, 경도, 확대

            map.value = markRaw( // 지도 생성
                new ktGms.Map({
                    container: mapContainer.value,
                    style: 'normal',
                    center: [initialState.lng, initialState.lat],
                    zoom: initialState.zoom,
                })
            );

            // Control
            map.value.addControl(new ktGms.control.NavigationControl(),'top-right');
            map.value.addControl(new ktGms.control.MinimapControl(),'bottom-right');
            map.value.addControl(new ktGms.control.DrawControl(),'top-left');
            map.value.addControl(new ktGms.control.ScaleControl(),'bottom-left');

            // Marker
            const marker = new ktGms.overlay.Marker({
                color: "#FF0000", // Marker 옵션으로 색상을 설정합니다
                lngLat: [127.029414, 37.471401] // Marker 위치를 설정합니다
            })
            map.value.addOverlay(marker)

            // InfoWindow
            // InfoWindow의 custom HTML에 들어갈 JSON 데이터 객체입니다
            const data = {
                title: "KT연구개발센터",
                category: "산업/기간시설",
                url: "https://map.gis.kt.com/index.html?v=1693543266115",
                addr: "서울특별시 서초구 태봉로 151",
                tel: "02-526-5114",
            };

            // InfoWindow에 보여줄 HTML을 생성합니다. 위에서 선언한 data의 값을 #{title}과 같이 사용할 수 있습니다
            const tmpl = `
            <div style="padding: 10px 10px 15px; width:180px">
                <div style="display: inline-block;vertical-align: top;">
                    <strong style="margin-right: 6px;font-size: 16px;font-weight: 700;letter-spacing: -1px;color: #0068c3;line-height: 23px;">#{title}</strong>
                    <span style="font-size: 13px;line-height: 19px;color: #8f8f8f;">#{category}</span>
                </div>
                <div style="margin-top: 5px;">
                    <span style="font-size: 14px;line-height: 22px;color: #424242;">#{addr}</span>
                </div>
            </div>`;
            const infoWindow = new ktGms.overlay.InfoWindow()
                                    .setLngLat([127.029414, 37.471701]) // InfoWindow 위치를 설정합니다
                                    .setDataTemplate(tmpl, data) // InfoWindow에 들어갈 템플릿과 데이터를 셋팅합니다

            map.value.addOverlay(infoWindow) // 지도에 InfoWindow를 추가합니다
        }),

        onUnmounted(() => { 
            map.value?.remove(); // 기존에 생성한 map이 있다면 생성하지 않습니다.
        });

        return {
            map,
            mapContainer,
        };
    },
};
</script>

<style>
.map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
}

.map {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
```

커스텀한 인포윈도우가 추가된 화면은 아래와 같습니다.

![CustomInfoWindow](https://github.com/ktmobility1/mapsdk_example/blob/feature/web-tutorial-md/web/tutorial_md/vue/img/CustomInfoWindow.png)

인포윈도우에 대한 더 자세한 사항은 API DOCS를 확인해주세요

→ [InfoWindow API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/classes/overlay_InfoWindow.InfoWindow.html)

# Add Layer

Layer는 Geography 데이터를 지도 상에 시각적으로 표현하는 기능입니다. 

Layer는 Source와 Style 요소로 정의됩니다. 

Polygon Layer를 예시로 설명 드리겠습니다. Polygon Layer는 데이터인 GeoJSON Source와 시각적 요소인 Fill Style로 구성됩니다. 그리고 GeoJSON Source는 Polygon 형태의 Geometry로 구성되어 있습니다. 

![Layer](https://github.com/ktmobility1/mapsdk_example/blob/feature/web-tutorial-md/web/tutorial_md/vue/img/Layer.png)

### Geometry, Source, Style

**Geometry**

Geometry는 포인트, 라인, 폴리곤, 원 등에 대한 geography data입니다.

Polygon형태의 Geometry를 생성하는 코드는 아래와 같습니다. 

```tsx
const geometry = new ktGms.geometry.Polygon(
    [
        [
            [127.044414, 37.479701],
            [127.044414, 37.469701],
            [127.035514, 37.469701],
            [127.044414, 37.479701]
        ],
    ],
    { "id": "06740", "area": "서울시 서초구", "description": "핫플레이스 상권" } // property에 부가적인 정보를 저장할 수 있습니다
);
```

→ [Geometry API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/classes/geometry_Circle.Circle.html)

**Source**

Source는 지도에 표출되어야하는 데이터를 나타냅니다. 소스는 `geojson`, `vector`, `raster`, `raster-dem`, `image` 중 하나의 `type`을 가져야합니다. 소스에는 스타일 세부정보가 포함되어 있지 않기 때문에 소스를 추가하는 것으로는 맵에 데이터를 표시하기 충분하지 않습니다. 

따라서 레이어가 소스를 참고하여 시각적 표현을 제공합니다.

GeoJSON Source의 데이터로 Polygon geometry를 바인딩하는 코드는 아래와 같습니다.

```tsx
const geometry = new ktGms.geometry.Polygon(
    [
        [
            [127.044414, 37.479701],
            [127.044414, 37.469701],
            [127.035514, 37.469701],
            [127.044414, 37.479701]
        ],
    ],
    { "id": "06740", "area": "서울시 서초구", "description": "핫플레이스 상권" } // property에 부가적인 정보를 저장할 수 있습니다
);

const source = new ktGms.source.GeoJSONSource("geojsonSource", { data: geometry });
```

→ [Source API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/classes/source_GeoJSONSource.GeoJSONSource.html)

**Style**

Layer 설정 시 시각적인 요소들은 Style 객체로 정의합니다. Paint 요소와 Layout 요소로 Style 객체를 정의합니다.

폴리곤 도형을 채울 Fill Style을 생성하는 코드는 아래와 같습니다.

```tsx
const style = new ktGms.style.FillStyle(
    {
        "fill-color": "#ff0000", // 채우기 색상
        "fill-opacity": 0.6, // 채우기 투명도
    }, 
    {
        "visibility": "visible"
    }
);
```

→ [Style API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/classes/style_FillStyle.FillStyle.html)

Polygon Layer에 geojson source를 바인딩하고, FillStyle으로 Polygon의 Style을 설정하는 코드는 아래와 같습니다.

```tsx
const geometry = new ktGms.geometry.Polygon(
    [
        [
            [127.044414, 37.479701],
            [127.044414, 37.469701],
            [127.035514, 37.469701],
            [127.044414, 37.479701]
        ],
    ],
    { "id": "06740", "area": "서울시 서초구", "description": "핫플레이스 상권" } // property에 부가적인 정보를 저장할 수 있습니다
);

const source = new ktGms.source.GeoJSONSource("geojsonSource", { data: geometry });

const style = new ktGms.style.FillStyle(
    {
        "fill-color": "#ff0000", // 채우기 색상
        "fill-opacity": 0.6, // 채우기 투명도
    }, 
    {
        "visibility": "visible"
    }
);

const polygonLayer = new ktGms.layer.PolygonLayer("triangle", style, source);
```

위에서 설명한 Polygon Layer를 ktMapInstance에 추가하겠습니다.

Layer를 지도에 추가하려면 Map이 로딩된 이후여야 합니다. 

그래서, ktMapInstance 객체에 로딩 이벤트를 바인딩하고 콜백함수로 Polygon Layer를 추가합니다.

```tsx
//...ktMapInstance 생성
map.value.on("load", ()=>{
	//...이 부분에 레이어 추가 코드를 작성합니다
})
```

Layer 추가까지 한 코드는 아래와 같습니다.

69~99라인에서 Layer 추가 코드를 볼 수 있습니다.

```tsx
<template>
    <div class="map-wrap">
        <div class="map" ref="mapContainer"></div>
    </div>
</template>

<script>
import ktGms from 'kt-map-sdk-js';
import {shallowRef, onMounted, onUnmounted, markRaw} from 'vue';

export default {
    name: 'Map',
    setup() {
        const mapContainer = shallowRef(null); // ktMap이 들어가야 할 DOM
        const map = shallowRef(null); // ktMap 객체

        onMounted(() => {
            const initialState = {lng: 127.029414, lat: 37.471401, zoom: 16}; // 초기 위도, 경도, 확대

            map.value = markRaw( // 지도 생성
                new ktGms.Map({
                    container: mapContainer.value,
                    style: 'normal',
                    center: [initialState.lng, initialState.lat],
                    zoom: initialState.zoom,
                })
            );

            // Control
            map.value.addControl(new ktGms.control.NavigationControl(),'top-right');
            map.value.addControl(new ktGms.control.MinimapControl(),'bottom-right');
            map.value.addControl(new ktGms.control.DrawControl(),'top-left');
            map.value.addControl(new ktGms.control.ScaleControl(),'bottom-left');

            // Marker
            const marker = new ktGms.overlay.Marker({
                color: "#FF0000", // Marker 옵션으로 색상을 설정합니다
                lngLat: [127.029414, 37.471401] // Marker 위치를 설정합니다
            })
            map.value.addOverlay(marker)

            // InfoWindow
            // InfoWindow의 custom HTML에 들어갈 JSON 데이터 객체입니다
            const data = {
                title: "KT연구개발센터",
                category: "산업/기간시설",
                url: "https://map.gis.kt.com/index.html?v=1693543266115",
                addr: "서울특별시 서초구 태봉로 151",
                tel: "02-526-5114",
            };

            // InfoWindow에 보여줄 HTML을 생성합니다. 위에서 선언한 data의 값을 #{title}과 같이 사용할 수 있습니다
            const tmpl = `
            <div style="padding: 10px 10px 15px; width:180px">
                <div style="display: inline-block;vertical-align: top;">
                    <strong style="margin-right: 6px;font-size: 16px;font-weight: 700;letter-spacing: -1px;color: #0068c3;line-height: 23px;">#{title}</strong>
                    <span style="font-size: 13px;line-height: 19px;color: #8f8f8f;">#{category}</span>
                </div>
                <div style="margin-top: 5px;">
                    <span style="font-size: 14px;line-height: 22px;color: #424242;">#{addr}</span>
                </div>
            </div>`;
            const infoWindow = new ktGms.overlay.InfoWindow()
                                    .setLngLat([127.029414, 37.471701]) // InfoWindow 위치를 설정합니다
                                    .setDataTemplate(tmpl, data) // InfoWindow에 들어갈 템플릿과 데이터를 셋팅합니다

            map.value.addOverlay(infoWindow) // 지도에 InfoWindow를 추가합니다

            map.value.on("load", () => {
                const geometry = new ktGms.geometry.Polygon(
                    [
                        [
                            [127.044414, 37.479701],
                            [127.044414, 37.469701],
                            [127.035514, 37.469701],
                            [127.044414, 37.479701]
                        ],
                    ],
                    { "id": "06740", "area": "서울시 서초구", "description": "핫플레이스 상권" } // property에 부가적인 정보를 저장할 수 있습니다
                );
        
                const source = new ktGms.source.GeoJSONSource("geojsonSource", { data: geometry });
        
                const style = new ktGms.style.FillStyle(
                    {
                        "fill-color": "#ff0000", // 채우기 색상
                        "fill-opacity": 0.6, // 채우기 투명도
                    }, 
                    {
                        "visibility": "visible"
                    }
                );
        
                const polygonLayer = new ktGms.layer.PolygonLayer("triangle", style, source);

                // 지도에 polygon Layer를 추가합니다
                map.value.addLayer(polygonLayer);

            })
        }),

        onUnmounted(() => { 
            map.value?.remove(); // 기존에 생성한 map이 있다면 생성하지 않습니다.
        });

        return {
            map,
            mapContainer,
        };
    },
};
</script>

<style>
.map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
}

.map {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
```

### Layer Event

레이어에 `on`메소드를 통해 이벤트를 추가할 수 있습니다. 폴리곤 레이어를 클릭하면 Source 내 Property로 등록해뒀던 description이 alert로 출력되도록 이벤트를 추가하겠습니다.

```tsx
//...polygonLayer 생성
polygonLayer.on("click", (e:any) => {
    alert(e.features[0].properties["description"]);
})
```

Layer Event 까지 추가한 완성 코드는 아래와 같습니다. 

101~103라인에서 Layer Event 추가 코드를 볼 수 있습니다.

```tsx
<template>
    <div class="map-wrap">
        <div class="map" ref="mapContainer"></div>
    </div>
</template>

<script>
import ktGms from 'kt-map-sdk-js';
import {shallowRef, onMounted, onUnmounted, markRaw} from 'vue';

export default {
    name: 'Map',
    setup() {
        const mapContainer = shallowRef(null); // ktMap이 들어가야 할 DOM
        const map = shallowRef(null); // ktMap 객체

        onMounted(() => {
            const initialState = {lng: 127.029414, lat: 37.471401, zoom: 16}; // 초기 위도, 경도, 확대

            map.value = markRaw( // 지도 생성
                new ktGms.Map({
                    container: mapContainer.value,
                    style: 'normal',
                    center: [initialState.lng, initialState.lat],
                    zoom: initialState.zoom,
                })
            );

            // Control
            map.value.addControl(new ktGms.control.NavigationControl(),'top-right');
            map.value.addControl(new ktGms.control.MinimapControl(),'bottom-right');
            map.value.addControl(new ktGms.control.DrawControl(),'top-left');
            map.value.addControl(new ktGms.control.ScaleControl(),'bottom-left');

            // Marker
            const marker = new ktGms.overlay.Marker({
                color: "#FF0000", // Marker 옵션으로 색상을 설정합니다
                lngLat: [127.029414, 37.471401] // Marker 위치를 설정합니다
            })
            map.value.addOverlay(marker)

            // InfoWindow
            // InfoWindow의 custom HTML에 들어갈 JSON 데이터 객체입니다
            const data = {
                title: "KT연구개발센터",
                category: "산업/기간시설",
                url: "https://map.gis.kt.com/index.html?v=1693543266115",
                addr: "서울특별시 서초구 태봉로 151",
                tel: "02-526-5114",
            };

            // InfoWindow에 보여줄 HTML을 생성합니다. 위에서 선언한 data의 값을 #{title}과 같이 사용할 수 있습니다
            const tmpl = `
            <div style="padding: 10px 10px 15px; width:180px">
                <div style="display: inline-block;vertical-align: top;">
                    <strong style="margin-right: 6px;font-size: 16px;font-weight: 700;letter-spacing: -1px;color: #0068c3;line-height: 23px;">#{title}</strong>
                    <span style="font-size: 13px;line-height: 19px;color: #8f8f8f;">#{category}</span>
                </div>
                <div style="margin-top: 5px;">
                    <span style="font-size: 14px;line-height: 22px;color: #424242;">#{addr}</span>
                </div>
            </div>`;
            const infoWindow = new ktGms.overlay.InfoWindow()
                                    .setLngLat([127.029414, 37.471701]) // InfoWindow 위치를 설정합니다
                                    .setDataTemplate(tmpl, data) // InfoWindow에 들어갈 템플릿과 데이터를 셋팅합니다

            map.value.addOverlay(infoWindow) // 지도에 InfoWindow를 추가합니다

            map.value.on("load", () => {
                const geometry = new ktGms.geometry.Polygon(
                    [
                        [
                            [127.044414, 37.479701],
                            [127.044414, 37.469701],
                            [127.035514, 37.469701],
                            [127.044414, 37.479701]
                        ],
                    ],
                    { "id": "06740", "area": "서울시 서초구", "description": "핫플레이스 상권" } // property에 부가적인 정보를 저장할 수 있습니다
                );
        
                const source = new ktGms.source.GeoJSONSource("geojsonSource", { data: geometry });
        
                const style = new ktGms.style.FillStyle(
                    {
                        "fill-color": "#ff0000", // 채우기 색상
                        "fill-opacity": 0.6, // 채우기 투명도
                    }, 
                    {
                        "visibility": "visible"
                    }
                );
        
                const polygonLayer = new ktGms.layer.PolygonLayer("triangle", style, source);
               
                // 지도에 polygon Layer를 추가합니다
                map.value.addLayer(polygonLayer);
                
                polygonLayer.on("click", (e) => {
                    console.log('df')
                    alert(e.features[0].properties["description"]);
                })
            })

        }),

        onUnmounted(() => { 
            map.value?.remove(); // 기존에 생성한 map이 있다면 생성하지 않습니다.
        });

        return {
            map,
            mapContainer,
        };
    },
};
</script>

<style>
.map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
}

.map {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
```

Layer가 추가된 화면은 아래와 같습니다.

![Result](https://github.com/ktmobility1/mapsdk_example/blob/feature/web-tutorial-md/web/tutorial_md/vue/img/Result.png)

레이어에 대한 더 자세한 사항은 API Document를 확인해주세요.

→ [Layer API DOCS](https://map.gis.kt.com/mapsdk/web/apidoc/classes/overlay_InfoWindow.InfoWindow.html)

이상으로 리액트에서 kt map 사용하는 튜토리얼을 끝내겠습니다.