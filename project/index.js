const searchURL = "https://api.github.com/search/";
const REPO = "Repo";
const USER = "User"
//this just makes a request for the github data
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

function searchResults(){
    var selection = document.getElementById("listOfResults").value;
    console.log(selection);
    //getData(selection, writeSearchDetails);
}
//this is the first initial search when the user wants to get a list of possible matches
function writeToDom(aString){
    var writer = document.createElement("p");
    writer.innerHTML = aString;
    document.body.append(writer);
}
function writeSearchDetails(repoData){//THIS IS TEMPORARY AND NEEDS TO BE REPLACED BY REACT.JS
    var body = document.getElementsByTagName('body');
    var writer = document.createElement("p");
    var isRepoSearch = (document.getElementById("searchType").value===REPO);
    if(isRepoSearch){
        writeToDom("Owner: " + repoData.owner.login);
        writeToDom("Summary: " + repoData.description);
    }else{
        console.log("hello world");
    }
    writeToDom("-----------------------------------------------------------------------------------------------------");
}
function getUserListFromApiData(apiData, listHTML){
    console.log("hello world");
}
function getRepoListFromApiData(apiData, listHTML){
    for(var result=0;result<apiData.length;result++){
        var option = document.createElement("option");
        option.value = apiData[result].url;
        option.innerHTML = apiData[result].name;
        option.setAttribute('owner', apiData[result].owner.login);
        listOfResults.append(option);
    }
    listOfResults.setAttribute('searchType', searchType);
    for(var result=0;result<10;result++)
        getData(apiData[result].url, writeSearchDetails);
}
function createOptions(results){//this is just populating the front end for now
    var listFromGithub = results.items;
    var listOfResultsHTML = document.getElementById("listOfResults");
    var isRepoSearch = (document.getElementById("searchType").value===REPO);
    (isRepoSearch) ? getRepoListFromApiData(listFromGithub, listOfResultsHTML): getUserListFromApiData(listFromGithub, listOfResultsHTML);
}
function Search(){
    var keyword = document.getElementById("Search").value;
    var searchType = document.getElementById("searchType").value;
    if(searchType===USER)
        getData(searchURL + "users?q=" + keyword, createOptions);
    else if(searchType ===REPO)
        getData(searchURL + "repositories?q=" + keyword, createOptions);
}
