//"https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Boundaries_2018/FeatureServer/"
 
/*
Author: Bailey Russo
Date: 12/5/2019

Description: Display political data from the
2016 presidential election with the help of
ESRI Maps

All Right Reserved
*/

var map;
var view;
var searchWidget;
var currentURL;

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
      "title": "{NAME} County",
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
    }),

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

   //window.onload = ChangeMap();

});//end of require


function ChangeMap(){
  require(["esri/tasks/Locator", "esri/Map", "esri/views/MapView","esri/layers/FeatureLayer","esri/widgets/Search","esri/symbols/SimpleFillSymbol","esri/Color"], 
function(Location, Map, MapView,FeatureLayer, Search,SimpleFillSymbol, Color) {

      currentURL = "https://services2.arcgis.com/RQcpPaCpMAXzUI5g/ArcGIS/rest/services/gis_web_sample_data/FeatureServer/";
      var URL_root;
      var popupTrailheads;

      if(view.zoom >= 6){

      URL_root = "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized/FeatureServer/";

      popupTrailheads = {
        "title": "{STATE_NAME} County",
        "content": "Popultation: <b>{POP2010}</b> <br>Men: {MALES} <br>Females: {FEMALES}"
      }

      }else{
        URL_root = "https://services2.arcgis.com/RQcpPaCpMAXzUI5g/ArcGIS/rest/services/gis_web_sample_data/FeatureServer/";

        popupTrailheads = {
          "title": "{NAME} County",
          "content": "Popultation: <b>{POP2010}</b> <br>Men: {MALES} <br>Females: {FEMALES}"
        }

      }

      var FeatureLayer = new FeatureLayer({
        url: URL_root,
        outFields: ["STATE_NAME"],
        popupTemplate: popupTrailheads
      });

      map.removeAll();

      map.layers.add(FeatureLayer,1);
    
      //setLayerGlobalVisibility(1, FeatureLayer);
      });
}//end of ChangeMap