// Gregory Koenig
// ASD 1306


$('#main').on('pageinit', function(){
	//code needed for page goes here
});

$('#AddNewRace').on('pageinit', function(){
	
    $("#submitbutton").on( "click", function( event ) {
        event.preventDefault();
        var document = {};
        document._id = "date:" + $("input#date").val();
        document.time = $("input#time").val();
        document.teamname1 = $("input#teamname1").val();
        document.team1race1 = $("input#team1race1").val();
        document.team1race2 = $("input#team1race2").val();
        document.teamname2 = $("input#teamname2").val();
        document.team2race1 = $("input#team2race1").val();
        document.team2race2 = $("input#team2race2").val();
        document.teamname3 = $("input#teamname3").val();
        document.team3race1 = $("input#team3race1").val();
        document.team3race2 = $("input#team3race2").val();
        document.teamname4 = $("input#teamname4").val();
        document.team4race1 = $("input#team4race1").val();
        document.team4race2 = $("input#team4race2").val();
        document.teamname5 = $("input#teamname5").val();
        document.team5race1 = $("input#team5race1").val();
        document.team5race2 = $("input#team5race2").val();
        document.teamname6 = $("input#teamname6").val();
        document.team6race1 = $("input#team6race1").val();
        document.team6race2 = $("input#team6race2").val();
        $.couch.db("asdv2").saveDoc( document, {
                success: function() {
                    alert( "Saved." );
                },
                error: function() {
                    alert( "Cannot save new document." );
                 }
        });
        return false;
    });

});

$('#PastRaces').on('pageinit', function(){
	
	$("#fromCouchUL").empty();
	
    $.couch.db("asdv2").view("app/races", {
    	success: function(data) {
    		$("#fromCouch").append(
           		$("<ul>").attr("id", "fromCouchUL")
           	);
           	$("#fromCouchUL").attr("data-role", "listview");
           	$("#fromCouchUL").attr("data-inset", "true");
           	
           	$.each(data.rows, function(index, date){
    			var date = (date.key);
            	$("#fromCouchUL").append(
           			$("<li>").append(
           			$("<a>").attr("href", "pastrace.html?date:" + date).text(date)
           			)
           		);
       		});	
       	
       	
       	}
       	
      //$('#fromCouchUL').listview('refresh'); 	
    });
    
    
    
/*    
    for (var i=0, j=localStorage.length; i<j; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var object = JSON.parse(value);
        var date = object[0].value;
        $("#fromLocalStorage").append("<h3>" + date + "</h3>" + "<a href='#AddNewRace' id='editbutton' data-key='" + key + "'>| Edit |</a>"
                                       + "<a href='#' class='deletebutton' data-key='" + key + "'> | Delete |</a>");
         
    };
    
    $("#fromLocalStorage").append('<p></p>');
    $("#fromLocalStorage").append('<a href="#" id="deletestorage" data-role="button">Delete Local Storage</a>');
    
    $("#deletestorage").on("click", function(){
        localStorage.clear();
        location.reload(true);
        return false;
    });
    
    $("#editbutton").on("click", function(key){
        var value = localStorage.getItem(key);
        var object = JSON.parse(value);
        var item = $(this).data(object);
        console.log(key);
        $("#date").val(value[0]);
        $("#teamname1").val(value[1]);
        $("#teamname2").val(value[2]);
        $("#teamname3").val(value[3]);
        $("#teamname4").val(value[4]);
        $("#teamname5").val(value[5]);
        $("#teamname6").val(value[6]);
    });
    
    
    
    $.ajax({
       url: 'xhr/json.php',
       type: 'GET',
       dataType: 'json',
       success: function(response){
           for (var i=0, j=response.races.length; i<j; i++){
                var races = response.races[i];
                var JSONraceDate = races.date;
                $("#fromJSON").append("<h3>" + JSONraceDate + "</h3>");
           };
        }
    });
    
    
    $.ajax({
       url: 'xhr/other.xml',
       type: 'GET',
       dataType: 'xml',
       success: function(data){
            $(data).find('race').each(function() {
                var $race = $(this);
                var raceDate= $race.find('date').text();
                var html = "<div class='data'>";
                html += '<h3>' + raceDate + '</h3>';
                $("#fromOther").append(html);
            });
        }
    });
    
    
*/  
    
    
});

