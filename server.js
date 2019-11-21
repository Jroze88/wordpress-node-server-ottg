// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
const secrets = require('./secrets.json')
const Jimp = require('jimp')
// const schedule = require('node-schedule')
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
var WPAPI = require( 'wpapi' );
const fs = require('fs')
const request = require('request');
const apiRootJSON = require('./wp-json.json')
var wp = new WPAPI({
  endpoint: secrets.endpoint,
  // routes: apiRootJSON,
  // This assumes you are using basic auth, as described further below
  username: secrets.username,
  password: secrets.password,
  auth: true,
  basicAuth: {
    username: secrets.username,
    password: secrets.password,
  }
});

console.log(secrets)

let writeState = false

let JimpGoT = Jimp.loadFont('./got.fnt') // using a callback pattern

// Jimp.loadFont('./got.fnt').then(font => {
// Jimp.read('./mikemeeple.jpg')
//   .then(image => {
//     image.print(
//       font,
//       10,
//       10,
//       {
//         text: 'Hello world',
//         alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
//         alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
//       },
//       400, //// maxwidth
//       380 ///// max height
//     ); // prints 'Hello world!' on an image, middle and center-aligned, when x = 0 and y = 0
//     image.write('./meeple.jpg')
//   })
//   .catch(err => {
//     console.log(err)
//   });
// }).catch(err => console.log(err))

const checkThumb = function(str) {

  if (str.includes('jpg')) {
    return 'jpg'
  }
  if (str.includes('gif')) {
    return 'gif'
  }
  if (str.includes('png')) {
    return 'png'
  }


} 

const download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const contributorCategories = [
  {'Mythicos Studios' : 162},
  {'Chase - On The Table Gaming' : [168]},
  {'BlitzMinis' : [163]},
  {"Mike Meeple's Painting Poorly": [169] }
]


const generateThumb = [
  {'Mythicos Studios' : false},
  {'Chase - On The Table Gaming' : false},
  {'BlitzMinis' : false},
  {"Mike Meeple's Painting Poorly": true }
]

const thumbTemplate = [
  {"Mike Meeple's Painting Poorly": './mikemeeple.jpg' }
]







const createThisVideoPost = function(postObj) {


if (writeState === false) {
  return true
}

download(postObj.thumb, `./${postObj.videoTitle}.${postObj.thumbType}`, function() {

  if (postObj.url.includes('youtube')) {

  }


  wp.posts().create({
    "type": "post",
    "title":  postObj.videoTitle,
    "content": `<span class='redirect-this-custom-scraper' id='${postObj.url}'></span>`,
    "status": "publish",
    "author": 6,
    "format": "standard",  
    "tags" : [165, 166, 167],
    "categories" : [contributorCategories[postObj.author]]
  }).then(function( response ) {
    // "response" will hold all properties of your newly-created post,
    // including the unique `id` the post was assigned on creation
    console.log( response.id);
    let thisID = response.id
    wp.media().file( `./${postObj.videoTitle}.${postObj.thumbType}`).create({
      title: 'Amazing featured image',
      post: thisID,
      "media[0]" : `${postObj.thumb}`
    }).then(function( media ) {
      console.log(media)
      return wp.posts().id(thisID).update({
        featured_media: media.id
      })

    }).catch(err => console.log(err))
    
}).catch(err => console.log(err))


})



}




const createThisVideoPostWithThumb = function(postObj) {

  if (writeState === false) {
    return true
  }
 
    Jimp.read(`./${thumbTemplate[postObj.author]}`)
      .then(image => {
        image.print(
          JimpGoT,
          10,
          10,
          {
            text: `${postObj.title}`
          },
          400, //// maxwidth
          380 ///// max height
        ); // prints 'Hello world!' on an image, middle and center-aligned, when x = 0 and y = 0
      }).then(function() {

        wp.posts().create({
          "type": "post",
          "title":  postObj.videoTitle,
          "content": `<span class='redirect-this-custom-scraper' id='${postObj.url}'></span>`,
          "status": "publish",
          "author": 6,
          "format": "standard",  
          "tags" : [165, 166, 167],
          "categories" : [contributorCategories[postObj.author]]
        }).then(function( response ) {
          // "response" will hold all properties of your newly-created post,
          // including the unique `id` the post was assigned on creation
          console.log( response.id);
          let thisID = response.id
          wp.media().file( `${thumbTemplate[postObj.author]}new`).create({
            title: 'Amazing featured image',
            post: thisID,
            "media[0]" : `${thumbTemplate[postObj.author]}new`
          }).then(function( media ) {
            console.log(media)
            return wp.posts().id(thisID).update({
              featured_media: media.id
            })
      
          }).catch(err => console.log(err))
          
     
      
      
      })

      })
      .catch(err => {
        console.log(err)
      });
   

 
  
  
  
  

  
  
  
  }


