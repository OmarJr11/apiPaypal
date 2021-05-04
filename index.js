    const express = require('express');
    const cors = require('cors');
    const request = require('request');
    
    const app = express();
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    
    /*  */
    const CLIENT = 'AYK0L4x3o8XmafO4CqaL7wbcrmw-Z_GST_jBS06bjB8vFA1KE0cREPFKMVBdrQum_hiEYRAK2WtlGnNk';
    const SECRET = 'EIGdH83i99UdAhDYk43yi4m1ZK4PaQM_4szwLnLAO43mPTh0oRDa7SWSkUBeZQClche2tBI_yUtl2Pvq';
    const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Live https://api-m.paypal.com
    
    const auth = { user: CLIENT, pass: SECRET }
    
    /*
    * Se establecen los controladores a usar
    */
    const createPayment = (req, res) => {
    
        const body = {
            intent: 'CAPTURE', //require 'CAPTURE' o 'AUTHORIZE'
            purchase_units: [{ 
                amount: { //required
                    currency_code: 'USD',
                    value: '25'
                }
            }],
            application_context: {
                brand_name: `MiTienda.com`,
                landing_page: 'NO_PREFERENCE', 
                user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
                return_url: `http://localhost:3000/execute-payment`, // Url despues de realizar el pago
                cancel_url: `http://localhost:3000/cancel-payment` // Url despues de realizar el pago
            }
        }
    
        request.post(`${PAYPAL_API}/v2/checkout/orders`, {
            auth,
            body,
            json: true
        }, (err, response) => {
            res.json({ data: response.body })
        })

    }
    
    /*
    * Esta funcion captura el pago
    */
    const executePayment = (req, res) => {
        const token = req.query.token;
    
        request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
            auth,
            body: {},
            json: true
        }, (err, response) => {
            res.json({ data: response.body })
        })
    }
    
    
    /**
     * Rutas
     */
    app.post(`/create-payment`, createPayment);
    
    app.get(`/execute-payment`, executePayment);
    
    app.listen(3000, () => {
        console.log(`Comenzemos a generar dinero --> http://localhost:3000`);
    })

