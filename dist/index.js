"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const utils = __importStar(require("./utils"));
const random_ease_1 = require("random-ease");
const phin_1 = __importDefault(require("phin"));
const main = async () => {
    const program = new commander_1.Command();
    const activities = [];
    program
        .version('0.0.1')
        .description('A simple CLI for sending additional_s2s activities to Human')
        .requiredOption('-a, --appid <value>', 'Specify the Human appid to send the additional_s2s activity for.')
        .option('-b, --batch', 'Toggle batch mode.', false)
        .parse(process.argv);
    const options = program.opts();
    const url = `https://sapi-${options.appid}.perimeterx.net/api/v1/collector/s2s`;
    // all of these values should come from the event payload.
    activities.push(utils.getAdditionalS2SPayload(options.appid));
    let body = JSON.stringify(activities[0]);
    if (options.batch) {
        let randomBatch = (0, random_ease_1.generateNumber)(1, 10);
        while (randomBatch > 0) {
            activities.push(utils.getAdditionalS2SPayload(options.appid));
            randomBatch--;
        }
        body = JSON.stringify(activities);
    }
    console.log(`🤌  Sending ${activities.length > 1 ? 'activities' : 'activity'}...`);
    await (0, phin_1.default)({
        url,
        method: 'POST',
        data: body,
    });
};
main()
    .then(() => {
    console.log('✅ Finished successfully');
    process.exit(0);
})
    .catch((error) => {
    console.log('😱 error:', error);
    process.exit(1);
});
