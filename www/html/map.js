var feature = new ol.Feature();

var startlat = -127.40267856630238
var startlon = 50.29070922335083

//vic
var lat = -123.40267856630238
var lon = 48.40070922335083

//jdf
var latjdf = -124.8992801
var lonjdf = 48.057526419

//haida
var lathaida = -131.155492
var lonhaida = 51.9151767

var geom = new ol.geom.Circle(ol.proj.fromLonLat([lat,lon ]));

var Startlocation = ol.proj.fromLonLat([startlat, startlon]);
var vicLocation = ol.proj.fromLonLat([lat, lon]);
var jdfLocation = ol.proj.fromLonLat([latjdf, lonjdf]);
var haidaLocation = ol.proj.fromLonLat([lathaida, lonhaida]);


var startZoom = 7.3;

geom.setRadius(100);


//Resource; https://openlayers.org/en/latest/examples/popup.html

/**
 * Elements that make up the popup.
 */
 const container = document.getElementById('popup');
 const content = document.getElementById('popup-content');
 const closer = document.getElementById('popup-closer');


/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new ol.Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};


//green
var style = new ol.style.Style({
      fill: new ol.style.Fill({
        color: '#00ff00'
      }),
    });

//red
let style2 = new ol.style.Style({
      image: new ol.style.Circle({
        fill: new ol.style.Fill({
          color: '#ff0000'
        }),
        radius: 5
      }),
    });
    
    
var vectorSource = new ol.source.Vector({
  projection: 'EPSG:4326',
 });

var vectorSource2 = new ol.source.Vector({
  projection: 'EPSG:4326',
});

var vectorSource3 = new ol.source.Vector({
  projection: 'EPSG:4326',
});

/*
var layer = new ol.layer.Vector({
  source: new ol.source.Vector({
      features: [
          new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.fromLonLat([lat, lon]))
     
              }),   
      ]
  }),
style:style2
});
*/

var map = new ol.Map({
  layers: [new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 19
    })
  })],
  overlays: [overlay],
  target: 'map',
  view: new ol.View({
    center: Startlocation,
    zoom: startZoom
  })
});

//the "click action" for popup.
map.on('singleclick',function (evt) {
    if (map.hasFeatureAtPixel(evt.pixel) === true) {
    
    //determine whether this is a green (validtemperature) or red (overheat) datapoint
    var hit = map.hasFeatureAtPixel(evt.pixel, {
        layerFilter: function (layer) {
            return layer.get('name') === 'overheat';
        }
    });

    console.log(hit)

    if (hit === true){
      var featurehit = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
          return feature;
      });

      var featureprops = featurehit.getProperties();

      console.log(featureprops)
      console.log(featurehit)
      
      var thepixel = evt.pixel
      const coordinate = evt.coordinate;
      content.innerHTML = '<p>Warning located at:</p><code>' + featureprops.name + ' ' + new Date() +  '</code><p> With coordinates:<p><code>' + coordinate + '</code><p> With temperature:<p><code>' + featureprops.description +' Celcius</code></p>';
      overlay.setPosition(coordinate);
    }
  } else {
    overlay.setPosition(undefined);
    closer.blur();
  }
});


/*
map.addLayer(layer);
*/



var sensor1 = []
var sensor2 = []
var sensor3 = []
var state = 0;
var state2 = 0;
var state3 = 0;

function turnLeft(){
  if(state ==0){
    lat -= 0.001;
    state = 1;
    //console.log('lat negated - state 1');
  }
  else if(state == 1){
    lon -= 0.001;
    state = 3;
    //console.log('lon negated - state 3');
  }
  else if(state == 2){
    lon += 0.001;
    state = 0;
    //console.log('lon added - state 0');
  }
  else if(state == 3){
    lat += 0.001;
    state = 2;
    //console.log('lat added - state 2');
  }
 //console.log('turned left' + 'state: ' + state);
}

function turnLeft2(){
  if(state2 ==0){
    latjdf -= 0.001;
    state2 = 1;
    //console.log('lat negated - state 1');
  }
  else if(state2 == 1){
    lonjdf -= 0.001;
    state2 = 3;
    //console.log('lon negated - state 3');
  }
  else if(state2 == 2){
    lonjdf += 0.001;
    state2 = 0;
    //console.log('lon added - state 0');
  }
  else if(state2 == 3){
    latjdf += 0.001;
    state2 = 2;
    //console.log('lat added - state 2');
  }
 //console.log('turned left' + 'state: ' + state);
}

function turnLeft3(){
  if(state3 ==0){
    lathaida -= 0.001;
    state3 = 1;
    //console.log('lat negated - state 1');
  }
  else if(state3 == 1){
    lonhaida -= 0.001;
    state3 = 3;
    //console.log('lon negated - state 3');
  }
  else if(state3 == 2){
    lonhaida += 0.001;
    state3 = 0;
    //console.log('lon added - state 0');
  }
  else if(state3 == 3){
    lathaida += 0.001;
    state3 = 2;
    //console.log('lat added - state 2');
  }
 //console.log('turned left' + 'state: ' + state);
}

