// const client = new MongoClient(uri, { useNewUrlParser: true }, {useUnifiedTopology: true});

// client.connect(err => {
//   const collection = client.db("test").collection("devices");

const mongoose = require('mongoose');
const {Schema} = require('mongoose');



var contributorSchema = new Schema({
  // _id: Schema.Types.ObjectId,
    name:  { type: String, required: true, unique: true },
    type: { type: String, required: true, unique: true },
    postNum: { type: Number, required: true},
    lastChecked: { type: Date, default: Date.now },
  });

  var articleSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    articleTitle:  { type: String, unique: true, required: true },
    date: { type: Date, default: Date.now },
    url:   { type: String, required: true, unique: true },
    thumb: { type: String, required: true },
    author: { type: String, required: true },
    thumbType: { type: String },
    generateThumb : {type: Boolean, default: false}
  });

  var videoSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    videoTitle:  { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    url:   { type: String, required: true, unique: true },
    thumb: { type: String, required: true },
    author: { type: String, required: true },
    thumbType: { type: String },
    generateThumb : {type: Boolean, default: false}
  });





const Articles = mongoose.model('Articles', articleSchema);

const Videos = mongoose.model('Videos', videoSchema);

const Contributors = mongoose.model('Contributors', contributorSchema);




module.exports = {
    Articles, Videos, Contributors
}