import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {editUser, getUserById} from "../../../../utils/admin.js";
import {useSelector} from "react-redux";

export default function EditUser() {
    const { mutate, isSuccess } = useMutation({
        mutationFn: ({ id, user }) => editUser(id, user),
    });

    const userId = useSelector(state => state.adminManagement.userId)

    const {
        data: queryData,
        isSuccess: isQuerySuccess,
        error: queryError,
    } = useQuery({
        queryKey: ["user", "get-by-id", userId],
        queryFn: () => getUserById(userId),
    });

    const [initialValues, setInitialValues] = useState({
        name: "",
        surname: "",
        email: "",
        isAdmin: false,
        address: {
            street: "",
            city: "",
            state: "",
            zip: "",
        },
    });

    useEffect(() => {
        if (queryData) {
            setInitialValues({
                name: queryData.data.name,
                surname: queryData.data.surname,
                email: queryData.data.email,
                isAdmin: queryData.data.isAdmin,
                address: queryData.data.address || {
                    street: "",
                    city: "",
                    state: "",
                    zip: "",
                },
            });
        }
    }, [queryData]);

    const queryClient = useQueryClient();

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        surname: Yup.string().required("Surname is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        isAdmin: Yup.boolean().required("Admin status is required"),
        address: Yup.object({
            street: Yup.string().required("Street is required"),
            city: Yup.string().required("City is required"),
            state: Yup.string().required("State is required"),
            zip: Yup.string().matches(/^\d{5}$/, "Zip code must be exactly 5 digits")
                .required("Zip code is required"),
        }),
    });

    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-center text-2xl my-4'>Edit User</h2>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    mutate({ id: userId, user: values });
                    queryClient.invalidateQueries(['users', 'all']);
                }}
            >
                <Form>
                    <div className='flex flex-col space-y-5'>
                        <div>
                            <label htmlFor="name">Name: </label>
                            <Field id="name" name="name" className='border border-gray-500 ml-1' />
                            <ErrorMessage name="name" component="div" className="text-red-600" />
                        </div>

                        <div>
                            <label htmlFor="surname">Surname: </label>
                            <Field id="surname" name="surname" className='border border-gray-500 ml-1' />
                            <ErrorMessage name="surname" component="div" className="text-red-600" />
                        </div>

                        <div>
                            <label htmlFor="email">Email: </label>
                            <Field id="email" name="email" type="email" className='border border-gray-500 ml-1' />
                            <ErrorMessage name="email" component="div" className="text-red-600" />
                        </div>

                        <div>
                            <label htmlFor="isAdmin">Admin: </label>
                            <Field as="select" id="isAdmin" name="isAdmin" className='p-1'>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </Field>
                            <ErrorMessage name="isAdmin" component="div" className="text-red-600" />
                        </div>

                        <fieldset className='border p-2'>
                            <legend>Address:</legend>
                            <div>
                                <label htmlFor="address.street">Street: </label>
                                <Field id="address.street" name="address.street" className='border border-gray-500 ml-1' />
                                <ErrorMessage name="address.street" component="div" className="text-red-600" />
                            </div>

                            <div>
                                <label htmlFor="address.city">City: </label>
                                <Field id="address.city" name="address.city" className='border border-gray-500 ml-1' />
                                <ErrorMessage name="address.city" component="div" className="text-red-600" />
                            </div>

                            <div>
                                <label htmlFor="address.state">State: </label>
                                <Field id="address.state" name="address.state" className='border border-gray-500 ml-1' />
                                <ErrorMessage name="address.state" component="div" className="text-red-600" />
                            </div>

                            <div>
                                <label htmlFor="address.zip">ZIP: </label>
                                <Field id="address.zip" name="address.zip" className='border border-gray-500 ml-1' />
                                <ErrorMessage name="address.zip" component="div" className="text-red-600" />
                            </div>
                        </fieldset>

                        <button
                            type="submit"
                            className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md text-lg text-white'
                        >Submit</button>
                    </div>
                </Form>
            </Formik>
            {isSuccess && <p className='text-lg text-center text-green-400'>User edited successfully!</p>}
            <Link to='/manage-users' className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md text-lg text-white mt-10'>Return</Link>
        </div>
    );
}
