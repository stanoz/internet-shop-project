import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editOrder, getOrderById } from "../../../../utils/admin.js";
import * as Yup from "yup";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function EditOrder() {
    const { mutate, isSuccess } = useMutation({
        mutationFn: ({ id, order }) => editOrder(id, order),
    });

    const orderId = useSelector(state => state.adminManagement.orderId);
    const { data: queryData } = useQuery({
        queryKey: ["order", "get-by-id"],
        queryFn: () => getOrderById(orderId),
    });

    const [initialValues, setInitialValues] = useState({
        user: {
            name: "",
            surname: "",
            email: "",
        },
        cart: {
            items: [
                { id: "", quantity: 0 },
            ],
        },
        payment: {
            method: "",
            paymentStatus: "NOT_PAID",
        },
        delivery: {
            method: "",
            deliveryStatus: "WAITING",
        },
        orderStatus: "PENDING",
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
                user: queryData.data.user,
                cart: {
                    items: queryData.data.cart?.items?.map(item => ({
                        id: String(item.product._id || ""),
                        title: item.product.title,
                        quantity: item.quantity || 0,
                    })) || [{ id: "", title: "", quantity: 0 }],
                },
                payment: {
                    method: queryData.data.payment.method || "",
                    paymentStatus: queryData.data.payment.paymentStatus || "NOT_PAID",
                },
                delivery: queryData.data.delivery,
                orderStatus: queryData.data.orderStatus,
                address: queryData.data.address,
            });
        }
    }, [queryData]);



    const queryClient = useQueryClient();

    const validationSchema = Yup.object({
        user: Yup.object({
            name: Yup.string().required("User name is required"),
            surname: Yup.string().required("User surname is required"),
            email: Yup.string().email("Invalid email").required("User email is required"),
        }),
        cart: Yup.object({
            items: Yup.array().of(
                Yup.object({
                    id: Yup.string().required("Product ID is required"),
                    quantity: Yup.number().min(1, "Quantity must be at least 1").required("Quantity is required"),
                })
            ),
        }),
        payment: Yup.object({
            method: Yup.string().oneOf(["BLIK", "CREDIT_CARD", "BANK_TRANSFER"], "Invalid payment method").required("Payment method is required"),
            paymentStatus: Yup.string().oneOf(["NOT_PAID", "PAID", "FAILED"], "Invalid payment status").required("Payment status is required"),
        }),
        delivery: Yup.object({
            method: Yup.string()
                .oneOf(["INPOST", "DELIVERY_MAN", "POST"], "Invalid delivery method")
                .required("Delivery method is required"),
            deliveryStatus: Yup.string()
                .oneOf(["WAITING", "IN_TRANSIT", "DELIVERED"], "Invalid delivery status")
                .required("Delivery status is required"),
        }),
        orderStatus: Yup.string()
            .oneOf(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"], "Invalid order status")
            .required("Order status is required"),
        address: Yup.object({
            street: Yup.string().required("Street is required"),
            city: Yup.string().required("City is required"),
            state: Yup.string().required("State is required"),
            zip: Yup.string().required("Zip code is required"),
        }),
    });


    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-center text-2xl my-4'>Edit Order</h2>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    mutate({ id: orderId, order: values });
                    queryClient.invalidateQueries(['orders', 'all', 'orders', 'search']);
                }}
            >
                <Form>
                    <div className='flex flex-col space-y-5'>
                        <div>
                            <label htmlFor="orderStatus">Order Status: </label>
                            <Field as="select" id="orderStatus" name="orderStatus" className="p-1">
                                <option value="PENDING">PENDING</option>
                                <option value="PROCESSING">PROCESSING</option>
                                <option value="SHIPPED">SHIPPED</option>
                                <option value="DELIVERED">DELIVERED</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </Field>
                            <ErrorMessage name="orderStatus" component="div" className="text-red-600"/>
                        </div>
                        <div>
                            <label htmlFor="user.name">User Name: </label>
                            <Field id="user.name" name="user.name" className='border border-gray-500 ml-1'/>
                            <ErrorMessage name="user.name" component="div" className="text-red-600"/>
                        </div>

                        <div>
                            <label htmlFor="user.surname">User Surname: </label>
                            <Field id="user.surname" name="user.surname" className='border border-gray-500 ml-1'/>
                            <ErrorMessage name="user.surname" component="div" className="text-red-600"/>
                        </div>

                        <div>
                            <label htmlFor="user.email">User Email: </label>
                            <Field id="user.email" name="user.email" className='border border-gray-500 ml-1'/>
                            <ErrorMessage name="user.email" component="div" className="text-red-600"/>
                        </div>

                        <div className='flex flex-col space-y-3'>
                            <label htmlFor="cart.items">Cart Items: </label>
                            <FieldArray name="cart.items">
                                {({remove, push, form: {values}}) => (
                                    <div>
                                        {values.cart.items.map((item, index) => (
                                            <div key={index} className="flex flex-col space-y-4 border p-3 rounded-sm">
                                                <div className="flex space-x-2">
                                                    <label>Product Title:</label>
                                                    <p>{item.title || "N/A"}</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <label htmlFor={`cart.items.${index}.id`}>Product ID:</label>
                                                    <Field
                                                        name={`cart.items.${index}.id`}
                                                        placeholder="Item ID"
                                                        className="border border-gray-500 w-60"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex space-x-2">
                                                    <label htmlFor={`cart.items.${index}.quantity`}>Quantity:</label>
                                                    <Field
                                                        name={`cart.items.${index}.quantity`}
                                                        type="number"
                                                        min={1}
                                                        className="border border-gray-500"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => push({id: "", title: "", quantity: 1})}
                                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md mt-2"
                                        >
                                            Add Item
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                            <ErrorMessage name="cart.items" component="div" className="text-red-600"/>
                        </div>

                        <div>
                            <label htmlFor="payment.method">Payment Method: </label>
                            <Field as="select" id="payment.method" name="payment.method" className="p-1">
                                <option value="BLIK">BLIK</option>
                                <option value="CREDIT_CARD">CREDIT_CARD</option>
                                <option value="BANK_TRANSFER">BANK_TRANSFER</option>
                            </Field>
                            <ErrorMessage name="payment.method" component="div" className="text-red-600"/>
                        </div>

                        <div>
                            <label htmlFor="payment.paymentStatus">Payment Status: </label>
                            <Field as="select" id="payment.paymentStatus" name="payment.paymentStatus" className="p-1">
                                <option value="NOT_PAID">NOT PAID</option>
                                <option value="PAID">PAID</option>
                                <option value="FAILED">FAILED</option>
                            </Field>
                            <ErrorMessage name="payment.paymentStatus" component="div" className="text-red-600"/>
                        </div>

                        <div>
                            <label htmlFor="delivery.method">Delivery Method: </label>
                            <Field as="select" id="delivery.method" name="delivery.method" className="p-1">
                                <option value="INPOST">INPOST</option>
                                <option value="DELIVERY_MAN">DELIVERY_MAN</option>
                                <option value="POST">POST</option>
                            </Field>
                            <ErrorMessage name="delivery.method" component="div" className="text-red-600"/>
                        </div>

                        <div>
                            <label htmlFor="delivery.deliveryStatus">Delivery Status: </label>
                            <Field as="select" id="delivery.deliveryStatus" name="delivery.deliveryStatus"
                                   className="p-1">
                                <option value="WAITING">WAITING</option>
                                <option value="IN_TRANSIT">IN TRANSIT</option>
                                <option value="DELIVERED">DELIVERED</option>
                            </Field>
                            <ErrorMessage name="delivery.deliveryStatus" component="div" className="text-red-600"/>
                        </div>

                        <div>
                            <label htmlFor="address.street">Street: </label>
                            <Field id="address.street" name="address.street" className='border border-gray-500 ml-1'/>
                            <ErrorMessage name="address.street" component="div" className="text-red-600"/>
                        </div>

                        <div>
                            <label htmlFor="address.city">City: </label>
                            <Field id="address.city" name="address.city" className='border border-gray-500 ml-1'/>
                            <ErrorMessage name="address.city" component="div" className="text-red-600"/>
                        </div>

                        <div>
                            <label htmlFor="address.state">State: </label>
                            <Field id="address.state" name="address.state" className='border border-gray-500 ml-1'/>
                            <ErrorMessage name="address.state" component="div" className="text-red-600"/>
                        </div>

                        <div>
                            <label htmlFor="address.zip">Zip Code: </label>
                            <Field id="address.zip" name="address.zip" className='border border-gray-500 ml-1'/>
                            <ErrorMessage name="address.zip" component="div" className="text-red-600"/>
                        </div>

                        <button
                            type="submit"
                            className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md text-lg text-white'
                        >Submit
                        </button>
                    </div>
                </Form>
            </Formik>
            {isSuccess && <p className='text-lg text-center text-green-400'>Order edited successfully!</p>}
            <Link to='/manage-orders'
                  className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md text-lg text-white mt-10'>Return</Link>
        </div>
    );
}
