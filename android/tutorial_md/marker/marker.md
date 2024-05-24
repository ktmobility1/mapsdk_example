# 마커

---

`마커`는 지도에서 특정 위치를 나타내기 위한 오버레이 입니다. 일반적으로 지도의 특정 좌표에 아이콘으로 표시됩니다. 사용자는 이를 통해 특정 장소를 찾거나 표시할 수 있습니다. 캡션, 인포윈도우를 이용해 추가적인 정보를 나타낼 수도 있습니다. 

## 추가

---

`MarkerOptions` 클래스 를 통해 `position` 속성을 지정하여 마커를 생성할 수 있습니다. 이를 통해 마커가 생성되며, 동시에 지도에 그려집니다.

- 지도에 마커를 추가한다.

```kotlin
val marker = ktMap.addMarker(
    MarkerOptions()
	    .position(LngLat(latitude = 37.571997, longitude = 126.978875))
)
```

![overlay_marker.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/marker/img/overlay_marker.png)

## 삭제

---

`KTMap` 메서드를 활용하여 마커를 간단히 삭제할 수 있습니다. `ktMap.removeMarker()` 메서드를 사용하면 마커를 ID나 객체를 기반으로 삭제할 수 있습니다.

- `id` 로 마커를 지도에서 삭제합니다.

```kotlin
ktMap.removeMarker(marker.id)
```

- `객체`로 마커를 지도에서 삭제합니다.

```kotlin
ktMap.removeMarker(marker)
```

## 좌표

---

`position` 속성을 통해 마커의 좌표를 설정할 수 있습니다. 

- 마커 생성 시 좌표를 설정합니다.

```kotlin
val marker = ktMap.addMarker(
    MarkerOptions()
	    .position(LngLat(latitude = 37.571997, longitude = 126.978875))
)
```

## 아이콘

---

아이콘은 마커 위치에 시각적으로 나타내는 이미지를 말합니다. 기본 아이콘을 제공하며, 사용자는 `icon` 속성을 활용하여 원하는 사용자 정의 아이콘을 설정할 수 있습니다.

### 기본 아이콘

`icon` 속성을 통해 마커 아이콘을 지정하지 않아도 마커를 생성할 수 있습니다. `KT Map SDK` 는 기본 마커 아이콘을 제공합니다.

![overlay_marker.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/marker/img/overlay_marker%201.png)

### 사용자 아이콘

`icon` 속성을 활용하여 원하는 사용자 정의 아이콘을 설정할 수 있습니다. 아이콘은 `Bitmap` 형식의 이미지를 지원합니다.

- Bitmap 이미지를 마커의 아이콘으로 지정한다.

```kotlin
// 비트맵 이미지
val bitmap : Bitmap = getBitmapImage(context, R.drawable.markericon)

val marker = ktMap.addMarker(
    MarkerOptions()
	    .position(LngLat(latitude = 37.571997, longitude = 126.978875))
	    .icon(bitmap)
)
```

![overlay_marker_icon.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/marker/img/overlay_marker_icon.png)

## 크기

---

`iconSize` 속성을 활용하여 마커의 아이콘 사이즈를 설정할 수 있습니다. 1.0이 기본 아이콘 사이즈이며, 2.0로 설정하면 2배의 사이즈가 됩니다.

- 마커의 아이콘 크기를 2.0으로 설정한다.

```kotlin
val marker = ktMap.addMarker(
    MarkerOptions()
	    .position(LngLat(latitude = 37.571997, longitude = 126.978875))
	    .iconSize(2.0)
)
```

![overlay_marker_icon_size.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/marker/img/overlay_marker_icon_size.png)

## 회전

---

`rotate` 속성을 이용하면 마커를 원하는 각도로 회전시킬 수 있습니다. 이 때 설정 값은 각도를 나타내며, 0은 위쪽을, 90은 오른쪽을, 180은 아래쪽을 향하게 됩니다.

- 마커가 오른쪽 방향을 향하도록 설정한다.

```kotlin
val marker = ktMap.addMarker(
    MarkerOptions()
	    .position(LngLat(latitude = 37.571997, longitude = 126.978875))
	    .rotate(90)
)
```

![overlay_marker_rotate.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/marker/img/overlay_marker_rotate.png)

## 캡션

---

캡션은 일반적으로 지도 상의 특정 요소에 대한 설명이나 추가 정보를 제공하는 텍스트입니다. 마커 이미지와 함께 텍스트로 정보를 제공할 수 있습니다.

### 캡션 텍스트

---

`captionText` 속성을 이용하면 마커 캡션에서 표시할 텍스트를 설정 할 수 있습니다.

- “caption” 문구의 캡션 텍스트를 설정한다.

```kotlin
val marker = ktMap.addMarker(
    MarkerOptions()
	    .position(LngLat(latitude = 37.571997, longitude = 126.978875))
	    .captionText("caption")
)
```

![overlay_marker_caption_text.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/marker/img/overlay_marker_caption_text.png)

### 캡션 색상

---

`captionColor` 속성을 이용해서 마커 캡션 텍스트의 색상을 설정 할 수 있습니다. `captionText` 와 함께 사용됩니다.