function moveForwards(){
  if(state == 0){
    if( !(lon + 0.001 > 48.411709223350805) ){
      lon += 0.001;
      //console.log("moving forwards, increasing lon")
    }
    else{
      hitConstraint();
    }
  }
  else if(state == 1){
    if( !(lat - 0.001 < -123.44167856630257)){
      lat -= 0.001;
      //console.log("moving forwards, decreasing lat")
    }
    else{
      hitConstraint();
    }
  }
  else if(state == 2){
    if(!(lat + 0.001 > -123.38667856630231)){
     lat += 0.001;
     //console.log("moving forwards, increasing lat")
    }
    else{
      hitConstraint();
    }
  }
  else if(state == 3){
    if(!(lon -0.001 < 48.38670922335086)){
      lon -= 0.001;
      //console.log("moving forwards, decreasing lon")
    }
    else{
      hitConstraint();
    }
  }
//  console.log('moved forwards' + 'state: ' + state);
}

function moveForwards2(){
  if(state2 == 0){
    if( !(lonjdf + 0.001 > 48.411709223350805) ){
      lonjdf += 0.001;
      //console.log("moving forwards, increasing lon")
    }
    else{
      hitConstraint2();
    }
  }
  else if(state2 == 1){
    if( !(latjdf - 0.001 < -123.44167856630257)){
      latjdf -= 0.001;
      //console.log("moving forwards, decreasing lat")
    }
    else{
      hitConstraint2();
    }
  }
  else if(state2 == 2){
    if(!(latjdf + 0.001 > -123.38667856630231)){
     latjdf += 0.001;
     //console.log("moving forwards, increasing lat")
    }
    else{
      hitConstraint2();
    }
  }
  else if(state2 == 3){
    if(!(lonjdf -0.001 < 48.38670922335086)){
      lonjdf -= 0.001;
      //console.log("moving forwards, decreasing lon")
    }
    else{
      hitConstraint2();
    }
  }
//  console.log('moved forwards' + 'state: ' + state);
}

function moveForwards3(){
  if(state3 == 0){
    if( !(lonhaida + 0.001 > 51.9261767) ){
      lonhaida += 0.001;
      //console.log("moving forwards, increasing lon")
    }
    else{
      hitConstraint3();
    }
  }
  else if(state3 == 1){
    if( !(lathaida - 0.001 < -131.194492)){
      lathaida -= 0.001;
      //console.log("moving forwards, decreasing lat")
    }
    else{
      hitConstraint3();
    }
  }
  else if(state3 == 2){
    if(!(lathaida + 0.001 > -131.116492)){
     lathaida += 0.001;
     //console.log("moving forwards, increasing lat")
    }
    else{
      hitConstraint3();
    }
  }
  else if(state3 == 3){
    if(!(lonhaida -0.001 < 51.9041767)){
      lonhaida -= 0.001;
      //console.log("moving forwards, decreasing lon")
    }
    else{
      hitConstraint3();
    }
  }
//  console.log('moved forwards' + 'state: ' + state);
}

function hitConstraint(){
  //console.log('hit constraint')
  turnLeft();
}

function hitConstraint2(){
  //console.log('hit constraint')
  turnLeft2();
}

function hitConstraint3(){
  //console.log('hit constraint')
  turnLeft3();
}

function getRandom(max){
  return Math.floor(Math.random()*max);
}

function testTemp(lat, lon){
  let curtemp = getRandom(60) 
  if (curtemp > 55){
    console.log("tempereature exceeded 55 - placing red dot")
    //alert("Current temperature is: " + curtemp + "\nlatitude : " + lat + " \nlongitude: " + lon) 
    var layer = new ol.layer.Vector({
      name:'overheat',
      source: new ol.source.Vector({
          features: [
              new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat([lat, lon])),
                  description: curtemp,
                  name: "Victoria",
              }),   
          ]
      }),
      style:style2
    });
    map.addLayer(layer)
  }
}

function testTemp2(lat, lon){
  let curtemp = getRandom(60) 
  if (curtemp > 55){
    console.log("tempereature exceeded 55 - placing red dot")
    //alert("Current temperature is: " + curtemp + "\nlatitude : " + lat + " \nlongitude: " + lon) 
    var layer = new ol.layer.Vector({
      name:'overheat',
      source: new ol.source.Vector({
          features: [
              new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat([latjdf, lonjdf])),
                  description: curtemp,
                  name: "Juan De Fuca",
              }),   
          ]
      }),
      style:style2
    });
    map.addLayer(layer)
  }
}

function testTemp3(lat, lon){
  let curtemp = getRandom(60) 
  if (curtemp > 55){
    console.log("tempereature exceeded 55 - placing red dot")
    //alert("Current temperature is: " + curtemp + "\nlatitude : " + lat + " \nlongitude: " + lon) 
    var layer = new ol.layer.Vector({
      name:'overheat',
      source: new ol.source.Vector({
          features: [
              new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat([lathaida, lonhaida])),
                  description: curtemp,
                  name: "Haida Gwaii",
              }),   
          ]
      }),
      style:style2
    });
    map.addLayer(layer)
  }
}

