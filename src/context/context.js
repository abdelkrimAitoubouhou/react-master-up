import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import axios from "axios";
import {API} from "../apis";

const productContext = React.createContext();
//Provider
//Consumer

const ProductProvider = ({children, listProducts, detail}) => {

    const [products, setProducts] = useState([]);
    const [detailProduct, setDetailProduct] = useState(detail);
    const [cart, setCart] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalProduct, setModalProduct] = useState(detail);
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const [cartTax, setCartTax] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${API}/products/all`)
            .then(res => {

                const products = res.data && res.data.map(p => {
                    return {
                        ...p,
                        info:
                            "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo." +
                            " Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf " +
                            "authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware " +
                            "sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac" +
                            " stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                        img: `img/${p.id}.png`,
                        inCart: false,
                        total: 0
                    }
                })
                initProducts(products);
            }).catch(() => {
            initProducts([]);
        })
    }, []);


    const initProducts = (data) => {
        let tempProducts = [];
        data && data.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        });

        setProducts(tempProducts);
    }


    const getItem = id => {
        return products.find(item => item.id === id);
    }

    const handleDetail = id => {
        const product = getItem(id);
        setDetailProduct(product);
    }

    const addToCart = id => {
        let tempProducts = [...products];
        const index = tempProducts.indexOf(getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        setProducts(tempProducts);
        setCart([...cart, product])
        addTotals();

    }

    const openModal = id => {
        const product = getItem(id);
        setModalOpen(true);
        setModalProduct(product);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const increment = id => {
        let tempCart = [...cart];
        const selectedProduct = tempCart.find(item => {
            return item.id === id;
        });

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;
        setCart([...tempCart]);
        addTotals();
    };

    const decrement = id => {
        let tempCart = [...cart];
        const selectedProduct = tempCart.find(item => {
            return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
            removeItem(id);
        } else {
            product.total = product.count * product.price;
            setCart([...tempCart]);
            addTotals();
        }
    };

    const removeItem = id => {
        let tempProducts = [...products];
        let tempCart = [...cart];

        const index = tempProducts.indexOf(getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        tempCart = tempCart.filter(item => {
            return item.id !== id;
        });

        setCart([...tempCart]);
        setProducts([...tempProducts]);
        addTotals();
    };

    const clearCart = () => {
        setCart([]);
        addTotals();
    }

    const addTotals = () => {
        let subTotal = 0;
        cart && cart.map(item => {
            subTotal += item.total;
            return subTotal;
        });
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        setCartSubTotal(subTotal);
        setCartTax(tax);
        setCartTotal(total);
    }

    return (
        <productContext.Provider
            value={{
                cart,
                products,
                modalProduct,
                modalOpen,
                detailProduct,
                cartTotal,
                cartTax,
                cartSubTotal,
                initProducts,
                handleDetail,
                addToCart,
                openModal,
                closeModal,
                increment,
                decrement,
                removeItem,
                clearCart
            }}
        >
            {children}
        </productContext.Provider>
    );

}

export default ProductProvider;

const ProductConsumer = productContext.Consumer;

export {ProductProvider, ProductConsumer}
