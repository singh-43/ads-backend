const handleRoot = (Ads,Comapnies)=>(req,res)=>{
	let {n} = req.body;
	const re = new RegExp(n, 'i')
	if(!n.length){
		res.json("Enter text to search")
	}else{
		Ads.aggregate([
			{
			$lookup:
			{
				from: "companies", 
				localField: "companyId",
				foreignField: "_id",
				as: "new"
			}
			},
			    {
			      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$new", 0 ] }, "$$ROOT" ] } }
			    },
			{
			$project: { new: 0,__v:0,url:0,companyId:0,CTA:0 }
			},
			{
				"$match":
				{
		            "$or":[
		            {"name": { "$regex": re}},
		            {"primaryText": { "$regex": re}},
		            {"headline": { "$regex": re}},
		            {"description": { "$regex": re}}
		            ]
		        }
			}
		])
		.then(function(m){
			res.json(m);
		});
	}
}
module.exports = {
	handleRoot
};