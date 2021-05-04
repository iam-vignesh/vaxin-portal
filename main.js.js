$("#plot-header").hide();  
$("#imbd-header").hide(); 
$("#lang-header").hide(); 
$("#slots-available").hide(); 

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
            var slots_row = [];
            var center_names =[];

            for(i=0; i<data.centers.length; i++){
            center_names.push(data.centers[i].name + "<br>");
            console.log(data.centers[i].name);
            document.getElementById("plot").innerHTML = center_names;
            for( j = 0; j < data.centers[i].sessions.length; j++){
            console.log(data.centers[i].sessions[j].vaccine);
            document.getElementById("lang").innerHTML = data.centers[i].sessions[j].vaccine ;
            for( k = 0; k < 4; k++){
            slots_row.push(data.centers[0].sessions[0].slots[k]);
            document.getElementById("slots").innerHTML = slots_row[0] + "|" + slots_row[1] + "|" + slots_row[2] + "|" + slots_row[3];
            }
            }
            }

            /*document.getElementById("plot").innerHTML = data.centers[0].name;
            document.getElementById("lang").innerHTML = data.centers[0].sessions[0].vaccine;
            /*document.getElementById("slots").innerHTML = data.centers[0].sessions[0].slots[0];*/
            

$("#plot-header").show();  
$("#imbd-header").show(); 
$("#lang-header").show(); 
$("#slots-available").show();

        })
        .fail(function(){
            alert("Please check the entered Pin code!");
        })
      });