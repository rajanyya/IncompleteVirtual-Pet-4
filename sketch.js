var dog, happyDog,database;
var dogImg,dogHappyImg;
var milk, milkImg;
var gamestate;
var bedroom,garden,livingroom,washroom;

function preload(){
	sadDog = loadImage("Dog.png");
  happyDog = loadImage("Happydog.png");
  milkImg= loadImage("milkbottle.png");
  bedroom= loadImage("Bed Room.png");
 garden=loadImage("Garden.png");
livingroom  = loadImage("Living Room.png");
  washroom= loadImage("washroom.png");
}

function setup() {
  db = firebase.database();
	createCanvas(500, 500);

  foodObj=new Food();

  dog = createSprite(250,250,10,10);
  dog.addImage(sadDog);
  dog.scale= 0.15;

  foodStock = db.ref("food");
  foodStock.on("value", readStock);
  foodStock.set(20);

  milkbottle= createSprite(140,435,10,10)
  milkbottle1.addImage(milkImg);
  milkbottle1.scale= 0.025;

  milkbottle2 = createSprite(210,280,10,10);
  milkbottle2.addImage(milkImg);
  milkbottle2.scale= 0.025;
  milkbottle2.visible=false;



}


function draw() {
  background("yellow");

  foodObj.display();
writeStock(foodS);

if(foodS===0){
  dog.addImage(happyDog);
milkbottle2.visible=false;
}esle{
  dog.addImage(sadDog);
  milkbottle2.visible=true;
}
var gameStateRef=database.ref("gamestate");
gameStateRef.on("value",function(data){
  gameState=data.val();
});

var button=createButton("Feed the Dog");
button.position(400,125);

if(button.mousePressed(function(){
foodS=foodS-1;
gameState=1;
db.ref("/").update({"gameState":gamestate});
}));

if(gameState===1){
dog.addImage(happyDog);
dog.scale=0.175;
dog.y=250;
}

if(gameState===2){
  dog.addImage(sadDog);
dog.scale=0.175;
milkbottle2.visible=false;
dog.y=250;
}

var Bath= createButton("I want to take bath");
Bath.position(580,125);
if(Bath.mousePressed(function(){
  gameState=3;
  db.ref("/").update({"gameState": gamestate});
}));

if(gameState===3){
  dog.addImage(washroom);
  dog.scale=1;
  milkbottle2.visible=false;
}

var Sleep= createButton("Iam very sleepy");
Sleep.position(710,125);
if(Sleep.mousePressed(function(){
  gameState=4;
  db.ref("/").update({"gameState": gamestate});
}));


if(gameState===4){
  dog.addImage(bedroom);
  dog.scale=1;
  milkbottle2.visible=false;
}

if(gameState===5){
  
}

if(gameState===6){
  
}


}