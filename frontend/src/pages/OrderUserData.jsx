import Steps from "../components/Steps.jsx";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";

export default function OrderUserData() {
    return (
        <>
            <Steps step={2} />
            <div>
                <p>You are not logged in. Do you want to <Link to="/login">log in</Link> or insert your data below?</p>
                <Formik
                    initialValues={{ name: '', email: '' }}
                    onSubmit={(values) => {
                        // Handle form submission
                        console.log(values);
                    }}
                >
                    <Form>
                        <div>
                            <label htmlFor="name">Name</label>
                            <Field id="name" name="name" placeholder="Name" />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field id="email" name="email" placeholder="Email" type="email" />
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            </div>
        </>
    );
}