- 캡션 텍스트 색상을 파란색으로 설정한다.

```kotlin
val marker = ktMap.addMarker(
    MarkerOptions()
	    .position(LngLat(latitude = 37.571997, longitude = 126.978875))
	    .captionText("caption")
	    .captionColor(Color.BLUE)
)
```

![overlay_marker_caption_color.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/marker/img/overlay_marker_caption_color.png)

### 캡션 사이즈

---

`captionSize` 속성을 이용해서 마커 캡션 텍스트 크기를 설정 할 수 있습니다. `captionText` 와 함께 사용됩니다.

- 캡션 텍스트 크기를 30으로 설정한다.

```kotlin
val marker = ktMap.addMarker(
    MarkerOptions()
	    .position(LngLat(latitude = 37.571997, longitude = 126.978875))
	    .captionText("caption")
	    .captionSize(30)
)
```

![overlay_marker_caption_size.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/marker/img/overlay_marker_caption_size.png)

### 캡션 오프셋

---

`captionOffset` 속성을 이용해서 마커 아이콘과 캡션 간의 거리를 설정 할 수 있습니다. 마커가 지도에 표시될 때 캡션의 위치를 정확하게 조절하기 위해 사용됩니다. `captionText` 와 함께 사용됩니다.

- 캡션 오프셋을 4로 설정한다.

```kotlin
val marker = ktMap.addMarker(
    MarkerOptions()
	    .position(LngLat(latitude = 37.571997, longitude = 126.978875))
	    .captionText("caption")
	    .captionOffset(4)
)
```

![overlay_marker_caption_offset.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/marker/img/overlay_marker_caption_offset.png)

### 캡션 앵커

---

`captionAnchor` 속성을 이용해서 캡션이 정렬되는 기준을 설정할 수 있습니다. `Marker.Anchor.LEFT` 로 설정하면 캡션의 왼쪽이 기준점이 되어 마커와 정렬됩니다. 이 속성은`captionText` 와 함께 사용됩니다. `Marker.Anchor`클래스를 통해 방향을 설정할 수 있습니다.

- 캡션 앵커를 Marker.Anchor.LEFT 로 설정하다.

```kotlin
val marker = ktMap.addMarker(
    MarkerOptions()
	    .position(LngLat(latitude = 37.571997, longitude = 126.978875))
	    .captionText("caption")
	    .captionAnchor(Marker.Anchor.LEFT)
)
```

![overlay_marker_caption_anchor.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/marker/img/overlay_marker_caption_anchor.png)

## 인포윈도우

---

마커에 대한 추가 정보를 제공하는 팝업 형태의 창입니다. 일반적으로 마커와 관련된 정보를 표시합니다. 

### 추가

`MarkerOptions` 클래스의 `text` 속성으로 인포윈도우 타이틀을, `snippet` 속성으로 서브타이틀을 설정 할 수 있습니다. `text` 속성이 설정되면 인포윈도우가 생성됩니다.

- 마커 생성 시 InfoWindow 타이틀, 스니펫을 설정한다.

```kotlin
val marker = ktMap.addMarker(
    MarkerOptions()
	    .position(LngLat(latitude = 37.571997, longitude = 126.978875))
	    .title("title")
	    .snippet("snippet")
)
```

![overlay_marker_infowindow.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/marker/img/overlay_marker_infowindow.png)

### 열기

---

마커의 `openInfoWindow()` 메서드를 호출하여 생성된 인포윈도우를 화면에 표시할 수 있습니다. 

- 인포윈도우를 표출한다.

```kotlin
marker.openInfoWindow()
```

### 닫기

---

마커의 `closeInfoWindow()` 메서드를 호출하여 인포윈도우를 화면에서 숨길 수 있습니다.

- 인포윈도우를 숨긴다.

```kotlin
marker.closeInfoWindow()

```

### 커스텀 어댑터

---

`InfoWindowAdapter` 인터페이스를 구현하여 사용자 정의 어댑터를 생성할 수 있습니다. `getView()` 메서드를 재정의하여 반환되는 `View`가 지도에 표시됩니다. `KTMap` `setInfoWindowAdapter()` 메서드를 통해 마커의 기본 인포윈도우 어댑터를 설정 할 수 있습니다. 

- 커스텀 어댑터 구현 후 KTMap 객체를 통해 마커의 기본 어댑터로 설정한다.

```kotlin
// 커스텀 인포윈도우 어댑터 구현
val markerAdapter = object : InfoWindowAdapter {
    override fun getView(overlay: Overlay): View {
        val marker = overlay as Marker
        return View.inflate(applicationContext, R.layout.layout_custom_infowindow, null).apply {
            findViewById<TextView>(R.id.title).text = "Custom"
            findViewById<TextView>(R.id.desc).text = "InfoWindow"
        }
    }
}
// 마커 인포윈도우 어댑터 설정
ktMap.setInfoWindowAdapter(adapter = markerAdapter)
```

![overlay_marker_custom_infowindow.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/marker/img/overlay_marker_custom_infowindow.png)