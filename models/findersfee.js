
module.exports = function(sequelize, DataTypes) {
  var Findersfee = sequelize.define("Findersfee", {
    //Sequelize should have an id by default
    username: {
      type: DataTypes.STRING,
    },
    seeker: {
      type: DataTypes.BOOLEAN,
    },
    email: {
      type: DataTypes.STRING,
    },
    item_name: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    fee: {
      type: DataTypes.DECIMAL,
    },
    found: {
      type:DataTypes.BOOLEAN,
      timestamps:true
    }


  });

  return Findersfee;
};

