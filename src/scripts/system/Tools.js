/**
 * The Tools class is a utility class that contains static method massiveRequire.
 * The purpose of this class is to load multiple modules or files at once using the require context.
 */

export class Tools {
    /**
     * The massiveRequire method initialises an empty array called files. This empty array is used to store the keys of the context of files. 
     * @param {context} req comes from the using the require.context() method. 
     * @returns This function returns the populated files array.
     */
    static massiveRequire(req) {
        const files = [];

        req.keys().forEach(key => {
            files.push({
                key, data: req(key)
            });
        });

        return files;
    }
}