
const text_box = document.getElementById("advice-text-box")
const calorie_box = document.getElementById("calorie-bar")
const sugar_box = document.getElementById("sugar-box")
const salt_box = document.getElementById("salt-box")
const fat_box = document.getElementById("fat-box")
window.onload = function(){



    const data = {
        code: 1,
       
    }
    const send_data = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch("/getinfo", send_data)
        .then(response => response.json())
        .then(function (json) {
            console.log(json)
            window.localStorage.setItem("calories", json.data.calories)
            window.localStorage.setItem("fats", json.data.fats)
            window.localStorage.setItem("carbs", json.data.carbs)
            calorie_box.innerText = json.data.calories
            sugar_box.innerText = json.data.sugar
            salt_box.innerText = json.data.salt
            fat_box.innerText = json.data.fats
            
            const text = json.ai_info.replace(/\*/g, "");
            text_box.innerText = text
        })

   
}

