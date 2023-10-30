"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdditionalS2SPayload = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const random_ease_1 = require("random-ease");
const uuid_1 = require("uuid");
const getAdditionalS2SPayload = (appId) => {
    const randomMonths = Math.random() * (10 - 1) + 1;
    const activityPayload = {
        type: 'additional_s2s',
        timestamp: Date.now(),
        socket_ip: (0, random_ease_1.generateIPv4Address)(),
        px_app_id: appId,
        url: (0, random_ease_1.generateURL)(),
        module_version: 'Human additional_s2s CLI v0.0.1',
        vid: (0, uuid_1.v4)(),
        details: {
            request_id: (0, uuid_1.v4)(),
            app_user_id: (0, random_ease_1.generateNumber)(1000, 10000).toString(),
            ad_user_email: (0, random_ease_1.generateEmailAddress)(),
            ad_registration_date: (0, dayjs_1.default)().subtract(randomMonths, 'month').toISOString(),
        },
    };
    return activityPayload;
};
exports.getAdditionalS2SPayload = getAdditionalS2SPayload;
