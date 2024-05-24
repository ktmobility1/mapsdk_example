# 오버레이 공통

---

`오버레이`는 지도에 정보를 표시하기 위한 그래픽 요소를 말합니다. `KT Map SDK`로 지도 위에 다양한 형식의 이미지 및 도형을 그릴 수 있습니다. `KT Map SDK`는 `마커`, `인포윈도우`, `폴리곤(다각형)`, `폴리라인(선)` 를 제공합니다.

## 오버레이 생성

---

`KTMap`의 오버레이 추가 API를 활용하여 손쉽게 오버레이를 생성 할 수 있습니다. 생성된 오버레이는 지도 위에 그려집니다. 또한 `OverlayOptions` 객체를 활용하여 원하는 오버레이의 특성을 지정할 수 있습니다.  

- `KTMap` 메서드를 통해 오버레이를 추가한다.

```kotlin
// 마커 추가
val marker : Marker = ktMap.addMarker(
    MarkerOptions()
        .position(MARKER_POSITION)
        .text("marker")
)
// 폴리곤 추가
val polygon : PolygonOverlay = ktMap.addPolygonOverlay(
    PolygonOverlayOptions()
        .lngLats(POLYGON_OVERLAY_POSITION)
        .color(Color.YELLOW)
)
```

## 오버레이 삭제

---

`KTMap`의 오버레이 삭제 API를 활용하여 간편하게 오버레이를 삭제 할 수 있습니다. 오버레이는 `객체` 및 `id`를 통해 삭제할 수 있습니다. 오버레이가 삭제되면 지도에서도 완전히 사라집니다.

- 오버레이 id로 삭제한다.

```kotlin
ktMap.removeMarker(marker.id)
```

- 오버레이 객체로 삭제한다.

```kotlin
ktMap.removeMarker(marker)
```

## 오버레이 업데이트

---

오버레이 속성을 변경하여 오버레이를 업데이트 할 수 있습니다.  지도에 실시간으로 변경된 내용이 반영됩니다.

- 오버레이 속성을 변경한다.

```kotlin
val polygon = ktMap.addPolygonOverlay(
    PolygonOverlayOptions()
        .lngLats(POLYGON_OVERLAY_POSITION)
        .color(Color.YELLOW)
)
// 폴리곤 색상 변경
polygon.color = Color.GREEN
```

## 오버레이 우선순위

---

여러 오버레이가 겹쳐질 경우, 우선순위가 높은 오버레이가 낮은 오버레이를 가리게 됩니다. 사용자는 우선순위 설정을 통해 이러한 겹침 현상을 제어할 수 있습니다. 따라서 지도 상에서의 특정 오버레이가 다른 오버레이들보다 우선적으로 표시되도록 설정할 수 있습니다.

### z-index

---

오버레이 `z-index` 속성을 활용하면, 오버레이 간에 우선순위를 지정할 수 있습니다. `z-index` 값이 큰 오버레이일수록 `z-index` 값이 작은 오버레이 위에 그려집니다. 중요한 점은 이 우선순위가 동일한 타입의 오버레이 간에만 적용된다는 것입니다. 즉, 마커는 마커끼리 `z-index` 우선순위가 적용됩니다. 이를 통해 사용자는 지도 위의 오버레이들이 겹쳤을 때 어떤 오버레이가 먼저 보여질지를 제어할 수 있습니다.

- 마커의`z-Index` 속성 값을 설정한다.

```kotlin
// 고양이 마커 z-Index 100 설정
ktMap.addMarker(
    MarkerOptions()
        .position(CAT_POSITION)
        .icon(catIcon)
        .zIndex(100)
)
// 강아지 마커 z-Index 150 설정
ktMap.addMarker(
    MarkerOptions()
        .position(DOG_POSITION)
        .color(dogIcon)
        .zIndex(150)
)
// 코끼리 마커 z-Index 200 설정
ktMap.addMarker(
    MarkerOptions()
        .position(ELEPHANT_POSITION)
        .icon(elephantIcon)
        .zIndex(200)
)
```

![Untitled](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/overlay/img/Untitled.png)

## 이벤트

---

오버레이에 대한 이벤트가 필요하면 `KTMap`에 등록해서 사용할 수 있습니다.

### 오버레이 탭 이벤트

---

모든 오버레이는 사용자의 탭 이벤트를 감지하고 처리할 수 있습니다. 오버레이에 대한 `TapListener` 는 `KTMap` 객체를 통해 지정할 수 있습니다. 다수의 탭 이벤트를 등록도 가능합니다.

- 마커 `TapListener` 를 등록한다

```kotlin
// Marker 탭 이벤트 등록
ktMap.addOnMarkerTabListener(object : OnMarkerTapListener {
      override fun onTap(overlay: PointOverlay) {
          val marker = overlay as Marker
          Toast.makeText(context, "Marker : ${marker.id}", Toast.LENGTH_SHORT).show()
      }
  })
```