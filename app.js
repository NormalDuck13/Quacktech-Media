const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/post', upload.single('media'), (req, res) => {
    const { title, name } = req.body;
    const media = req.file ? req.file.filename : null;

    console.log(`Title: ${title}, Name: ${name}, Media: ${media}`); // Log received data

    res.render('post', { title, name, media });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
