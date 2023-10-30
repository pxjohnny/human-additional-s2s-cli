import { AdditionalS2sPayload } from './interface/Activity';
import dayjs from 'dayjs';
import { generateEmailAddress, generateNumber, generateURL, generateIPv4Address } from 'random-ease';
import { v4 as uuidv4 } from 'uuid';

export const getAdditionalS2SPayload = (appId: string): AdditionalS2sPayload => {
    const randomMonths = Math.random() * (10 - 1) + 1;
    const activityPayload: AdditionalS2sPayload = {
        type: 'additional_s2s',
        timestamp: Date.now(),
        socket_ip: generateIPv4Address(),
        px_app_id: appId,
        url: generateURL(),
        module_version: 'Human additional_s2s CLI v0.0.1',
        vid: uuidv4(),
        details: {
            request_id: uuidv4(),
            app_user_id: generateNumber(1000, 10000).toString(),
            ad_user_email: generateEmailAddress(),
            ad_registration_date: dayjs().subtract(randomMonths, 'month').toISOString(),
        },
    };

    return activityPayload;
};
