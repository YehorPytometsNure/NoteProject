import ApiService from "./api-service.js";

/**
 * Wrapper over app services.
 */
class ServicesSingleton {

    /**
     * Api Service.
     * @type {ApiService}.
     */
    apiService;

    /**
     * Instantiates Services object.
     */
    constructor() {
        this.apiService = new ApiService();
    }
}

const Services = new ServicesSingleton();
Object.freeze(Services);
export default Services;
