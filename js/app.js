'use strict';
//data cache
let hornArray = [];


//link json file
$.ajax('/data/page-1.json')
  .then( data => {
    data.forEach(hornObject => {
      console.log(hornObject);
      let newHorn = new Display(hornObject, 'pageOne');
      newHorn.createHTML();
      newHorn.list();
    });
  });
  
  $.ajax('/data/page-2.json')
  .then( data => {
    data.forEach(hornObject => {
      console.log(hornObject);
      let newHorn = new Display(hornObject, 'pageTwo');
      newHorn.createHTML();
      newHorn.list();
    });
    $('.pageTwo').hide();
  });

function Display (object, page) {
  this.image= object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
  this.page = page;

  hornArray.push(this);
}

Display.prototype.createHTML = function () {
  let photoTemplate = $('#photo-template').html();
  console.log(this);
  let html = Mustache.render(photoTemplate, this);
  $('main').append(html);
  return html;
};

Display.prototype.list = function () {
  const $keyword = $(`<option value="${this.keyword}">${this.keyword}</option>`);
  $('select').append($keyword);
  $('select').on('change', function (){
    const keyword = $(this).val();
    $('section').hide();
    $(`.${keyword}`).show();
    if(keyword === 'default'){
      $('section').show();
    }
  });
};

console.log(hornArray);

// EVENT LISTENERS

$('#button1').on('click', function() {
  $('.pageOne').show();
  $('.pageTwo').hide();
});

$('#button2').on('click', function() {
  $('.pageOne').hide();
  $('.pageTwo').show();
});
