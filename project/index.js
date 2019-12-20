function Search(){
    var keyword = document.getElementById("homeSearch").value;
    var searchType = document.getElementById("searchType").value;
    var url = 'search.html?' + encodeURIComponent(keyword) + "&" + encodeURIComponent(searchType);
    document.location.href = url;
}

// window.onload = function(){
//     var header = document.getElementById("searchDescription");
//     var url = document.location.href,
//         params = url.split('?')[1].split('&'),
//         data = {}, tmp;
//     header.innerHTML = params[1] + "s matching a search for \"" + params[0] + "\"";
//     if(params[1]!=null){
//         var keyword = params[0];
//         var searchType = params[1];
//         var url = 'search.html?' + encodeURIComponent(keyword) + "&" + encodeURIComponent(searchType);
//         document.location.href = url;
//     }
// };
