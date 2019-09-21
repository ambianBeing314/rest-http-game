const https = require("https");
const { challengeInputConfigs } = require("./config/base-config.js");

const getChallengeStatus = challengeInputConfigs => {
  https
    .get(challengeInputConfigs.URI, challengeInputConfigs.options, res => {
      console.log("Response getChallenge()::" + res.statusCode);
      let data = "";

      /* res.setEncoding("utf8"); */
      res.on("data", chunk => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      res.on("end", () => {
        console.log("getChallenge()::", JSON.parse(data));
      });
    })
    .on("error", e => {
      console.log("Error at getChallenge()::" + e.message);
    });
};

getChallengeStatus(challengeInputConfigs);
