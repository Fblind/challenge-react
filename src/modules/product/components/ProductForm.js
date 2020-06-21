import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

import { Grid } from 'components/grid';
import { Dropzone } from 'components/dropzone';
import { InputGroup, Editor, InputGroupCurrencyIcon } from 'components/input';
import { Button } from 'components/button';
import ProductContext from '../contexts/Product';

class ProductForm extends Component {
  static contextType = ProductContext;
  constructor (props, context) {
    super(props, context)
    this.state = {
      inputValidation: {
        name: false,
        description: false,
        price: false,
        stock: false
      }
    };
    this.loadFormInformation = this.loadFormInformation.bind(this)
    this.loadFormInformation()
  }

  inputChange = e => {
    const { value, name } = e.target;
    this.onChange(name, value);
  }

  onChange = (name, value)=> {
    this.context.updateEditing({[name]: value})
  }

  backToListing = () => {
    this.props.history.push('/products') 
  }

  validateForm() {
    const state = this.state;
    const fields = this.context.editingProduct
    let validate = true;

    for(var key in state.inputValidation) {
      if(state.inputValidation.hasOwnProperty(key)) {
        const invalid = (isEmpty(fields[key]) || fields[key] === '<p></p>');
   
        state.inputValidation[key] = invalid;

        if(invalid) {
          validate = false
        }
      }
    }

    this.setState(state);
    return validate;
  }

  handleSave = () => {
    const { id } = this.props.match.params
    if (!this.validateForm()) return
    this.context.add(this.context.editingProduct, id)
    this.context.resetEditing()
    this.backToListing()
  }

  remove () {
    this.context.remove(this.context.editingProduct.id)
    this.backToListing()
  }

  get renderActionButtons() {
    const { id } = this.props.match.params;
    return (
      <>
        <Button size="small" onClick={this.handleSave}>{ id ? 'SAVE UPDATES' : 'SAVE PRODUCT'}</Button>
        { id && <Button size="small" type="danger" className="ml--lg" onClick={() => this.remove()}>REMOVE</Button> }
        <Button size="small" onClick={this.backToListing} className="ml--lg" outline>CANCEL</Button>
      </>
    )
  }

  loadFormInformation () {
    const { params } = this.props.match;
    if (isEmpty(params)) {
      this.context.resetEditing()
    } else {
      this.context.get(params.id)
    }
  } 

  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      this.loadFormInformation()
      return
    }
  }

  render() {
    const { images, name, description, promotionalPrice, price, stock } = this.context.editingProduct
    const { inputValidation } = this.state;

    return (
      <div>
        <Grid transparent className='image--selection'>
          <label>Fotos dos seus produtos</label>
          <div className='col-1-4'>
            <Dropzone value={images[0]} index={0} onDrop={this.dropImage}/>
          </div>
          <div className='col-1-4'>
            <Dropzone value={images[1]} index={1} onDrop={this.dropImage}/>
          </div>
          <div className='col-1-4'>
            <Dropzone value={images[2]} index={2} onDrop={this.dropImage}/>
          </div>
          <div className='col-1-4'>
            <Dropzone value={images[3]} index={3} onDrop={this.dropImage}/>
          </div>
        </Grid>

        <Grid block>
          <div>
            <InputGroup value={name} validate={inputValidation} onChange={this.inputChange} label="Name" name="name" placeholder="Ex: Chaveiro de plástico de Budha"/>
            <Editor value={description} validate={inputValidation} onChange={this.onChange} label="Description" name="description"/> 
          </div>

        </Grid>


        <Grid block>
        <div className="col-1-4">
            <InputGroupCurrencyIcon validate={inputValidation} value={price} onChange={this.inputChange} name="price" label="Original Price" icon="$" placeholder="0,00"/>
          </div>

          <div className="col-1-4">
            <InputGroupCurrencyIcon validate={inputValidation} value={promotionalPrice} onChange={this.inputChange} name="promotionalPrice" label="Promocional Price" icon="$" placeholder="0,00"/>
          </div>
          
          <div className="col-1-4">
            <InputGroup validate={inputValidation} value={stock} onChange={this.inputChange} type="number" name="stock" label="Stock"/>
          </div>
        </Grid>

        <Grid transparent nopadding className="mt--lg">
          {this.renderActionButtons}
        </Grid>
      </div>
    )
  }
}

export default ProductForm;