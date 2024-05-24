# 폴리라인 오버레이

---

`폴리라인 오버레이`는 지도상에 선으로 나타내는 형태의 오버레이입니다. 이를 구성하기 위해서는 최소 2개의 좌표가 필요합니다. 또한, 좌표 리스트의 순서에 따라 선이 그려집니다. 사용자는 폴리라인 오버레이의 색상과 두께를 포함한 다양한 속성을 지정하여 원하는 스타일로 선을 표현할 수 있습니다.

## 추가

---

`PolylineOverlayOptions` 클래스를 통해 lngLats 속성을 지정하여 폴리라인 오버레이를 생성할 수 있습니다.  이를 통해 폴리라인 오버레이는 생성되며, 동시에 지도에 그려집니다.

- 지도에 폴리라인 오버레이를 추가한다.

```kotlin
val polyline = ktMap.addPolylineOverlay(
    PolylineOverlayOptions()
        .lngLats(
            listOf(
                LngLat(latitude = 37.561881, longitude = 126.978225),
                LngLat(latitude = 37.563164, longitude = 126.979203),
                LngLat(latitude = 37.562511, longitude = 126.980217),
                LngLat(latitude = 37.563700, longitude = 126.980964),            )
        )
)
```

![overlay_polyline.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/polyline/img/overlay_polyline.png)

## 삭제

---

`KTMap` 메서드를 활용하여 폴리라인 오버레이를 간단히 삭제할 수 있습니다. `ktMap.removePolylineOverlay()` 메서드를 사용하면 폴리라인 오버레이를 ID나 객체를 기반으로 삭제할 수 있습니다.

- `id`로 폴리라인 오버레이를 지도에서 삭제한다.

```kotlin
ktMap.removePolylineOverlay(polyline.id)
```

- `객체`로 폴리라인 오버레이를 지도에서 삭제한다.

```kotlin
ktMap.removePolylineOverlay(polyline)
```

## 좌표열

---

`lngLats` 속성을 통해 폴리라인 오버레이의 좌표열를 설정할 수 있습니다. `최소 2개`의 좌표가 필요합니다. 또한, 좌표 리스트의 순서에 따라 선이 그려집니다.

- 폴리라인 오버레이 생성 시 좌표열을 설정한다.

```kotlin
val polyline = ktMap.addPolylineOverlay(
    PolylineOverlayOptions()
        .lngLats(
            listOf(
                LngLat(latitude = 37.574271, longitude = 126.977961),
                LngLat(latitude = 37.572562, longitude = 126.975131)
            )
        )
)
```

## 색상

---

`color` 속성을 활용하여 폴리라인 오버레이의 선 색상을 설정할 수 있습니다.

- 폴리라인 오버레이 선 색상을 빨간색으로 설정한다.

```kotlin
val polyline = ktMap.addPolylineOverlay(
    PolylineOverlayOptions()
        .lngLats(POLYLINE_OVERLAY_LNGLATS)
        .color(Color.RED)
)
```

![overlay_polyline_color.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/polyline/img/overlay_polyline_color.png)

## 두께

---

`width` 속성을 활용하여 폴리라인 오버레이의 선 두께를 조절할 수 있습니다. 이 속성은 `1 ~ Int.MAX_VALUE` 의 범위를 가지며, 값이 클 수록 선은 더 두꺼워집니다.

- 폴리라인 오버레이 선 두께를 10로 설정한다.

```kotlin
val polyline = ktMap.addPolylineOverlay(
    PolylineOverlayOptions()
        .lngLats(POLYLINE_OVERLAY_LNGLATS)
        .width(10)
)
```

![overlay_polyline_width.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/polyline/img/overlay_polyline_width.png)

## 투명도

---

`opacity` 속성을 활용하여 폴리라인 오버레이의 투명도를 조절할 수 있습니다. 이 속성은 `0.0 ~ 1.0` 의 범위를 가지며, 값이 작을 수록 오버레이는 더 투명해집니다.

- 폴리라인 오버레이 생성 시 투명도를 0.5f 로 설정한다.

```kotlin
val polyline = ktMap.addPolylineOverlay(
    PolylineOverlayOptions()
        .lngLats(POLYLINE_OVERLAY_LNGLATS)
        .width(5)
        .opacity(0.5f)
)
```

![overlay_polyline_opacity.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/polyline/img/overlay_polyline_opacity.png)