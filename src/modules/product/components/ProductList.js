import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import ProductContext from '../contexts/Product';


import { Grid } from 'components/grid';
import { Table } from 'components/table'; 
import { Checkbox } from 'components/input';
import { Button, ButtonIcon } from 'components/button';
import { Image } from 'components/image';

class ProductList extends Component {
  static contextType = ProductContext;
  constructor (props, context) {
    super(props)
    this.state = {
      page: 0,
      maxItems: 8,
    }
    context.getAll()
  }

  changePage = page => {
    this.setState({
      page
    })
  }
  
  componentWillReact() {
    const maxPages = this.maxPages;
    const { products } = this.context
    const { page, maxItems } = this.state;    

    if((maxPages !== page) && typeof products[page * maxItems] === 'undefined'){
      this.setState({page: maxPages});
    }
  }

  get maxPages() {
    const { products } = this.context
    const { maxItems } = this.state;    
    return Math.ceil(products.length / (maxItems)) - 1;
  }

  paginationRender() {
    const numPages = this.maxPages;
    const pages = [];
    const { page } = this.state;
    
    for (let i = 0; i <= numPages; i++ ) {
      pages.push(<Button outline={page === i} onClick={() => this.changePage(i)} className="mr--md" key={i}>{i + 1}</Button>);
    }

    if(pages.length === 1) {
      return null;
    }

    return pages;
  }

  render() {
    const { products } = this.context
    const { page, maxItems } = this.state;
    const talbeRows = []

    if(isEmpty(products)){
      return (
        <div className="empty-list">
          Você ainda não possui nenhum produto cadastrado, 
          crie um <Link to="/products/new" onClick={() => this.context.resetEditing()}>novo produto</Link> primeiro
        </div>
      );
    }

    for(let i = 0; i < maxItems; i++) {
      const index = (page * maxItems) + i;
      const item = products[index];
      const image = (item && item.images) ? item.images[0] : null;
      
      if(item) {
        const row = (
          <tr key={index}>
            <td>
              <label htmlFor={`select-product-${index}`} className='check--container'> 
                <input type="checkbox" id={`select-product-${index}`}/>
                <span className="check"/>
              </label>
            </td>
            <td>
              <div className="product--detail">
                <Image bg={image}/>
                <Link to={`/products/edit/${item.id}`} onClick={() => this.context.get(item.id)}>{item.name}</Link>
              </div>
            </td>
            <td>{item.stock}</td>
            <td>$ {item.price}</td>
            <td>$ {item.promotionalPrice}</td>
            <td>{item.price}</td>
            <td>
              <Link to={`/products/edit/${item.id}`} onClick={() => this.context.get(item.id)}><ButtonIcon size="small" transparent icon='edit'>Edit</ButtonIcon></Link>
              <button className='button button--sm' onClick={() => this.context.remove(item.id)}>
                <div className='text'>Remove</div>
              </button>
            </td>
          </tr>
        );
  
        talbeRows.push(row);
      }
    }

    return (
      <div>
        <Grid nopadding>
          <Table>
            <thead>
              <tr>
                <th width={40} className="all">
                  <Checkbox name="select-all"/>
                </th>
                <th width={300}>Produto</th>
                <th>Stock</th>
                <th>Original price</th>
                <th>Promocional price</th>
                <th>Variations</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {talbeRows}
            </tbody>
          </Table>
        </Grid>

        <div className="table--pagination">
          {this.paginationRender()}
        </div>
      </div>
    )
  }
}

export default ProductList;