const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./database');

async function  launchServer() {
  const app = express();

  // setting for json-typed http request 
  app.use(bodyParser.json());
  
  app.get('/', (req, res) => {
    res.json({
      message: "Hello World!"
    });
  });

  try {
    await sequelize.sync();
    console.log('Database is ready!');
  } catch (error) {
    console.log('Unalbe to connect to the datebase:');
    console.log(error);
    process.exit(1);
  }

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
}

launchServer();