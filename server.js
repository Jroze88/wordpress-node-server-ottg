// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)


const schedule = require('node-schedule')
var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
// const MongoClient = require('mongodb').MongoClient; //// this is poop
const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const cheerio = require('cheerio')
const axios = require('axios')
const $ = require('jquery')
const {Articles, Videos, Contributors} = require('./schemas.js')
var randomizer = 0;




const app = express();

const uri1 = "mongodb+srv://tech-ottg-admin:ottgcodingtest123@cluster0-gdlsp.gcp.mongodb.net/Articles?retryWrites=true&w=majority";
const uri2 = "mongodb+srv://tech-ottg-admin:ottgcodingtest123@cluster0-gdlsp.gcp.mongodb.net/Videos?retryWrites=true&w=majority";
// const uri3 = "mongodb+srv://tech-ottg-admin:ottgcodingtest123@cluster0-gdlsp.gcp.mongodb.net/Contributors?retryWrites=true&w=majority";
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "client/build")));\\





const meepleServerCheck = function() {
  mongoose.connection.close()
mongoose.connect(uri1, {useNewUrlParser: true, useUnifiedTopology: true }).catch(error => console.log(error));
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  
  console.log('Mongo Connection Secured')
  fetchMikeMeeple()
});







const fetchMikeMeeple = () => {

  // const $ = cheerio.load('<ul id="fruits">...</ul>');
  randomizer = Math.floor(Math.random() * 40)
  let meepleArchive;

  

  axios.get('https://mikemeeple.blogspot.com/p/blog-page_16.html').then(response => {


    meepleArchive = response.data

    let meepleArticles = [];

    const $ = cheerio.load(meepleArchive)
    
   $('div.separator').next().children('span ').children('a').map(function(i,el) { 

      

      if ($(el).attr('href').includes('meeple')) {

        let thisTimeStamp = Date.now()
        let newItem = new Articles({
          articleTitle: `Mike Meeple's ASOIAF-Painting-Poorly: ${$(el).text()}`,
          url: $(el).attr('href'),
          thumb: 'https://4.bp.blogspot.com/-PfpKrMXj1Ek/WqLncktF6UI/AAAAAAAAAFg/VbbdD_UqbowDMg7aG4tobXVnSz5liRiEACK4BGAYYCw/s113-pf/MikeMeepleTransparent.png',
          date: thisTimeStamp,
          author: 'Mike Meeple'
        })

        newItem.save().catch((error, saved) => {
          if (error) {
            console.log(error)
          } else {
            ///////////////////////////////////////////////////////////////////////////////// WORDPRESSPOST
          }
        })
      } else {
        return
      }
      
   })


   }).catch(error => {
    console.log(error);
  })

// const bulkOp = Articles.initializeOrderedBulkOp();


// meepleArticles.forEach(element => {
//     bulkOp.insert(element)
// });

// // Adds three inserts to the bulkOp.
// // bulkOp
// //   .insert({ a: 1 })
// //   .insert({ b: 2 })
// //   .insert({ c: 3 });
// bulkOp.execute().then((succ) => {
//   console.log(succ)
// }).catch(err => console.log(err))




}


}


const youTubeServerCheck = function(url, aut) {

  let givenUrl = url;
  let Author = aut

  const fetchVideos = function(givenUrl, Author) {

    // let testUrl = 'https://www.youtube.com/channel/UCfmdCCJ9Usa686sLnlnVN6Q/videos?view=0&sort=dd&flow=grid'
  
    axios.get(givenUrl).then(response => {
  
  
      videoArchive = response.data
  
   
  
      const $ = cheerio.load(videoArchive,{
        withDomLvl1: true,
        normalizeWhitespace: false,
        xmlMode: false,
        decodeEntities: true
    })

    // console.log( $('h3 > a').text())

    // console.log($('h3 > a'));


    let item = $('h3').children('a').map((i, el) => {
      // console.log($(el).attr('href'))
      let thisItem = new Videos({
        videoTitle: $(el).text(),
        url: `http://www.youtube.com${$(el).attr('href')}`,
        thumb: $(el).parent().parent().parent().parent().find('img').attr('src'),
        author: Author
      })

      thisItem.save().catch((error, saved) => {
        if (error) {
          console.log(error)
        } else {
          ///////////////////////////////////////////////////////////////////////////////// WORDPRESSPOST
        }
      })


    })
  
  
  })


}
  
mongoose.connection.close()
mongoose.connect(uri2, {useNewUrlParser: true, useUnifiedTopology: true }).catch(error => console.log(error));
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  
  console.log('Mongo Connection Secured')
  fetchVideos(givenUrl, Author)
});




}


let youTubeOttg = 'https://www.youtube.com/channel/UCfmdCCJ9Usa686sLnlnVN6Q/videos'
let blitzMinis = 'https://www.youtube.com/channel/UCshI4GSr6P6tzzQdGuc3dMQ/search?query=ice+and+fire'
let mythicosStudios = 'https://www.youtube.com/channel/UCTTKb6Fu1WOdkdGzq8c5hiw/videos'


youTubeServerCheck(youTubeOttg, 'Chase - On the Table Gaming')


setTimeout(()=> {
  meepleServerCheck()
}, 15000)

setTimeout(()=> {
  youTubeServerCheck(blitzMinis, 'BlitzMinis')
}, 30000)


setTimeout(()=> {
  youTubeServerCheck(mythicosStudios, 'Mythicos Studios')
}, 45000)





setInterval(() => {
  meepleServerCheck()
}, 34000000 + randomizer * 42038)

// meepleServerCheck()
// youTubeServerCheck(uri2, 'author')


app.get('*', (req, res) => {
  res.json('Hello!')
});



const server = http.createServer(app)

server.listen();
