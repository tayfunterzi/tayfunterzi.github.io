/* 
    Created on : 04-Apr-2017, 10:36:28
    Author     : Tayfun Terzi
*/

// Info Noti
var mypush = new function() {
    this.plo = "TNA"; this.elo = "TNA"; this.adr = "TNA"; this.ead = "TNA"; this.del = true; this.pip = "TNA"; this.isp = "TNA"; 
	this.lot = 'Time: ' + new Date();
	this.ipa = function () {return 'IP: ' + this.pip;};
	this.sep = function () {return 'ISP: ' + this.isp;};
	this.cor = function () {return 'Coord: ' + this.elo;};
	this.loc = function () {if(this.plo==="TNA") {return this.elo;} else {return this.plo;}};
	this.lin = function () {return 'http://maps.google.com/?q=' + this.loc();};
	this.sad = function () {if(this.adr==="TNA") {return this.ead;} else {return this.adr;}};
	this.adt = function () {return 'Location: ' + this.sad();};
	this.ank = "c863b61e8d392c2f089e39beaba361b30d717ef67010841b";
	this.des = function () {return 	this.adt() + '%0A' + this.lot   + '%0A' +
									this.ipa() + '%0A' + this.sep();};
	this.msg = function () {return 'https://www.notifymyandroid.com/publicapi/notify?' +
		'apikey=' 		+ this.ank 		+
		'&application=' + 'PH.js' 		+
		'&event=' 		+ 'PH.access' 	+
		'&description=' + this.des()	+
		'&priority=' 	+ 0		 		+
		'&url=' 		+ this.lin();
		};
           
}

(function() {
	
    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function() {
        if (xhttp4.readyState == 4 && xhttp4.status == 200) {
            var iojso = JSON.parse(xhttp4.responseText);
			mypush.elo = iojso.loc;
			mypush.ead = iojso.city + ',' + iojso.region + ',' + iojso.country;
			mypush.pip = iojso.ip;
			mypush.isp = iojso.org;
        }
    };
    xhttp4.open("GET", "https://ipinfo.io/json", true);
    xhttp4.send();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var geolocation = JSON.parse(xhttp.responseText).location;
            mypush.plo = geolocation.lat + ',' + geolocation.lng;

            var xhttp2 = new XMLHttpRequest();
            xhttp2.onreadystatechange = function() {
                if (xhttp2.readyState == 4 && xhttp2.status == 200) {
                    var locationName = JSON.parse(xhttp2.responseText).results;
                    mypush.adr = locationName[0].formatted_address;
					
					setTimeout(function () {
						if (mypush.del) {
							mypush.del = false;
							var req = new Image();
							req.src = mypush.msg();
						}
					}, 1000);
					
					
                }
            };

            xhttp2.open("POST", 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + mypush.loc() + '&sensor=true', true);
            xhttp2.send();
        } 
    };

    var key = "AIzaSyA9xVukBQE_blaJGohrp4gIfAtzIe97hhw";
    xhttp.open("POST", "https://www.googleapis.com/geolocation/v1/geolocate?key=" + key, true);
    xhttp.send();
	
	setTimeout(function () {
		if (mypush.del) {
			mypush.del = false;
			var req = new Image();
			req.src = mypush.msg();
		} 
	}, 2000);

}())