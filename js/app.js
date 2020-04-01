'use strict';
var keywrods = [];
var animals = [];
var titlesArr = [];
var hornsArr =[];
// let hornAnimal;
// C.F:
function HornAnimals (title, img, description, keyword, horns) {
  this.title = title;
  this.image_url = img;
  this.description =description;
  this.keyword = keyword;
  this.horns = horns;
  this.addClass = keyword;
  animals.push(this);
  titlesArr.push(title);
  hornsArr.push(horns);
}
// getting the data from JSON file:
function pageOne() {
  $.get('./data/page-1.json').then(data => {
    data.forEach((animal)=>{ //get each object from the array in JSON file and create a new object for it using C.F
      let hornAnimal = new HornAnimals(animal.title, animal.image_url, animal.description, animal.keyword, animal.horns);
      hornAnimal.render();
      hornAnimal.addOption();
    // selectOption();
    });
  });
}
function pageTwo(){
  $.get('./data/page-2.json').then(data => {
    data.forEach((animal)=>{ //get each object from the array in JSON file and create a new object for it using C.F
      let hornAnimal = new HornAnimals(animal.title, animal.image_url, animal.description, animal.keyword, animal.horns);
      hornAnimal.render();
      hornAnimal.addOption();
    // selectOption();
    });
  });
}
pageOne();
// page 1 event:
$('#pg1').on('click', function() {
  pageOne();
  console.log('clikc pg1');
});
// page 2 event:
$('#pg2').on('click', function(){
  $('section').removeData();
  $('section').removeAttr();
  pageTwo();
  console.log('pg2');
});
// prototype to render the data on html:
HornAnimals.prototype.render = function() {
  // let photoTemplate = $('.photo-template').clone();
  // photoTemplate.removeClass('photo-template');
  // photoTemplate.addClass(`${this.keyword}`);
  // photoTemplate.find('h2').text(this.title);
  // photoTemplate.find('img').attr('src', this.image_url);
  // photoTemplate.find('p').text(this.description);
  // $('main').append(photoTemplate);
  let mustacheTemplate = $('#mustache-template').html();
  let htmlPage = Mustache.render(mustacheTemplate,this);
  $('main').append(htmlPage);
  // mustacheTemplate.addClass(`${this.keyword}`);
};

// adding dropdown menu options dynamically:
HornAnimals.prototype.addOption = function(){
  if (keywrods.includes(this.keyword) === false) {
    $('#filter').append(`<option>${this.keyword}</option>`);
    keywrods.push(this.keyword);
  }
};
function selectOption () {
  $('#filter').change(function(){
    $('section').hide();
    for (let i=0; i<animals.length; i++) {
      if (animals[i].keyword === $(this).val()) {
        $(`.${animals[i].keyword}`).fadeIn(700);
      }
    }
  });
}
selectOption();
function sortAnimals () {
  $('#sort').change(function(){
    if ('title' === $(this).val()) {
      animals.sort((a, b) => {
        a.title > b.title;
      });
      console.log(animals);
    }
    else if ('horns' === $(this).val()){
      animals.sort((a, b) => {
        a.horns > b.horns;
      });
      console.log(animals);
    }
  });
}
sortAnimals ();

