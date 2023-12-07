const dotenv = require('dotenv');
dotenv.config();


const config = {
    
    port: process.env.PORT || 3000,
    filepath: process.env.DOCUMENTS_PATH,
    imagegallerypath: process.env.IMAGES_GALLERY_PATH,
    imagepublicationpath: process.env.IMAGES_PUBLICATION_PATH,
    imagerootpath: process.env.IMAGES_ROOT_PATH,
    key: process.env.KEY,

    // ------------------------enviroments------------------------
    development:{
        username: process.env.DEVELOPMENT_USERNAME,
        password: process.env.DEVELOPMENT_PASSWORD,
        database: process.env.DEVELOPMENT_DATABASE,
        host: process.env.DEVELOPMENT_HOST,
        dialect: process.env.DEVELOPMENT_DIALECT
    },
    // ----------------------------------------------------------

};

module.exports = config;