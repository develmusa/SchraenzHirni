#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include "SPIFFS.h"
#include <Arduino_JSON.h>

// Replace with your network credentials
const char* ssid = "SchränzersHirn";
const char* password = "88888888";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

// Create an Event Source on /events
AsyncEventSource events("/events");

// Json Variable to Hold Sensor Readings
JSONVar readings;

// Timer variables
unsigned long heart_beat_last_time = 0;
unsigned long heart_beat_time_delay = 100;

// Rotary Encoder Variables
int rotary_encoder_segments_size_in_degree = 20;
volatile int rotary_encoder_segment_counter = 0;
volatile unsigned long rotary_encoder_last_time;  // for debouncing
int previous_rotary_encoder_segment_counter;

#define kRotaryEncoderClockPin 35
#define kRotaryEncoderDataPin 34



// Get Sensor Readings and return JSON object
String getSensorReadings(){
  readings["rotation"] = rotary_encoder_segment_counter * rotary_encoder_segments_size_in_degree;
  // readings["speed"] =  random(-50, 100);
  String jsonString = JSON.stringify(readings);
  return jsonString;
}

// Initialize SPIFFS
void initSPIFFS() {
  if (!SPIFFS.begin()) {
    Serial.println("An error has occurred while mounting SPIFFS");
  }
  Serial.println("SPIFFS mounted successfully");
}

// Initialize WiFi
void initWiFiSTA() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
}

void initWiFiAP() {
  WiFi.mode(WIFI_AP);
  WiFi.softAP(ssid, password);
  Serial.println(WiFi.localIP());
}

void ISREncoderChange() {
  if ((millis() - rotary_encoder_last_time) < 5)  // debounce
    return;

  if (digitalRead(kRotaryEncoderDataPin) == HIGH) {
    rotary_encoder_segment_counter--;
  } else {
    rotary_encoder_segment_counter++;
  }

  rotary_encoder_last_time = millis();
}



void setup() {
  // Serial port for debugging purposes
  Serial.begin(115200);
  Serial.println("Init Sensors....");
  pinMode(kRotaryEncoderClockPin, INPUT);
  pinMode(kRotaryEncoderDataPin, INPUT);
  attachInterrupt(digitalPinToInterrupt(kRotaryEncoderClockPin), ISREncoderChange, RISING);
  
  initWiFiAP();
  initSPIFFS();

  // Web Server Root URL
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.html", "text/html");
  });

  server.serveStatic("/", SPIFFS, "/");

  // Request for the latest sensor readings
  // server.on("/readings", HTTP_GET, [](AsyncWebServerRequest *request){
  //   String json = getSensorReadings();
  //   request->send(200, "application/json", json);
  //   json = String();
  // });

  events.onConnect([](AsyncEventSourceClient *client){
    if(client->lastId()){
      Serial.printf("Client reconnected! Last message ID that it got is: %u\n", client->lastId());
    }
    // send event with message "hello!", id current millis
    // and set reconnect delay to 1 second
    client->send("hello, hirni is connected!", NULL, millis(), 10000);
  });
  server.addHandler(&events);

  // Start server
  server.begin();
}

String last_sensor_reading = getSensorReadings();

void loop() {
  String current_sensor_reading = getSensorReadings();

  if (current_sensor_reading != last_sensor_reading) {
    last_sensor_reading = current_sensor_reading;
    events.send(getSensorReadings().c_str(),"new_readings" ,millis());
  }

  if ((millis() - heart_beat_last_time) > heart_beat_time_delay) {
    // Send Events to the client with the Sensor Readings Every 10 seconds
    events.send(String(millis()).c_str(),"heart_beat",millis());
    heart_beat_last_time = millis();
  }
}