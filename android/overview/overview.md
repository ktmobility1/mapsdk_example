<h1 id="kt-map-sdk-for-android">KT Map SDK For Android
<img alt="Android" src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=Android&logoColor=white"></h1>
<h2 id="개요">개요</h2>
<ul>
<li>KT Map SDK를 사용해서 Android 단말에서 지도 데이터, 지도 표시, 지도
동작을 지원합니다.</li>
<li>지도 데이터는 KT Map에서 제공하는 배경, 도로, 항공지도 등애 대한
데이터이며, 특정 좌표, 영역을 표시/강조하기 위한 다양한 Overlay를
제공합니다.</li>
<li>지도 동작은 기본으로 제공하는 UIControl 및 사용자 터치를 통해 지도
확대/축소, 회전, 기울기, 지도 이동을 편리하고 직관적으로
제공합니다.</li>
<li>또한 사용자 데이터를 KT Map에 올리고, 스타일을 적용할 수 있는
레이어를 제공합니다.</li>
</ul>
<h2 id="준비하기">준비하기</h2>
<ul>
<li>KT Map SDK for Android는 API KEY를 발급 받아야 사용할 수
있습니다.</li>
<li>KEY를 발급받기 위해서는 KT API 사이트 계정이 필요합니다.</li>
</ul>
<h3 id="키-발급-방법">키 발급 방법</h3>
<ol type="1">
<li><a href="https://apilink.kt.co.kr/">KT API 사이트</a> 접속</li>
<li>계정 가입 및 로그인</li>
<li>권한신청 메뉴로 이동</li>
<li>API 신청 &gt; 일반개발자 | 개인사업자 | 법인사업자 | GiGA Genie
제휴법인 중 해당 소속 선택</li>
<li>정보입력 후 권한 신청</li>
</ol>
<h2 id="지원">지원</h2>
<h3 id="지원-os-버전">지원 OS 버전</h3>
<table>
<colgroup>
<col style="width: 0%" />
<col style="width: 53%" />
<col style="width: 45%" />
</colgroup>
<thead>
<tr class="header">
<th>구분</th>
<th>Version</th>
<th>API Level</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>최소버전</td>
<td><a href="https://www.android.com/versions/marshmallow-6-0/" style="width:100%">Android 6</a>(Marshmallow.)</td>
<td><a
href="https://developer.android.com/tools/releases/platforms#6.0">23</a></td>
</tr>
<tr class="even">
<td>권장버전</td>
<td><a href="https://developer.android.com/about/versions/13" style="width:100%">Android
13</a> (TIRAMISU)</td>
<td><a
href="https://developer.android.com/tools/releases/platforms#13">33</a></td>
</tr>
</tbody>
</table>
<h3 id="지원-언어">지원 언어</h3>
<ul>
<li>KT Map SDK for Android 에서는 <a
href="https://developer.android.com/kotlin">Kotlin</a> 과 Java 모두를
지원하고 있습니다.</li>
<li>현재 <a href="https://developer.android.com/kotlin">Kotlin</a>
사용을 권장합니다.</li>
</ul>
<h2 id="시작하기">시작하기</h2>
<h3 id="manifest-설정">Manifest 설정</h3>
<ul>
<li>KT Map SDK는 지도 서버와 네트워크로 통신하며 지도 데이터를 Android
단말에 저장하고 지도를 표시하고 있습니다.</li>
<li>따라서 앱에서 네트워크 연결 권한이 필요하기 때문에 Manifest에서
권한을 추가헙니다.</li>
</ul>
<div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">uses-permission</span><span class="ot"> android:name=</span><span class="st">&quot;android.permission.ACCESS_NETWORK_STATE&quot;</span>/&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">uses-permission</span><span class="ot"> android:name=</span><span class="st">&quot;android.permission.INTERNET&quot;</span>/&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">uses-permission</span><span class="ot"> android:name=</span><span class="st">&quot;android.permission.ACCESS_WIFI_STATE&quot;</span>/&gt; <span class="co">&lt;!-- Always include this permission --&gt;</span></span></code></pre></div>
<ul>
<li>추가로 현재 위치 정보를 이용하기 위해서는 위치 정보에 대한 권한을
추가해야합니다.</li>
</ul>
<div class="sourceCode" id="cb2"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">uses-permission</span></span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a><span class="ot">android:name=</span><span class="st">&quot;android.permission.ACCESS_COARSE_LOCATION&quot;</span>/&gt; <span class="co">&lt;!-- Include only if your app benefits from precise location access. --&gt;</span></span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">uses-permission</span><span class="ot"> android:name=</span><span class="st">&quot;android.permission.ACCESS_FINE_LOCATION&quot;</span>/&gt;</span></code></pre></div>
<h3 id="gradle-설정">Gradle 설정</h3>
<ul>
<li>maven repository를 통해 KT Map SDK 라이브러리를 제공하지
않습니다.</li>
</ul>
<h4
id="build.gradle.kt"><strong><code>build.gradle.kt</code></strong></h4>
<pre><code>implementation(&quot;com.kt.maps:sdk:2.0.0-alpha8)
// Path,ArraowOverlay 사용
implementation(&quot;com.kt.maps:extension-path:2.0.0-alpha8)</code></pre>
<h3 id="key-등록">Key 등록</h3>
<ul>
<li>발급 받은 키를 KT Map SDK에 등록합니다.</li>
<li>Key 등록 가이드는 추가로 제공할 예정 (현재는 베타 버전이라 등록하지
않음)</li>
</ul>
<h2 id="지도-추가하기">지도 추가하기</h2>
<ul>
<li>지도를 Android 단말에 표시하기 위해 지도 추가해야합니다.</li>
</ul>
<h3 id="view-방식">View 방식</h3>
<ul>
<li>layout.xml에 KT MapView를 추가합니다.</li>
</ul>
<h4
id="layoutview_activity.xml"><strong><code>layout/view_activity.xml</code></strong></h4>
<div class="sourceCode" id="cb4"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">com.kt.maps.MapView</span></span>
<span id="cb4-2"><a href="#cb4-2" aria-hidden="true" tabindex="-1"></a><span class="ot">  android:id=</span><span class="st">&quot;@+id/map&quot;</span></span>
<span id="cb4-3"><a href="#cb4-3" aria-hidden="true" tabindex="-1"></a><span class="ot">  android:layout_width=</span><span class="st">&quot;match_parent&quot;</span></span>
<span id="cb4-4"><a href="#cb4-4" aria-hidden="true" tabindex="-1"></a><span class="ot">  android:layout_height=</span><span class="st">&quot;match_parent&quot;</span>/&gt;</span></code></pre></div>
<ul>
<li>Activity에서 MapView를 찾고 해당 MapView를 통해 KtMap 객체를
얻어옵니다.</li>
<li>MapView는 지도를 표시하는 역할을 수행하고, 실제 지도에 대한 제어를
위해 KtMap 객체를 사용합니다.</li>
</ul>
<h4
id="viewactivity.kt"><strong><code>ViewActivity.kt</code></strong></h4>
<pre><code>    private lateinit var map: KtMap
    private lateinit var mapView: MapView
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mapView = findViewById(R.id.map)
        mapView.onCreate(savedInstanceState)
        mapView.getMapAsync(this)
    }

    override fun onMapReady(ktmap: KtMap) {
        map = ktmap
    }</code></pre>
<h2 id="reference">Reference</h2>
<p>더 자세한 사항은 아래 링크를 참고하시기 바랍니다.</p>
<ul>
<li><a href="https://map.gis.kt.com/mapsdk/android/tutorial/">개발
가이드</a></li>
<li><a href="https://map.gis.kt.com/mapsdk/android/apidoc/">API
레퍼런스</a></li>
<li><a
href="https://github.com/ktmobility1/android-map-sdk/releases">Releases</a></li>
</ul>
<h2 id="license">License</h2>
<p>Copyright (c) 2023 kt corp. All rights reserved.</p>
<p>This is a proprietary software of kt corp, and you may not use this
file except in compliance with license agreement with kt corp. Any
redistribution or use of this software, with or without modification
shall be strictly prohibited without prior written approval of kt corp,
and the copyright notice above does not evidence any actual or intended
publication of such software.</p>
