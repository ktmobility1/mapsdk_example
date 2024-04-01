import ktGms from "kt-map-sdk-js";
import analysis from "kt-map-sdk-geoanalysis";
let map: ktGms.Map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.017422, 37.49144],
  zoom: 15,
  maxPitch: 68,
});

map.on("load", () => {
  // Polygon 생성
  const polygon: ktGms.geometry.Polygon = new ktGms.geometry.Polygon(
    [
      [
        [127.01899420403538, 37.49417359718649],
        [127.0179856934451, 37.49352665030871],
        [127.01678406380648, 37.494003348551374],
        [127.01588284157793, 37.49296482347398],
        [127.01468121193932, 37.49308399921651],
        [127.01487433098896, 37.49201141068902],
        [127.01416622780869, 37.49102393461709],
        [127.01523911141459, 37.49100690905348],
        [127.01459538125135, 37.48906596931948],
        [127.01714884423353, 37.489048943309015],
        [127.01691280983914, 37.487652797260424],
        [127.02036749505135, 37.487942244316784],
        [127.02240597390153, 37.48688660846136],
        [127.02386509560688, 37.488197637847094],
        [127.02693354271975, 37.48818061163928],
        [127.02573191308107, 37.49029183186114],
        [127.02669750832536, 37.4919603346607],
        [127.02420841836016, 37.49245406813806],
        [127.02427279137578, 37.494922686570135],
        [127.02148329400057, 37.49422467170132],
        [127.02032457970671, 37.49519508084681],
        [127.01899420403538, 37.49417359718649],
      ],
    ],
    {}
  );
  // 지도에 PolygonLayer 추가
  new ktGms.layer.PolygonLayer(
    //Layer ID
    "polygon_layer",
    //PolygonLayer에 적용할 스타일
    new ktGms.style.FillStyle(
      {
        "fill-color": "#1253A4",
        "fill-opacity": 0.5,
      },
      {
        "visibility": "visible",
      }
    ),
    polygon
  ).addTo(map);

  // Polygon 분할
  const triangles = analysis.transformation.tesselate(polygon);

  // 지도에 PolygonLayer 추가
  new ktGms.layer.PolygonLayer(
    //Layer ID
    "triangles_layer",
    //PolygonLayer에 적용할 스타일
    new ktGms.style.LineStyle(
      {
        "line-color": "#000000",
        "line-width": 3,
      },
      {
        "visibility": "visible",
      }
    ),
    new ktGms.source.GeoJSONSource("triangleSource", { data: triangles })
  ).addTo(map);
});
