var birthday = require('./birthday-no-search');

var query = {
  firstName: "Preben",
  lastName: "Hansen",
  verbose: true
}

birthday.search(query, function(result){
  console.log(result);
})
