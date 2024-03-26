# 위치

KT mapSDK는 사용자 위치 관련 몇 가지 기능을 제공합니다. 

- 위치 정보 추적 → 리스너를 통해 사용자 현재 위치의 좌표(LngLat) 혹은 방향(Heading)에 대해 알 수 있습니다.
- 위치 아이콘 표시 → 사용자는 지도위에 표시된 위치 아이콘을 통해 사용자의 현재 위치나 방향을 알 수 있습니다.

<br/>

```
💡 위치와 관련한 기능을 사용하기 위해서는 AndroidManifest.xml에 "android.permission.ACCESS_COARSE_LOCATION” 혹은 "android.permission.ACCESS_FINE_LOCATION” 권한을 선언 후 획득하여야 합니다.
```

<br/>

## 위치 정보 추적

KtMap에 리스너를 등록함으로써 사용자의 위치 정보를 추적할 수 있습니다.

- OnUserLocationChangedListener
- OnUserHeadingChangedListener



**OnUserLocationChangedListener**

```kotlin
val listener = OnUserLocationChangedListener { location ->
    val longitude = location.longitude
    val lattitude = location.latitude
}
//register
ktMap.addOnUserLocationChangeListener(listener)

...

//remove
ktMap.removeOnUserLocationChangeListener(listener)
```

<br/>

**OnUserHeadingChangedListener**

```kotlin
val listener = OnUserHeadingChangedListener {heading ->
    //write your code,
}
//register        
ktMap.addOnUserHeadingListener(listener)

...

//remove        
ktMap.removeOnUserHeadingListener(listener)
```

<br/>

## 위치 아이콘

사용자는 지도 위에 표시된 아이콘을 통해 현재 자신이 위치한 장소와 바라보는 방향을 알 수 있습니다.


<br/>

**현재 위치 아이콘 표시**

```kotlin
ktMap.locationPuckEnabled = true
```



![location0.jpeg](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/location/img/location0.jpeg?raw=true)


<br/>

**현재 방향 표시**

```kotlin
ktMap.locationHeadingEnabled = true
```



![location1.jpeg](https://ktmobility1.github.io/mapsdk_example/android/tutorial_md/location/img/location1.jpeg?raw=true)

<br/>

```
💡 locationHeadingEnabled 속성이 활성화 되어도 locationPuckEnabled 속성이 활성화 되지 않으면 지도에 표시되지 않습니다.
```
