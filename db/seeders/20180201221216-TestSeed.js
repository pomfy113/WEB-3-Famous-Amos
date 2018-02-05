'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Pets', [
      {
          name: "Rex",
          species: "Rottweiler",
          birthday: "2017-11-11",
          favoriteFood: "Chicken",
          picUrl: "http://www.dogbreedslist.info/uploads/allimg/dog-pictures/Rottweiler-3.jpg",
          picUrlSq: "http://www.dogbreedplus.com/dog_breeds/images/cute-rottweiler-puppy.jpg",
          description: "Rex is a dog and he's a good dog who loves to play and hang out with his owners. He also likes to nap and enjoys eating dog food",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Fido",
          species: "Greyhound",
          birthday: "2008-11-11",
          favoriteFood: "Liver",
          picUrl: "http://www.gpamass.com/s/img/emotionheader713297504.jpg",
          picUrlSq: "https://www.collinsdictionary.com/images/thumb/greyhound_21701074_250.jpg",
          description: "Fido is a dog and he's a good dog who loves to play and hang out with his owners. He also likes to nap and enjoys eating dog food",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Rolfe",
          species: "Pitbull",
          birthday: "2008-11-11",
          favoriteFood: "Beef",
          picUrl: "https://www.pocketpitbull.com/wp-content/uploads/2017/03/blue-staffy-pitbull-370x208.jpg",
          picUrlSq: "http://www.vrcpitbull.com/wp-content/uploads/2011/02/VAMPVAMP%E2%80%A2.jpg",
          description: "Rolfe is a dog and he's a good dog who loves to play and hang out with his owners. He also likes to nap and enjoys eating dog food",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Princhi",
          species: "West Highland White Terrier",
          birthday: "2008-11-11",
          favoriteFood: "Fish",
          picUrl: "http://www.dogbreedslist.info/uploads/allimg/dog-pictures/West-Highland-White-Terrier-2.jpg",
          picUrlSq: "https://upload.wikimedia.org/wikipedia/commons/2/2c/West_Highland_White_Terrier_Krakow.jpg",
          description: "Princhi is a dog and he's a good dog who loves to play and hang out with his owners. He also likes to nap and enjoys eating dog food",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Mr. Fluffles",
          species: "Poodle",
          birthday: "2008-11-11",
          favoriteFood: "Chicken",
          picUrl: "https://i.ytimg.com/vi/-57vwuw_aY8/maxresdefault.jpg",
          picUrlSq: "http://www.caninest.com/images/black-poodle.jpg",
          description: "Mr. Fluffles is a dog and he's a good dog who loves to play and hang out with his owners. He also likes to nap and enjoys eating dog food",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Santa's Little Helper",
          species: "Mixed",
          birthday: "2008-11-11",
          favoriteFood: "Pork",
          picUrl: "http://via.placeholder.com/350x150",
          picUrlSq: "http://via.placeholder.com/250x250",
          description: "Santa's Little Helper is a dog and he's a good dog who loves to play and hang out with his owners. He also likes to nap and enjoys eating dog food",
          createdAt: new Date(),
          updatedAt: new Date()
     },
     {
          name: "Alf",
          species: "Alien",
          birthday: "2008-11-11",
          favoriteFood: "Cats",
          picUrl: "http://via.placeholder.com/350x150",
          picUrlSq: "http://via.placeholder.com/250x250",
          description: "Alf is an alien and he's a good alien who loves to play and hang out with his owners. He also likes to nap and enjoys eating cats",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Bubba",
          species: "Mastiff",
          birthday: "2008-11-11",
          favoriteFood: "Dragon",
          picUrl: "http://via.placeholder.com/350x150",
          picUrlSq: "http://via.placeholder.com/250x250",
          description: "Bubba is a dog and he's a good dog who loves to play and hang out with his owners. He also likes to nap and enjoys eating dog food",
          createdAt: new Date(),
          updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

    return queryInterface.bulkDelete('Pets', null, {});

  }
};