$(document).on('pageinit', "#onerace", function(){
		var urlData = $(this).data("url");
		var urlParts = urlData.split('?');
		var raceKey = decodeURIComponent(urlParts[1]);
		//raceKey returns "date:00-00-0000"  
		//console.log(raceKey);
		
		$.couch.db("asdv2").view("app/singlerace", {
        	key: raceKey,
        	success: function(data) {
				$("#pastracecontent").empty();
					$.each(data.rows,function(index, race){
           				var date = (race.key.substr(5));
           				
          				$("#pastracecontent").append(
           					$("<h1>").text(date + ": " + race.value.time)
           				);
          	
          				$("#pastracecontent").append(
           					$("<table>").attr("id", "resulttable")
           				);
           				$("#resulttable").attr("class", "table-stripe");
           	
           				$("#resulttable").append(
           					$("<thead>").append(
           						$("<tr>").attr("id", "teamtablehead").append(
           					$("<th>").text("School")
           				
           						)
           					)
           				);
            
            			$("#teamtablehead").append(
           					$("<th>").text("Race #1")
           				);
           					
           				$("#teamtablehead").append(
           					$("<th>").text("Race #2")
           				);					
            
            
            			$("#resulttable").append(
           					$("<tr>").attr("id", "team1table").append(
           						$("<th>").text(race.value.teamname1)
           					)
           				);
            			$("#resulttable").append(
           					$("<tr>").attr("id", "team2table").append(
           						$("<th>").text(race.value.teamname2)
           					)
           				);
			           	$("#resulttable").append(
			           		$("<tr>").attr("id", "team3table").append(
			           			$("<th>").text(race.value.teamname3)
			           		)
			           	);
			           $("#resulttable").append(
			           		$("<tr>").attr("id", "team4table").append(
			           			$("<th>").text(race.value.teamname4)
			           		)
			           	);
			           	$("#resulttable").append(
			           		$("<tr>").attr("id", "team5table").append(
			           			$("<th>").text(race.value.teamname5)
			           		)
			           	);
			           	$("#resulttable").append(
			           		$("<tr>").attr("id", "team6table").append(
			           			$("<th>").text(race.value.teamname6)
			           		)
			           	);
           	
			          	$("#team1table").append(
			           		$("<td>").text(race.value.team1race1)
			           	);
			           	$("#team1table").append(
			           		$("<td>").text(race.value.team1race2)
			           	);
           	
			           	$("#team2table").append(
			           		$("<td>").text(race.value.team2race1)
			           	);
			           	$("#team2table").append(
			           		$("<td>").text(race.value.team2race2)
			           	);
			           	
			           	$("#team3table").append(
			           		$("<td>").text(race.value.team3race1)
			           	);
			           	$("#team3table").append(
			           		$("<td>").text(race.value.team3race2)
			           	);
			           	
			           	$("#team4table").append(
			           		$("<td>").text(race.value.team4race1)
			           	);
			           	$("#team4table").append(
			           		$("<td>").text(race.value.team4race2)
			           	);
			           	
			           	$("#team5table").append(
			           		$("<td>").text(race.value.team5race1)
			           	);
			           	$("#team5table").append(
			           		$("<td>").text(race.value.team5race2)
			           	);
			           	
			           	$("#team6table").append(
			           		$("<td>").text(race.value.team6race1)
			           	);
			           	$("#team6table").append(
			           		$("<td>").text(race.value.team6race2)
			           	);
			           	
			           	$("#pastracecontent").append(
           					$("<a>").append(
           					$("<a>").attr("href", "editrace.html?date:" + date).text("Edit")
           					)
           				);
			           	
       			});
       		}	
       	//$("#pastracecontent").listview("refresh");
       });
});


$(document).on('pageinit', "#editrace", function(){
		var urlData = $(this).data("url");
		var urlParts = urlData.split('?');
		var raceKey = decodeURIComponent(urlParts[1]);
		//raceKey returns "date:00-00-0000"  
		//console.log(raceKey);
		$.couch.db("asdv2").view("app/singlerace", {
        	key: raceKey,
        	success: function(data) {
				$.each(data.rows,function(index, race){
           				var date = (race.key.substr(5));
           				
           				$("#date").val(date);
          				$("#time").val(race.value.time);
          				$("#teamname1").val(race.value.teamname1);
          				$("#team1race1").val(race.value.team1race1);
          				$("#team1race2").val(race.value.team1race2);
          				$("#teamname2").val(race.value.teamname2);
          				$("#team2race1").val(race.value.team2race1);
          				$("#team2race2").val(race.value.team2race2);
          				$("#teamname3").val(race.value.teamname3);
          				$("#team3race1").val(race.value.team3race1);
          				$("#team3race2").val(race.value.team3race2);
          				$("#teamname4").val(race.value.teamname4);
          				$("#team4race1").val(race.value.team4race1);
          				$("#team4race2").val(race.value.team4race2);
          				$("#teamname5").val(race.value.teamname5);
          				$("#team5race1").val(race.value.team5race1);
          				$("#team5race2").val(race.value.team5race2);
			           	$("#teamname6").val(race.value.teamname6);
          				$("#team6race1").val(race.value.team6race1);
          				$("#team6race2").val(race.value.team6race2);
          				
       			});
       		}
      	});
		
	$("#submitEditbutton").on( "click", function( event ) {
        event.preventDefault();
        var document = {};
        document._id = "date:" + $("input#date").val();
        document.time = $("input#time").val();
        document.teamname1 = $("input#teamname1").val();
        document.team1race1 = $("input#team1race1").val();
        document.team1race2 = $("input#team1race2").val();
        document.teamname2 = $("input#teamname2").val();
        document.team2race1 = $("input#team2race1").val();
        document.team2race2 = $("input#team2race2").val();
        document.teamname3 = $("input#teamname3").val();
        document.team3race1 = $("input#team3race1").val();
        document.team3race2 = $("input#team3race2").val();
        document.teamname4 = $("input#teamname4").val();
        document.team4race1 = $("input#team4race1").val();
        document.team4race2 = $("input#team4race2").val();
        document.teamname5 = $("input#teamname5").val();
        document.team5race1 = $("input#team5race1").val();
        document.team5race2 = $("input#team5race2").val();
        document.teamname6 = $("input#teamname6").val();
        document.team6race1 = $("input#team6race1").val();
        document.team6race2 = $("input#team6race2").val();
        $.couch.db("asdv2").saveDoc( document, {
                success: function() {
                    alert( "Saved." );
                },
                error: function() {
                    alert( "Cannot save new document." );
                 }
        });
        return false;
    });



});



$('#about').on('pageinit', function(){
	//code needed for page goes here
});	