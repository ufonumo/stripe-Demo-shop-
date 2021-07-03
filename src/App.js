import React , { useState, useEffect } from 'react';
import { Products, Navbar , Cart , CheckOut} from './components'
import { commerce } from './lib/commere'
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom'

function App() {
  const [products , setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState()

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

  useEffect(() => {
    getCart();
    getProducts();
  }, []);

 console.log(cart);

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
            <CheckOut cart={cart}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
