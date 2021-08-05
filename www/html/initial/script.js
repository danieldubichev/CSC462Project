//navigation bar click listener
document.getElementById("nav-list").addEventListener("click",function(e) {
        if(e.target && e.target.nodeName == "LI") {
			var location = "";
			var locationSplash = "";
			if(e.target.id ==1){
				location = "Victoria";
				locationSplash = "./vic.png"
			}
			else if(e.target.id==2){
				location = "Juan de Fuca";
				locationSplash = "./strait.png"

			}
			else if(e.target.id==3){
				location = "Haida Gwaii";
				locationSplash = "./haida.png"

			}
			document.getElementById("location-title").innerHTML = location;
			document.getElementById("location-splash").src = locationSplash; 
        }
});
