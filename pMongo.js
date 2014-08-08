// uuid function copied from: https://gist.github.com/jed/982883
function uuid(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)}
 
var pMongo = function()
{
	this.data_store = []; // simple array
	this.do_not_add_if_exists = false;
}
 
pMongo.prototype.count = function()
{
	return this.data_store.length;
};
 
pMongo.prototype.add = function(doc)
{
	if(typeof doc._id === undefined || typeof doc._id != "string")
	{
		do
			doc._id = uuid();
		while(this.findOne(doc._id) !== null);
	}
 
	if(this.do_not_add_if_exists && this.findOne(doc._id) !== null)
		return false;
 
	this.data_store.push(doc);
	return true;
};
 
pMongo.prototype.findOne = function(_id)
{
	if(!_id) return null;
 
	for(var i = 0; i < this.count(); i++)
	{
		var doc = this.getByIndex(i);
		if(doc._id == _id)
			return doc;
	}
 
	return null;
};
 
pMongo.prototype.getByIndex = function(index)
{
	if(typeof index == "undefined") return null;
 
	if(index > this.count())
		return null;
 
	return this.data_store[index];
};
 
pMongo.prototype.docIsMatching = function(doc, conds, limit_, skip_)
{
	for(var c in conds)
	{
		var cond = conds[c];
		//console.log("conds["+ c +"]: " + conds[c]);
		switch(typeof cond)
		{
			case "object":
			{
				//console.log("object geldi", c, cond);
				var gt, gte, lt, lte;
 
				for(k in cond)
				{
					switch(k)
					{
						case "$gt": // greater than
						case "$gte": // greater than or equal
						{
							if(typeof cond[k] != "number")
								throw "$gt query requires number";
							if(typeof doc[c] != "number")
								break; // you can store any type of data in any field
 
							//if( (k == "$gt" && doc[c] < cond[k]) || doc[c] < cond[k])
							console.log(c, k, doc, cond);
							if( (k == "$gt" && doc[c] <= cond[k]) || doc[c] < cond[k] )
								return false;
							console.log("doc[c]: " + doc[c] + " cond[k]: " + cond[k]);
						} break;
					}
				}
 
			} break;
			default:
				if(doc[c] != cond)
					return false;
		}
	}
 
	return true;
}
 
 
pMongo.prototype.find = function(conds, limit_, skip_)
{
	if(!conds) return null;
 
	var count = this.count();
	var limit = count
	  , skip = 0;
 
	if(skip_) skip = skip_;
	if(limit_)	limit = limit_;
 
	var results = [];
 
	for(var i = 0; i < count; i++)
	{
		var doc = this.getByIndex(i)
 
		var is_matching = this.docIsMatching(doc, conds, limit, skip);
 
		if(is_matching === true)
			results.push(doc);
	}
 
	return results;
};
 
pMongo.prototype.remove = function(conds)
{
	if(!conds) return null;
 
	if(typeof conds == "string")
		return this.removeById(conds);
	if(typeof conds != "object")
		return false;
 
	var results = this.find(conds);
	for(var i in results)
		this.removeById(results[i]._id);
 
	return true;
};