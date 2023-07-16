/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(['N/url'], (url) => {
    const pageInit = (context) => {}

    /**
     * Generates and calls the URL for the SuiteLet passing
     */
    const shippingCostData = () => {
        let restletUrl = url.resolveScript({
            deploymentId: 'customdeploy_nse_pde_sl_ship_cost_data',
            scriptId: 'customscript_nse_pde_sl_ship_cost_data'
        });

        window.open(restletUrl, '_blank');
    }

    return {
        pageInit,
        shippingCostData
    };
}); 
