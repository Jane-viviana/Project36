var dog,sadDog,happyDog;
var database;
var foodStock;
var fedTime,lastFed;
var feed,addFood,foodObject;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  console.log(database);

  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObject = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock,)

  feed = createButton("FeedTheDog");
  feed.position(500,50);
  feed.mousePressed(feedDog);

  addFood = createButton("AddFood");
  addFood.position(600,50);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);

  foodObject.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  textSize(20);
  fill("purple");
  if(lastFed >= 12){
    text("LastFeed: "+ lastFed % 12+"PM", 350,30);
  }
  else if(lastFed == 0){
    text("LastFeed: 12 AM", 350,30);
  }
  else{
    text("lastFeed: "+ lastFed+"AM", 350,30);
  }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodObject.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  if(foodObject.getFoodStock()<=0){
    foodObject.updateFoodStock(foodObject.getFoodStock()*0);
  }
  else{
    foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  }

  database.ref('/').update({
    Food: foodObject.getFoodStock(),
    FeedTime: hour()
  })
}

//function to add food in stock

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
 