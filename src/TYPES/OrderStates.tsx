// Estados das orders

export enum CancelStates {
    PENDING = "pending",
    CREATED = "created",
    SENT_WMS = "sent_wms",
    SENT_WMS_FORCEFULLY = "sent_wms_forcefully",
    FAILED_SEND_WMS = "failled_send_wms",
    SENT_PHC = "sent_phc",
    FAILLED_SEND_PHC = "failled_send_phc"
}

export enum OrderStates {
    PENDING = "pending",
    CREATED = "created",
    SENT_WMS = "sent_wms",
    SENT_WMS_FORCEFULLY = "sent_wms_forcefully",
    FAILED_SEND_WMS = "failled_send_wms",
    SENT_PHC = "sent_phc",
    PICKED = "picked",
    FAILLED_SEND_PHC = "failled_send_phc",
    FULLFIELD = "fullfield",
    CANCELLED = "cancelled"
}