let app_id = '40d3953c';
let APIKey = '3b1a7af407f95e939b45bbf3554de014';

let query = "https://api.edamam.com/api/food-database/v2/parser?ingr=pepperoni%20pizza&app_id="+app_id+"&app_key="+APIKey;
/*
$.ajax({
    url: query,
    method: "GET"
  }).done(function(response) {
      
    console.log(response);})*/

    //// create data for post request
let data_ex = {
  "ingredients": [
    {
      "quantity": 1,
      "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_serving",
      "foodId": "food_a1gb9ubb72c7snbuxr3weagwv0dd"
    }
  ]
};

AJAX_POST_URL = "https://api.edamam.com/api/food-database/v2/nutrients?app_id="+app_id+"&app_key="+APIKey;
/*
$.ajax({
  beforeSend: function(xhrObj){
    xhrObj.setRequestHeader("Content-Type","application/json");
},
  url : AJAX_POST_URL,
  type: "POST",
  //headers: {"Content-Type": "application/json"},
  data : JSON.stringify(data_ex),
  dataType: "json"
}).done(function(response){
  console.log(response);
}).fail(function(response){
  console.log(response);
})
*/

//// food id and measure, if not measure use 
    
    /// create querry for post request
    //// create post request

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
    let parsed = response.parsed;
    let ingr = [];
    parsed.forEach(function(el) {
      console.log(el.food.foodId);
      console.log(el.food.nutrients.ENERC_KCAL);
      console.log(el.measure.uri); 
      console.log(el.quantity);
      /**
       * {
      "quantity": 1,
      "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_serving",
      "foodId": "food_aeqk7lua3h3qopbk2qew0aeif5p8"
       }
       */
      ///add default values for quantity and m.uri
      let new_ing = {'quantity':el.quantity,'measureURI':el.measure.uri,'foodId':el.food.foodId};
      ingr.push(new_ing);
    });
    data_post = {'ingredients':ingr}
    console.log("======data-post====");
    console.log(data_post);

    $.ajax({
      beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
    },
      url : AJAX_POST_URL,
      type: "POST",
      //headers: {"Content-Type": "application/json"},
      data : JSON.stringify(data_post),
      dataType: "json"
    }).done(function(response){

      console.log(response);
      let cal = response.totalNutrients.ENERC_KCAL;
      console.log(cal);


    }).fail(function(response){
      console.log(response);
    })





    let old_text = $("#food-view").text();
    $("#food-view").text(JSON.stringify(nutr)+old_text);

    
    

  })

})