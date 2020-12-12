'use strict';
//data cache
let hornArray = [];


//link json file
$.ajax('/data/page-1.json')
  .then( data => {
    data.forEach(hornObject => {
      console.log(hornObject);
      let newHorn = new Display(hornObject);
      newHorn.renderjquery();
      newHorn.list();
    });
  });

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
  $newTemplate.find('img').attr('alt', this.title);
  $newTemplate.find('h2').text(this.keyword);
  $newTemplate.addClass(this.keyword);
  $newTemplate.find('p').text(this.description);
  $('main').append($newTemplate);
  console.log($newTemplate);
};

Display.prototype.list = function () {
  const $keyword = $(`<option value="${this.keyword}">${this.keyword}</option>`);
  $('select').append($keyword);
  $('select').on('change', function (){
    //grabs value of thing selected, stores in const
    const keyword = $(this).val();
    //hides all sections
    $('section').hide();
    //shows any item with the selected keyword as its class
    $(`.${keyword}`).show();
    if(keyword === 'default'){
      $('section').show();
    }
  });
};

console.log(hornArray);



