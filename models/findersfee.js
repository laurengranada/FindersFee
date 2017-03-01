
module.exports = function(sequelize, DataTypes) {
  var Findersfee = sequelize.define("Findersfee", {
    //Sequelize should have an id by default
    username: DataTypes.STRING,
    seeker: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    item_name: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    fee: DataTypes.DECIMAL,
    found: DataTypes.BOOLEAN
  }, {
      timestamps: true,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true
  });

  return Findersfee;
};

