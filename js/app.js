'use strict';
//data cache
let hornArray = [];


//------------------------------AJAX CALLS------------------------------//
$.ajax('/data/page-1.json')
  .then( data => {
    data.forEach(hornObject => {
      let newHorn = new Display(hornObject, 'pageOne');
      newHorn.list();
    });
    sortByTitle();
    createElements();
  });

$.ajax('/data/page-2.json')
  .then( data => {
    sortByTitle();
    data.forEach(hornObject => {
      let newHorn = new Display(hornObject, 'pageTwo');
      newHorn.list();
    });
    sortByTitle();
    createElements();
    $('.pageTwo').hide();
  });

//------------------------------CONSTRUCTOR------------------------------//

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

//------------------------------FUNCTIONS------------------------------//

function sortByTitle() {
  hornArray.sort(function(a, b){
    if(a.title > b.title) {
      return 1;
    }else if(a.title < b.title){
      return -1;
    }
  });
}

function sortByHorns() {
  hornArray.sort(function(a, b){
    if(a.horns > b.horns) {
      return 1;
    }else if(a.horns < b.horns){
      return -1;
    }
  });
}

function createElements() {
  hornArray.forEach(obj => {
    obj.createHTML();
  });
}

function clearElements() {
  $('main').empty();
}

//------------------------------EVENT LISTENERS------------------------------//

$('#button1').on('click', function() {
  $('.pageOne').show();
  $('.pageTwo').hide();
});

$('#button2').on('click', function() {
  $('.pageOne').hide();
  $('.pageTwo').show();
});

$('#titleButton').on('click', function() {
  clearElements();
  sortByTitle();
  createElements();
});

$('#hornButton').on('click', function() {
  clearElements();
  sortByHorns();
  createElements();
});
