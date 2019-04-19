/*
	Temperature Converter
	By: Justin J
	March 4th 2019
*/

var tempConv;
var thermometer;
var tempIn;

function setup(){
	createCanvas(400,400);
  //GLOBAL PROPERTIES
	noFill();
	textAlign(CENTER);
	//input temp in fahrenheit, celsius or kelvin
	tempIn = createInput('');

	tempIn.id('temp_in');

	//tempIn.position(0,0);
	var c_btn = createButton('From Celsius');
	var f_btn = createButton('From Fahrenheit');
	var k_btn = createButton('From Kelvin');

	c_btn.mousePressed(setTemp);
	f_btn.mousePressed(setTemp);
	k_btn.mousePressed(setTemp);

	c_btn.id('temp_c');
	f_btn.id('temp_f');
	k_btn.id('temp_k');

	tempConv = new TempConverter();
	thermometer = new Thermometer();
}

function draw(){
	background(30);
  thermometer.display();
}

function setTemp(){
	var val = 0;
	if (!isNaN(tempIn.value())){
		val = int(tempIn.value());
		//val = tempIn.value(); *used for initial testing
    console.log(this.id());
	}

	switch(this.id()){
		case 'temp_c':
		tempConv.setFromCelcius(val);
		break;
		case 'temp_f':
		tempConv.setFromFahrenheit(val);
		break;
		case 'temp_k':
		tempConv.setFromKelvin(val);
		break;
	}
  thermometer.set(tempConv.tempC,tempConv.tempF,tempConv.tempK);
}
//Temp Conversion Formulas
class TempConverter{
	constructor(){
		this.tempF = 0;
		this.tempC = 0;
		this.tempK = 0;
	}
}

TempConverter.prototype.setFromFahrenheit = function(fVal){
	this.tempF = fVal;
	this.tempC = (5/9)*(fVal-32);
	this.tempK = this.tempC + 273.15;
}

TempConverter.prototype.setFromCelcius = function(cVal){
	this.tempC = cVal;
	this.tempK = cVal+273.15;
	this.tempF = ((9/5)*cVal)+32;
}

TempConverter.prototype.setFromKelvin = function(kVal){
	this.tempK = kVal;
	this.tempC = kVal-273.15;
	this.tempF = (9/5)*(this.tempC+32);
}

//Graphics
class Thermometer{
  constructor(){
    this.tC = 0;
    this.tF = 0;
    this.tK = 0;
  }
}

Thermometer.prototype.set = function(tC_,tF_,tK_){
  this.tC = tC_;
  this.tF = tF_;
  this.tK = tK_;
}

Thermometer.prototype.display = function(){
  //make 3 arcs: Kelvin - Fahrenheit - Celsius
  let r1 = 75;
  let r2 = r1 + 25;
  let r3 = r2 + 25;
  push();
  strokeWeight(10);
  translate(width/2,height/2);
  rotate(HALF_PI);
  stroke(0,255,0); //green: KELVIN
  arc(0,0,r1*2,r1*2,0,TAU*(this.tK/600));
  stroke(255,150,0); //orange: FAHRENHEIT
  arc(0,0,r2*2,r2*2,0,TAU*(this.tF/600));
  stroke(255,255,0);//yellow: CELSIUS
  arc(0,0,r3*2,r3*2,0,TAU*(this.tC/600));
  //text portion
  rotate(-HALF_PI);
  strokeWeight(0.5);
  stroke(255,255,0);
  text(nf(this.tC,1,0)+" C",0,20);
  stroke(255,150,0);
  text(nf(this.tF,1,0)+" F",0,0);
  stroke(0,255,0);
  text(nf(this.tK,1,0)+" K",0,-20);
  pop();
}
