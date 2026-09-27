const winston = require("winston");

const logger = winston.createLogger({

    //setting logging level base on .env
    level : process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    
    //set massege format for general
    format : winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({stack: true}),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta : {service : "identity-service"},

    // indentify output destination of log
    transports : [

        // format for console output for better readability
        new winston.transports.Console({ 
            format : winston.format.combine( 
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),

        //loging file
        new winston.transports.File({filename : 'error.log', level : 'error'}), //log the level of error
        new winston.transports.File({filename : 'combined.log'})// combined log
    ]
})

module.exports = logger;