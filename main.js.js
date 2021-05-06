$("#plot-header").hide();  
$("#null").hide(); 


$("#pincode").keypress(function(event) {
    if (event.keyCode === 13) {
        $("#email").click();
    }
});

$("#email").click(function search(){

    var str = $("#pincode").val();
    var d = new Date();
    var strDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
    console.log(strDate)
    var url = $.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+str+"&date="+strDate)
        .done(data => {
            if(data.centers.length == 0){
                $("#movie-info").hide();
                $("#null").show(); 
                alert("No centers in the pincode - " +$("#pincode").val()) + str;
            } else{
            console.log(data);
            $("#null").hide();
            $("#movie-info").show(); 
            var slots_row = [];
            var center_names =[];
            var sessions = []
            for(i=0; i<data.centers.length; i++){
            console.log(data.centers[i].name);
            console.log(data.centers[i].sessions.length);
            console.log(data.centers[i].sessions[0].vaccine);
            center_names.push("Center Name: " + data.centers[i].name + " <br> " + "Location: " + data.centers[i].block_name + "<br>" +  "Available vaccine: " + data.centers[i].sessions[0].vaccine + "<br>" + "---------------------------------------------" + "<br>" );
            document.getElementById("plot").innerHTML = center_names.join("");
            }
            }
            
        })
        .fail(function(){
            alert("Pin code incorrect! Please check the entered Pin code!");
        })

        
      });