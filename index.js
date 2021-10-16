require('dotenv').config()
const client = require('twitter-api-client');
const axios = require('axios');
const fs = require('fs');
const jimp = require('jimp');

const TWITTER_HANDLE = 'Asmit_2952'
const twitterClient = new client.TwitterClient({
  apiKey: process.env.API_KEY,                      
  apiSecret: process.env.API_SECRET,                
  accessToken: process.env.ACCESS_TOKEN,            
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET    
});

let image_url = [];

let lastDrawImage = 0;

const download_image = (url, image_path) =>
axios({
  url,
  responseType: 'stream',
}).then(
  response =>
    new Promise((resolve, reject) => {
      response.data
        .pipe(fs.createWriteStream(image_path))
        .on('finish', () => resolve())
        .on('error', e => reject(e));
    }),
);

  async function drawImage(back, img1, img2, img3){
    
    let imgArr = [back, img1, img2, img3];
    let jimps = [];
  
    imgArr.forEach(image => jimps.push(jimp.read(image)));
  
    Promise.all(jimps).then(data => {
      return Promise.all(jimps)
    }).then(data => {
      data[0].composite(data[1],1090,50); 
      data[0].composite(data[2],1180,50); 
      data[0].composite(data[3],1270,50); 
  
      data[0].write('banner.png', function(){
        console.log("done");
      })
    })
  
    const base64 = await fs.readFileSync('banner.png', { encoding: 'base64' });
   
    await twitterClient.accountsAndUsers.accountUpdateProfileBanner({banner: base64});
  }

async function start() {

  const name = Math.random();
  const params = {
    screen_name: TWITTER_HANDLE, 
    count: 3                     
  }

  const data = await twitterClient.accountsAndUsers.followersList(params);

  data.users.forEach(item => {
    image_url.unshift(item.profile_image_url_https)
  });
  
  (async () => {
    await download_image(image_url[0], `${name}-1.png`)
    await download_image(image_url[1], `${name}-2.png`)
    await download_image(image_url[2], `${name}-3.png`)

  async function drawit() {
    lastDrawImage = Date.now();

    await drawImage('banner.png' ,`${name}-1.png`,`${name}-2.png`,`${name}-3.png`);
  }
  const remaining = Date.now() - lastDrawImage;
  
  if (remaining > 30000) {
    await drawit();
  }

  async function deleteImages() {
    try{
      console.log('removing', `${name}{1,2,3}.png`);
      await fs.unlinkSync(`${name}-1.png`);
      await fs.unlinkSync(`${name}-2.png`);
      await fs.unlinkSync(`${name}-3.png`);
    }catch(e){
      console.log(e);
    }
  }

  await deleteImages();

})();
}

start();
setInterval(() => {
  start(); 
}, 6000);