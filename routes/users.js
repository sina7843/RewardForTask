var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: (req, file, cb) => {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, `${req.params.id}.${extension}`)
  }
})
var upload = multer({ storage: storage })

const Task = require('../models/task')
const Shop = require('../models/shop')
const User = require('../models/user')

/* GET users listing. */
router.get('/task', async (req, res, next) => {
  let tasks = await Task.find({});
  res.render('task', { user: req.user, tasks: tasks });
});

router.get('/task/new', async (req, res, next) => {
  res.render('newtask');
})
router.post('/task/new', async (req, res, next) => {
  let newtask = new Task({
    Title: req.body.Title,
    Score: +req.body.Score,
    Description: req.body.Description,
    Done: false
  });
  res.send(await newtask.save());
})
router.post('/task/:id', upload.single('myFile'), async (req, res, next) => {
  let task = await Task.findByIdAndUpdate(req.params.id, { Done: true });
  if (!task.Done) {
    await User.findByIdAndUpdate(req.user._id, { $inc: { Wallet: task.Score } })
  }
  res.redirect('/list/task')
})

router.get('/shop', async (req, res, next) => {
  let shops = await Shop.find({});
  res.render('shop', { user: req.user, shops: shops });
});
router.get('/shop/new', async (req, res, next) => {
  res.render('newshop');
})
router.post('/shop/new', async (req, res, next) => {
  let newshop = new Shop({
    Title: req.body.Title,
    Price: +req.body.Price,
    Description: req.body.Description,
    Hasorder: false
  });
  res.send(await newshop.save());
})


router.post('/shop/:id', upload.single('myFile'), async (req, res, next) => {
  console.log(req.user)
  if (req.user.Wallet > 0) {
    let shop = await Shop.findByIdAndUpdate(req.params.id, { Hasorder: true });
    if (!shop.Hasorder) {
      await User.findByIdAndUpdate(req.user._id, { $inc: { Wallet: shop.Price * -1 } })
    }
  }
  res.redirect('/list/shop')
})
module.exports = router;
