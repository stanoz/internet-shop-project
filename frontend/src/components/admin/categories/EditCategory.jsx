import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {editCategory, getCategoryById} from "../../../../utils/admin.js";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";

export default function EditCategory() {
    const {mutate, isSuccess} = useMutation({
        mutationFn: ({id, category}) => editCategory(id, category),
    })

    const categoryId = useSelector(state => state.adminManagement.categoryId)
    const {
        data: queryData,
        isSuccess: isQuerySuccess,
        error: queryError,
    } = useQuery({
        queryKey: ['category', categoryId],
        queryFn: () => getCategoryById(categoryId),
    });

    const [initialValues, setInitialValues] = useState({
        name: ''
    });
    useEffect(() => {
        if (queryData) {
            setInitialValues({
                name: queryData.data.name,
            });
        }
    }, [queryData, isSuccess]);

    const queryClient = useQueryClient();

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(50, "Name must be less than 50 characters")
            .required("Name is required"),
    });
console.log(queryData)
    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-center text-2xl my-4'>Edit Category</h2>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    mutate({id: categoryId, category: values});
                    queryClient.invalidateQueries(['category', categoryId])
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
            {isSuccess && <p className='text-lg text-center text-green-400'>Category edited successfully!</p>}
            <Link to='/manage-categories' className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md text-lg text-white mt-10'>Return</Link>
        </div>
    );
}