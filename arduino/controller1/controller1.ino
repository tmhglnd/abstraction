/*
  Abstraction
  
  An interactive coding installation by Timo Hoogland, 2022
  www.timohoogland.com

  The installation uses a small controller to control Audio and Visuals
  Uses LCD Display, 2 Potentiometers, a Button (NO) and LED

  Displays selected function on screen
  Displays the potmeter value as floatingpoint value

  Using OSC example code from Adrien Freed - Library CNMAT/OSC
  Using LCD example code from Bill Perry - Library hd44780
*/

// include the libraries needed for Ethernet, OSC messaging
#include <Ethernet.h>
#include <EthernetUdp.h>
#include <SPI.h>
#include <OSCMessage.h>

// declare EthernetUDP object
EthernetUDP udp;

// include the libraries needed for LCD Display with backpack
#include <Wire.h>
#include <hd44780.h>
#include <hd44780ioClass/hd44780_I2Cexp.h>

// declare LCD object
hd44780_I2Cexp lcd;

// the device's ID
char device[] = "/control1";

// Ethernet shield1 MAC Address A8:61:0A:AE:A8:6D
byte mac[] = { 0xA8, 0x61, 0x0A, 0xAE, 0xA8, 0x6D };

// Ethernet shield2 MAC Address A8:61:0A:AE:95:10
// byte mac[] = { 0xA8, 0x61, 0x0A, 0xAE, 0x95, 0x10 };

// the Arduinos IP address
IPAddress ip(128, 32, 122, 252);
// destination IP is all addresses in network
IPAddress outIp(255, 255, 255, 255);
// IPAddress outIp(169, 254, 50, 206);
// receiving port
const unsigned int outPort = 9999;

// history of values for filter
int _f = 0;
int _v = 0;
int _s = HIGH;
int thresh = 1;
bool changed = true;

// function names for display
char *functionNames[] = {"squiggle", "mosaic", "smear", "glass", "paint"};

// The startup program running once
// 
void setup() {
  // input for button
  pinMode(2, INPUT_PULLUP);

  // Start ethernet connection for mac address and ip
  Ethernet.begin(mac, ip);
  // Open receiving port number
  udp.begin(8888);

  // Initialize LCD Display with columns and rows
  int status = lcd.begin(20, 4);
  // Status is non-zero if unsuccesful
  if (status){
    // Blink error code using onboard LED if possible
    hd44780::fatalError(status);
  }

  // Otherwise initialization succesful, load start screen text
  startScreen();
}

// The main program running continuously in a loop
// 
void loop() {
  // read knobs from analog inputs and emit osc message
  int f = analogRead(A0);
  int v = analogRead(A1);
  int s = digitalRead(2);
  
  // threshold to change value to remove noise from potentiometer
  // only send message when value changed
  if (abs(f - _f) > thresh){
    oscSend("/control1/function", f);
    _f = f;
    changed = true;
  }
  if (abs(v - _v) > thresh){
    oscSend("/control1/value", v);
    _v = v;
    changed = true;
  }
  if (abs(s - _s) > 0){
    oscSend("/control1/switch", s);
    _s = s;
    changed = true;
  }

  // print all the text on the display and change the LED color
  // but only if any of the values changed
  if (changed){
    displayTextAndLED(_f, _v, _s);
    changed = false;
  }

  // pause the program to safe cpu load
  delay(50);
}

// a function that display text and LED color
void displayTextAndLED(int f, int v, int s){
  // control LED RGB light brightness (0-255 on PWM output)
  analogWrite(3, v/4); //red
  analogWrite(5, f/4); //blue
  analogWrite(6, (1-s)*255); //gree

  // clear the display
  lcd.clear();
  // print the function name on first line
  lcd.setCursor(0, 1);
  lcd.print(" .");
  lcd.print(functionNames[int(float(f)/1024*5)]);
  lcd.print("(");

  // generate a char array for number displaying
  char displayNumber[10];
  // convert float value to string with fixed digits
  dtostrf(float(v)/1023, 8, 6, displayNumber);

  // print the variable number from the knob as float 0-1
  lcd.setCursor(0, 2);
  lcd.print("     ");
  lcd.print(displayNumber);

  // if the code is combined show text
  if (!s){    
    lcd.print(" )");
    lcd.setCursor(0, 3);
    lcd.print(" .combine();");
  } else {
    lcd.print(" );");
  }
}

// A function that sends an OSC-message to specified IP and Port
// with variable address and value
void oscSend(char addr[], int val){
  // the messages wants an OSC address as first argument
  OSCMessage msg(addr);
  // add the value to the message
  msg.add(val);

  udp.beginPacket(outIp, outPort);
  // send the bytes to the SLIP stream
  msg.send(udp);
  // mark the end of the OSC Packet
  udp.endPacket();
  // free space occupied by message
  msg.empty();
}

// A function that displays the startscreen
void startScreen(){
  lcd.setCursor(0, 0);
  lcd.print("ABSTRACTION");
  delay(500);
  
  lcd.setCursor(0, 1);
  lcd.print("  by Timo");
  delay(500);
  
  lcd.setCursor(0, 3);
  lcd.print("         starting...");
  delay(1000);
}
