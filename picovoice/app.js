"use strict";
const { exec } = require('child_process');
const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const Picovoice = require("@picovoice/picovoice-node");
const { PvArgumentError } = require("@picovoice/picovoice-node/errors");
const PvRecorder = require("@picovoice/pvrecorder-node");


var weatherData;

var getJSON = require('get-json')
 
getJSON('https://api.openweathermap.org/data/2.5/weather?zip=71104,us&appid=83e63e4d8efc7b3a0b6039e3497a64ba&units=imperial', function(error, response){
 
    console.log(error);
    // undefined
 
    console.log(response);
    weatherData = response;
    // ["Beth Orton &mdash; Stolen Car",
    // "Jack White &mdash; Temporary Ground",
    // "I Am Kloot &mdash; Loch",
    // "Portishead &mdash; Glory Box"]
});
const {
  BUILTIN_KEYWORDS_STRINGS,
  BUILTIN_KEYWORDS_STRING_TO_ENUM,
} = require("@picovoice/porcupine-node/builtin_keywords");



let isInterrupted = false;

async function micDemo() {
  let accessKey = "/Dvvj3LQdWaeT5aMJ064X4UG2DQTb15JxMlSk5FjTV3G8PSAzvM6EQ==";
  let keywordFilePath = "./Stella_en_raspberry-pi_v2_1_0.ppn";
  let contextPath = "./Car_en_raspberry-pi_v2_1_0.rhn";







  


 

  const keywordCallback = function (keyword) {
    console.log(`Wake word detected`);
  }; 

  let contextFilename = path.basename(contextPath);


  let inferenceCallback = function (inference) {
    console.log();
    console.log("Inference:");
    console.log(inference.intent)
    
    if(inference.intent==="currentEvent"){
      if(inference.slots.rainTime==="tomorrow"){
        var rainTomorrow = weatherData.weather[0].description.toString()
      exec(`espeak -ven-us+f5 -s150  "It will be raining `+ rainTomorrow + `"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
      
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
      
        console.log(`stdout:\n${stdout}`);
      });
    }
    }
    if(inference.intent==="fuel"){
      if(inference.slots.type==="stage"){
      exec(`espeak -ven-us+f4 -s170  "No Jack, there is not enough fuel for the next stage"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
      
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
      
        console.log(`stdout:\n${stdout}`);
      });
    }
    }
    if(inference.intent==="milesRemain"){
      if(inference.slots.type==="stage"){
      exec(`espeak -ven-us+f4 -s170  "Masters, there is 12.3 miles remaining."`, (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
      
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
      
        console.log(`stdout:\n${stdout}`);
      });
    }
    }
    if(inference.intent==="guest"){
      
      exec(`espeak -ven-us+f4 -s150  "I am a dirty little girl andd i need daddy to punish me"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
      
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
      
        console.log(`stdout:\n${stdout}`);
      });
    
    }
    else{
      exec(`espeak -ven-us+f4 -s170  "Can you repeat that please"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
      
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
      
        console.log(`stdout:\n${stdout}`);
      });

    }


    console.log(JSON.stringify(inference, null, 4));
    console.log();
    console.log();
    console.log(`Listening for wake word Stella`);
  };

  let handle = new Picovoice(
    accessKey,
    keywordFilePath,
    keywordCallback,
    contextPath,
    inferenceCallback,
    
  );

  const frameLength = handle.frameLength;

  const recorder = new PvRecorder(1, frameLength);
  recorder.start();

  console.log(`Using device: ${recorder.getSelectedDevice()}...`);
  console.log("Context info:");
  console.log("-------------");
  console.log(handle.contextInfo);
  console.log("Press ctrl+c to exit.");

  while (!isInterrupted) {
    const pcm = await recorder.read();
    handle.process(pcm);
  }

  console.log("Stopping...");
  recorder.release();
}

// setup interrupt
process.on("SIGINT", function () {
  isInterrupted = true;
});

(async function () {
  try {
    await micDemo();
  } catch (e) {
    console.error(e.toString());
  }
})();
