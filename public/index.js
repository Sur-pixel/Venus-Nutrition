

var a = document.getElementById("calc-age")
$(".calculator input").on("input change", function (event) {
    var parameterName = $(this).attr("id").split("calc-")[1];
    var centimeters = $(this).val()

    switch (parameterName) {
        case "height":
            $("#calc-height_value").html("Today's Calories " + centimeters);
            break;
        case "weight":
            var kg = $(this).val();
            $("#calc-weight_value").html("Sugar Intake: " + kg + " g");
            break;
        case "age":
            $("#calc-age_value").html("Age: " + $(this).val());
            break;
        case "cardio":
            $("#calc-cardio_value").html("Carbs: " + $(this).val() + " g");
            break;
        case "walking":
            $("#calc-walking_value").html("Salt:  " + $(this).val() + " mg");
            break;
        case "fats":
            $("#calc-fats_value").html("Fats:  " + $(this).val() + " g");
            break;
    }

    var height = parseInt($("#calc-height").val(), 10);
    var age = parseInt($("#calc-age").val(), 10);
    var weight = parseInt($("#calc-weight").val(), 10);
    var walking = parseInt($("#calc-walking").val(), 10);
    var cardio = parseInt($("#calc-cardio").val(), 10);
    var fats = parseInt($("#calc-fats").val(), 10);
    var gender = $(".calculator input[name='gender']:checked").val();

    // The Harris–Benedict equations revised by Mifflin and St Jeor in 1990: 'A new predictive equation for resting energy expenditure in healthy individuals'
    var bmr = parseInt(10 * weight + 6.25 * height - 5 * age, 10) + (gender === "male" ? 5 : -161);
    bmr = bmr * 1.2;
    bmr += walking * 60 * (.03 * weight * 1 / 0.45) / 7;
    bmr += cardio * 60 * (.07 * weight * 1 / 0.45) / 7;
    bmr = Math.floor(bmr);

    var targetGainWeight = Math.round((bmr + 300) / 100) * 100;
    var targetMaintain = Math.round((bmr) / 100) * 100;
    var targetLoseWeight = Math.round((bmr - 500) / 100) * 100;

    $("#calc-target-gain span").html(targetGainWeight + " calories");
    $("#calc-target-maintain span").html(targetMaintain + " calories");
    $("#calc-target-lose span").html(targetLoseWeight + " calories");
});


const cal = document.getElementById("calc-height")
const carbs = document.getElementById("calc-cardio")
const fat = document.getElementById("calc-fats")
const sugar = document.getElementById("calc-weight")
const salt = document.getElementById("calc-walking")
const age = document.getElementById("calc-age")
document.getElementById("sumbit").addEventListener('click', () =>{

    const seend_data = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({code:1})
    }

    fetch("/remove-data", seend_data)
    .then(response => response.json())
    .then(function (json) {
        console.log(json)
    })


    const data = {
        code: 1,
        age: age.value,
        calories: cal.value,
        carbs: carbs.value,
        fats: fat.value,

        sugar: sugar.value,
        salt: salt.value
    }
    const send_data = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch("/info", send_data)
        .then(response => response.json())
        .then(function (json) {
            console.log(json)
        })


})

