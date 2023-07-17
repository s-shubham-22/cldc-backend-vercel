require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { connectDB, sequelize } = require('./db');
const seed = require('./seeders/seed');

const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cloudinaryConfig = require('./config/cloudinary.config');

const app = express();
const PORT = process.env.PORT || 5000;

cloudinary.config(cloudinaryConfig);

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req) => {
    const params = {};
    const folder = process.env.CLOUDINARY_FOLDER;
    const subfolder = req.path.split('/')[1];
    params.folder = `${folder}/${subfolder}`;
    if (req.path === '/careers') {
      // keep options for uploading pdf file and fecthing it in optimized way
      params.resource_type = 'raw';
      params.format = 'pdf';
      params.type = 'private';
    } else {
      params.format = 'png';
      params.transformation = [
        {
          quality: 'auto',
          fetch_format: 'auto',
        },
      ];
    }

    return params;
  },
});

const upload = multer({ storage });

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 10 },
  { name: 'banner', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
]));

app.get('/', (req, res) => {
  res.send('Hello to the API!');
});

app.use('/team-members', require('./routes').TeamMemberRouter);
app.use('/contacts', require('./routes').ContactRouter);
app.use('/articles', require('./routes').ArticleRouter);
app.use('/events', require('./routes').EventRouter);
app.use('/careers', require('./routes').CareerRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port: ${PORT}`);
  try {
    await connectDB();
    sequelize.sync({ force: true })
      .then(async () => {
        console.log('✅ Database & tables synced!');
        // await seed();
      })
      .catch((error) => console.error('❌ Unable to sync database: ', error));
  } catch (error) {
    console.error('❌ Unable to connect to the database: ', error);
  }
});
