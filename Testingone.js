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
var FeatureLayer;
var URL_root;


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
      content: "<b>Winner: {WINNER} - {MARGIN_PCT}%</b> <br> Trump: {VOTE_TR} <br> Clinton: {VOTE_CL}"
      
    }//end of popupTrails

    FeatureLayer = new FeatureLayer({
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
    URL_root = "https://services1.arcgis.com/VAI453sU9tG9rSmh/arcgis/rest/services/Maps101_Election_Center_2016_features/FeatureServer/2";


});//end of require

function showCaseStats(){

  //gets the text
  let innerText = view.popup.domNode.innerText;
  
  if(URL_root == "https://services1.arcgis.com/VAI453sU9tG9rSmh/arcgis/rest/services/Maps101_Election_Center_2016_features/FeatureServer/2"){
    let state = innerText.split('\n')[0];//state text

    let winner = innerText.split('\n')[1];//who won?
    winner = String(winner);//cast to string

    //If trump display red else its Clinton display Blue
    if(winner.charAt(8) == 'T'){
      document.getElementById("project").style.backgroundColor = "#FF0000";
    }else{
      document.getElementById("project").style.backgroundColor = "#3366FF";
    }
    
    let trump1 = innerText.split('\n')[2];//won by how much
    
    //total votes
    let clinton1 = innerText.split('\n')[3];

    //formating
    return "<b>"+ state + "</b><br><br>"+winner+"<br><br>"+ trump1 + "<br>" + clinton1; 
    
   }else{

    let winner;
    let county = innerText.split('\n')[0];
    let rep = innerText.split('\n')[2];
    let dem = innerText.split('\n')[3];
    
    //converts data to string to int for comparison
    let rep1 = "" + rep;
    let rep2 = rep1.split(' ')[1];
    let rep3 = "" + rep2;
    let rep4 = rep3.split(',');
    let repout = rep4[0]+rep4[1];
    let repConvert = parseInt(repout);

    //converts data to string to int for comparison
    let dem1 = "" + dem;
    let dem2 = dem1.split(' ')[1];
    let dem3 = "" + dem2;
    let dem4 = dem3.split(',');
    let demout = dem4[0]+dem4[1];
    let demConver = parseInt(demout);
    
    //if more repvotes then demVotes
    if(repConvert > demConver){
      winner = "Clinton";
      document.getElementById("project").style.backgroundColor = "#3366FF";
    }else{
      winner = "Trump";
      document.getElementById("project").style.backgroundColor = "#FF0000";
    }


    return "<b>" +county+"</b><br><br>" +"Winner: "+ winner + "<br><br>" +  rep + "<br>"+ dem;
   }
   
    
}//end of showCaseStats

function ChangeMap(){
  require(["esri/tasks/Locator", "esri/Map", "esri/views/MapView","esri/layers/FeatureLayer","esri/widgets/Search","esri/symbols/SimpleFillSymbol","esri/Color"], 
function(Location, Map, MapView,FeatureLayer, Search,SimpleFillSymbol, Color) {

      var popupTrailheads;

      let checked = document.getElementById("toggle").checked;

      if(checked == true){

      document.getElementById("toggleText").innerHTML = "Counties";

      URL_root = "https://services.arcgis.com/hRUr1F8lE8Jq2uJo/arcgis/rest/services/Presidential_Election_County_2016/FeatureServer"

      popupTrailheads = {
        "title": "{county_name}",
        "content": "Popultation: <b>{POP2010}</b> <br>Democrat: {votes_dem} <br>Repubicans: {votes_gop}"
      }

      }else{
        document.getElementById("toggleText").innerHTML = "States";
     
        URL_root = "https://services1.arcgis.com/VAI453sU9tG9rSmh/arcgis/rest/services/Maps101_Election_Center_2016_features/FeatureServer/2";
   
        var popupTrailheads = {
          title: "{NAME}",//title is state
          content: "<b>Winner: {WINNER} - {MARGIN_PCT}%</b> <br> Trump: {VOTE_TR} <br> Clinton: {VOTE_CL}"
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
