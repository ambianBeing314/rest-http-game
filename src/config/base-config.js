const path = require("path");
const APP_ROOT = path.dirname(require.main.filename);

const CHALLENGE_INPUT_CONFIGS = {
  URI: "<HOST + PATH TO GET INPUT>",
  options: {
    headers: {
      userId: "<USER_ID>"
    }
  }
};

const CHALLENGE_OUTPUT_CONFIGS = {
  URI: "<HOST + PATH TO SEND OUTPUT>",
  options: {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      userId: "USER_ID"
    }
  }
};

module.exports = {
  corsConf: CORS_CONF,
  morganConf: MORGAN_CONF,
  serverPort: SERVER_BASE_PORT,
  appRoot: APP_ROOT,
  challengeInputConfigs: CHALLENGE_INPUT_CONFIGS,
  challengeOutputConfigs: CHALLENGE_OUTPUT_CONFIGS
};
