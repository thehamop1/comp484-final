const searchURL = "https://api.github.com/search/";

function getData(url, callback) {
    var xhr = new XMLHttpRequest();
    console.log(url);
    xhr.onload = function(variable) {
        if (this.status == 200) {
            data = JSON.parse(this.response);
            variable = data;
            callback(variable);
        }
    };
    xhr.onerror = function() {
        console.log("darn, not found");
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function Search(){
    var keyword = document.getElementById("Search").value;
    var searchType = document.getElementById("searchType").value;
    var test = function(data){console.log(data);};
    if(searchType==="User")
        getData(searchURL + "users?q=" + keyword, test);
    else if(searchType === "Repo")
        getData(searchURL + "repositories?q=" + keyword, test);
}
