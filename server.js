const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors');

const root = require('./controllers/root');
const root1 = require('./controllers/root1');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

mongoose.connect("mongodb://localhost:27017/showsadds",{useNewUrlParser: true,useUnifiedTopology: true},function(err){
	if(err){
		console.log(err);
	}else{
		console.log("MongoDB Connection Successfull")
	}
})

const adsSchema = new mongoose.Schema ({
	_id: Number,
	companyId: Number,
	primaryText: String,
	headline: String,
	description: String,
	CTA: String,
	imageUrl: String
})

const companiesSchema = new mongoose.Schema ({
	_id: Number,
	name: String,
	url: String
})

const Ads = mongoose.model("Ads",adsSchema);

const Comapnies = mongoose.model("Companies",companiesSchema);

app.post('/', root.handleRoot(Ads,Comapnies))
// app.get('/', root1.handleRoot1(Ads,Comapnies))

app.listen(3000,()=>{
	console.log('App is running on port 3000')
})