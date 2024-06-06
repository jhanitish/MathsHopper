/**
 * The Loader class is designed to preload assets.
 */

export class Loader {
    /**
     * The constructor takes two parameters.
     * @param {*} loader The loader parameter references the PIXI's loader which is used to load assets like images and JSON files.
     * @param {*} config The config parameter takes a config object with information about the assets to be laoded.
     */
    constructor(loader, config) {
        this.loader = loader;
        this.config = config;
        this.resources = {};
    }

    /**
     * This method is responsible for preloading assets defined in this.config.loader.
     * @returns The method returns a Promise that resolves once all assets are loaded.
     */

    preload() {
        for (const asset of this.config.loader) {
            let key = asset.key.substr(asset.key.lastIndexOf('/') + 1);
            key = key.substring(0, key.indexOf('.'));
            if (asset.key.indexOf(".png") !== -1 || asset.key.indexOf(".jpg") !== -1) {
                this.loader.add(key, asset.data.default)
            }
        }

        return new Promise(resolve => {
            this.loader.load((loader, resources) => {
                this.resources = resources;
                resolve();
            });
        });
    }
}