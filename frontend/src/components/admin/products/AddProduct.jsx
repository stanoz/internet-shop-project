import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Link} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addProduct} from "../../../../utils/admin.js";

export function AddProduct() {
    const {mutate, isSuccess} = useMutation({
        mutationFn: addProduct
    })
    const queryClient = useQueryClient();

    const initialValues = {
        title: "",
        description: "",
        category: "",
        image: "",
        price: 0,
        size: "XS",
        quantity: 0,
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .max(50, "Title must be less than 50 characters")
            .required("Title is required"),
        description: Yup.string()
            .max(200, "Description must be less than 200 characters")
            .required("Description is required"),
        category: Yup.string()
            .required("Category is required"),
        image: Yup.string()
            .url("Must be a valid URL")
            .required("Image URL is required"),
        price: Yup.number()
            .positive("Price must be a positive number")
            .required("Price is required"),
        size: Yup.string()
            .oneOf(["XS", "S", "M", "L", "XL"], "Invalid size")
            .required("Size is required"),
        quantity: Yup.number()
            .integer("Quantity must be an integer")
            .min(0, "Quantity cannot be negative")
            .required("Quantity is required"),
    });


    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-center text-2xl my-4'>Add Product</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    mutate(values)
                    queryClient.invalidateQueries(['products', 'all'])
                }}
            >
                <Form>
                    <div className='flex flex-col space-y-5'>
                        <div>
                            <label htmlFor="title">Title: </label>
                            <Field id="title" name="title" className='border border-gray-500 ml-1'/>
                            <ErrorMessage name="title" component="div" className="text-red-600"/>
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="description">Description:</label>
                            <Field
                                id="description"
                                name="description"
                                as="textarea"
                                className='border border-gray-500'
                            />
                            <ErrorMessage name="description" component="div" className="text-red-600"/>
                        </div>
                        <div>
                            <label htmlFor="category">Category: </label>
                            <Field id="category" name="category" className='border border-gray-500 ml-1'/>
                            <ErrorMessage name="category" component="div" className="text-red-600"/>
                        </div>

                        <div>
                            <label htmlFor="image">Image URL: </label>
                            <Field id="image" name="image" className='border border-gray-500 ml-1'/>
                            <ErrorMessage name="image" component="div" className="text-red-600"/>
                        </div>

                        <div>
                            <label htmlFor="price">Price: </label>
                            <Field id="price" name="price" type="number" className='border border-gray-500 ml-1' min={0} step={0.01}/>
                            <ErrorMessage name="price" component="div" className="text-red-600"/>
                        </div>

                        <div>
                            <label htmlFor="size">Size: </label>
                            <Field as="select" id="size" name="size" className='p-1'>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </Field>
                            <ErrorMessage name="size" component="div" className="text-red-600"/>
                        </div>

                        <div>
                            <label htmlFor="quantity">Quantity: </label>
                            <Field id="quantity" name="quantity" type="number" className='border border-gray-500 ml-1' min={0} step={1}/>
                            <ErrorMessage name="quantity" component="div" className="text-red-600"/>
                        </div>

                        <button
                            type="submit"
                            className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md text-lg text-white'
                        >Submit</button>
                    </div>
                </Form>
            </Formik>
            {isSuccess && <p className='text-green-400 text-lg text-center'>Product added successfully!</p>}
            <Link to='/manage-products' className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md text-lg text-white mt-10'>Return</Link>
        </div>
    );
}
