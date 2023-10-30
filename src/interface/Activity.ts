export interface AdditionalS2SPayloadDetails {
    request_id: string;
    app_user_id: string;
    ad_user_email?: string;
    ad_registration_date?: string;
}

export interface AdditionalS2sPayload {
    type: string;
    timestamp: number;
    socket_ip: string;
    px_app_id: string;
    url: string;
    module_version: string;
    vid: string;
    details: AdditionalS2SPayloadDetails;
    pxhd?: string;
}
