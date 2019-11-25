//"https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Boundaries_2018/FeatureServer/"
 
var map;
var view;
var populationChange;


require(["esri/tasks/Locator", "esri/Map", "esri/views/MapView","esri/layers/FeatureLayer"], 
function(Location, Map, MapView,FeatureLayer) {
    

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
    //view.on("pointer-move", executeMouseMove);
   
   
    var popupTrailheads = {
      "title": "{STATE_NAME}",
      "content": "Popultation: <b>{POP2010}</b> <br>Men: {MALES} <br>Females: {FEMALES}"
    }
    var FeatureLayer = new FeatureLayer({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized/FeatureServer/",
        outFields: ["STATE_NAME"],
        popupTemplate: popupTrailheads
    });//end of feature layer

    //map.zoom = FeatureLayer.zoom;
    //view.zoom = 10;O
  
    map.add(FeatureLayer,0);

});//end of require