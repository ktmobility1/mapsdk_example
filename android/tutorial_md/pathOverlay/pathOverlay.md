# 경로 관련 오버레이

---

`PathOverlay`는 지도상에 경로를 표현하기 위한 오버레이입니다. 선을 표현하는 방식으로 `PolylineOverlay`  과 유사하나,

경로의 구성요소인 개별 도로(Link)에 대해 색상을 적용하고, 지나간 도로에 대해 처리할 수 있습니다. 또한 `ArrowOverlay` 조합해서  경로 상에서 회전 정보를 화살표로 표현할 수 있습니다.

## 경로 오버레이 추가/삭제

---

`PathOverlayOptions` 클래스를 통해 `PathOverlay` 오버레이를 생성할 수 있습니다.  이를 통해 오버레이는 생성되며, 동시에 지도에 그려집니다.

- 지도에 오버레이를 추가한다.

```kotlin
val path = ktMap.addPathOverlay(
  PathOverlayOptions.Builder().apply {
		links(
      listOf(
            listOf(
                LngLat(latitude = 37.55320682259445, longitude = 126.9727695192017),
                LngLat(latitude = 37.55726966876823, longitude = 126.97289139202248)
            ),
            listOf(
                LngLat(latitude = 37.55726966876823, longitude = 126.97289139202248),
                LngLat(latitude = 37.55740633539673, longitude = 126.97297407409239),
                LngLat(latitude = 37.55747530737832, longitude = 126.973028783291),
                LngLat(latitude = 37.56501037083583, longitude = 126.97719537663178)
            ),
            listOf(
                LngLat(latitude = 37.56501037083583, longitude = 126.97719537663178),
                LngLat(latitude = 37.56596349439521, longitude = 126.97717583536038)
            )
        )
    )
	}.build()
)
```

![path01.jpg](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/pathOverlay/img/path01.jpg)

- `객체`로 오버레이를 지도에서 삭제한다.

```kotlin
ktMap.removePathOverlay(path)
```

## 도로(link)와 도로 좌표

---

`links` 속성을 통해 도로(link)의 좌표들을 설정할 수 있습니다. `최소 1개`의 도로(link)가 필요하며, 도로(link)내 좌표는 `최소 2개` 의 좌표가 필요합니다. 또한, 도로(link)는  리스트의 순서에 따라 선형이 그려집니다.

- 오버레이 생성 시 도로(link)의 리스트를 설정합니다.
- 개별 도로(link)는 다시 좌표 리스트를 설정합니다. 이 때 주의할 점은 다음 도로(link)의 첫전째 좌표는 이전 도로(link)의 마지막 좌표와 일치해야합니다.

```kotlin
val path = ktMap.addPathOverlay(
	PathOverlayOptions.Builder().apply {
		links( // 도로(link) 목록
      listOf(
	      // 0번째 도로(link)
        listOf( // 좌표 목록
            LngLat(latitude = 37.55320682259445, longitude = 126.9727695192017),
            LngLat(latitude = 37.55726966876823, longitude = 126.97289139202248)
        ),
        // 1번째 도로(link)
	      listOf(
            LngLat(latitude = 37.55726966876823, longitude = 126.97289139202248),
            LngLat(latitude = 37.55740633539673, longitude = 126.97297407409239),
            LngLat(latitude = 37.55747530737832, longitude = 126.973028783291),
            LngLat(latitude = 37.56501037083583, longitude = 126.97719537663178)
        ),
        // 2번째 도로(link)
        listOf(
            LngLat(latitude = 37.56501037083583, longitude = 126.97719537663178),
            LngLat(latitude = 37.56596349439521, longitude = 126.97717583536038)
        )
      )
  )	
)
```

## 도로(link) 두께

---

`width` 속성을 활용하여 오버레이의 선 두께를 조절할 수 있습니다. 이 속성은 `1 ~ Int.MAX_VALUE` 의 범위를 가지며, 값이 클 수록 선은 더 두꺼워집니다.

- 오버레이 선 두께를 10로 설정한다.

```kotlin
path.width(10)
```

![path02.jpg](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/pathOverlay/img/path02.jpg)

## 외곽선 두께

---

`strokeWidth` 속성을 활용하여 오버레이의 외곽선 두께를 조절할 수 있습니다. 이 속성은 `1 ~ Int.MAX_VALUE` 의 범위를 가지며, 값이 클 수록 선은 더 두꺼워집니다.

- 오버레이 선 두께를 10로 설정한다.

```kotlin
path.strokeWidth(10)
```

![path03.jpg](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/pathOverlay/img/path03.jpg)

## 도로(link) 색상

---

`color` , `linkColors` 속성을 활용하여 오버레이의 도로(link) 색상을 설정할 수 있습니다.

