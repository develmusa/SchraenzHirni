

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
    value: 0,
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
    value: 0,
}).draw();

const gaugeTemp = new LinearGauge({
    renderTo: 'gauge-water-temp',
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
    value: 0,
}).draw();

let lengthRopeLength = 0;
let lastTimestamp = Date.now();

let readings = null;

function calculateSpeed(currentRopeLength) {
  const currentTime = Date.now();
  const timeElapsed = (currentTime - lastTimestamp) / 1000; // time in seconds

  const distanceCovered = currentRopeLength - lengthRopeLength;
  const speed = distanceCovered / timeElapsed; // Speed = Distance / Time

  // Update the last distance and last timestamp for the next calculation
  lengthRopeLength = currentRopeLength;
  lastTimestamp = currentTime;

  return speed;
}



function updateSpeed() {
    if (readings)
        rope_length = readings.rotation / rotationConversionFactor;
        let speed = calculateSpeed(rope_length)
        gaugeSpeed.value = speed
        if (speed < 10) {
            // requestAnimationFrame(() => updateShepardTone(speed));
        }
  }

let lastHeartBeat = Date.now();

function heartBeatCheck() {
    const currentTime = Date.now();
    const timeElapsed = (currentTime - lastHeartBeat); // time in ms
    
    var x = document.getElementById("connection-snackbar");
    x.className = "show";
    if (timeElapsed > 1000 ) {
        x.textContent = "Verbindig unterbroche";
    } else {
        x.className = x.className.replace("show", "");
    }
}

let heartBeatIntervalId = 0;
const heartBeatIntervalTime = 1000
let speedIntervalId = 0;
const speedIntervalTime = 500

const rotationConversionFactor = 20 //rotation degrees to meter rope


if (!!window.EventSource) {
  var source = new EventSource('/events');
  heartBeatIntervalId = setInterval(heartBeatCheck, heartBeatIntervalTime);
  speedIntervalId = setInterval(updateSpeed, speedIntervalTime);

  
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
    readings = JSON.parse(e.data);
    console.log(readings);
    gaugeRope.value = readings.rotation / rotationConversionFactor;
    gaugeTemp.value = readings.water_temp;
    // gaugeSpeed.value = calculateSpeed(rope_meter);
  }, false);

    source.addEventListener('message', function(e) {
        console.log("unknown message received", e.data);
        }, false);
}

const splashScreen = document.querySelector('.splash');
splashScreen.addEventListener('click',()=>{
    splashScreen.style.opacity = 0;
    setTimeout(()=>{
        splashScreen.classList.add('hidden')
    },610)
    document.querySelector(".content").requestFullscreen();
    screen.orientation.lock("landscape-primary");
    startSound();
})

function setToast(message) {	
    var x = document.getElementById("snackbar");
    x.textContent = message;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }


  let audioCtx;
  const oscillators = [];
  const gainNodes = [];
  const numOscillators = 16;
  const baseFrequency = 440;
  let toneChangeRate = 20; // Adjust this to control the speed of the pitch change
  
  function startSound() {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
      for (let i = 0; i < numOscillators; i++) {
          const oscillator = audioCtx.createOscillator();
          oscillator.type = 'sine';
  
          const gainNode = audioCtx.createGain();
          gainNode.gain.value = 0.5;
  
          oscillator.connect(gainNode).connect(audioCtx.destination);
          oscillators.push(oscillator);
          gainNodes.push(gainNode);
      }
  
      oscillators.forEach((oscillator, index) => {
        let initialFrequency = baseFrequency * Math.pow(2, index - numOscillators / 2);
    
        // Constrain the initial frequency within the audible range of 20 Hz to 20 kHz
        initialFrequency = Math.min(Math.max(initialFrequency, 20), 20000);
    
        oscillator.frequency.value = initialFrequency;
        oscillator.start();
    });

    //   requestAnimationFrame(() => updateShepardTone(toneChangeRate));

  
  }

function updateShepardTone(rate) {
    const currentTime = audioCtx.currentTime;
    const transitionTime = 0.01; // Time in seconds for smooth transitions

    for (let i = 0; i < numOscillators; i++) {
        let frequencyChangeFactor = Math.pow(2, rate / 1000);
        let newFrequency = oscillators[i].frequency.value * frequencyChangeFactor;

        newFrequency = Math.min(Math.max(newFrequency, 20), 20000);

        if (newFrequency < baseFrequency / 2) {
            newFrequency *= 2;
        } else if (newFrequency > baseFrequency * 2) {
            newFrequency /= 2;
        }

        // Smooth frequency transition
        oscillators[i].frequency.linearRampToValueAtTime(newFrequency, currentTime + transitionTime);

        // Calculate new gain value
        let newGain = 1 - Math.abs(Math.log2(newFrequency / baseFrequency) % 1);

        // Smooth gain transition
        gainNodes[i].gain.linearRampToValueAtTime(newGain, currentTime + transitionTime);
    }
    requestAnimationFrame(() => updateShepardTone(rate));
}