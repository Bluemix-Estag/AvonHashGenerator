# AvonHashGenerator

This small app let you **login** on AVON to chat with their bot on facebook messenger.

## Using the hosted app

To use the hosted app, visit [Avon Login](https://avonlogin.mybluemix.net), put your username,password and user type ( manager, coordinator or reseller ) and click on login.

> This app redirect to [Watson Conversation Test](https://www.facebook.com/Watson-Conversation-Test-270627923401307/) page to connect with Watson Conversation service and handle AVON's requests/questions.

## Changing app configurations and run it on your bluemix.

To change [Watson Conversation Test](https://www.facebook.com/Watson-Conversation-Test-270627923401307/) to your specific redirect page, pick up your page ID and make the change in **.env** file changing the **FB_PAGE_ID** key value to your own ID.

>**This app uses my self hosted RSA HASH generator, you can find its code on [RSAHashGenerator](https://github.com/RabahZeineddine/RSAHashGenerator), you can customize it to your needs and make this app uses your own HashGenerator.**

### Run the app locally

To run this app locally, do as follow

1. Install the app's dependencies
```
    npm install
```

2.After installing the dependencies, run the app as follow: 
```
    npm start 
```

The app will run on port **3000**



