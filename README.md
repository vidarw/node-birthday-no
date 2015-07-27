# birthday-no-search
Node module for Birthday.no searches.
Two or more of the following parameters are required:

* firstName
* lastName
* zip
* city

## Example

    var person = {
      firstName: "Preben",
      lastName: "Hansen"
    };
  
    birthday.search(person, function(result){
      console.log(result);
    });
