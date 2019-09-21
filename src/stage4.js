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
  /*count the sentences in the input string with regex*/
  if (payload.text) {
    const fulltext = payload.text.toLowerCase();
    let vowelsMap = {
      a: 0,
      e: 0,
      i: 0,
      o: 0,
      u: 0
    };

    for (const c in fulltext) {
      if (fulltext[c] == "a") {
        vowelsMap["a"]++;
      }
      if (fulltext[c] == "e") {
        vowelsMap["e"]++;
      }
      if (fulltext[c] == "i") {
        vowelsMap["i"]++;
      }
      if (fulltext[c] == "o") {
        vowelsMap["o"]++;
      }
      if (fulltext[c] == "u") {
        vowelsMap["u"]++;
      }
    }
    console.info("processInput()::", vowelsMap);
    sendOuput(vowelsMap, challengeOutputConfigs);
  }
};

const sendOuput = (vowelsMap, challengeOutputConfigs) => {
  /* 0. post data*/
  const postData = JSON.stringify({
    output: vowelsMap
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

console.info("Running stage4::");
getInput(challengeInputConfigs);
