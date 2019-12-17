const searchURL = "https://api.github.com/search/";
const REPO = "Repo";
const USER = "User";
var searchType;
window.onload = function(){
    var header = document.getElementById("searchDescription");
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    header.innerHTML = params[1] + "s matching a search for \"" + params[0] + "\"";
    runSearch(params[0], params[1]);
}

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
    getData(selection, writeSearchDetails);
}
//this is the first initial search when the user wants to get a list of possible matches
function writeToDom(element, repoName, user, description, language){
    var writer = document.createElement("div");
    writer.setAttribute("class", "card col-3 p-3 m-2 d-flex flex-column justify-content-between");
    var header = document.createElement("h5");
    header.setAttribute("class", "card-title");
    var summary = document.createElement("p");
    summary.setAttribute("class", "card-text");
    var button = document.createElement("a");
    button.setAttribute("class", "btn btn-primary");
    console.log(header);
    header.innerHTML = repoName;
    summary.innerHTML = description + "<br/>Owner: " + user + "<br />Language: " + language;
    button.innerHTML = "View";
    writer.append(header);
    writer.append(summary);
    writer.append(button);
    element.append(writer);
}
function writeSearchDetails(repoData){//THIS IS TEMPORARY AND NEEDS TO BE REPLACED BY REACT.JS
    var results = document.getElementById('searchResults');
    var writer = document.createElement("p");
    var isRepoSearch = (searchType===REPO);
    console.log(repoData);
    if(isRepoSearch){
        writeToDom(results, repoData.name, repoData.owner.login, repoData.description, repoData.language);
    }else{
        console.log("hello world");
    }
}
function getUserListFromApiData(apiData, listHTML){
    console.log("hello world");
}
function getRepoListFromApiData(apiData, listHTML){
    // for(var result=0;result<apiData.length;result++){
    //     var option = document.createElement("option");
    //     option.value = apiData[result].url;
    //     option.innerHTML = apiData[result].name;
    //     option.setAttribute('owner', apiData[result].owner.login);
    //     listOfResults.append(option);
    // }
    // listOfResults.setAttribute('searchType', searchType);
    for(var result=0;result<20;result++)
        getData(apiData[result].url, writeSearchDetails);
}
function createOptions(results){//this is just populating the front end for now
    var listFromGithub = results.items;
    var listOfResultsHTML = document.getElementById("listOfResults");
    var isRepoSearch = (searchType===REPO);
    (isRepoSearch) ? getRepoListFromApiData(listFromGithub, listOfResultsHTML): getUserListFromApiData(listFromGithub, listOfResultsHTML);
}
function runSearch(keyword, type){
    searchType=type;
    if(searchType===USER)
        getData(searchURL + "users?q=" + keyword, createOptions);
    else if(searchType===REPO)
        getData(searchURL + "repositories?q=" + keyword, createOptions);
}

function Search(){
    var keyword = document.getElementById("searchKeyword").value;
    var searchType = document.getElementById("searchType").value;
    var url = encodeURIComponent("emacs") + "&" + encodeURIComponent("Repo");
    var _url = location.href; 
    _url = ( _url.indexOf('?') !== -1 ) ? _url+'&'+url : _url+'?'+url;
    window.location.href = _url;
}
