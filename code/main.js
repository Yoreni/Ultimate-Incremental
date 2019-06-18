var points = new Decimal(0); //this defines the players points use the "new Decimal" thing on the end because thats how we are going to handle numbers over 1e308

var pointsProduction = new Decimal(0);

var pps  = new Decimal(0)

var pointsClick = new Decimal(1);

var page = 0;

var temp1 = new Decimal(0)

var generators = [] //this is defining a list with nothing inside
makeGenerators();


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
	var prices = ["20","200","5000","2e4","1.25e5"]
	var production = ["0.1","1.5","9","30","75"]
	
	for(var a = 0 ; a < prices.length ; a = a + 1) //this is a for loop think of it like the repeat block in scratch
	{
		generators.push //push justs adds an item on to a list
		({
			price: new Decimal(prices[a]),
			production: new Decimal(production[a]),
			amount: new Decimal(0),
			muti: new Decimal(1)
		})
	}
}

function defrag(gen)
{
	var prices = ["20","200","5000","2e4","1.25e5"]
	
	generators[gen].muti = calcDefragBooster(gen);
	generators[gen].amount = new Decimal(0);
	generators[gen].price = new Decimal(prices[gen]);
	pointsProduction = calcProduction();
}

function calcProduction()
{
	var total = new Decimal(0);
	for(const gen of generators)
	{
		total = total.add(gen.amount.times(gen.production.times(gen.muti)));
	}
	return total
}

function calcDefragBooster(gen)
{
	return generators[gen].amount.divide(5).root(1.7);
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
	if(points.greaterThanOrEqualTo(generators[generator].price)) //checks if player has enough
	{
		points = points.minus(generators[generator].price); //takes away the points
		generators[generator].amount = generators[generator].amount.add(1); //adds 1 to the generator amount
		generators[generator].price = generators[generator].price.times(1.2) //mutiplys the gen cost by 1
		pointsProduction = pointsProduction.add(generators[generator].production.times(generators[generator].muti)) //addes the production thing
	}
}



function format(x)
{
	var abb = ["","K","M","B","T","q","Q","s","S","O","N","d","U","D"]
	var lay = x.layer
	var mag = x.mag
	if(x.equals(0)) return "0";
	else if(x.lessThan(1000))
	{
		var dp = Math.pow(10,((Math.floor(Math.log10(mag)) - 2) * -1))
		return (Math.floor((mag * dp)) / dp) + "";
	}
	else if(x.lessThan(new Decimal("1e" + (abb.length * 3))))
	{
		if(mag <= (abb.length * 3))
		{
			mag = Math.pow(10,mag)
			lay--;
		}
		var factor = Math.pow(10,Math.floor(Math.log10(mag) / 3) * 3);
		var dp = Math.pow(10,((Math.floor(Math.log10(x / factor)) - 2) * -1))
		return Math.floor((x / factor) * dp) / dp + abb[Math.log10(factor) / 3];
	}
}



function clickPoints()
{
	points = points.add(pointsClick);
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
	document.getElementById("points").innerHTML = "Points:" + format(points);
	document.getElementById("clickable").innerHTML = "$$$ Click $$$</br>+" + format(pointsClick) + " points";
	document.getElementById("defrag").innerHTML = "Defrag</br>x" + format(calcDefragBooster(page)) + " muti";
	document.getElementById("generator").innerHTML = "Generator " + (page + 1) + "</br>You own " + format(generators[page].amount) + "</br>Cost: " + format(generators[page].price) + "</br>It makes " + format(generators[page].production.multiply(10)) + " points/sec</br>x" + format(generators[page].muti) + " muti";

	app.message = format(points)
}

setInterval(gameLoop,100);
