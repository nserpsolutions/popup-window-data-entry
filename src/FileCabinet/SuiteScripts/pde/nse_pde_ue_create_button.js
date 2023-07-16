/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define([], () => {
    /**
     * Creates the button to trigger Suitelet on Item record
     */
    const beforeLoad = (context) => {
        if (['edit', 'create'].includes(context.type)) {
            context.form.clientScriptModulePath = 'SuiteScripts/pde/nse_pde_cl_open_suitelet';
            context.form.addButton({
                id: 'custpage_shipping_cost',
                label: 'Shipping Cost',
                functionName: `shippingCostData()`
            });
        }
    }
    return {
        beforeLoad,
    };
}); 