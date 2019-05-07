const db = require("../models")
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2016-05-19',
  iam_apikey: 'NoDDc3PLy8G3e79x_i25IdBpDkEWB1ysafk9fESK4zG1',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
});

const text = "That is stunning. Just beautifully crafted.";

const toneParams = {
  tone_input: { 'text': text },
  content_type: 'application/json',
};

toneAnalyzer.tone(toneParams)
  .then((toneAnalysis) => {
    console.log(JSON.stringify(toneAnalysis, null, 2));
    
  })
  .catch(err => {
    console.log('error:', err);
  });


