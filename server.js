



var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const cheerio = require('cheerio')






const app = express();


let dbArticles;
let dbVideos;


const uri = "mongodb+srv://tech-ottg-admin:ottgcodingtest123@cluster0-gdlsp.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true }, {useUnifiedTopology: true});
client.connect(err => {
  const collection = client.db("test").collection("devices");

  dbArticles = client.db('articles');

  dbVideos = client.db('videos')

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

  if (err) {
    console.log(err)
  } else {
    console.log(collection)
  }

  // perform actions on the collection object
  // client.close();
});


const fetchMikeMeeple = () => {

  const $ = cheerio.load('<ul id="fruits">...</ul>');

}


// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "client/build")));


app.get('*', (req, res) => {
  res.json('Hello!')
});



const server = http.createServer(app)

server.listen();