function getDirection(){
  var randomNum = getRandom(20);
  //console.log('lat: ' + lat + ' lon: ' + lon);

  if(randomNum<17){
    //console.log("deciding to move forwards")
    moveForwards();
  }
  else if(randomNum <20){
    //console.log("deciding to turn")
    turnLeft();
  }

  testTemp(lat, lon);
}

function getDirection2(){
  var randomNum = getRandom(20);
  //console.log('lat: ' + lat + ' lon: ' + lon);

  if(randomNum<17){
    //console.log("deciding to move forwards")
    moveForwards2();
  }
  else if(randomNum <20){
    //console.log("deciding to turn")
    turnLeft2();
  }

  testTemp2(latjdf, lonjdf);
}

function getDirection3(){
  var randomNum = getRandom(20);
  //console.log('lat: ' + lat + ' lon: ' + lon);

  if(randomNum<17){
    //console.log("deciding to move forwards")
    moveForwards3();
  }
  else if(randomNum <20){
    //console.log("deciding to turn")
    turnLeft3();
  }

  testTemp3(lathaida, lonhaida);
}
function sensorTrigger1(){
   //console.log("getting direction")
   getDirection(lat, lon, state);

   //console.log("creating circle")
   var geom = new ol.geom.Circle(ol.proj.fromLonLat([lat, lon]));
   geom.setRadius(80  );

   var circleFeature = new ol.Feature(geom);

   //console.log("adding circle")
   vectorSource.addFeature(circleFeature);

   var vectorLayer = new ol.layer.Vector({
     name:'validtemperature',
     source: vectorSource,
     style: style
    });


    //console.log("pushing circle")
    sensor1.push(circleFeature);

    //console.log("adding vector layer")
    map.addLayer(vectorLayer);

    //console.log("keeping the amount of green circles less than 6")
    if(sensor1.length > 6){
    vectorLayer.getSource().removeFeature(sensor1[0])
    sensor1.shift();
    }

   //console.log("timout...")
   window.setTimeout(sensorTrigger1,1000)
}

function sensorTrigger2(){
  //console.log("getting direction")
  getDirection2();

  //console.log("creating circle")
  var geom = new ol.geom.Circle(ol.proj.fromLonLat([latjdf, lonjdf]));
  geom.setRadius(80  );

  var circleFeature2 = new ol.Feature(geom);

  //console.log("adding circle")
  vectorSource2.addFeature(circleFeature2);

  var vectorLayer2 = new ol.layer.Vector({
    name:'validtemperature',
    source: vectorSource2,
    style: style
   });


   //console.log("pushing circle")
   sensor2.push(circleFeature2);

   //console.log("adding vector layer")
   map.addLayer(vectorLayer2);

   //console.log("keeping the amount of green circles less than 6")
   if(sensor2.length > 6){
   vectorLayer2.getSource().removeFeature(sensor2[0])
   sensor2.shift();
   }

  //console.log("timout...")
  window.setTimeout(sensorTrigger2,1000)
}

function sensorTrigger3(){
  //console.log("getting direction")
  getDirection3();

  //console.log("creating circle")
  var geom = new ol.geom.Circle(ol.proj.fromLonLat([lathaida, lonhaida]));
  geom.setRadius(80  );

  var circleFeature3 = new ol.Feature(geom);

  //console.log("adding circle")
  vectorSource3.addFeature(circleFeature3);

  var vectorLayer3 = new ol.layer.Vector({
    name:'validtemperature',
    source: vectorSource3,
    style: style
   });


   //console.log("pushing circle")
   sensor3.push(circleFeature3);

   //console.log("adding vector layer")
   map.addLayer(vectorLayer3);

   //console.log("keeping the amount of green circles less than 6")
   if(sensor3.length > 6){
   vectorLayer3.getSource().removeFeature(sensor3[0])
   sensor3.shift();
   }

  //console.log("timout...")
  window.setTimeout(sensorTrigger3,1000)
}

function vicZoom(){
  var view = map.getView();
  console.log(view);
  view.setZoom(11);
  view.setCenter(vicLocation);
}

function straitZoom(){
  var view = map.getView();
  console.log(view);
  view.setZoom(11);
  view.setCenter(jdfLocation);
}

function haidaZoom(){
  var view = map.getView();
  console.log(view);
  view.setZoom(11);
  view.setCenter(haidaLocation);
}

function goHome(){
  window.location.href ='http://sentinel.westcloud.ca';
}


window.setTimeout(sensorTrigger1,1000);
window.setTimeout(sensorTrigger2,1000);
window.setTimeout(sensorTrigger3,1000);


document.getElementById("vic").addEventListener("click", vicZoom); 
document.getElementById("haida").addEventListener("click", haidaZoom); 
document.getElementById("strait").addEventListener("click", straitZoom); 
document.getElementById("title").addEventListener("click", goHome); 







