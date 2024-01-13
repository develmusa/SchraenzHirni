

let getGaugeContainerVh = () => {
    console.log(document.querySelector(".gauge-container").clientHeight)
    return document.querySelector(".gauge-container").clientHeight
  }


const getGaugeTitleHeigth = () => {
    console.log(document.querySelector(".gauge-title").clientHeight)
    return document.querySelector(".gauge-title").clientHeight
}

const getGaugeHeigth = () => {
    console.log(getGaugeContainerVh() - getGaugeTitleHeigth())
    return getGaugeContainerVh()
    // return getGaugeContainerVh() - getGaugeTitleHeigth()
}


let calculateGaugeWidth = () => {
    let gaugeCount = document.querySelectorAll(".gauge-container").length
    return document.querySelector(".content").clientWidth / gaugeCount
  }

// Create Temperature Gauge
// https://canvas-gauges.com/documentation/user-guide/configuration
const gaugeRope = new LinearGauge({
    renderTo: 'gauge-rope',
    width: calculateGaugeWidth(),
    height: getGaugeHeigth(),
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
    animation: false,
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

const gaugeSpeed = new LinearGauge({
    renderTo: 'gauge-speed',
    width: calculateGaugeWidth(),
    height: getGaugeHeigth(),
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
    animation: false,
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

const gaugeTemp = new LinearGauge({
    renderTo: 'gauge-oil-temp',
    width: calculateGaugeWidth(),
    height: getGaugeHeigth(),
    units: "°C",
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
    animation: false,
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

let lastDistance = 0;
let lastTimestamp = Date.now();

function calculateSpeed(currentDistance) {
  const currentTime = Date.now();
  const timeElapsed = (currentTime - lastTimestamp) / 1000; // time in seconds

  if (timeElapsed === 0) {
    return 0; // To avoid division by zero
  }

  const distanceCovered = currentDistance - lastDistance;
  const speed = distanceCovered / timeElapsed; // Speed = Distance / Time

  // Update the last distance and last timestamp for the next calculation
  lastDistance = currentDistance;
  lastTimestamp = currentTime;

  return speed;
}

let lastHeartBeat = Date.now();

function heartBeatCheck() {
    console.log("heart beat check")
    const currentTime = Date.now();
    const timeElapsed = (currentTime - lastHeartBeat); // time in ms
  
    if (timeElapsed > 1000 ) {
        setToast("Verbindig unterbroche");
    }
}

let heartBeatIntervalId = 0;

if (!!window.EventSource) {
  var source = new EventSource('/events');
  heartBeatIntervalId = setInterval(heartBeatCheck(), 1000);
  
  source.addEventListener('open', function(e) {
    console.log("Events Connected");
    setToast("Verbinding verbunde");
  }, false);

  source.addEventListener('error', function(e) {
    if (e.target.readyState != EventSource.OPEN) {
      console.log("Events Disconnected");
      clearInterval(intervalId);
      setToast("Verbindig trennt");
    }
  }, false);
  


  source.addEventListener('heart_beat', function(e) {
    lastHeartBeat = Date.now();
  }, false);
  
  source.addEventListener('new_readings', function(e) {
    // console.log("new_readings", e.data);
    var myObj = JSON.parse(e.data);
    console.log(myObj);
    gaugeRope.value = myObj.rope;
    gaugeSpeed.value = calculateSpeed(myObj.rope);
  }, false);

    source.addEventListener('message', function(e) {
        console.log("unknown message received", e.data);
        }, false);
}




// document.querySelector(".toggle").addEventListener("click", function (event) {
//     setToast("tzest");
//     gaugeRope.value = 100;
//     gaugeRope.width = 10;
//     gaugeRope.height = 10;
//     gaugeRope.draw();
//   });

const splashScreen = document.querySelector('.splash');
splashScreen.addEventListener('click',()=>{
    activateWakeLock().then(() => { console.log("Wake Lock is active!") });

    splashScreen.style.opacity = 0;
    setTimeout(()=>{
        splashScreen.classList.add('hidden')
    },610)
    document.querySelector(".content").requestFullscreen();
    screen.orientation.lock("landscape-primary");
})

function setToast(message) {	
    var x = document.getElementById("snackbar");
    x.textContent = message;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }


// Create a reference for the Wake Lock.
let wakeLock = null;

const activateWakeLock = async () => {
    // create an async function to request a wake lock
    try {
        wakeLock = await navigator.wakeLock.request("screen");
    } catch (err) {
    // The Wake Lock request has failed - usually system related, such as battery.
        setToast(`${err.name}, ${err.message}`);
    }
}

// Create the root video element to keep screen on
var video = document.createElement('video');
video.setAttribute('loop', '');
// Add some styles if needed
video.setAttribute('style', 'position: fixed;');

// A helper to add sources to video
function addSourceToVideo(element, type, dataURI) {
    var source = document.createElement('source');
    source.src = dataURI;
    source.type = 'video/' + type;
    element.appendChild(source);
}

// A helper to concat base64
var base64 = function(mimeType, base64) {
    return 'data:' + mimeType + ';base64,' + base64;
};

// Add Fake sourced
addSourceToVideo(video,'webm', base64('video/webm', 'GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA='));
addSourceToVideo(video, 'mp4', base64('video/mp4', 'AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAG21kYXQAAAGzABAHAAABthADAowdbb9/AAAC6W1vb3YAAABsbXZoZAAAAAB8JbCAfCWwgAAAA+gAAAAAAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIVdHJhawAAAFx0a2hkAAAAD3wlsIB8JbCAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAIAAAACAAAAAABsW1kaWEAAAAgbWRoZAAAAAB8JbCAfCWwgAAAA+gAAAAAVcQAAAAAAC1oZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAVmlkZW9IYW5kbGVyAAAAAVxtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAEcc3RibAAAALhzdHNkAAAAAAAAAAEAAACobXA0dgAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAIAAgASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAAFJlc2RzAAAAAANEAAEABDwgEQAAAAADDUAAAAAABS0AAAGwAQAAAbWJEwAAAQAAAAEgAMSNiB9FAEQBFGMAAAGyTGF2YzUyLjg3LjQGAQIAAAAYc3R0cwAAAAAAAAABAAAAAQAAAAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAAAEwAAAAEAAAAUc3RjbwAAAAAAAAABAAAALAAAAGB1ZHRhAAAAWG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAK2lsc3QAAAAjqXRvbwAAABtkYXRhAAAAAQAAAABMYXZmNTIuNzguMw=='));

// Append the video to where ever you need
document.body.appendChild(video);

// Start playing video after any user interaction.
// NOTE: Running video.play() handler without a user action may be blocked by browser.
var playFn = function() {
    video.play();
    console.log("play");
    document.body.removeEventListener('touchend', playFn);
};
document.body.addEventListener('touchend', playFn);