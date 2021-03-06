import React , { useState, useEffect } from 'react';
import { Products, Navbar , Cart , CheckOut} from './components'
import { commerce } from './lib/commere'
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom'

function App() {
  const [products , setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState();
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const getCart = async () => {
    setLoading(true)
      setCart(await commerce.cart.retrieve())
    setLoading(false)
  }

  const getProducts = async () =>{
    const {data} = await commerce.products.list();
    setProducts(data)
  }

  const handleAddToCart = async (productId, quantity) =>{
    const {cart} = await commerce.cart.add(productId, quantity)

    setCart(cart)
  }

  const handleUpdateCartQty = async (productId, quantity) =>{
    const {cart} = await commerce.cart.update(productId, {quantity})

    setCart(cart)
  }

  const handleRemoveFromCart = async (productId) =>{
    const {cart} = await commerce.cart.remove(productId);

    setCart(cart)
  }

  const handleEmptyFromCart = async () =>{
    const {cart} = await commerce.cart.empty();

    setCart(cart)
  }

  const refreshCart = async () =>{
    const newCart = await commerce.cart.refresh();

    setCart(newCart)
  } 


  const handleCaptureCheckout = async (checkoutTokenId , newOrder) =>{
    try{
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId , newOrder);
      setOrder(incomingOrder);

      refreshCart();

    }
    catch(error){
      setErrorMessage(error.data.error.message)
      console.log(error.data.error.message);
    }

  }

  useEffect(() => {
    getCart();
    getProducts();
  }, []);


  return (
    <Router>
    
      <div className="App">
        <Navbar totalItems={cart.total_items}/>
        <Switch>
          <Route exact path='/'>
            <Products products={products} onAddToCart={handleAddToCart}/>
          </Route>
          <Route exact path='/cart'>
            { loading ? 
               <h1>loading</h1> 
               :   
              <Cart 
                cart={cart}
                handleUpdateCartQty={ handleUpdateCartQty}
                handleRemoveFromCart={ handleRemoveFromCart}
                handleEmptyFromCart={ handleEmptyFromCart}
              /> 
            }

          </Route>
          <Route exact path='/checkOut'>
            <CheckOut
               cart={cart}
               handleCaptureCheckout={handleCaptureCheckout}
               order={order}
               error={errorMessage}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
