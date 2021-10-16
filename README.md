# Real time Twitter followers banner

![hero](banner.png)

## How to setup for your Twitter

Just fill in your API keys which you'll need to apply for a [Twitter developer account](https://developer.twitter.com/en/apply-for-access). It usually get's approved within 5 minutes.

```
const TWITTER_HANDLE = 'Asmit_2952'
const twitterClient = new client.TwitterClient({
  apiKey: "YOUR CONSUMER API KEY"
  apiSecret: "YOUR CONSUMER API SECRET" 
  accessToken: "YOUR ACCESS TOKEN"
  accessTokenSecret: "YOUR ACCESS TOKEN SECRET"
});

```

## Run the script

Install dependencies:
```
npm install
```

Start the app:

```
node index.js
```
or
```
npm start
```

Keep it running or deploy it on heroku for free and have fun!

## How the script works

Summary:

1. Fetch your recent 3 followers using Twitter API. (Rate limit: 180 requests per 15 mins)
2. Download the profile image of the recent 3 followers.
3. Use Jimp to add it on banner
4. Update your profile banner using Twitter API. (Rate limit: 30 requests per 15 mins)

The delay between follow and banner update is between 6s to 15s.

**Feel free to contribute to this project, would love to have you as a contributor. Just fork the project, create an issue, and then create a pull request!**

P.S. Special thanks to [**Devesh RB**](https://twitter.com/Deveshb15), this project is inspired by his idea of Twitter banner!
Check out his repository [**here**](https://github.com/Deveshb15/real-twitter-banner).
