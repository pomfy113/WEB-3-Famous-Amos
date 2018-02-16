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
            type: Sequelize.VIRTUAL,
            validate: { isUrl: true },
            get: function() {
                return (this.get('picUrl') + "thumb");
            }
        }),
        queryInterface.addColumn('Pets', 'picSquare', {
            type: Sequelize.VIRTUAL,
            validate: { isUrl: true },
            get: function() {
                return (this.get('picUrl') + "thumb");
            }
        }),
        queryInterface.addColumn('Pets', 'picMobile', {
            type: Sequelize.VIRTUAL,
            validate: { isUrl: true },
            get: function() {
                return (this.get('picUrl') + "thumb");
            }
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
        queryInterface.removeColumn('Pets', 'picThumb'),
        queryInterface.removeColumn('Pets', 'picSquare'),
        queryInterface.removeColumn('Pets', 'picMobile')
    ]);
  }
};
