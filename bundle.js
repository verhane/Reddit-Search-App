(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// import {bootstrap} from 'bootstrap' ;
// console.log(bootstrap) ;
//Enable CROS 
// let corsAttr = new EnableCorsAttribute("*" , "*" , "*") ;
// config.EnableCors(corsAttr) ;
const reddit = require("./reddit.api") ;
const SearchForm = document.getElementById("search-form") ;
const SearchInput = document.getElementById("search-input") ;

SearchForm.addEventListener("submit" , e => {
    e.preventDefault() ;
    let SearchTerm =SearchInput.value ;
    const SortBy = document.querySelector('input[name="sortBy"]:checked').value ;
    const SelectLimit = document.getElementById("limit").value ;
    const result = document.getElementById("results") ;
    //when input empty 
    if(SearchTerm === ''){
    //Show message 
    ShowMessage("please add a search term ") ;
    console.log("empty")
    }

    //clear input 
    SearchInput.value =" " ;

    //Search Reddit 
     reddit.search(SearchTerm ,SortBy , SelectLimit ).then
     (results => {
        let output = '<div class="card-columns">'
        results.forEach(post => {
            let     image = post.preview ? post.preview.images[0].source.url : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallpapersafari.com%2Freddit-phone-wallpapers%2F&psig=AOvVaw3M32e3K8CRpTCdeO2MWI6a&ust=1622575172017000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJClodrR9PACFQAAAAAdAAAAABAD'
            output += ' <div class="card" style="width: 18rem;">' + 
                '<img class="card-img-top" src="'+ image +'" alt="Card image cap"> ' +
                ' <div class="card-body"> ' +
                '<h5 class="card-title">'+ post.title +'</h5>' +
                '<p class="card-text">'+truncateText(post.selftext , 100 ) +'</p>'+
                '<a href="#" class="btn btn-primary">Go somewhere</a>' +
                '</div>'+
               ' </div> '
          
            ;
            console.log(post) ;
        }) ;
            output += '</div>'
            result.innerHTML += output
         
     }) ;



}) ;

const ShowMessage = (message) => {
   const div = document.createElement("div");
   const results = document.getElementById("results") ;
   //Get parent 
   const Container = document.getElementById("ClassContainer") ;
   //Get Search 
   const Search = document.getElementById("search") ;
   div.className = 'alert alert-danger my-2  ';
   div.textContent = message ;
   //Insert Message 
   Container.insertBefore(div , Search) ;
   console.log(div) ;
   //Setimeout 
   setTimeout(() =>{
       document.querySelector(".alert").remove() ;
   } , 2000)
}
function truncateText(text , limit){
    const shortend = text.indexOf(' ' , limit) ;
    if(shortend == -1 ) return text 
    return text.substring() ;
}


},{"./reddit.api":2}],2:[function(require,module,exports){
module.exports =  {
     search : function(searchTerm , sortBy , SearchLimit){
       return  fetch('https://www.reddit.com/search.json?q='+searchTerm + '&sort=' +sortBy + '&limit='+ SearchLimit)
        .then(res => res.json())
        .then(data => data.data.children.map(data => {
              return data.data
        }))
        .catch(error => console.log(error))
        
     }  
}
},{}]},{},[1]);
