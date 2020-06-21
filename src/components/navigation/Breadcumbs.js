import React, { Component } from 'react';
import classname from 'classname';
import { Link } from 'react-router-dom';

class Breadcumbs extends Component {
  render() {
    const { className } = this.props;
    const classComponent = classname('breadcumbs', className);

    const CurrentBreadcumb = () => {
      const currentPath = window.location.pathname.replace('/tiendanube', '')
      if (currentPath.includes('edit')) {
        return <li><Link to={{pathname: currentPath}}>Edit Product</Link></li>
      }
      if (currentPath.includes('new')) {
        return <li><Link to={{pathname: currentPath}}>Add Product</Link></li>
      }
      return null
    }

    return (
      <ul className={classComponent}>
        <li><Link to={'/products'}>My Products</Link></li>
        <CurrentBreadcumb/>
      </ul>
    )
  }
};

export default Breadcumbs;