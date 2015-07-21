var birthday = require('./scraper-birthday-no');

var person = {
  firstName: "Preben",
  lastName: "Hansen"
}

birthday.search(person, function(result){
  console.log(result);
})
