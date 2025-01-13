import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Button from "../../components/Button.jsx";
import Steps from "../../components/Steps.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {orderMethodAction} from "../../redux/order-methods.jsx";


const deliveryMethods = ["INPOST", "DELIVERY_MAN", "POST"];
const paymentMethods = ["CREDIT_CARD", "BLIK", "BANK_TRANSFER"];

const validationSchema = Yup.object({
    deliveryMethod: Yup.string()
        .oneOf(deliveryMethods, "Invalid delivery method")
        .required("Delivery method is required"),
    street: Yup.string()
        .min(5, "Street must be at least 5 characters")
        .required("Street is required"),
    city: Yup.string()
        .min(2, "City must be at least 2 characters")
        .required("City is required"),
    state: Yup.string()
        .min(2, "State must be at least 2 characters")
        .required("State is required"),
    zipCode: Yup.string()
        .matches(/^\d{5}$/, "Zip code must be exactly 5 digits")
        .required("Zip code is required"),
    paymentMethod: Yup.string()
        .oneOf(paymentMethods, "Invalid payment method")
        .required("Payment method is required"),
});

export default function OrderMethods() {
    const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true)
    const dispatch = useDispatch()

    return (
        <div className="flex flex-col items-center">
            <Steps step={3}/>
            <div className='border-2 border-violet-600 rounded-sm p-4 mt-6'>
                <h1 className='text-xl mb-4'>Choose Delivery and Payment Methods</h1>
                <Formik
                    initialValues={{
                        deliveryMethod: "",
                        street: "",
                        city: "",
                        state: "",
                        zipCode: "",
                        paymentMethod: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        dispatch(orderMethodAction.setDeliveryMethod(values.deliveryMethod))
                        dispatch(orderMethodAction.setAddress({
                            street: values.street,
                            city: values.city,
                            state: values.state,
                            zipCode: values.zipCode
                        }))
                        dispatch(orderMethodAction.setPaymentMethod(values.paymentMethod))
                        setIsNextBtnDisabled(false)
                    }}
                >
                    <Form className="space-y-4">
                        <div className='flex flex-col'>
                            <label htmlFor="deliveryMethod">Delivery Method</label>
                            <Field as="select" name="deliveryMethod" id="deliveryMethod">
                                <option value="">Select a delivery method</option>
                                {deliveryMethods.map((method) => (
                                    <option key={method} value={method}>
                                        {method}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage
                                name="deliveryMethod"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="street">Street</label>
                            <Field id="street" name="street" className='border'/>
                            <ErrorMessage
                                name="street"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="city">City</label>
                            <Field id="city" name="city" className='border'/>
                            <ErrorMessage
                                name="city"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="state">State</label>
                            <Field id="state" name="state" className='border'/>
                            <ErrorMessage
                                name="state"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="zipCode">Zip Code</label>
                            <Field id="zipCode" name="zipCode" className='border'/>
                            <ErrorMessage
                                name="zipCode"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="paymentMethod">Payment Method</label>
                            <Field as="select" name="paymentMethod" id="paymentMethod">
                                <option value="">Select a payment method</option>
                                {paymentMethods.map((method) => (
                                    <option key={method} value={method}>
                                        {method}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage
                                name="paymentMethod"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <Button type="submit"
                                cssClasses='text-center text-white bg-cyan-400 hover:bg-sky-500 rounded-md px-2 py-1 mt-2'>Submit</Button>
                    </Form>
                </Formik>
            </div>
            <div className='flex space-x-6 mt-6 justify-center'>
                <Link to='/order/step2'
                      className='hover:bg-violet-500 bg-indigo-500 text-center text-lg text-white px-2 py-1 rounded-md'
                >Previous</Link>
                {!isNextBtnDisabled && (<Link to='/order/step4'
                                              className='hover:bg-violet-500 bg-indigo-500 text-center text-lg text-white px-2 py-1 rounded-md'
                >Next</Link>)}
                {isNextBtnDisabled && (
                    <span
                        className='text-lg text-center px-2 py-1 rounded-md cursor-default text-red-600 bg-zinc-400'
                    >Next</span>
                )}
            </div>
        </div>
    );
}
