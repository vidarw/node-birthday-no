var jsdom = require('jsdom');
var moment = require('moment');

var search = function(query, callback){
  var url = "http://www.birthday.no/sok/?";
  if (query.firstName) url += "f=" + escape(query.firstName);
  if (query.lastName) url += "&l=" + escape(query.lastName);
  if (query.zip) url += "&z=" + escape(query.zip);
  if (query.city) url += "&c=" + escape(query.city);

  var result = [];

  if (query.verbose) console.log('url:', url);

  jsdom.env({url: url, encoding: 'binary', scripts: ["https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"], done: function (errors, window) {

    window.$("#birthdaylist > div").each(function(i, el){
      var person = {};
      var name = window.$(el).find('h3 > a').text();
      person.lastName = name.split(' ')[name.split(' ').length-1].trim();
      person.firstName = name.substr(0, name.indexOf(person.lastName)).trim();

      var text = window.$(el).find('p').text();
      var dateOfBirthText = text.substr(text.indexOf(" den ") + 5);
      person.dateOfBirth = moment(dateOfBirthText, "DD MMM YYYY", 'nb').format("YYYY-MM-DD");

      var addressText = text.substr(0, text.indexOf("Tele"));
      var zipCitySearch = new RegExp('([0-9][0-9][0-9][0-9])\ ([a-zA-ZæøåÆØÅ]+)', 'g');
      var zipCityResult = zipCitySearch.exec(text);

      person.address = addressText.split(",")[0];
      person.zip = zipCityResult[1].trim();
      person.city = zipCityResult[2].trim().toUpperCase();

      result.push(person);
    });

    window.close();

    if(typeof(callback) == "function") callback(result);
  }});
};

module.exports = { search: search };
