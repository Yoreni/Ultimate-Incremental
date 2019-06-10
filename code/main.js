var points = new Decimal(0); //this defines the players points use the "new Decimal" thing on the end because thats how we are going to handle numbers over 1e308
var pointsProduction = new Decimal(0);
var pps  = new Decimal(0)
var pointsClick = new Decimal(1);
var temp1 = new Decimal(0)
var page = 0;

var generators = [] //this is defining a list with nothing inside
makeGenerators();

var canvas = document.getElementById("buttonBackground");
var ctx = canvas.getContext("2d");

var vm = new Vue({
  el: "#app",
  data: 
  {
	  points: points,
	  pointsProduction: pointsProduction,
	  pointsClick: pointsClick,
	  generators: generators,
	  message: ""
  }
})
vm.message = 'a'

function makeGenerators()
{
	var prices = ["20","200","5000","2e4","1.25e5"] // this is define a list with 2 elements inside
	var production = ["0.1","1.5","9","30","75"]
	for(var a = 0 ; a < prices.length ; a = a + 1) //this is a for loop think of it like the repeat block in scratch
	{
		generators.push //push justs adds an item on to a list
		({
			price: new Decimal(prices[a]),
			production: new Decimal(production[a]),
			amount: new Decimal(0)
		})
	}
		
}

document.addEventListener('keydown', move); //changes the generator the player wants to buy
function move(e)
{
	key = e.keyCode;
	if(key == 37) 
	{
		page--;
		if(page == -1) page = generators.length - 1;
	}
	else if(key == 39) 
	{
		page = ((page + 1) % generators.length)
	}
}

function buyGen(generator) //you can also make functions to take in varibles like this
{
	if(points.greaterThanOrEqualTo(generators[generator - 1].price)) //checks if player has enough
	{
		points = points.minus(generators[generator - 1].price); //takes away the points
		generators[generator - 1].amount = generators[generator - 1].amount.add(1); //adds 1 to the generator amount
		generators[generator - 1].price = generators[generator - 1].price.times(1.2) //mutiplys the gen cost by 1
		pointsProduction = pointsProduction.add(generators[generator - 1].production) //addes the production thing
	}
}

function clickPoints()
{
	points = points.add(1);
}

var app = new Vue({
  el: '#app2',
  data: {
    message: points
  }
})

function gameLoop()
{
	points = points.add(pointsProduction)
	pps = pointsProduction.multiply(10)
	temp1 = generators[page].production.multiply(10)
	document.getElementById("points").innerHTML = "Points:" + points;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.font = "16px Arial";
	ctx.fillStyle = "#000000";
	ctx.fillText("generator " + (page + 1),0,20);
	ctx.fillText("You own " +  generators[page].amount,0,40);
	ctx.fillText("Cost: " +  generators[page].price,0,60);
	
	document.getElementById("genName").innerHTML = "Generator " + page;
	document.getElementById("genOwned").innerHTML = "You own " +  generators[page].amount + ".";
	document.getElementById("genPrice").innerHTML = "Cost: " +  generators[page].price;
	document.getElementById("genProd").innerHTML = "It makes " + temp1 + " points per second."
}
setInterval(gameLoop,100);
