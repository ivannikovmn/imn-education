'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Vacancies', 'materials', {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: [],
    });

    await queryInterface.changeColumn('Vacancies', 'event_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.changeColumn('Vacancies', 'address', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Перед откатом восстанавливаем значения, чтобы вернуть NOT NULL.
    await queryInterface.sequelize.query(`
      UPDATE "Vacancies"
      SET "event_date" = CURRENT_TIMESTAMP
      WHERE "event_date" IS NULL
    `);

    await queryInterface.sequelize.query(`
      UPDATE "Vacancies"
      SET "address" = ''
      WHERE "address" IS NULL
    `);

    await queryInterface.changeColumn('Vacancies', 'event_date', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn('Vacancies', 'address', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.removeColumn('Vacancies', 'materials');
  },
};