- 도로(link) 기본 색상 빨간색으로 설정한다.

```kotlin
path.color(Color.RED)
```

![path13.png](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/pathOverlay/img/path13.png)

- 도로(link)별로 색상을 설정한다.

```kotlin
path.linkColors(
	listOf(
    Color.RED, // 0번째 도로(link) 색상
    Color.GREEN, // 1번째 도로(link) 색상
    Color.YELLOW // 2번째 도로(link) 색상
	)
)
```

![path04.jpg](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/pathOverlay/img/path04.jpg)

## 경로선 반복 이미지 패턴

---

`pattern` 속성을 활용하여 오버레이의 패턴을 설정 할 수 있습니다. 예로 도로 방향을 표시하기 위한 용도로 이미지 패턴을 사용할 수 있습니다.

- 도로 방향을 나타내는 이미지를 패턴으로 설정한다.

```kotlin
path.pattern(AppCompatResources.getDrawable(this@PathActivity, R.drawable.path_pattern))
```

![path05.jpg](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/pathOverlay/img/path05.jpg)

## 지나간 도로(link) 설정

---

`currentLinkAndLngLat` 메소드를 이용해서 지나간 도로를 색상으로 표현할 수 있습니다.

현재 지나간 도로 색상은 [Color.GRAY](https://developer.android.com/reference/android/graphics/Color#GRAY) 으로 설정되어 있습니다.

- 현재 위치의 도로(link) 인덱스를 설정합니다. 동일한 도로(link)를 지나갈 수 있어 도로(link)의 인덱스 정보로 중복되는 도로(link)가 있는 경우 구분할 수 있습니다.
- 현재 도로(link)내에서  좌표를 설정합니다.

```kotlin
path.currentLinkAndLngLat(
	linkIndex = 1, 
	lngLat = LngLat(latitude = 37.55747530737832, longitude = 126.973028783291)
)
```

![path07.jpg](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/pathOverlay/img/path07.jpg)

`resetCurrentLinkAndLngLat` 메소드를 이용해서 지나간 도로를 초기화할 수 있습니다.

```kotlin
path.resetCurrentLinkAndLngLat()
```

## 지나간 도로(link) 색상

---

`passedColor` 속성을 활용하여 지나간 도로(link) 색상을 설정할 수 있습니다.

- 지나간 도로 색상을 회색으로 설정한다.

```kotlin
path.passedColor = [Color.](https://developer.android.com/reference/android/graphics/Color#TRANSPARENT)LTGRAY
```

![path08.jpg](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/pathOverlay/img/path08.jpg)

- 색상이  [Color.TRANSPARENT](https://developer.android.com/reference/android/graphics/Color#TRANSPARENT)인 경우는 지나간 도로를 보이기 안도록 처리할 수 있습니다.

```kotlin
path.passedColor = [Color.TRANSPARENT](https://developer.android.com/reference/android/graphics/Color#TRANSPARENT)
```

![path09.jpg](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/pathOverlay/img/path09.jpg)

## 화살표 오버레이 추가/삭제

---

`passedColor` 속성을 활용하여 지나간 도로(link) 색상을 설정할 수 있습니다.

- 추가: 화살표가 시작(—)하는 좌표부터 종료(화살표 머리 ->)되는 지점까지의 좌표를 설정한다.

```kotlin
val arrow = ktMap.addArrowOverlay(
  ArrowOverlayOptions.Builder().apply {
		lngLats(
			listOf(
        LngLat(latitude = 37.55740633539673, longitude = 126.97297407409239),
        LngLat(latitude = 37.55747530737832, longitude = 126.973028783291),
        LngLat(latitude = 37.56501037083583, longitude = 126.97719537663178),
        LngLat(latitude = 37.56501037083583, longitude = 126.97719537663178),
        LngLat(latitude = 37.56596349439521, longitude = 126.97717583536038)
		  )
		)
	}
)
```

![path12.jpg](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/pathOverlay/img/path12.jpg)

- 삭제

```kotlin
ktMap.removeArrowOverlay(arrow)
```

## 화살표 오버레이 색상

---

`color` 속성을 활용하여 화살표 색상을 설정할 수 있습니다.

- 화살표 오버레이 색상을 빨간색으로 설정한다.

```kotlin
arrow.color(Color.RED)
```

![path11.jpg](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/pathOverlay/img/path11.jpg)

## 화살표 오버레이 외곽선 색상

---

`strokeColor` 속성을 활용하여 화살표 외곽선 색상을 설정할 수 있습니다.

- 화살표 오버레이 외곽선 색상을 노란색으로 설정한다.

```kotlin
arrow.strokeColor(Color.YELLOW)
```

![path10.jpg](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/pathOverlay/img/path10.jpg)