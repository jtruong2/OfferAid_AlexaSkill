'use strict';
const Alexa = require("alexa-sdk");
const Request = require('./Requests')
const APP_ID = require('./appId')
const CONVERT_TIME = require('convert-time')

// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build


exports.handler = function(event, context) {
    let alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID
    alexa.registerHandlers(handlers);
    alexa.execute();
};

let handlers = {
    'LaunchRequest': function () {
        this.emit(':tell', 'Welcome to Offer Aid, to schedule a donation, say make a donation');
    },
    'DonationIntent': function () {
        this.emit(':ask', 'What would you like to donate?');
    },
    'ItemIntent': function () {
        this.attributes['items'] = `${this.event.request.intent.slots.quantity.value} ${this.event.request.intent.slots.items.value}`
        this.emit(':ask', 'When would you like to have these items picked up?');
    },
    'DateIntent': function () {
        this.attributes['date'] = `${this.event.request.intent.slots.date.value} ${CONVERT_TIME(this.event.request.intent.slots.time.value)}`
        this.emit(':ask', 'Where would you like to have your donations picked up?')
    },
    'LocationIntent': function () {
        this.attributes['location'] = this.event.request.intent.slots.location.value
        let items = this.attributes['items']
        let date = this.attributes['date']
        let location = this.attributes['location']
        this.emit(':ask', `Your donation consists of ${items}. It will be picked up at ${location} on ${date}. Is this correct?`)
    },
    'ConfirmationIntent' : function() {
      // let confirmation = this.event.request.intent.slots.confirmation.value
      // if(confirmation == 'Correct') {
        Request.post(this.attributes)
        setTimeout(() => {
          this.emit(':tell', 'Your pickup has been scheduled')
        }, 1000)
      // } else if(confirmation == 'Incorrect') {
      //   this.emit(':tell', 'Okay, I will cancel your request')
      // }
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak("You can try: 'alexa, hello world' or 'alexa, ask hello world my" +
            " name is awesome Aaron'");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, hello world'" +
            " or 'alexa, ask hello world my name is awesome Aaron'");
    }
};
