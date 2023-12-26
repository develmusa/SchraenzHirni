// Get current sensor readings when the page loads  
window.addEventListener('load', getReadings);


// Create Temperature Gauge
// https://canvas-gauges.com/documentation/user-guide/configuration
var gaugeRope = new LinearGauge({
    renderTo: 'gauge-rope',
    width: 1000,
    height: 1000,
    titel: "Rope Tension",
    units: "m",
    minValue: 0,
    maxValue: 300,
    majorTicks: [
        "0",
        "50",
        "100",
        "150",
        "200",
        "250",
        "300"
    ],
    exactTicks: true,
    minorTicks: 10,
    strokeTicks: true,
    // majorTicksInt: 10,
    // majorTicksDec: 0,
    highlightsWidth: 5,
    numbersMargin: 0,
    highlights: [
        {
            "from": 200,
            "to": 300,
            "color": "rgba(255, 0, 0, .75)"
        }
    ],
    colorPlate: "#fff",
    animationDuration: 100,
    animationRule: "linear",
    tickSide: "left",
    numberSide: "left",
    needleType: "line",
    needleSide: "left",
    needleShadow: false,
    needleWidth: 10,
    needleStart: 0,
    needleEnd: 150,
    colorNeedle: "rgba(255, 0, 255, 1)",
    borders: false,
    borderOuterWidth: 5,
    borderMiddleWidth: 10,
    borderInnerWidth: 15,
    borderShadowWidth: 5,
    barWidth: 20,
    barStrokeWidth: 7,
    barProgress: true,
    barShadow: 0,
    barBeginCircle: false,
    colorValueBoxShadow: false,
    colorValueBoxBackground: false,
    value: 180,
    valueBox: true,
    valueBoxStroke: 0,
    valueBoxWidth: 100,
    valueText: false,
    valueTextShadow: false,
    valueBoxBorderRadius: 0,
    valueInt: 2,
    valueDec: 0,
}).draw();

var gaugeSpeed = new LinearGauge({
    renderTo: 'gauge-speed',
    width: 1000,
    height: 1000,
    units: "km/h",
    minValue: -30,
    maxValue: 80,
    majorTicks: [
        -30,
        -20,
        -10,
        0,
        10,
        20,
        30,
        40,
        50,
        60,
        70,
        80
    ],
    exactTicks: true,
    minorTicks: 5,
    strokeTicks: true,
    // majorTicksInt: 10,
    // majorTicksDec: 0,
    highlightsWidth: 5,
    numbersMargin: 0,
    highlights: [
        {
            "from": -30,
            "to": 0,
            "color": "rgba(0, 0, 255, .75)"
        }
    ],
    colorPlate: "#fff",
    animationDuration: 100,
    animationRule: "linear",
    tickSide: "left",
    numberSide: "left",
    needleType: "line",
    needleSide: "left",
    needleShadow: false,
    needleWidth: 10,
    needleStart: 0,
    needleEnd: 150,
    colorNeedle: "rgba(255, 0, 255, 1)",
    borders: false,
    borderOuterWidth: 5,
    borderMiddleWidth: 10,
    borderInnerWidth: 15,
    borderShadowWidth: 5,
    barWidth: 20,
    barStrokeWidth: 7,
    barProgress: true,
    barShadow: 0,
    barBeginCircle: false,
    colorValueBoxShadow: false,
    colorValueBoxBackground: false,
    valueBox: true,
    valueBoxStroke: 0,
    valueBoxWidth: 100,
    valueText: false,
    valueTextShadow: false,
    valueBoxBorderRadius: 0,
    valueInt: 2,
    valueDec: 0,
    value: 25,
}).draw();

// Function to get current readings on the webpage when it loads for the first time
function getReadings(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      console.log(myObj);
      var rope = myObj.rope;
      var speed = myObj.speed;
      gaugeRope.value = rope;
      gaugeSpeed.value = speed;
    }
  }; 
  xhr.open("GET", "/readings", true);
  xhr.send();
}

if (!!window.EventSource) {
  var source = new EventSource('/events');
  
  source.addEventListener('open', function(e) {
    console.log("Events Connected");
  }, false);

  source.addEventListener('error', function(e) {
    if (e.target.readyState != EventSource.OPEN) {
      console.log("Events Disconnected");
    }
  }, false);
  
  source.addEventListener('message', function(e) {
    console.log("message", e.data);
  }, false);
  
  source.addEventListener('new_readings', function(e) {
    console.log("new_readings", e.data);
    var myObj = JSON.parse(e.data);
    console.log(myObj);
    gaugeRope.value = myObj.rope;
    gaugeSpeed.value = myObj.speed;
  }, false);
}

document.querySelector(".toggle").addEventListener("click", function (event) {
    if (document.fullscreenElement) {
      // If there is a fullscreen element, exit full screen.
      document.exitFullscreen();
      return;
    }
    // Make the .element div fullscreen.
    document.querySelector(".content").requestFullscreen();
  });