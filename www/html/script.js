var index= 0;
var dateline= [];
var metricType = 0;

var Imagelocation = "vic";
document.getElementById("nav1").style.color="#0288D1";

flatpickr('#calendar-tomorrow', {
    "minDate": "2017-05-29",
    "maxDate": "today"
});

flatpickr('#calendar-tomorrow2', {
    "minDate": "2017-05-29",
    "maxDate": "today"
});

document.getElementById("submit-btn").addEventListener("click", function() {
    if(metricType != 0){
        index = 0;
        dateline = [];

        const fp = flatpickr("#calendar-tomorrow", {});
        const fp1 = flatpickr("#calendar-tomorrow2", {});

        var daysOfYear = [];
        for (var d = fp.selectedDates[0]; d <= fp1.selectedDates[0]; d.setDate(d.getDate() + 1)) {
            daysOfYear.push(new Date(d));

        }

        function join(t, a, s) {
            function format(m) {
                let f = new Intl.DateTimeFormat('en', m);
                return f.format(t);
            }
            return a.map(format).join(s);
        }

        let a = [{year: 'numeric'}, {month: '2-digit'},{day: '2-digit'}];

        for(i = 0; i < daysOfYear.length;i++){
            let s = join(daysOfYear[i], a, '-');
            dateline.push(s);
        }

        document.getElementById("pic-btn1").style.visibility="visible";
        document.getElementById("pic-btn2").style.visibility="visible";
        document.getElementById("pic-btn-background").style.visibility="visible";

    }
    else{
        alert("Please select a date-range and Metric to view");
    }
}); 

document.getElementById("metrics").addEventListener("click",function(e) {
    if(e.target) {
        if(e.target.id == "calendar-tomorrow3"){
            document.getElementById("metric1-label").style.color = "#0288D1";
            document.getElementById("metric2-label").style.color = "#616161";
            document.getElementById("metric3-label").style.color = "#616161";
            metricType = 1;
        }
        else if(e.target.id=="calendar-tomorrow4"){
         //   document.getElementById("metric2-label").style.color = "#0288D1";
         //   document.getElementById("metric1-label").style.color = "#616161";
         //   document.getElementById("metric3-label").style.color = "#616161";
         //   metricType = 2;
         alert("Option coming soon. Please select NDVI")
        }
        else if(e.target.id=="calendar-tomorrow5"){
         //   document.getElementById("metric3-label").style.color = "#0288D1";
         //   document.getElementById("metric1-label").style.color = "#616161";
         //   document.getElementById("metric2-label").style.color = "#616161";
         //   metricType = 3;
         alert("Option coming soon. Please select NDVI")

        }          
    }
});

document.getElementById("nav-list").addEventListener("click",function(e) {
    if(e.target) {
        if(e.target.id =="nav1"){
            document.getElementById("nav1").style.color="#0288D1";
            document.getElementById("nav2").style.color="black";
            document.getElementById("nav3").style.color="black";

            document.getElementById("true-colour-image").src ="./images/vic/raw/2017-06-25.png"
            document.getElementById("metric-image").src = "./images/vic/ndvi/2017-06-25.png"
            Imagelocation = "vic";
        }
        else if(e.target.id=="nav2"){
            document.getElementById("nav2").style.color="#0288D1";
            document.getElementById("nav1").style.color="black";
            document.getElementById("nav3").style.color="black";

            document.getElementById("true-colour-image").src ="./images/jdf/raw/2018-10-13.png"
            document.getElementById("metric-image").src = "./images/jdf/ndvi/2018-10-13.png"
            Imagelocation = "jdf";
        }
        else if(e.target.id=="nav3"){
            document.getElementById("nav3").style.color="#0288D1";
            document.getElementById("nav2").style.color="black";
            document.getElementById("nav1").style.color="black";

            document.getElementById("true-colour-image").src ="./images/haida/raw/2018-09-30.png"
            document.getElementById("metric-image").src = "./images/haida/ndvi/2018-09-30.png"
            Imagelocation = "haida";
        }

    }
});



document.getElementById("pic-btn2").addEventListener("click",function(e) {
    document.getElementById("pic-btn1").style.visibility="visible";
    var imgPath = "./images/" + Imagelocation + "/raw/" + dateline[index] + ".png";
    index +=1
    if(e.target) {
        if(index <= dateline.length-1 && dateline[index] != undefined){
            for(var i =index;i<dateline.length;i++){
                imgPath = "./images/" + Imagelocation + "/raw/" + dateline[index] + ".png";
                var check = imageExists(imgPath);
                if(check){break;}
                else{
                    index+=1;
                }
            }
            if(index < dateline.length-1){
                document.getElementById("true-colour-image").src = "./images/" + Imagelocation + "/raw/" + dateline[index] + ".png";
                document.getElementById("metric-image").src = "./images/" + Imagelocation + "/ndvi/" + dateline[index] + ".png";
            }
            if(dateline[index] == undefined){
                alert("end of images");
                document.getElementById("pic-btn2").style.visibility="hidden";
            }
        
        }
        else{
            alert("end of images");
        }
    }
});

document.getElementById("pic-btn1").addEventListener("click",function(e) {
    document.getElementById("pic-btn2").style.visibility="visible";
    var imgPath = "./images/" + Imagelocation + "/raw/" + dateline[index] + ".png";  
    var aliveCheck = 0;
    index -=1;
    if(e.target) {
        if(index != 0 && dateline[index] != undefined){
            for(var i = index; i > 0;i--){
                imgPath = "./images/" + Imagelocation + "/raw/" + dateline[i] + ".png";
                var check = imageExists(imgPath);
                if(check){aliveCheck = 1; break;}
                else{
                    index -=1;
                }
            }
            if(index >= 0 && dateline[index] != undefined){
                if(aliveCheck){
                    document.getElementById("true-colour-image").src = "./images/" + Imagelocation + "/raw/" + dateline[index] + ".png";
                    document.getElementById("metric-image").src = "./images/" + Imagelocation + "/ndvi/" + dateline[index] + ".png";
                }
                else{
                    document.getElementById("pic-btn1").style.visibility="hidden";
                    alert("at Beginning of images");
                    index = 0;
                }
            }
        }
        else{
            document.getElementById("pic-btn1").style.visibility="hidden";
            alert("at Beginning of images");
        }
    }
});



document.getElementById("sensors").addEventListener("click",function() {
    location.href = "http://206.12.92.18:10130/sensor.html";
});


function imageExists(image_url){
    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}