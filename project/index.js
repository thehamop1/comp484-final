function Search(){
    var keyword = document.getElementById("homeSearch").value;
    var searchType = document.getElementById("searchType").value;
    var url = 'search.html?' + encodeURIComponent(keyword) + "&" + encodeURIComponent(searchType);
    document.location.href = url;
}
