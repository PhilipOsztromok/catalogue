function errorHandler(req,resp,error,next){

    const status = error.statusCode || 500;
    resp.status(status).json( {error : error.message || "Internal server error"} )

};

function notFound(req,resp,next){

    resp.status(404).json( {error : `Route ${req.path} not found`} )

};
