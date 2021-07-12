import React , {useState , useEffect} from 'react'
import { Paper, CssBaseline, Stepper, StepLabel, Step, CircularProgress, Divider, Button, Typography} from '@material-ui/core'
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commere'
import { Link  , useHistory} from 'react-router-dom'


const steps = [ 'Shipping address' , 'Payment details'];

const CheckOut = ({ cart , order, handleCaptureCheckout , error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();
    const [shippingData, setShippingData] = useState({});
    const history = useHistory();

    // this creates the checkout token for each of the products
    useEffect(() => {
        
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id  , {type : 'cart'});
                console.log(token);

                setCheckoutToken(token)

            } catch (error){
                history.pushState('/');
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

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase, {order.customer.firstname}  {order.customer.lastname}</Typography>
                <Divider className={classes.divider}/>
                <Typography variant='subtitle2'>Order ref: {order.customer_reference} </Typography>
                <br />
                <Button type='button'  variant='outlined' component={Link} to='/'>Back to Home</Button>
            </div>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    )

    if(error) {
        <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br />
            <>
                <Button type='button' variant='outlined' component={Link} to='/'>Back to Home</Button>
            </>
        </>
    }

    const Form = () => activeStep === 0 
            ? <AddressForm checkoutToken={checkoutToken} next={next}/> 
            : <PaymentForm 
                    shippingData={shippingData} 
                    checkoutToken={checkoutToken}
                    prevStep={prevStep}
                    nextStep={nextStep}
                    handleCaptureCheckout={handleCaptureCheckout}
                />

    return (
        <>
            <CssBaseline/>
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
