import Axios from 'axios';
import React, { useState, createContext, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState({
		_id: '',
		name: '',
		brand: {},
		category: {},
	});

	const getAllProducts = async () => {
		try {
			const response = await Axios.get('/products');
			setProducts([...response.data.products]);
		} catch (error) {
			if (error.response) {
				alert(error.response.data.error);
			} else {
				console.log(error);
				alert('Something went wrong');
			}
		}
	};

	const updateProduct = async (data, productId) => {
		try {
			const response = await Axios.patch(`/product/${productId}`, data);
			alert(response.data.message);
		} catch (error) {
			if (error.response) {
				alert(error.response.data.error);
			} else {
				console.log(error);
				alert('Something went wrong');
			}
		}
	};

	const deleteProduct = async (productId) => {
		try {
			const response = await Axios.delete(`/product/${productId}`);
			alert(response.data.message);
		} catch (error) {
			if (error.response) {
				alert(error.response.data.error);
			} else {
				console.log(error);
				alert('Something went wrong');
			}
		}
	};

	const getProduct = async (productId) => {
		try {
			const response = await Axios.get(`/product/${productId}`);

			setProduct({ ...response.data.product[0] });
		} catch (error) {
			if (error.response) {
				alert(error.response.data.error);
			} else {
				console.log(error);
				alert('Something went wrong');
			}
		}
	};
	return (
		<ProductContext.Provider
			value={{
				products,
				product,
				getAllProducts,
				updateProduct,
				deleteProduct,
				getProduct,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};
