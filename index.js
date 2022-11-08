require("dotenv").config();
const express = require('express');
const fs = require('fs');
const path = require("path");
const cors = require('cors');
const multer = require('multer');
const bodyParser = require("body-parser");
global.upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdirSync('public/uploads/document', { recursive: true })
      cb(null, 'public/uploads/document');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
});
const dbConnect = require("./utils/dbConnect");
const app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const toolsRoutes = require("./routes/v1/tools.route");
const viewCount = require("./middleware/viewCount");
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// call custom middleware
app.use(viewCount)

// this id database connection function 
dbConnect();

// all route will be here
app.use('/api/v1/tools', toolsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.all('*', (req,res)=>{
    res.send("No Route Found")
})

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Application is running on port ${port}`)
})

process.on("unHandleRejection", (error) => {
  console.log(error.name, error.message);
  app.close(()=> {
    process.exit(1);
  });
});