'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('person', 'jobId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'jobs', // Nombre de la tabla de trabajos
        key: 'id',     // Columna que se está referenciando en la tabla de trabajos
      },
      allowNull: true, // O false, según tu necesidad
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('person', 'jobId');
  }
};
