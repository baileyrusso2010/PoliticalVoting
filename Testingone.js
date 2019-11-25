//"https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Boundaries_2018/FeatureServer/"
 
var map;
var view;
var populationChange;


require(["esri/tasks/Locator", "esri/Map", "esri/views/MapView","esri/layers/FeatureLayer"], function(Location, Map, MapView,FeatureLayer) {
    

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
    var FeatureLayer = new FeatureLayer({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized/FeatureServer/"
    //url:"http://services.arcgis.com/JbibFpsuaEQr3FFG/arcgis/rest/services/State_to_State_Migration/FeatureServer/",
  
    });//end of feature layer

    

    view.popup.autoOpenEnabled = false;
view.on("click", function(event) {
  // Get the coordinates of the click on the view
  // around the decimals to 3 decimals
  var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
  var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

  view.popup.open({
    // Set the popup's title to the coordinates of the clicked location
    title: "{STATE_NAME}",
    location: event.mapPoint // Set the location of the popup to the clicked location
  });
});

    map.zoom = FeatureLayer.zoom;
    //view.zoom = 10;O
    
    map.add(FeatureLayer);

    var popupTemplate = {
        // autocasts as new PopupTemplate()
        title: "Population in {NAME}",
        outFields: ["*"],
        content: populationChange,
        fieldInfos: [
          {
            fieldName: "POP2010",
            format: {
              digitSeparator: true,
              places: 0
            }
          }]
        };

    //FeatureLayer.popupTemplate = popupTemplate;

});//end of require