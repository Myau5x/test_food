let app_id = '40d3953c';
let APIKey = '3b1a7af407f95e939b45bbf3554de014';

let query = "https://api.edamam.com/api/food-database/v2/parser?ingr=pepperoni%20pizza&app_id="+app_id+"&app_key="+APIKey;

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

$("#find-food").on("click", function(event) {

  // Preventing the submit button from trying to submit the form
  // We're optionally using a form so the user may hit Enter to search instead of clicking the button
  event.preventDefault();
  let food = $("#food-input").val();
  console.log(food);
  let query = "https://api.edamam.com/api/food-database/v2/parser?ingr="+food+"&app_id="+app_id+"&app_key="+APIKey;
  $.ajax({
    url: query,
    method: "GET"
  }).done(function(response) {
      
    console.log(response);
    let nutr = response.parsed[0].food.nutrients
    
    let old_text = $("#food-view").text();
    $("#food-view").text(JSON.stringify(nutr)+old_text);
  })

})