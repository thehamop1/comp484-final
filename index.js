var request = new XMLHttpRequest()
const baseURL = "https://api.spotify.com/v1";
var userURL = "";
var username = "";

function setUser(){
    username = document.getElementById("username");
    userURL = baseURL + "/users/" + username.value;
    getSomeData();
}

function getSomeData(){
    request.open('GET', userURL, true);
    request.onload = function(data) {
        console.log(data);
    };
    request.send();
}
