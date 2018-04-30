'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var Sales = [];
var ret = [];
var l=1,m=0,n=0;
function calling(){
var a = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var str1 = " ";
str1 =  a[1].toUpperCase() + a[2].toUpperCase() + n+m+l;
if(l==9 && m==9){
n++;
l=-1;
n=0;
}
if(l==9){
l=-1;
m++;
}
l++;
return str1;
}

var phones = [ { model: "Note4", manufacturer: "Samsung", price: 10000, quantity:10, onDeal:false, dquantity:0, dprice:0, time:0 },
{ model: "J2", manufacturer: "Samsung", price: 7999, quantity:10, onDeal:false, dquantity:0, dprice:0, time:0 },
{ model: "Note4", manufacturer: "Redmi", price: 13599, quantity:10, onDeal:false, dquantity:0, dprice:0, time:0 },
{ model: "Note5", manufacturer: "Redmi", price: 17000, quantity:10, onDeal:false, dquantity:0, dprice:0, time:0 },
{ model: "F3", manufacturer: "Oppo", price: 16999, quantity:10, onDeal:false, dquantity:0, dprice:0, time:0 },
{ model: "F5", manufacturer: "Oppo", price: 20990, quantity:10, onDeal:false, dquantity:0, dprice:0, time:0 },
{ model: "E4", manufacturer: "Motorola", price: 10999, quantity:10, onDeal:false, dquantity:0, dprice:0, time:0 },
{ model: "G5 Plus", manufacturer: "Motorola", price: 14999, quantity:10, onDeal:false, dquantity:0, dprice:0, time:0 },
{ model: "Note4", manufacturer: "Honor", price: 12999, quantity:10, onDeal:false, dquantity:0, dprice:0, time:0 },
{ model: "Note5", manufacturer: "Honor", price: 15999, quantity:10, onDeal:false, dquantity:0, dprice:0, time:0 },
{ model: "J2 Pro", manufacturer: "Samsung", price: 12999, quantity:10, onDeal:false, dquantity:0, dprice:0, time:0 }
];

app.get('/get-items/manufacturer', function (req, res) {
	var man = req.param('man');
	var rest = [];
	for (var i in phones){
		if(man.toLowerCase()==phones[i].manufacturer.toLowerCase()){
			rest.push(phones[i]);			
		}
}
  res.send(rest);
})
app.get('/getSales', function (req, res) {
  res.send(Sales);
})

app.get('/buy', function (req, res) {
	var man = req.param('man');
	var rest = [];
	for (var i in phones){
		if(man.toLowerCase()==phones[i].manufacturer.toLowerCase()){
			rest.push(phones[i]);			
		}
}
  res.send(rest);
})
app.get('/get-items/model', function (req, res) {
	var mod = req.param('mod');
	var rest = [];
	for (var i in phones){
		if(mod.toLowerCase()==phones[i].model.toLowerCase()){
			rest.push(phones[i]);			
		}
}
  res.send(rest);
})
app.get('/get-items/max_price', function (req, res) {
	var maxp = req.param('maxp');
	var rest = [];
	for (var i in phones){
		if(maxp>=phones[i].price){
			rest.push(phones[i]);			
		}
}
  res.send(rest);
})
app.get('/get-items/min_price', function (req, res) {
	var minp = req.param('minp');
	var rest = [];
	for (var i in phones){
		if(maxp<=phones[i].price){
			rest.push(phones[i]);			
		}
}
  res.send(rest);
})
app.get('/buy/model', function (req, res) {
	var mod = req.param('mod');
	var cid = req.param('cid');
	
	for (var i in phones){
		if(mod.toLowerCase()==phones[i].model.toLowerCase()){
			if(phones[i].quantity!=0)
				phones[i].quantity--;
			if(phones[i].quantity<=0)
				phones[i].quantity = "Sold Out";
			Sales.push({model:phones[i].model, quantity:phones[i].quantity, customer_id:cid, invoice: calling()});
			
						
		}
}
res.send(Sales);
})

app.get('/return', function (req, res) {
	var inv = req.param('inv');
	var mod;	
	for (var i in Sales){
		if(inv.toLowerCase()==Sales[i].invoice.toLowerCase()){
				mod = Sales[i].model	
					
				for (var j in phones){
					if(mod==phones[j].model){
						phones[j].quantity+=1;
						ret.push({model:phones[j].model, quantity:phones[j].quantity, customer_id:Sales[i].customer_id, invoice: inv, returned: 'true'});			
					}
				}		
		}
	}
res.send(ret);
})
app.get('/start-deal', function (req, res) {
	var mod = req.param('mod');
	var quantity = req.param('quantity');
	var price = req.param('price');
	var time = req.param('time');					
	for (var j in phones){
		if(mod.toLowerCase()==phones[j].model.toLowerCase()){
			phones[j].onDeal = true;
			phones[j].dquantity = quantity;
			phones[j].dprice = price;
			phones[j].time = time;
			break;
			}
	}	
	while(phones[j].time>0){
	phones[j].time-=1;
}

if(phones[j].time==0){
	phones[j].onDeal = false;
	phones[j].dquantity = 0;
	phones[j].dprice = 0;
	phones[j].time = 0;
}
res.send(phones);
})
/*
app.get('/', function (req, res) {
  console.log("Hello Kaveri");
  res.send('Hello Kaveri');
})

app.get('/echo', function (req, res) {
  console.log("Hello Kaveri from Time Table");
  console.log('name is ' + req.param('name'));
  res.send('You sent - ' + req.url);
})
 
*/
app.listen(9999, function (err) {
  if (err) {
    throw err
  }
  console.log('Server started on port 9999')
})
