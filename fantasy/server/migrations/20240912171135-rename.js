'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('specification', 'brand', 'Brand'),
      queryInterface.renameColumn('specification', 'finish', 'Finish'),
      queryInterface.renameColumn('specification', 'categories', 'Categories'),
      queryInterface.renameColumn('specification', 'series', 'Series'),
      queryInterface.renameColumn('specification', 'fretboardmaterial', 'Fretboard Material'),
      queryInterface.renameColumn('specification', 'pickupconfiguration', 'Pickup Configuration'),
      queryInterface.renameColumn('specification', 'scalelength', 'Scale Length'),
      queryInterface.renameColumn('specification', 'bodyshape', 'Body Shape'),
      queryInterface.renameColumn('specification', 'rightorlefthanded', 'Right/Left Handed'),
      queryInterface.renameColumn('specification', 'numberofstrings', 'Number Of Strings'),
      queryInterface.renameColumn('specification', 'neckmaterial', 'Neck Material'),
      queryInterface.renameColumn('specification', 'colorfamily', 'Color Family'),
      queryInterface.renameColumn('specification', 'modelfamily', 'Model Family'),
      queryInterface.renameColumn('specification', 'finishstyle', 'Finish Style'),
      queryInterface.renameColumn('specification', 'bodytype', 'Body Type'),
      queryInterface.renameColumn('specification', 'offsetbody', 'Offset Body'),
      queryInterface.renameColumn('specification', 'bridgeortailpiecetype', 'Bridge/Tailpiece Type'),
      queryInterface.renameColumn('specification', 'neckconstruction', 'Neck Construction'),
      queryInterface.renameColumn('specification', 'numberoffrets', 'Number Of Frets')
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('specification', 'Condition', 'condition'),
      queryInterface.renameColumn('specification', 'Brand', 'brand'),
      queryInterface.renameColumn('specification', 'Model', 'model'),
      queryInterface.renameColumn('specification', 'Finish', 'finish'),
      queryInterface.renameColumn('specification', 'Categories', 'categories'),
      queryInterface.renameColumn('specification', 'Year', 'year'),
      queryInterface.renameColumn('specification', 'Series', 'series'),
      queryInterface.renameColumn('specification', 'Fretboard Material', 'fretboardmaterial'),
      queryInterface.renameColumn('specification', 'Pickup Configuration', 'pickupconfiguration'),
      queryInterface.renameColumn('specification', 'Scale Length', 'scalelength'),
      queryInterface.renameColumn('specification', 'Body Shape', 'bodyshape'),
      queryInterface.renameColumn('specification', 'Right/Left Handed', 'rightorlefthanded'),
      queryInterface.renameColumn('specification', 'Number Of Strings', 'numberofstrings'),
      queryInterface.renameColumn('specification', 'Neck Material', 'neckmaterial'),
      queryInterface.renameColumn('specification', 'Color Family', 'colorfamily'),
      queryInterface.renameColumn('specification', 'Model Family', 'modelfamily'),
      queryInterface.renameColumn('specification', 'Finish Style', 'finishstyle'),
      queryInterface.renameColumn('specification', 'Body Type', 'bodytype'),
      queryInterface.renameColumn('specification', 'Offset Body', 'offsetbody'),
      queryInterface.renameColumn('specification', 'Bridge/Tailpiece Type', 'bridgeortailpiecetype'),
      queryInterface.renameColumn('specification', 'Neck Construction', 'neckconstruction'),
      queryInterface.renameColumn('specification', 'Number Of Frets', 'numberoffrets')
    ]);
  }
};
