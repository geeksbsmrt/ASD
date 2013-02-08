// Adam Crawford
// ASD 0113 Week 1

$('#home').on('pageinit', function () {
	var loadJSON = function () {
		$.each(json, function (index, match) {
	        var guid = Math.floor(Math.random() * 100001),
	         	data = JSON.stringify(match);
	        localStorage.setItem(guid, data);
			})
		},
		viewDetails = function (matchID) {
			$.mobile.changePage('#details')
		},
		loadYAML = function () {
			YAML.fromURL("yaml/matches.js", function(data) {
				var errors = YAML.getErrors();
				if(errors.length == 0) {
					console.log("No YAML Errors");
				} else {
					console.log("Found errors");
				};
			});
		},
		loadXML = function () {
			var url = "xml/matches.xml"
				xml = new JKL.ParseXML(url),
				data = xml.parse();
			console.log(data);
			// root.find("match").each(function(){
			// 	var game = $(this);
			// 	console.log("Game: ", match.find("gHome"))
			// })
		};
	localStorage.clear();
	$('#json').on('click', function(){
		$('#schedule').empty();
		loadJSON();
		for (var i= 0, j=localStorage.length; i<j ; i++){
            var key = localStorage.key(i),
            	match = JSON.parse(localStorage.getItem(key));
            var makeSubList = $("<li></li>");
            var makeSubLi = $( "<h3>"+match.gDate[1]+ " " +match.gTime[1].toString()+"</h3>"+
                "<p><strong>"+match.gHome[1]+"</strong></p>"+
                "<p>vs.</p>" +
                "<p><strong>"+match.gAway[1]+"</strong></p>" );
            var makeLink = $("<a href='#details' id='"+key+"'>Show Details</a>");
            makeLink.html(makeSubLi);
            makeSubList.append(makeLink).appendTo("#schedule");
        };
        $("#schedule").listview('refresh');
	})
	$('#yaml').on('click', function(){
		console.log("loadYAML clicked");
		$('#schedule').empty();
		loadYAML();
	})
	$('#xml').on('click', function(){
		console.log("loadXML clicked");
		$('#schedule').empty();
		loadXML();
	})
})