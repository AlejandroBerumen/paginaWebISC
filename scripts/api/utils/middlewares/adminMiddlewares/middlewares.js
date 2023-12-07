const boom = require('@hapi/boom');
const validate = require('../../validate');


// @param {Object} validationSchema - { [K in "body" | "query" | "params"]: j }
function actualizarValidacionMiddleware(validationSchema){
    const [[payloadkey, joiSchema]] = Object.entries(validationSchema);

    if(payloadkey!=="body" && payloadkey!=="query" && payloadkey!=="params"){
        throw new Error("Invalid payload key must be one of 'body', 'query', or 'params'");
    }

    // boom is error from client and is easier to handle errors
    return function validationMiddleware(req, res, next){
        let error = validate(req[payloadkey], joiSchema);

        if(error){
            error = boom.boomify(error);
            res.status(error.output.statusCode).json({msg: error.details[0].message});
        }else{
            next();
        }

    };
}

module.exports = {
    actualizarValidacionMiddleware,
};
