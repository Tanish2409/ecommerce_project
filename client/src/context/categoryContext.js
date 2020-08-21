import Axios from 'axios';
import React, { useState, createContext, useEffect } from 'react';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState({
		_id: '',
		name: '',
		status: '',
	});

	const getAllCategories = async () => {
		try {
			const response = await Axios.get('/categories');
			setCategories([...response.data.categories]);
		} catch (error) {
			if (error.response) {
				alert(error.response.data.error);
			} else {
				console.log(error);
				alert('Something went wrong');
			}
		}
	};

	const updateCategory = async (data, categoryId) => {
		try {
			const response = await Axios.patch(`/category/${categoryId}`, data);
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

	const deleteCategory = async (categoryId) => {
		try {
			const response = await Axios.delete(`/category/${categoryId}`);
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

	const getCategory = async (categoryId) => {
		try {
			const response = await Axios.get(`/category/${categoryId}`);

			setCategory({ ...response.data.category[0] });
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
		<CategoryContext.Provider
			value={{
				categories,
				category,
				getAllCategories,
				updateCategory,
				deleteCategory,
				getCategory,
			}}
		>
			{children}
		</CategoryContext.Provider>
	);
};
