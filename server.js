
const dotenv = require("dotenv"); 
dotenv.config(); 
const express = require("express");
const app = express();
const mongoose = require("mongoose"); 
const methodOverride = require("method-override"); 
const morgan = require("morgan"); 

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

const Disc = require("./models/disc.js");
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req,res) => {
    res.render('index.ejs')
});
app.get('/disc', async (req,res) => {
    const allDisc = await Disc.find();
    res.render('disc/index.ejs', {disc: allDisc});
})
app.get('/disc/bag', async (req,res) => {
    const allDisc = await Disc.find()
    res.render('disc/bag.ejs', {disc: allDisc});
})
app.get('/disc/new', async (req,res) => {
    res.render('disc/new.ejs')
})
app.post('/disc', async (req,res) => {
    if (req.body.inTheBag === "on") {
        req.body.inTheBag = true;
    } else {
        req.body.inTheBag = false;
    }
    await Disc.create(req.body)
    res.redirect('/disc');
})
app.get('/disc/:discId', async (req,res) => {
    const findDisc = await Disc.findById(req.params.discId)
    res.render('disc/show.ejs', {disc: findDisc});
})
app.get('/disc/:discId/edit', async (req,res) => {
    const findDisc = await Disc.findById(req.params.discId)
    res.render('disc/edit.ejs', {disc: findDisc});
})
app.put('/disc/:discId', async (req,res) => {
    if (req.body.inTheBag === "on") {
        req.body.inTheBag = true;
    } else {
        req.body.inTheBag = false;
    }
    await Disc.findByIdAndUpdate(req.params.discId, req.body);
    res.redirect(`/disc/${req.params.discId}`)
})
app.delete('/disc/:discId', async (req,res) => {
    await Disc.findByIdAndDelete(req.params.discId);
    res.redirect('/disc')
})




app.listen(3000, () => {
    console.log('Listening on port 3000');
  });