function (doc) {
	if (doc._id.substr(0, 5) === "date:"){
  	emit(doc._id.substr(5),{
  	"teamname1": doc.teamname1,
  	"team1race1": doc.team1race1,
  	"team1race2": doc.team1race2,
  	"teamname2": doc.teamname2,
  	"team2race1": doc.team2race1,
  	"team2race2": doc.team2race2,
  	"teamname3": doc.teamname3,
  	"team3race1": doc.team3race1,
  	"team3race2": doc.team3race2,
  	"teamname4": doc.teamname4,
  	"team4race1": doc.team4race1,
  	"team4race2": doc.team4race2,
  	"teamname5": doc.teamname5,
  	"team5race1": doc.team5race1,
  	"team5race2": doc.team5race2,
  	"teamname6": doc.teamname6,
  	"team6race1": doc.team6race1,
  	"team6race2": doc.team6race2
  	});
  	}
};