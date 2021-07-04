import React , {useState , useEffect} from 'react'
import { Paper, Stepper, StepLabel, Step, CircularProgress, Divider, Button, Typography} from '@material-ui/core'
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commere'

const steps = [ 'Shipping address' , 'Payment details'];

const CheckOut = ({ cart }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();
    const [shippingData, setShippingData] = useState({})

    // this creates the checkout token for each of the products
    useEffect(() => {
        
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id  , {type : 'cart'});
                console.log(token);

                setCheckoutToken(token)

            } catch ( error){

            }
        };

        generateToken();
    }, []);

    const nextStep = () => setActiveStep((previousActiveStep ) => previousActiveStep + 1);  
    const prevStep = () => setActiveStep((previousActiveStep ) => previousActiveStep - 1);  

    const next = (data) => {
        setShippingData(data);

        nextStep();
    }

    const Confirmation = () =>(
        <div>
            Confirmation
        </div>
    )

    const Form = () => activeStep === 0 
            ? <AddressForm checkoutToken={checkoutToken} next={next}/> 
            : <PaymentForm shippingData={shippingData}/>

    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>  
                            </Step>
                        ))}
                    </Stepper>
                    { activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
                </Paper>
            </main>
        </>
    )
}

export default CheckOut
