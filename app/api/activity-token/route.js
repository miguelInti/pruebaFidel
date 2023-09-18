import { getErrorResponse } from "@app/custom/Errors/validation-error";
import tokenStore from "./token-store";


export const POST = async (req) => {

    try {

        const { userId, machineSerial, token } = await req.json();
        tokenStore.checkAndMarkAsValidated(userId, machineSerial, token);
        return Response.json("successful validation", { status: 200 })

    } catch (error) {
        return getErrorResponse(error);
    }

}


export const GET = async (request) => {

    try {

        const { searchParams } = new URL(request.url);

        const userId = JSON.parse(searchParams.get('userId'));
        const machineSerial = JSON.parse(searchParams.get('machineSerial'));

        const token = tokenStore.get(userId, machineSerial);

        return Response.json(token, { status: 200 });

    } catch (error) {

        return getErrorResponse(error);

    }
}

