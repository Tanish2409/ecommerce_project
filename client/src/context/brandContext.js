import Axios from 'axios';
import React, { useState, createContext, useEffect } from 'react';

export const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
	const [brands, setBrands] = useState([]);
	const [brand, setBrand] = useState({
		_id: '',
		name: '',
		status: '',
	});

	const getAllBrands = async () => {
		try {
			const response = await Axios.get('/brands');
			setBrands([...response.data.brands]);
		} catch (error) {
			if (error.response) {
				alert(error.response.data.error);
			} else {
				console.log(error);
				alert('Something went wrong');
			}
		}
	};

	const updateBrand = async (data, brandId) => {
		try {
			const response = await Axios.patch(`/brand/${brandId}`, data);
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

	const deleteBrand = async (brandId) => {
		try {
			const response = await Axios.delete(`/brand/${brandId}`);
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

	const getBrand = async (brandId) => {
		try {
			const response = await Axios.get(`/brand/${brandId}`);

			setBrand({ ...response.data.brand[0] });
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
		<BrandContext.Provider
			value={{
				brands,
				brand,
				getAllBrands,
				updateBrand,
				deleteBrand,
				getBrand,
			}}
		>
			{children}
		</BrandContext.Provider>
	);
};
