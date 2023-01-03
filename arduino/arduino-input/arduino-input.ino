const int LED_PIN = 13;

void setup() {
  Serial.begin(9600);

  // startup blink, after that pin 13 stays HIGH, the LED stays ON
  digitalWrite(LED_PIN, HIGH);
  delay(600);
  digitalWrite(LED_PIN, LOW);

  delay(600);
}

void loop() {
  int v1 = analogRead(A0);
  int v2 = analogRead(A1);
  int v3 = analogRead(A2);

  analogWrite(11, v2/4);
  Serial.print(v1);
  Serial.print(" ");
  Serial.print(v2);
  Serial.print(" ");
  Serial.print(v3);
  Serial.println();
  
  delay(10);
}
