module.exports = function(sequelize, DataTypes) {
    const Saved_animals = sequelize.define("Animal", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      distance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      img_url: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
    return Saved_animals;
};