'use strict';
var keywrods = [];
var animals = [];
// C.F:
function HornAnimals (title, img, description, keyword, horns) {
  this.title = title;
  this.image_url = img;
  this.description =description;
  this.keyword = keyword;
  this.horns = horns;
  animals.push(this);
}
// getting the data from JSON file:
$.get('./data/page-1.json').then(data => {
  data.forEach((animal)=>{ //get each object from the array in JSON file and create a new object for it using C.F
    let hornAnimal = new HornAnimals(animal.title, animal.image_url, animal.description, animal.keyword, animal.horns);
    hornAnimal.render();
    hornAnimal.addOption();
    // selectOption();
  });
});

// prototype to render the data on html:
HornAnimals.prototype.render = function() {
  let photoTemplate = $('.photo-template').clone();
  photoTemplate.removeClass('photo-template');
  photoTemplate.find('h2').text(this.title);
  photoTemplate.find('img').attr('src', this.image_url);
  photoTemplate.find('p').text(this.description);
  $('main').append(photoTemplate);
};

// adding dropdown menu options dynamically:
HornAnimals.prototype.addOption = function(){
  if (keywrods.includes(this.keyword) === false) {
    $('select').append(`<option>${this.keyword}</option>`);
    keywrods.push(this.keyword);
  }
};

// showing images according to selected option:
// HornAnimals.prototype.selectOption = function(){
//   $('select').change(function(){
//     $('section').hide();
//     console.log($(this).val());
//     console.log(this);
//   });
// };

function selectOption () {
  $('select').change(function(){
    $('section').hide();
    // console.log($(this).val());
    for (let i=0; i<animals.length; i++) {
      if (animals[i].keyword === $(this).val()) {
        animals[i].render();
        $('section').show();
      }
    }
  });
}
selectOption();
