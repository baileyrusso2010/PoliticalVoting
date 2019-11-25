var populationChange;
require(["esri/Map", "esri/views/MapView", "esri/layers/Layer"], function(
  Map,
  MapView,
  Layer
) {
  var map = new Map({
    basemap: "dark-gray-vector"
  });

  // Create the MapView
  var view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 7,
    center: [-87, 34]
  });

  Layer.fromPortalItem({
    portalItem: {
      // autocasts as new PortalItem()
      id: "e8f85b4982a24210b9c8aa20ba4e1bf7"
    }
  }).then(function(layer) {
    // add the layer to the map
    map.add(layer);

    // Create a new popupTemplate for the layer and
    // format the numeric field values using the FieldInfoFormat properties. Call the custom populationChange()
    // function to calculate percent change for the county.
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
        },
        {
          fieldName: "POP10_SQMI",
          format: {
            digitSeparator: true,
            places: 2
          }
        },
        {
          fieldName: "POP2013",
          format: {
            digitSeparator: true,
            places: 0
          }
        },
        {
          fieldName: "POP13_SQMI",
          format: {
            digitSeparator: true,
            places: 2
          }
        }
      ]
    };

    layer.popupTemplate = popupTemplate;

    function populationChange(feature) {
      // Add green arrow if the percent change is positive and a red arrow for negative percent change.
      return (
        "As of 2013, the total population was <b>{POP2013}</b>"
      );
    }
  });
});

// use this ≈
//source http://worldpopulationreview.com/states/2016-election-results-by-state/