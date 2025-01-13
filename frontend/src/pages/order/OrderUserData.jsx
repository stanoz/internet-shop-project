import Steps from "../../components/Steps.jsx";
import {Formik, Form, Field, ErrorMessage} from "formik";
import Button from "../../components/Button.jsx";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {userDataAction} from "../../redux/user-data.jsx";

const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .required("Name is required"),
    surname: Yup.string()
        .min(2, "Surname must be at least 2 characters")
        .max(50, "Surname must be less than 50 characters")
        .required("Surname is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
});

export default function OrderUserData() {
    const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true)
    const dispatch = useDispatch()

    return (
        <div className='flex flex-col items-center'>
            <Steps step={2}/>
            <div className='border-2 border-violet-600 rounded-sm p-4 mt-6'>
                <h1 className='text-xl mb-4'>Please provide Your personal
                    data</h1>
                <Formik
                    initialValues={{name: "", surname: "", email: ""}}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        dispatch(userDataAction.setData(values))
                        setIsNextBtnDisabled(false)
                    }}
                >
                    <Form>
                        <div className='flex flex-col'>
                            <label htmlFor="name">Name</label>
                            <Field id="name" name="name" className='border'/>
                            <ErrorMessage name="name" component="div" className="text-red-600"/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="surname">Surname</label>
                            <Field id="surname" name="surname" className='border'/>
                            <ErrorMessage name="surname" component="div" className="text-red-600"/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="email">Email</label>
                            <Field id="email" name="email" type="email" className='border'/>
                            <ErrorMessage name="email" component="div" className="text-red-600"/>
                        </div>
                        <Button type="submit" cssClasses='text-center text-white bg-cyan-400 hover:bg-sky-500 rounded-md px-2 py-1 mt-2'>Submit</Button>
                    </Form>
                </Formik>
                <div className='flex space-x-6 mt-6 justify-center'>
                    <Link to='/order/step1'
                          className='hover:bg-violet-500 bg-indigo-500 text-center text-lg text-white px-2 py-1 rounded-md'
                    >Previous</Link>
                    {!isNextBtnDisabled && (<Link to='/order/step3'
                                                  className='hover:bg-violet-500 bg-indigo-500 text-center text-lg text-white px-2 py-1 rounded-md'
                    >Next</Link>)}
                    {isNextBtnDisabled && (
                        <span
                            className='text-lg text-center px-2 py-1 rounded-md cursor-default text-red-600 bg-zinc-400'
                        >Next</span>
                    )}
                </div>
            </div>
        </div>
    );
}