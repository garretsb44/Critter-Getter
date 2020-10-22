module.exports = function(sequelize, DataTypes) {
    const Saved_searches = sequelize.define("Search", {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      distance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
    return Saved_searches;
};