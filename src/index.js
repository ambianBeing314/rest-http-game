console.info("--Starting with the game based on REST HTTP--");

/*stages are independent of each other hence calling them simultaneously*/
/*but you cannot rech to next stage before giviing correct answer of previous one*/

/*stage 1*/
require("./stage1.js");

/*stage 2*/
require("./stage2.js");

/*stage 3*/
require("./stage3.js");

/*stage 4*/
require("./stage4.js");

/*to get the challenge status*/
require("./challenge-status.js");
