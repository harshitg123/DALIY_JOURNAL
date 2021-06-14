require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

const homeStartingContent = "Hope you all are doing great, This is my personal blogging website for keeping handy info and share knowledge for various projects I have done so far. In the future, I will develop this application more so that everyone can make their own account and share their project and knowledge with us.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Schema
const blogsSchema = {
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}

// Model
const Blogs = mongoose.model('Blog', blogsSchema);

app.get("/", function(req, res) {
  Blogs.find({}, null, {
    sort: {
      category: 1
    }
  }, function(err, foundData) {
    console.log(foundData);
    if (!err) {
      res.render("home", {
        home: homeStartingContent,
        posts: foundData
      });
    }
  });
});

app.get("/posts/:post", function(req, res) {
  Blogs.find({}, function(err, foundData) {
    if (!err) {
      foundData.forEach(function(post) {
        if (_.lowerCase(post._id) === _.lowerCase(req.params.post)) {
          res.render("post", {
            postTitle: post.title,
            postBody: post.body,
            postImage: post.image
          });
        }
      })
    }
  })
});


// app.get("/about", function(req, res){
//   res.render("about", {about: aboutContent})
// });
//
// app.get("/contact", function(req, res){
//   res.render("contact", {contact: contactContent})
// });

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {

  const post = new Blogs({
    title: req.body.postTitle,
    body: req.body.postBody,
    image: req.body.postImage,
    category: req.body.selector
  });

  post.save();
  res.redirect("/");

});

let port = process.env.PORT;
console.log(port);
if (port == null || port == "") {
  port = 3000;
}
console.log(port);

app.listen(port, function() {
  console.log("Server started on port 3000");
});
