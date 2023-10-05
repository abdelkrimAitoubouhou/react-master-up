import React from 'react';
import Title from '../../containers/Title';
import Product from './Product';
import {ProductConsumer} from '../../context/context';
import Logo from './logo-re.png';
const ProductList = () => {


    return (
        <React.Fragment>
            <div>
                <div style={{position: 'relative', top: '1rem'}} className="container">
                    {/*<Title name="our" title="products"/>*/}

                    <div className="row">
                        <div className="logo">
                            <img  className="logoIcon" src={Logo} alt="Logo" />
                        </div>
                    </div>

                    <div className="row">

                        <ProductConsumer>
                            {(value) => {
                                return value.products && value.products.map(product => {
                                    return <Product key={product.id} product={product}/>
                                });
                            }}
                        </ProductConsumer>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default ProductList;
