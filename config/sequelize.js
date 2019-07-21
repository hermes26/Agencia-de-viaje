

const Sequelize = require('sequelize');
const sequelize = new Sequelize('web_travel_agency', 'root', '',{
    host:'localhost',
    dialect:'mysql',
    // operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
})

sequelize.authenticate()
  .then(() => {
    console.log('MySQL Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports=sequelize;