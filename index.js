const searchURL = "https://api.github.com/search/";

function getData(url, callback) {
    var xhr = new XMLHttpRequest();
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

function createOptions(results){//this is just populating the front end for now
    var listFromGithub = results.items;
    var listOfResults = document.getElementById("listOfResults");
    var searchType = document.getElementById("searchType").value;
    console.log(results);
    for(var result=0;result<listFromGithub.length;result++){
        var option = document.createElement("option");
        option.value = listFromGithub[result].url;
        option.innerHTML = listFromGithub[result].name;
        option.setAttribute('owner', listFromGithub[result].owner.login);
        listOfResults.append(option);
    }
    listOfResults.setAttribute('searchType', searchType);
}
function createData(repoData){
    var body = document.getElementsByTagName('body');
    var summary = document.createElement("p");
    summary.innerHTML = repoData.description;
    console.log(repoData);
    document.body.append(summary);
    
}
function searchResults(){
    var selection = document.getElementById("listOfResults").value;
    console.log(selection);
    getData(selection, createData);
    //getData(selection.collaborators_url, createData);
}

function Search(){
    var keyword = document.getElementById("Search").value;
    var searchType = document.getElementById("searchType").value;
    if(searchType==="User")
        getData(searchURL + "users?q=" + keyword, createOptions);
    else if(searchType === "Repo")
        getData(searchURL + "repositories?q=" + keyword, createOptions);
}
