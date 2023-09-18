class ValidationError extends Error {
    name = "ValidationError"
}

const getErrorResponse = (error) =>{
    let errorCode = 500;

    if (error instanceof ValidationError) {
        errorCode = 422;
    }     

    return Response.json(error.message, {status: errorCode });
}

export {ValidationError, getErrorResponse};