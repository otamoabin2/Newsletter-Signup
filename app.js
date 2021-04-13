//jshint eversion: 6
const express = require("express");
// const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");




const app = express()
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, res) {
  console.log()
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  // console.log(firstName, lastName, email);

  data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  //documentation from mailchimp is not as clear 
  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/8301938763";

  const options = {
    method: "POST",
    auth: "bread2:2a24b24a960171f01679c068b13a34a9-us1"
  }



  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    })
  })
  request //? 

  // request.write(jsonData);
  request.end();
});

//information from localhost:3000
app.listen(3000, function () {
  console.log("your server is running at port 3000!")
});


//basic authentication 
// API key 
// 2a24b24a960171f01679c068b13a34a9-us1

// Audience ID
// 126f6cd2c4
