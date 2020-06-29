const request = require('request-promise');


module.exports = {
    async getLandmark(filepath) {
        const uri = 'http://114.70.193.160:8787/fileUpload';
        const options = {
            method: 'POST',
            uri: uri,
            formData: {
                file: {
                    value: '<FILE_DATA>',
                    options: {
                        filename: filepath
                    }
                }
            }
        };

        return await request(options);
    }
};