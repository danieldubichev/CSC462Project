var feature = new ol.Feature();

var lat = -123.40267856630238
var lon = 48.40070922335083

var geom = new ol.geom.Circle(ol.proj.fromLonLat([lat,lon ]));

const Startlocation = ol.proj.fromLonLat([lat, lon]);

geom.setRadius(100);

var style = new ol.style.Style({
      fill: new ol.style.Fill({
        color: '#00ff00'
      }),
    });


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
  target: 'map',
  view: new ol.View({
    center: Startlocation,
    zoom: 13
  })
});


//map.addLayer(layer);

var sensor1 = []
var sensor2 = []
var state = 0;

function turnLeft(){
  if(state ==0){
    lat -= 0.001;
    state = 1;
  }
  else if(state == 1){
    lon -= 0.001;
    state = 3;
  }
  else if(state == 2){
    lon += 0.001;
    state = 0;
  }
  else if(state == 3){
    lat += 0.001;
    state = 2;
  }
 // console.log('turned left' + 'state: ' + state);
}


function moveForwards(){
  if(state == 0){
    if( !(lon + 0.001 > 48.411709223350805) ){
      lon += 0.001;
    }
    else{
      hitConstraint();
    }
  }
  else if(state == 1){
    if( !(lat - 0.001 < -123.44167856630257)){
      lat -= 0.001;
    }
    else{
      hitConstraint();
    }
  }
  else if(state == 2){
    if(!(lat + 0.001 > -123.38667856630231)){
     lat += 0.001;
    }
    else{
      hitConstraint();
    }
  }
  else if(state == 3){
    if(!(lon -0.001 < 48.38670922335086)){
      lon -= 0.001;
    }
    else{
      hitConstraint();
    }
  }
//  console.log('moved forwards' + 'state: ' + state);

}

function hitConstraint(){
 // console.log('hit constraint')
  turnLeft();

}


function getRandom(max){
  return Math.floor(Math.random()*max);
}

function testTemp(){
  if (getRandom(60) > 55){
    var layer = new ol.layer.Vector({
      source: new ol.source.Vector({
          features: [
              new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat([lat, lon])),
        
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
    moveForwards();
  }
  else if(randomNum <20){
    turnLeft();
  }

  testTemp();
}


function sensorTrigger1(){
   getDirection();
   var geom = new ol.geom.Circle(ol.proj.fromLonLat([lat, lon]));
   geom.setRadius(80  );
 
   var circleFeature = new ol.Feature(geom);

   vectorSource.addFeature(circleFeature);
   var vectorLayer = new ol.layer.Vector({
     source: vectorSource,
     style: style
    });
 

    sensor1.push(circleFeature);

    map.addLayer(vectorLayer);

    if(sensor1.length > 6){
    vectorLayer.getSource().removeFeature(sensor1[0])
    sensor1.shift();
    }

   window.setTimeout(sensorTrigger1,1000)
}



window.setTimeout(sensorTrigger1,1000);





