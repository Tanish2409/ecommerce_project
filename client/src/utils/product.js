import axios from 'axios';

export const getAllProducts = async (setProducts) => {
	try {
		const response = await axios.get('/products');
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

export const updateProduct = async (data, productId) => {
	try {
		const response = await axios.patch(`/product/${productId}`, data);
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

export const deleteProduct = async (productId) => {
	try {
		const response = await axios.delete(`/product/${productId}`);
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

export const getProduct = async (setProduct, productId) => {
	try {
		const response = await axios.get(`/product/${productId}`);

		setProduct({ ...response.data.product });
	} catch (error) {
		if (error.response) {
			alert(error.response.data.error);
		} else {
			console.log(error);
			alert('Something went wrong');
		}
	}
};
