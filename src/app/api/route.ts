import exp from "constants";
import axios from "axios";
import { REACT_APP_RAPID_API_HOST, REACT_APP_RAPID_API_KEY, REACT_APP_RAPID_API_URL } from "@/secrets";

export interface CompileResponse {
    message: string;
    success: boolean;
    data: any
}

export async function POST(request: Request): Promise<Response> {
    const body = await request.json();
    const language = body.language;
    const code = body.code;
    const customInput = body.customInput;

    const formData = {
        language_id: language.id,
        source_code: btoa(code!),
        stdin: btoa(customInput),
    };
    const options = {
        method: "POST",
        url: REACT_APP_RAPID_API_URL,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "X-RapidAPI-Host": REACT_APP_RAPID_API_HOST,
            "X-RapidAPI-Key": REACT_APP_RAPID_API_KEY,
        },
        data: formData,
    };

    try {
        const res = await axios.request(options);
        const token = res.data.token;
        const response = await checkStatus(token, 0);
        return new Response(JSON.stringify(response), {
            headers: { "content-type": "application/json" },
        });
    } catch (err: any) {
        let status = err.response.status;
        if (status === 429) {
            const res = {
                message: "Quota of 50 free requests per month has been exceeded. Please try again tommorow.",
                success: false,
                data: "Too many requests"
            };
            return new Response(JSON.stringify(res), {
                headers: { "content-type": "application/json" },
            });
        }
        const response = {
            message: "Error",
            success: false,
            data: err.response ? err.response.data : err
        }
        return new Response(JSON.stringify(response), {
            headers: { "content-type": "application/json" },
        });
    }
}


const checkStatus = async (token: string, rec: number): Promise<CompileResponse> => {
    if (rec > 10) {
        return {
            message: "Error: Too many requests. Please try again later.",
            success: false,
            data: "Too many requests"
        }
    }
    const options = {
        method: "GET",
        url: REACT_APP_RAPID_API_URL + "/" + token,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
            "X-RapidAPI-Host": REACT_APP_RAPID_API_HOST,
            "X-RapidAPI-Key": REACT_APP_RAPID_API_KEY,
        },
    };
    try {
        let response = await axios.request(options);
        let statusId = response.data.status?.id;

        if (statusId === 1 || statusId === 2) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return checkStatus(token, rec + 1);
        } else {
            // setProcessing(false);
            // setOutputDetails(response.data);
            // showSuccessToast(`Compiled Successfully!`);
            return {
                message: "Compiled Successfully!",
                success: true,
                data: response.data
            }
        }
    } catch (err) {
        // console.log("err", err);
        // setProcessing(false);
        // showErrorToast(undefined, undefined);
        return {
            message: "Error",
            success: false,
            data: err
        }
    }
};
