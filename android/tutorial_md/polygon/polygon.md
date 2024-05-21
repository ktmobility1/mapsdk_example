# 폴리곤 오버레이

---

`폴리곤 오버레이`는 지도상에 면으로 나타내는 다각형 형태의 오버레이입니다. 이를 구성하기 위해서는 `최소 3개의 꼭지점 좌표`가 필요합니다. 또한, 좌표 리스트의 순서에 따라 다각형이 그려집니다. 사용자는 폴리곤 오버레이의 색상과 투명도를 포함한 다양한 속성을 지정하여 원하는 모양과 스타일로 다각형을 표현할 수 있습니다.

## 추가

---

`PolygonOverlayOptions` 클래스를 통해 `lngLats` 속성을 지정하여 폴리곤을 생성할 수 있습니다.  이를 통해 폴리곤 오버레이는 생성되며, 동시에 지도에 그려집니다.

- 지도에 폴리곤 오버레이를 추가한다.

```kotlin
val polygon = ktMap.addPolygonOverlay(
    PolygonOverlayOptions()
        .lngLats(
            listOf(
                listOf(
                    LngLat(126.979739, 37.564147), 
                    LngLat(126.978096, 37.562527), 
                    LngLat(126.979511, 37.561341), 
                    LngLat(126.981949, 37.562428), 
                    LngLat(126.982102, 37.563797), 
                )
            )
        )
)
```

![overlay_polygon_add.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/polygon/img/overlay_polygon_add.png)

## 삭제

---

`KTMap` 메서드를 활용하여 폴리곤 오버레이를 간단히 삭제할 수 있습니다. `ktMap.removePolygonOverlay()` 메서드를 사용하면 폴리곤 오버레이를 ID나 객체를 기반으로 삭제할 수 있습니다.

- `id` 로 폴리곤 오버레이를 지도에서 삭제한다.

```kotlin
ktMap.removePolygonOverlay(polygon.id)
```

- `객체`로 폴리곤 오버레이를 지도에서 삭제한다.

```kotlin
ktMap.removePolygonOverlay(polygon)
```

## 좌표열

---

`lngLats` 속성을 통해 폴리곤 오버레이의 꼭지점 좌표를 설정할 수 있습니다. 최소 3개의 꼭지점 좌표가 필요합니다. 또한, 좌표 리스트의 순서에 따라 다각형이 그려집니다. 폴리곤 오버레이 lngLats 속성은 `이중리스트` 형태를 가지며, 여기서 `첫번째 리스트`가 좌표열을 나타냅니다.

- 폴리곤 오버레이 좌표열을 설정한다.

```kotlin
val polygon = ktMap.addPolygonOverlay(
    PolygonOverlayOptions()
        .lngLats(
            listOf(
                listOf(
                    LngLat(126.979739, 37.564147), 
                    LngLat(126.978096, 37.562527), 
                    LngLat(126.979511, 37.561341), 
                    LngLat(126.981949, 37.562428), 
                    LngLat(126.982102, 37.563797), 
                )
            )
        )
)
```

## 내부 홀

---

`lngLats` 속성을 활용하여 폴리곤 오버레이의 내부 홀 좌표열을 설정할 수 있습니다. 내부 홀은 투명한 색상으로 표시되며, 이를 통해 다각형 내부의 공간을 표현할 수 있습니다. 내부 홀 또한 `최소 3개의 좌표`로 구성되어야 합니다. 폴리곤 오버레이 lngLats 속성은 이중리스트 형태를 가지며, 여기서 `두번째 리스트`가 내부홀 좌표열을 나타냅니다.

- 폴리곤 오버레이 내부 홀 좌표열을 설정한다.

```kotlin
val polygon = ktMap.addPolygonOverlay(
    PolygonOverlayOptions()
        .lngLats(
            listOf(
		            // 꼭지점 좌표열
                listOf(
                    LngLat(126.979739, 37.564147), 
                    LngLat(126.978096, 37.562527), 
                    LngLat(126.979511, 37.561341), 
                    LngLat(126.981949, 37.562428), 
                    LngLat(126.982102, 37.563797), 
                ),
                // 내부 홀
                listOf(
		                LngLat(latitude = 37.562802, longitude = 126.979786),
		                LngLat(latitude = 37.562159, longitude = 126.980039),
		                LngLat(latitude = 37.562835, longitude = 126.981008),
		                LngLat(latitude = 37.563343, longitude = 126.980693)
		            )
            )
        )
)
```

![overlay_polygon_holes.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/polygon/img/overlay_polygon_holes.png)

## 색상

---

`color` 속성을 활용하여 폴리곤 오버레이의 면 색상을 설정할 수 있습니다.

- 폴리곤 오버레이 면 색상을 파란색으로 설정한다.

```kotlin
val polygon = ktMap.addPolygonOverlay(
    PolygonOverlayOptions()
        .lngLats(POLYGON_OVERLAY_LNGLATS)
        .color(Color.BLUE)
)
```

![overlay_polygon_color.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/polygon/img/overlay_polygon_color.png)

## 테두리 색상

---

`outlineColor` 속성을 활용하여 폴리곤 오버레이의 테두리 색상을 설정할 수 있습니다.

- 폴리곤 오버레이 테두리 색상을 빨간색으로 설정한다.

```kotlin
val polygon = ktMap.addPolygonOverlay(
    PolygonOverlayOptions()
        .lngLats(POLYGON_OVERLAY_LNGLATS)
        .color(Color.YELLOW)
        .outlineColor(Color.RED)
)
```

![overlay_polygon_outline_color.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/polygon/img/overlay_polygon_outline_color.png)

## 투명도

---

`opacity` 속성을 활용하여 폴리곤 오버레이의 투명도를 조절할 수 있습니다. 이 속성은 `0.0 ~ 1.0` 의 범위를 가지며, 값이 작을 수록 오버레이는 더 투명해집니다.

- 폴리곤 오버레이 투명도를 0.5f 로 설정한다.

```kotlin
val polygon = ktMap.addPolygonOverlay(
    PolygonOverlayOptions()
        .lngLats(POLYGON_OVERLAY_LNGLATS)
        .color(Color.YELLOW)
        .opacity(0.5f)
)
```

![overlay_polygon_outline_opacity.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/polygon/img/overlay_polygon_outline_opacity.png)