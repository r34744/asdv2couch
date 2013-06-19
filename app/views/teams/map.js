function (doc) {
	if (doc._id.substr(0, 5) === "date:"){
  	emit(doc._id.substr(5), {
  	"teamname1": doc.teamname1,
  	"teamname2": doc.teamname2,
  	"teamname3": doc.teamname3,
  	"teamname4": doc.teamname4,
  	"teamname5": doc.teamname5,
  	"teamname6": doc.teamname6,
  	});
 }
};