// const createThisMeeplePost = function(postObj) {




//   download(postObj.thumb, `./${postObj.articleTitle}.${postObj.thumbType}`, function() {
  
//     wp.posts().create({
//       "type": "post",
//       "title":  postObj.articleTitle,
//       "content": `<span class='redirect-this-custom-scraper' id='${postObj.url}'></span>`,
//       "status": "publish",
//       "author": 6,
//       "format": "standard",
//       "tags" : [165, 166, 167],
//       "categories" : [169]
//     }).then(function( response ) {
//       // "response" will hold all properties of your newly-created post,
//       // including the unique `id` the post was assigned on creation
//       console.log( response.id);
//       let thisID = response.id
//       wp.media().file( `./${postObj.articleTitle}.${postObj.thumbType}`).create({
//         title: 'Amazing featured image',
//         post: thisID,
//         "media[0]" : `${postObj.thumb}`
//       }).then(function( media ) {
//         console.log(media)
//         return wp.posts().id(thisID).update({
//           featured_media: media.id
//         })
  
//       }).catch(err => console.log(err))
      
//   }).catch(err => console.log(err))
  
  
//   })
  
  
  
//   }



  
  
 
// mongoose.connection.close()
mongoose.connect(secrets.uri2, {useNewUrlParser: true }).catch(error => console.log(error));
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  
  console.log('Mongo Connection Secured')



});







const app = express();


// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "client/build")));\\





const server = http.createServer(app)

server.listen();








const meepleServerCheck = function() {



const fetchMikeMeeple = () => {

  // const $ = cheerio.load('<ul id="fruits">...</ul>');
  randomizer = Math.floor(Math.random() * 40)
  let meepleArchive;

  

  axios.get(secrets.MikeMeeple).then(response => {


    meepleArchive = response.data

    let meepleArticles = [];

    const $ = cheerio.load(meepleArchive)
    
   $('div.separator').next().children('span ').children('a').map(function(i,el) { 

      

      if ($(el).attr('href').includes('meeple')) {

        let thisTimeStamp = Date.now()
        let thisItem = new Articles({
          articleTitle: `Mike Meeple's ASOIAF-Painting-Poorly: ${$(el).text()}`,
          url: $(el).attr('href'),
          thumb: 'https://4.bp.blogspot.com/-PfpKrMXj1Ek/WqLncktF6UI/AAAAAAAAAFg/VbbdD_UqbowDMg7aG4tobXVnSz5liRiEACK4BGAYYCw/s113-pf/MikeMeepleTransparent.png',
          date: thisTimeStamp,
          author: 'Mike Meeple',
          thumbType: 'png'
        })

        if (thisItem.articleTitle.includes('ASOIAF'))  {


          thisItem.save().then((saved, err) => {
         if (saved) {
          // createThisVideoPostWithThumb(thisItem)
         }
       }).catch(err => console.log(err))
     } else if (thisItem.articleTitle.includes('Song of Ice'))  {
 
 
       thisItem.save().then((saved, err) => {
      if (saved) {
        // createThisVideoPostWithThumb(thisItem)
      }
    }).catch(err => console.log(err))
  }
      } 
      
   })


   }).catch(error => {
    console.log(error);
  })



}

fetchMikeMeeple()

}

  const fetchVideos = function(givenUrl, Author) {

  
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
        thumb: $(el).parent().parent().parent().parent().find('img').attr('src').split("\?")[0],
        author: Author,
        thumbType: checkThumb($(el).parent().parent().parent().parent().find('img').attr('src').split("\?")[0])
      })

      console.log(thisItem)
      

        if (thisItem.videoTitle.includes('ASOIAF'))  {


         thisItem.save().then((saved, err) => {
        if (saved) {
          // createThisVideoPost(thisItem)
        }
      }).catch(err => console.log(err))
    } else if (thisItem.videoTitle.includes('Song of Ice'))  {


      thisItem.save().then((saved, err) => {
     if (saved) {
      //  createThisVideoPost(thisItem)
     }
   }).catch(err => console.log(err))
 }


    })
  
  
  })


  }













// fetchVideos(secrets.youTubeOttg, 'Chase - On the Table Gaming')


// setTimeout(()=> {
//   fetchVideos(secrets.mythicosStudios, 'Mythicos Studios')
// }, 15000)

// setTimeout(()=> {
//   fetchVideos(secrets.blitzMinis, 'BlitzMinis')
// }, 30000)


// setTimeout(()=> {
//   meepleServerCheck()
// }, 45000)





// setInterval(() => {
//   meepleServerCheck()
// }, 34000000 + randomizer * 42038)

// meepleServerCheck()
// youTubeServerCheck(uri2, 'author')
