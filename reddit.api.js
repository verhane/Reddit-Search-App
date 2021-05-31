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