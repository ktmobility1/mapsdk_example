import ktGms from "kt-map-sdk-js"
import analysis from "kt-map-sdk-geoanalysis"

let map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.017422, 37.49144],
  zoom: 15,
  maxPitch: 68
})

map.on("load", () => {
  // origin 생성
  const origin = new ktGms.geometry.PointGeo([127.02222, 37.49144], {})
  // 지도에 Point 객체 및 PointLayer 추가
  new ktGms.layer.PointLayer( //Layer ID
    "point_layer", //PointLayer에 적용할 스타일
    new ktGms.style.CircleStyle(
      {
        "circle-radius": 10,
        "circle-color": "#FF0000"
      },
      {
        visibility: "visible"
      }
    ),
    origin
  ).addTo(map)

  // destination 계산
  const distance = 0.5
  const bearing = -90
  const options = { units: "kilometers" }
  const destinationPoint = analysis.measurement.destination(
    origin,
    distance,
    bearing,
    options
  )
  new ktGms.layer.PointLayer( //Layer ID
    "destination_point_layer", //PointLayer에 적용할 스타일
    new ktGms.style.CircleStyle(
      {
        "circle-radius": 20,
        "circle-color": "#00FF00"
      },
      {
        visibility: "visible"
      }
    ),
    new ktGms.source.GeoJSONSource("destination_point", {
      data: destinationPoint
    })
  ).addTo(map)
})
