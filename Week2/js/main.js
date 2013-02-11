// Adam Crawford
// ASD 0213 Week 2

$('#home').on('pageinit', function () {
	var loadJSON = function () {
		localStorage.clear();
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
			localStorage.clear();
			var url="yaml/matches.yml"
			YAML.fromURL(url, function(result) {
				console.log(result);
			});
		},
		loadXML = function () {
			localStorage.clear();
			var url = "xml/matches.xml"
				xml = new JKL.ParseXML(url),
				data = xml.parse();
			console.log(data);
			$.each(data.root.match, function (index, match) {
				console.log(match);
				var guid = Math.floor(Math.random() * 100001),
	         	data = JSON.stringify(match);
	        	localStorage.setItem(guid, data);
			});
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
		for (var i= 0, j=localStorage.length; i<j ; i++){
            var key = localStorage.key(i),
            	match = JSON.parse(localStorage.getItem(key));
            var makeSubList = $("<li></li>");
            var makeSubLi = $( "<h3>"+match.gDate.element[1]+ " " +match.gTime.element[1].toString()+"</h3>"+
                "<p><strong>"+match.gHome.element[1]+"</strong></p>"+
                "<p>vs.</p>" +
                "<p><strong>"+match.gAway.element[1]+"</strong></p>" );
            var makeLink = $("<a href='#details' id='"+key+"'>Show Details</a>");
            makeLink.html(makeSubLi);
            makeSubList.append(makeLink).appendTo("#schedule");
        };
        $("#schedule").listview('refresh');
	})
})