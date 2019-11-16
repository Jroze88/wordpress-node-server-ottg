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
    lastChecked: { type: Date, default: Date.now }
  });

  var articleSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    articleTitle:  { type: String, unique: true, required: true },
    date: { type: Date, default: Date.now },
    url:   { type: String, required: true, unique: true },
    thumb: { type: String, required: true },
    author: { type: String, required: true }
  });

  var videoSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    videoTitle:  { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    url:   { type: String, required: true, unique: true },
    thumb: { type: String, required: true },
    author: { type: String, required: true }
  });





const Articles = mongoose.model('Articles', articleSchema);

const Videos = mongoose.model('Videos', videoSchema);

const Contributors = mongoose.model('Contributors', contributorSchema);



//   dbVideos.createCollection('contributor', {validator: {
//     $jsonSchema: {
//        bsonType: "object",
//        required: [ "name", "type", "lastChecked", "postNum" ],
//        properties: {
//         name: {
//              bsonType: "string",
//              description: "must be a string and is required"
//           },
//           lastChecked: {
//              bsonType: "date",
//              description: "must be a date in ms and is required"
//           },
//           type: {
//             bsonType: "string",
//             description: "must be a string and is required"
//           },
//           postNum: {
//             bsonType: "number",
//             description: "must be a number and is required"
//           }
//        }
//     }
//  }
// })

//   dbVideos.createCollection('video', {validator: {
//     $jsonSchema: {
//        bsonType: "object",
//        required: [ "url", "title", "date", "thumb" ],
//        properties: {
//         url: {
//              bsonType: "string",
//              description: "must be a string and is required"
//           },
//           date: {
//              bsonType: "date",
//              minimum: 2017,
//              maximum: 3017,
//              description: "must be a date in ms and is required"
//           },
//           title: {
//             bsonType: "string",
//             description: "must be a string and is required"
//           },
//           thumb: {
//             bsonType: "string",
//             description: "must be a string and is required"
//           }
//        }
//     }
//  }
// })


// dbArticles.createCollection('article', {validator: {
//   $jsonSchema: {
//      bsonType: "object",
//      required: [ "url", "title", "date", "thumb" ],
//      properties: {
//       url: {
//            bsonType: "string",
//            description: "must be a string and is required"
//         },
//         date: {
//            bsonType: "date",
//            description: "must be a date in ms and is required"
//         },
//         title: {
//           bsonType: "string",
//           description: "must be a string and is required"
//         },
//         thumb: {
//           bsonType: "string",
//           description: "must be a string and is required"
//         }
//      }
//   }
// }
// })


module.exports = {
    Articles, Videos, Contributors
}