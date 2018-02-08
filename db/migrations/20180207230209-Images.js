'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
        queryInterface.addColumn('Pets', 'picThumb',
        {
            type: Sequelize.STRING,
            validate: { isUrl: true }
        }),
        queryInterface.addColumn('Pets', 'picSquare', {
            type: Sequelize.STRING,
            validate: { isUrl: true }
        }),
        queryInterface.addColumn('Pets', 'picMobile', {
            type: Sequelize.STRING,
            validate: { isUrl: true }
        })
    ]);


  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    return Promise.all([
        queryInterface.removeColumn('Pets', 'PicThumb'),
        queryInterface.removeColumn('Pets', 'PicSquare'),
        queryInterface.removeColumn('Pets', 'PicMobile')
    ]);
  }
};
