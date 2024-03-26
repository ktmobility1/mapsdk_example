# 지도 초기화 
<br/>
 

앱 화면에 지도를 표시 하기 위해서는 `MapFragment` 혹은 `MapView` 를 레이아웃에 추가할 수 있습니다.
 
## MapFragment 
 
지도를 화면에 나타내는 가장 간단한 방법은 `MapFragment` 를 사용하는 것입니다. MapFragment 는 `androidx.fragment.app.FragmentContainerView` 의 하위 클래스이며 Activity 에 추가하여 사용할 수 있습니다.
 
<br/>
 
 
- XML 을 사용하여  `MapFragment` 를 추가합니다.
 
```xml
<androidx.fragment.app.FragmentContainerView
        xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/map_fragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
</androidx.fragment.app.FragmentContainerView>
```
<br/>
 
- Activity 내 supportFragmentManager 를 이용하여 `MapFragment`  를 추가합니다.
 

```kotlin
val fragmentManager = supportFragmentManager
val mapFragment = fragmentManager.findFragmentById(R.id.map_fragment) as MapFragment?
       ?: MapFragment().newInstance().also {
              fragmentManager.beginTransaction().add(R.id.map_fragment, it).commit()
          }
 
```
<br/>
 
## MapView
 
어떤 경우에는, `MapView` 를 바로 사용해야할 수도 있습니다. 지도가 표출되어야 하는 곳에 `MapView` 를 선언합니다.
 
<br/>
 
- XML을 사용하여 `MapView` 를 추가합니다.
 
```xml
<com.kt.maps.MapView
        android:id="@+id/map"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
```
 
<br/>
 
`MapView` 사용 시, 정상적인 지도 동작을 위해서는 아래 예제와 같은 Activity의 라이프 사이클에 맞추어 호출해야합니다.
 
- Activity 에서 `MapView` 사용 시 라이프 사이클 메서드를 호출합니다.
 
```kotlin
override fun onStart() {
        super.onStart()
        mapView.onStart()
}
 
override fun onResume() {
        super.onResume()
        mapView.onResume()
}
 
override fun onPause() {
        super.onPause()
        mapView.onPause()
}
 
override fun onStop() {
        super.onStop()
        mapView.onStop()
}
 
override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        mapView.onSaveInstanceState(outState)
}
 
override fun onDestroy() {
        super.onDestroy()
        mapView.onDestroy()
}
```
<br/>
 
## KTMap 객체 가져오기
 
`MapFragment` 혹은 `MapView` 를 추가하여 앱 화면에 지도를 표출했습니다.
 
다양한 API들을 호출하여 사용하려면 `KTMap` 객체가 필요합니다.
 
`KTMap` 객체를 얻기 위해서는  `OnMapReadyCallback` 를 등록하여 `getMapAsync()` 비동기 메서드를 호출할 수 있습니다.
 
```kotlin
class MapFragmentActivity : AppCompatActivity(), OnMapReadyCallback {
 
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
 
        setContentView(R.layout.activity_map_fragment)
 
        val mapFragment = supportFragmentManager.findFragmentById(R.id.map_fragment) as MapFragment?
            ?: MapFragment().newInstance().also {
                supportFragmentManager.beginTransaction().add(R.id.map_fragment, it).commit()
            }
        mapFragment.getMapAsync(this)
 
    }
 
    override fun onMapReady(ktmap: KtMap) {
    }
```
 
 
 
KTMap 이 사용될 준비가 되면  `OnMapReadyCallback` 인터페이스의 `onMapReady` Callback 을 통해 KTMap 객체를 제공받을 수 있습니다.
 
```kotlin
interface OnMapReadyCallback {
    /**
     *
     * @param ktmap 지도 객체
     */
    @UiThread
    fun onMapReady(ktmap: KtMap)
}
 
```
