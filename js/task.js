
var request = new XMLHttpRequest()


request.open('GET', 'https://api.spacexdata.com/v2/rockets', true)

request.onload = function() {
  // Begin accessing JSON data here
  
var data = JSON.parse(this.response)
if(request.status >= 200 && request.status<400){
    let rocketName=[];
    data.forEach(rocket=>{
        rocketName.push(rocket.name);
    });
    let rocketFuelFirstStage=[];
    data.forEach(rocket_fuel =>{
        rocketFuelFirstStage.push(rocket_fuel.first_stage.fuel_amount_tons);
    });
    let rocketFuelSecondStage=[];
    data.forEach(rocket_fuel =>{
        rocketFuelSecondStage.push(rocket_fuel.second_stage.fuel_amount_tons);
    });
    
    for(var i =0 ; i<rocketName.length ; i++){
        const p=document.querySelectorAll("p");
        p[i].innerHTML =`<span>name: ${rocketName[i]}</span><br><span>first-stage fuel: <span id="fuelLevel">${rocketFuelFirstStage[i]}</span>[tons]</span><br><span> second-stage fuel: ${rocketFuelSecondStage[i]}[tons]</span>`;
    }
    const imagePlace= document.querySelectorAll("#img-area");
    for(var x=0 ; x<rocketName.length;x++){
    let img= document.createElement("img");
    img.setAttribute("src" , 'css/images/rocket.png');
    imagePlace[x].appendChild(img);
    }
    /*Launch the rockets
    -------------------- */
    $("#btn").click(function(){
        $(".go:first").animate({
            "top" : '400px'
        },2000).fadeOut(150, function(){
            $("span[id='fuelLevel']:first").text("0").addClass("warning");
        }),
        $(".go:eq(1)").animate({
            "top" : '320px'
        },3000).fadeOut(150 , function(){
            $("span[id='fuelLevel']:eq(1)").text("0").addClass("warning");
        }) , 
        $(".go:eq(2)").animate({
            "top" : '230px'
        },4000).fadeOut(150, function () { 
            $("span[id='fuelLevel']:eq(2)").text("0").addClass("warning");
         }) ,  
        $(".go:last").animate({
            "top" : '170px'
        },5000).fadeOut(150, function () { 
            $("span[id='fuelLevel']:last").text("0").addClass("warning");
                $("#success").removeClass("hidden").addClass("final");
         })
    });
    
/*restart the rockets
    -------------------- */
    $("#btn2").click(function(){
        $(".go:first").fadeIn().css("top" , "550px") , 
        $(".go:eq(1)").fadeIn().css("top" , "550px"),
        $(".go:eq(2)").fadeIn().css("top" , "550px"),
        $(".go:last").fadeIn().css("top" , "550px"),
        $("#success").removeClass("final").addClass("hidden"),
        $("span[id='fuelLevel']:first").text(rocketFuelFirstStage[0]).removeClass("warning")
        $("span[id='fuelLevel']:eq(1)").text(rocketFuelFirstStage[1]).removeClass("warning")
        $("span[id='fuelLevel']:eq(2)").text(rocketFuelFirstStage[2]).removeClass("warning")
        $("span[id='fuelLevel']:last").text(rocketFuelFirstStage[3]).removeClass("warning")
    });
      }   else{
        console.log("there is an error")
    }
}
request.send()