/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'], (serverWidget) => {
    const SHIPPING_BASE_COST = 7.5;

    const onRequest = (context) => {
        let uiForm = serverWidget.createForm({
            title: 'Data Entry'
        });

        let sHttp = {
            'GET': processGet,
            'POST': processPost
        }
        sHttp[context.request.method](context.request.parameters, uiForm);

        context.response.writePage({
            pageObject: uiForm
        });
    }
    
    const processGet = (params, uiForm) => {
        uiForm.addField({
            id: 'custpage_width',
            label: 'Package Width',
            type: serverWidget.FieldType.INTEGER
        });
        uiForm.addField({
            id: 'custpage_height',
            label: 'Package Height',
            type: serverWidget.FieldType.INTEGER
        });
        uiForm.addField({
            id: 'custpage_length',
            label: 'Package Length',
            type: serverWidget.FieldType.INTEGER
        });
        uiForm.addField({
            id: 'custpage_weight',
            label: 'Package Weight',
            type: serverWidget.FieldType.FLOAT
        });

        uiForm.addSubmitButton({
            label: 'Set'
        });
    }

    const processPost = (params, uiForm) => {
        let shippingCost = 0;
        const shippingWeight = Number(params.custpage_weight);
        const shippingDim = (Number(params.custpage_width) * Number(params.custpage_height) * Number(params.custpage_length)) / 1000;
        
        shippingCost = (shippingWeight > shippingDim ? shippingWeight : shippingDim) * SHIPPING_BASE_COST;

        uiForm.addField({
            id: 'custpage_inline',
            label: 'Inline Field',
            type: serverWidget.FieldType.INLINEHTML
        }).defaultValue = `
        <html>
            <script>
                window.opener.require(['N/currentRecord'], (currentRecord) => {
                    let cRec = currentRecord.get();
                    cRec.setValue({
                        fieldId: 'shippingcost',
                        value: ${shippingCost}
                    });
                });
                window.close();
            </script>
        </html>`;
    }

    return {
        onRequest
    };
}); 