import { Command } from 'commander';
import { AdditionalS2sPayload } from './interface/Activity';
import * as utils from './utils';
import { generateNumber } from 'random-ease';
import p from 'phin';

const main = async () => {
    const program = new Command();
    const activities: AdditionalS2sPayload[] = [];

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
        let randomBatch = generateNumber(1, 10);
        while (randomBatch > 0) {
            activities.push(utils.getAdditionalS2SPayload(options.appid));
            randomBatch--;
        }
        body = JSON.stringify(activities);
    }

    console.log(`🤌  Sending ${activities.length > 1 ? 'activities' : 'activity'}...`);

    await p({
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
