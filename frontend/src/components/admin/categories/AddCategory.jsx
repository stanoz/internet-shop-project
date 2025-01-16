import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addCategory} from "../../../../utils/admin.js";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import React from "react";

export default function AddCategory() {
    const {mutate, isSuccess} = useMutation({
        mutationFn: addCategory
    })
    const queryClient = useQueryClient();

    const initialValues = {
        name: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(50, "Name must be less than 50 characters")
            .required("Name is required"),
    });


    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-center text-2xl my-4'>Add Category</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    mutate(values)
                    queryClient.invalidateQueries(['products', 'categories'])
                }}
            >
                <Form>
                    <div className='flex flex-col space-y-5'>
                        <div>
                            <label htmlFor="name">Name: </label>
                            <Field id="name" name="name" className='border border-gray-500 ml-1'/>
                            <ErrorMessage name="name" component="div" className="text-red-600"/>
                        </div>
                        <button
                            type="submit"
                            className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md text-lg text-white'
                        >Submit</button>
                    </div>
                </Form>
            </Formik>
            {isSuccess && <p className='text-green-400 text-lg text-center'>Category added successfully!</p>}
            <Link to='/manage-categories' className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md text-lg text-white mt-10'>Return</Link>
        </div>
    );
}