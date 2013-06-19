function (doc) {
	if (doc._id.substr(0, 5) === "date:"){
  	emit(doc._id.substr(5));
  	
  	}
};