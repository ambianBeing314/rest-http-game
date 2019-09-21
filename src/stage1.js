const https = require("https");
const {
  challengeInputConfigs,
  challengeOutputConfigs
} = require("./config/base-config.js");

const getInput = challengeInputConfigs => {
  https
    .get(challengeInputConfigs.URI, challengeInputConfigs.options, res => {
      console.info("Response getInput()::" + res.statusCode);

      let data = "";
      //res.setEncoding("utf8");
      res.on("data", chunk => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      res.on("end", () => {
        const payload = JSON.parse(data);
        console.info("getInput()::", payload);
        processInput(payload);
      });
    })
    .on("error", e => {
      console.info("Error at getInput()::" + e.message);
    });
};

const processInput = payload => {
  /*count the characters in the input string*/
  if (payload.text) {
    const inputLen = payload.text.length;
    console.info("processInput()::", inputLen);
    sendOuput(inputLen, challengeOutputConfigs);
  }
};

const sendOuput = (inputLen, challengeOutputConfigs) => {
  /* 0. post data*/
  const postData = JSON.stringify({
    output: {
      count: inputLen
    }
  });
  /* 1. set up the request */
  let req = https
    .request(
      challengeOutputConfigs.URI,
      challengeOutputConfigs.options,
      res => {
        let data = "";
        console.info("Response sendOuput()::" + res.statusCode);
        //res.setEncoding("utf8");
        res.on("data", chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        res.on("end", () => {
          const payload = JSON.parse(data);
          console.info("sendOuput()::", payload);
        });
      }
    )
    .on("error", e => {
      console.info("Error at sendOuput()::" + e.message);
    });

  req.write(postData);
  req.end();
};

console.info("Running stage1::");
getInput(challengeInputConfigs);
