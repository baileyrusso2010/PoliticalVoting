//"https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Boundaries_2018/FeatureServer/"
 
/*
Author: Bailey Russo
Date: 12/5/2019

Description: Display political data from the
2016 presidential election with the help of
ESRI Maps

All Right Reserved
*/

var map;//global map
var view;//
var searchWidget;
var currentURL;
var FeatureLayer;

//required fields to complete the necessary tasks
require(["esri/tasks/Locator", "esri/Map", "esri/views/MapView","esri/layers/FeatureLayer","esri/widgets/Search","esri/symbols/SimpleFillSymbol","esri/Color"], 
function(Location, Map, MapView,FeatureLayer, Search,SimpleFillSymbol, Color) {
    
    map = new Map({
      basemap: "osm"//basemap
    });
    view = new MapView({
		container: "viewDiv",//gets div container 
		map: map,
		center: [-98.5795, 39.8283],//center of U.S.
		zoom: 4.7//sets zoom
        });

    var popupTrailheads = {
      title: "{NAME}",//title is state
      content: "<b>Winner: {WINNER} by: {MARGIN_PCT}%</b> <br> Trump: {VOTE_TR} <br> Clinton: {VOTE_CL}"
      
    }//end of popupTrails

//https://developers.arcgis.com/javascript/latest/sample-code/popuptemplate-function/index.html
//https://www.arcgis.com/home/webmap/viewer.html?layers=66e3efa3bd0f4b5496228a4328930c89
    FeatureLayer = new FeatureLayer({
        //url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized/FeatureServer/",
        //url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Counties_Generalized/FeatureServer",
        url: "https://services1.arcgis.com/VAI453sU9tG9rSmh/arcgis/rest/services/Maps101_Election_Center_2016_features/FeatureServer/2",
        popupTemplate: popupTrailheads
    });//end of feature layer

    map.add(FeatureLayer,0);//adds to map

    //instantiates searchbar
    searchWidget = new Search({
      view: view
    }),

    //adds search widget to top right
    view.ui.add(searchWidget,{
      position: "top-right",
      index: 2
    });

    view.on("click", function(){
      
      var data = showCaseStats();
      document.getElementById("project").innerHTML= data; 
      document.getElementById("project").style.textAlign = "center"; 
      
    });
    
    //on load push fields
    searchWidget.on("load", function(){
      
      var sources = searchWidget.sources;
      sources.push({
        searchFields: ["County"],
        displayField: "County",
  
      });
      searchWidget.set("sources",sources);
    });

    //search for county or state
    searchWidget.watch('activeSource', function(evt){
      evt.placeholder = "Search County or State";
    });

    searchWidget.startup();//sets up searchwidget

});//end of require

function showCaseStats(){

  var innerText = view.popup.domNode.innerText;
  console.log(innerText);
  let state = innerText.split('\n')[0];

  let winner = innerText.split('\n')[1];
  winner = String(winner);

  if(winner.charAt(8) == 'T'){
    document.getElementById("project").style.backgroundColor = "Red";
  }else{
    document.getElementById("project").style.backgroundColor = "Blue";

  }

  return "<b>"+ innerText + "</b>"; 

}//end of showCaseStats

function ChangeMap(){
  require(["esri/tasks/Locator", "esri/Map", "esri/views/MapView","esri/layers/FeatureLayer","esri/widgets/Search","esri/symbols/SimpleFillSymbol","esri/Color"], 
function(Location, Map, MapView,FeatureLayer, Search,SimpleFillSymbol, Color) {

      currentURL = "https://services2.arcgis.com/RQcpPaCpMAXzUI5g/ArcGIS/rest/services/gis_web_sample_data/FeatureServer/";
      var URL_root;
      var popupTrailheads;

      let checked = document.getElementById("toggle").checked;

      if(checked == true){

      document.getElementById("toggleText").innerHTML = "Counties";

      URL_root = "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized/FeatureServer/";

      popupTrailheads = {
        "title": "{STATE_NAME} County",
        "content": "Popultation: <b>{POP2010}</b> <br>Men: {MALES} <br>Females: {FEMALES}"
      }

      }else{
        document.getElementById("toggleText").innerHTML = "States";
     
        URL_root = "https://services1.arcgis.com/VAI453sU9tG9rSmh/arcgis/rest/services/Maps101_Election_Center_2016_features/FeatureServer/2";
   
        popupTrailheads = {
          "title": "{NAME} County",
          "content": "Popultation: <b>{POP2010}</b> <br>Men: {MALES} <br>Females: {FEMALES}"
        }

      }//end of ifelse


      var FeatureLayer = new FeatureLayer({
        url: URL_root,//gets the URL
        outFields: ["STATE_NAME"],
        popupTemplate: popupTrailheads//SETS pop up data
      });

      map.removeAll();//gets rid of all layers

      map.layers.add(FeatureLayer,1);//adds layer to map
    
      });
}//end of ChangeMap