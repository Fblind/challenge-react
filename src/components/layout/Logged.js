import React, { Component } from 'react';

import { Header, Sidebar } from 'components/navigation';
import { ListItemLink } from 'components/list';
import ProductContext from '../../modules/product/contexts/Product'

class Logged extends Component {
  static contextType = ProductContext;
  render() {
    return (
      <div className="container">
        <Sidebar>
          <ul>
            <ListItemLink to="/products" icon="list" onClick={() => this.context.getAll()}>Products listing</ListItemLink>
            <ListItemLink to="/products/new" icon="add" onClick={() => this.context.resetEditing()}>Prodct add</ListItemLink>
          </ul>
        </Sidebar>
        
        <div className="main">
          <Header />
          <div className="content">
            {React.cloneElement({ ...this.props }.children, { ...this.props })}
          </div>
        </div>
      </div>
    )
  }
}

export default Logged;