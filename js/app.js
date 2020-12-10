'use strict';
//data cache
let hornArray = [];


// let $photoTemplate = $('#photo-template');

//link json file
$.ajax('/data/page-1.json')
  .then( data => {
    //this separates each array data index into its own object, this makes it easier to manipulate each data point
    data.forEach(hornObject => {

      console.log(hornObject);
      //next, select element from DOM
      //clone?
      //remove or add any attributes
      //add content using text(value.WHATEVERPROPERTYNAME)
      //instantiate inside ajax call?
      let newHorn = new Display(hornObject);
      newHorn.renderjquery();
    });
  });

//grab DOM elements and assign to variable


function Display (object) {
  this.image= object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;

  hornArray.push(this);
}

Display.prototype.renderjquery = function () {
  let photoTemplate = $('#photo-template').html();
  let $newTemplate = $(`<section>${photoTemplate}</section>`);
  $newTemplate.find('img').attr('src', this.image);
  $('main').append($newTemplate);
  console.log($newTemplate);
};

console.log(hornArray);
//instantiate each object in the json file using constructor
// page-1.forEach(new MakeImage)


