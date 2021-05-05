$("#plot-header").hide();  
$("#imbd-header").hide(); 
$("#lang-header").hide(); 
$("#slots-available").hide(); 
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
            $("#null").hide();
            $("#movie-info").show(); 
            var slots_row = [];
            var center_names =[];
            for(i=0; i<data.centers.length; i++){
            center_names.push(data.centers[i].name + "<br>");
            console.log(data.centers[i].name);
            $("#plot-header").show();  
            document.getElementById("plot").innerHTML = center_names.join("");
            for( j = 0; j < data.centers[i].sessions.length; j++){
            console.log(data.centers[i].sessions[j].vaccine);
            $("#lang-header").show();
            document.getElementById("lang").innerHTML = data.centers[i].sessions[j].vaccine ;
            for( k = 0; k < 4; k++){
            slots_row.push(data.centers[0].sessions[0].slots[k]);
            $("#slots-available").show();
            document.getElementById("slots").innerHTML = slots_row[0] + "|" + slots_row[1] + "|" + slots_row[2] + "|" + slots_row[3];
            }
            }
            }
            }
            

            /*document.getElementById("plot").innerHTML = data.centers[0].name;
            document.getElementById("lang").innerHTML = data.centers[0].sessions[0].vaccine;
            /*document.getElementById("slots").innerHTML = data.centers[0].sessions[0].slots[0];*/
            


        })
        .fail(function(){
            alert("Please check the entered Pin code!");
        })

        
      });