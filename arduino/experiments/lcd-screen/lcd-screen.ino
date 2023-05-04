/*
  Abstraction
  
  Installation by Timo Hoogland (c) 2020
  www.timohoogland.com

  An installation with small controller to control Audio and Visuals
  Uses LCD Display, 2 Potmeters and LED

  Displays selected function on screen
  Displays the potmeter value as floatingpoint value
*/

// include the library code:
#include <LiquidCrystal.h>

// initialize the library by associating any needed LCD interface pin
// with the arduino pin number it is connected to
const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

// history of value for filter
float _v = -1;
float _f = -1;

int thresh = 2;

char *functionNames[] = {"noise", "oscillate", "shapy", "blob"};

void setup() {
  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);

  // setup the serial communication
  Serial.begin(9600);

  // startup text and scroll out of screen
  lcd.setCursor(0, 0);
  lcd.print("Abstraction");
  delay(1500);
  lcd.setCursor(0, 1);
  lcd.print("  by Timo");
  delay(1500);
  for (int c = 0; c < 16; c++) {
    lcd.scrollDisplayLeft();
    delay(150);
  }
}

void loop() {
  // read potmeter from analog A0 and A1
  float v = analogRead(A0);
  float f = analogRead(A1);

  // take delta of incoming values
  if (abs(v - _v) > thresh){
    _v = v;
  }
  if (abs(f - _f) > thresh){
    _f = f;
  }

  Serial.print(int(_v));
  Serial.print(" ");
  Serial.print(int(_f));
  Serial.println();

  // simple lowpass filter to reduce noise
  // float c = 0.9;
  // _v = v * c + _v * (1 - c);

  // control LED brightness (0 - 255 on PWM output)
  analogWrite(9, _v/4);

  char displayNumber[7];
  // convert float value to string with fixed precision/digits
  dtostrf(_v/1023, 7, 5, displayNumber);

  // clear the display
  lcd.clear();
  // print the function name on first line
  lcd.setCursor(0, 0);
  lcd.print(".");
  lcd.print(functionNames[int(_f/1024*4)]);
  lcd.print("(");

  // print the variable number from potmeter as float 0-1 on second line
  lcd.setCursor(0, 1);
  lcd.print("    ");
  lcd.print(displayNumber);
  lcd.print(" );");

  // sleep in milliseconds
  delay(5);
}