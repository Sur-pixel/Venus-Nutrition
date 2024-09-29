import express from 'express';
const app = express();
import { GoogleGenerativeAI } from "@google/generative-ai";


import mongoose from 'mongoose';

const mongo_username = "Uzair";
const mongo_password = "nose321";
//const URI = `mongodb+srv://${mongo_username}:${mongo_password}@atlascluster0.konke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const URI =  `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.konke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
`
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
const kittySchema = new mongoose.Schema({
    name: String,
  });
const info = mongoose.model("info", kittySchema);

//const uuid = require('uuid');
// const fs = require("fs");
app.use(express.static("public"));
app.use(express.json());
app.listen(process.env.PORT || 3002, ()=>{


    console.log("Server started and running on port 3000!")

});

app.post("/remove-data", (req, res)=>{



db.collection("infos").drop()


})

app.post("/info", (req, res) => {
    console.log("fjadklfjdlkfs")
    db.collection("infos").insertOne(req.body)
    
})
var data = null
app.post("/getinfo", async (req, res)=>{

try{


    const query = info.where({ code: 1 });
    const ans = await query.findOne();
   
   data = ans
   data = JSON.parse(JSON.stringify(data))
   console.log(data.age)
  
const prompt =  `Analyze this data and tell whether it is healthy or not. Only Give me things on nutritoin, around 200 words. There is a person of Age ${data.age}. Today his caloric intake was ${data.calories}. His carbohydrate intake was ${data.carbs} grams. His sugar intake was ${data.sugar} grams. Finally, his salt intake was ${data.salt} miligrams. Can you give advice on this nutrition. Is it healthy, if not what should be changed and which foods can help. Talk in first person.`;

const result = await model.generateContent(prompt);
console.log(result.response.text());
const to_send= {

    data: data, 
    ai_info: result.response.text()













}
res.send(to_send)

}catch(err){

console.log(err)

}
})
const genAI = new GoogleGenerativeAI("AIzaSyAwdhGw4YzL1Rad248Kfv3_DoLhw7uEXKI")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
