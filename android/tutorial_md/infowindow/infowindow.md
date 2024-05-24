# 인포윈도우

---

`인포윈도우`는 지도에서 정보를 표현할 때 사용되는 오버레이 입니다. 기본적으로 말풍선 형태의 텍스트를 표시합니다. 

## 추가

---

`InfoWindowOptions` 클래스 `position` 속성을 통해 인포윈도우 위치를 정의할 수 있습니다. 그리고 `adapter` 속성을 통해 인포윈도우에 표시 될 어댑터를 지정 합니다. 이를 통해 인포윈도우 오버레이가 생성되며, 동시에 지도에 그려집니다. 

- 지도에 인포윈도우 오버레이를 추가합니다.

```kotlin
 val infoWindow = ktMap.addInfoWindow(
    InfoWindowOptions()
	    .position(LngLat(longitude = 126.97892, latitude = 37.57351))
	    .adapter(object : DefaultTextAdapter(context) {
	      override fun getText(overlay: InfoWindow): String {
	          return "InfoWindow"
	      }
	  })
)
```

![overlay_infowindow_open.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/infowindow/img/overlay_infowindow_open.png)

## 삭제

---

`KTMap` 객체를 활용하여 인포윈도우 오버레이를 간단히 삭제할 수 있습니다. `ktMap.removeInfoWindow()` 메서드를 사용하면 인포윈도우 오버레이를 ID나 객체를 기반으로 삭제할 수 있습니다.

- `id` 로 인포윈도우 오버레이를 지도에서 삭제합니다.

```kotlin
ktMap.removeInfoWindow(infoWindow.id)
```

- `객체`로 인포윈도우 오버레이를 지도에서 삭제합니다.

```kotlin
ktMap.removeInfoWindow(infoWindow)
```

## 열기

---

`openInfoWindow()` 메서드를 호출하여 생성된 인포윈도우를 화면에 표시할 수 있습니다. 

- 인포윈도우 오버레이를 표출한다.

```kotlin
infoWindow.openInfoWindow()
```

## 닫기

---

`closeInfoWindow()` 메서드를 호출하여 인포윈도우를 화면에서 숨길 수 있습니다.

- 인포윈도우를 숨긴다.

```kotlin
infoWindow.closeInfoWindow()
```

## 좌표

---

`position` 속성을 통해 인포윈도우 오버레이의 좌표를 설정할 수 있습니다. 

- 인포윈도우 오버레이 생성 시 좌표를 설정합니다.

```kotlin
val infoWindow = ktMap.addInfoWindow(
    InfoWindowOptions()
	    .position(LngLat(longitude = 126.97892, latitude = 37.57351))
)
```

## 어댑터

---

`adapter` 속성을 통해 인포윈도우 오버레이가 사용하는 어댑터를 설정할 수 있습니다. 어댑터 

### 기본 어댑터

---

`KT Map SDK` 에서는 `DefaultTextAdapter` 클래스를 통해 기본 어댑터를 제공합니다. 이 어댑터는 텍스트를 말풍선 형태로 표현합니다. 사용자는 `getText()` 메서드를 재정의하여 인포윈도우에 표시될 텍스트를 손쉽게 설정할 수 있습니다.

- 인포윈도우 오버레이 생성 시 어댑터를 구현해 설정한다.

```kotlin
// 인포윈도우 어댑터 구현
val infoWindowAdapter = object : DefaultTextAdapter(context) {
    override fun getText(overlay: InfoWindow): String {
        return "기본 텍스트 어댑터"
    }
}
// 인포윈도우 생성
val infoWindow = ktMap.addInfoWindow(
    InfoWindowOptions()
        .position(IW_POSITION)
        .adapter(infoWindowAdapter)
)
```

![overlay_infowindow_default_adapter.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/infowindow/img/overlay_infowindow_default_adapter.png)

### 커스텀 어댑터

---

`InfoWindowAdapter` 인터페이스를 구현하여 사용자 정의 어댑터를 생성할 수 있습니다. `getView()` 메서드를 재정의하여 반환되는 `View`가 지도에 표시됩니다. 이를 통해 사용자는 원하는 형태의 인포윈도우를 만들 수 있습니다.

- 인포윈도우 오버레이 생성 시 어댑터를 구현해 설정한다.

```kotlin
// 커스텀 인포윈도우 어댑터 구현
val infoWindowAdapter = object : InfoWindowAdapter {
    override fun getView(overlay: Overlay): View {
        val infoWindow = overlay as InfoWindow
        return View.inflate(applicationContext, R.layout.layout_custom_infowindow, null).apply {
            findViewById<TextView>(R.id.title).text = "Custom"
            findViewById<TextView>(R.id.desc).text = "InfoWindow"
        }
    }
}
// 인포윈도우 생성
val infoWindow = ktMap.addInfoWindow(
    InfoWindowOptions()
        .position(IW_POSITION)
        .adapter(infoWindowAdapter)
)
```

![overlay_infowindow_custom_adapter.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/infowindow/img/overlay_infowindow_custom_adapter.png)