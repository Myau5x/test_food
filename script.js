app_id = '40d3953c';
APIKey = '3b1a7af407f95e939b45bbf3554de014';

query = "https://api.edamam.com/api/food-database/v2/parser?ingr=pepperoni%20pizza&app_id="+app_id+"&app_key="+APIKey;

$.ajax({
    url: query,
    method: "GET"
  }).done(function(response) {
      
    console.log(response);})

/*
up to 10 foods?
search --- calories
another search ---- more calories + total sum
up to 10 searches 
 */