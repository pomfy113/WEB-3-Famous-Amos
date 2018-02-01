'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Pets', [{
          name: "Rex",
          species: "Rottweiler",
          birthday: "2017-11-11",
          favoriteFood: "Chicken",
          picUrl: "http://www.dogbreedslist.info/uploads/allimg/dog-pictures/Rottweiler-3.jpg",
          picUrlSq: "http://www.dogbreedplus.com/dog_breeds/images/cute-rottweiler-puppy.jpg",
          description: "Rex is a dog and he's a good dog who loves to play and hang out with his owners. He also likes to nap and enjoys eating dog food",
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

    return queryInterface.bulkDelete('Pets', null);

  }
};
