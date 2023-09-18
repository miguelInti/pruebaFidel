import { getErrorResponse } from "@app/custom/Errors/validation-error";
import tokenStore from "../token-store";


export const GET = async (request) => {

    try {

        const { searchParams } = new URL(request.url);

        const token = JSON.parse(searchParams.get('token'));

        const response = tokenStore.getIsValidatedStatusByTokenId(token);

        return Response.json(response, {status:200 });

    } catch (error) {
        
        return getErrorResponse(error);

    }    
}