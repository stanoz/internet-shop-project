import FormContainer from "../components/FormContainer.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import useValidation from "../hooks/useValidation.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {useMutation} from "@tanstack/react-query";
import {useEffect} from "react";
import {loginUser} from "../../utils/account.js";

export default function Login() {

    const {mutate, isSuccess, error} = useMutation({
        mutationFn: loginUser,
    });

    const {setIsLoggedIn} = useAuth()

    const {
        enteredValue,
        didEdit,
        isNotValid,
        handleInputChange,
        handleInputBlur,
    } = useValidation({ email: "", password: "" }, false);

    const handleSubmit = (event) => {
        event.preventDefault()
        mutate({
            email: enteredValue.email,
            password: enteredValue.password
        })
    }

    useEffect(() => {
        if (isSuccess) {
            setIsLoggedIn(true)
        }
    }, [isSuccess]);

    return (
        <FormContainer
            error={error}
            isSuccess={isSuccess}
            header='Log in'
            linkCaption="Don't have account? Register"
            navigateTo='/register'
            navigateOnSuccess='/'
        >
            <form onSubmit={handleSubmit}>
                <Input
                    label="E-mail"
                    type="email"
                    id="email"
                    onChange={(event) => handleInputChange("email", event)}
                    value={enteredValue.email}
                    onBlur={() => handleInputBlur("email")}
                    error={isNotValid.email}
                />
                <Input
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(event) => handleInputChange("password", event)}
                    value={enteredValue.password}
                    onBlur={() => handleInputBlur("password")}
                    error={isNotValid.password}
                />
                <Button
                    cssClasses='bg-emerald-300 text-white rounded-md p-2 mt-3 hover:bg-emerald-400 cursor-pointer'
                    type='submit'
                    disabled={
                        !didEdit.email ||
                        !didEdit.password
                    }>Sign in</Button>
            </form>
        </FormContainer>
    )
}