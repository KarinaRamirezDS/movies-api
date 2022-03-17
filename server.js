const { app } = require('./app');

// Utils
const { sequelize } = require('./util/database');
const { initModel } = require('./util/initModels');

sequelize
  .authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

// Models relations
initModel();

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
