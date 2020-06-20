import React, { Component } from "react";
import { BrowserRouter, Router } from 'react-router-dom';

import { History, Routing } from 'configs';
import { ProductProvider } from "modules/product/components/ProductProvider";


class App extends Component {
  render() {
    return (
      <Router history={History}>
        <BrowserRouter basename={'/tiendanube'}>
          <ProductProvider>
            <Routing/>
          </ProductProvider>
        </BrowserRouter>
      </Router>
    )
  }
};

export default App;