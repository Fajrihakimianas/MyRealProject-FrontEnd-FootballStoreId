import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Register from './pages/Register.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import LandingPage from './pages/LandingPage.jsx';
import DetailProduct from './pages/DetailProduct.jsx';
import CatalogProducts from './pages/CatalogProducts.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import TransactionHistory from './pages/TransactionHistory.jsx';
import Struck from './pages/MyStruck.jsx'
import './supports/stylesheets/Utilities.css';
import './supports/stylesheets/Components.css';
import './supports/stylesheets/DetailProduct.css';
import './supports/stylesheets/CatalogProducts.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Switch>
          <Route exact path='/' component={LandingPage} />  
          <Route path='/register' component={Register} />
          <Route path='/create-account' component={CreateAccount} />
          <Route path='/detail-product' component={DetailProduct} />
          <Route path='/catalog-products' component={CatalogProducts} />
          <Route path='/my-cart' component={Cart} />
          <Route path='/checkout/:idTransactions' component={Checkout} />
          <Route path='/my-transaction' component={TransactionHistory} />
          <Route path='/my-struck/:idStruck' component={Struck} />
        </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
