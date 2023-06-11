require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./db');
const seed = require('./seeders/seed');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello to the API!');
});

app.use('/team-members', require('./routes').TeamMemberRouter);
app.use('/contacts', require('./routes').ContactRouter);

app.all('*', (req, res) => {
  res.status(404).json({ error: '404: Invalid URL' });
});

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port: ${PORT}`);
  try {
    await connectDB();
    sequelize.sync({ force: false })
      .then(async () => {
        console.log('✅ Database & tables synced!');
        await seed();
      })
      .catch((error) => console.error('❌ Unable to sync database: ', error));
  } catch (error) {
    console.error('❌ Unable to connect to the database: ', error);
  }
});
