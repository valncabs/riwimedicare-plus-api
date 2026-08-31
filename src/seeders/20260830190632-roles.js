'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

  await queryInterface.bulkInsert("roles", [
      {
          name: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
          name: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
      },
  ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  }
};
