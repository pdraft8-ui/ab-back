import axios from "axios";
export class RecordingService {
    constructor() {
        this.baseUrl =
            "https://triplecore.ippbx.co.il/ippbx_api/v1.4/api/info/TENANT/recordingPath";
        this.timeout = 10000; // 10 seconds
    }
    async getRecordingPath(callid, tokenId) {
        try {
            const response = await axios.post(this.baseUrl, {
                token_id: tokenId,
                callid: callid,
            }, { timeout: this.timeout });
            console.log("API response:", response.data);
            return response.data?.data?.recordingPath;
        }
        catch (error) {
            if (error.code === "ECONNABORTED") {
                console.error("Request timed out.");
            }
            else {
                console.error("API Error:", error.response?.data || error.message);
            }
            return null;
        }
    }
}
//# sourceMappingURL=RecordingService.js.map