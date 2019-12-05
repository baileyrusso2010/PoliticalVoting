//"https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Boundaries_2018/FeatureServer/"
 
var map;
var view;
var searchWidget;

require(["esri/tasks/Locator", "esri/Map", "esri/views/MapView","esri/layers/FeatureLayer","esri/widgets/Search","esri/symbols/SimpleFillSymbol","esri/Color"], 
function(Location, Map, MapView,FeatureLayer, Search,SimpleFillSymbol, Color) {
    

    map = new Map({
      basemap: "osm"
    });
    view = new MapView({
		container: "viewDiv", // Reference to the DOM node that will contain the view
		map: map,
		center: [-98.5795, 39.8283],
		zoom: 4.7
        });
        
        	  //<!-- add mouse handler after map constructor -->
   // view.on("pointer-move", executeMouseMove);

    var popupTrailheads = {
      "title": "{NAME}",
      "content": "Popultation: <b>{POP2010}</b> <br>Men: {MALES} <br>Females: {FEMALES}"
    }
    var FeatureLayer = new FeatureLayer({
        //url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized/FeatureServer/",
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Counties_Generalized/FeatureServer",
        outFields: ["STATE_NAME"],
        popupTemplate: popupTrailheads
    });//end of feature layer

    //map.zoom = FeatureLayer.zoom;
    //view.zoom = 10;O
    map.add(FeatureLayer,0);

    searchWidget = new Search({

      view: view
    }),;

    view.ui.add(searchWidget,{
      position: "top-right",
      index: 2
    });
 

    searchWidget.on("load", function(){
      
      var sources = searchWidget.sources;
      sources.push({
        searchFields: ["County"],
        displayField: "County",
  

      });
      searchWidget.set("sources",sources);
    });

    
    searchWidget.watch('activeSource', function(evt){
      evt.placeholder = "Search County or State";
    });

    searchWidget.startup();

    function ChangeMap(){
      require(["esri/Map", "esri/layers/FeatureLayer"], function (Map, FeatureLayer){

          //var URL_root = "https://services2.arcgis.com/RQcpPaCpMAXzUI5g/ArcGIS/rest/services/gis_web_sample_data/FeatureServer/";
          var URL_root = "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized/FeatureServer/";
         //var layerURL = URL_root + layerIndex;
          //console.log(layerURL);
          
          var FeatureLayer = new FeatureLayer({
            url: URL_root
          });
          
          //map.layers.add(FeatureLayer,0);

          //setLayerGlobalVisibility(layerIndex, FeatureLayer);
          });
    }
   //window.onload = ChangeMap();

});//end of require