import {useAuth} from "../context/AuthContext.jsx";
import FormContainer from "../components/FormContainer.jsx";
import useValidation from "../hooks/useValidation.jsx";
import Button from "../components/Button.jsx";
import {useEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {registerUser} from "../../utils/account.js";
import Input from "../components/Input.jsx";

export default function Register() {
    const {mutate, isSuccess, error} = useMutation({
        mutationFn: registerUser,
    });

    const {setIsLoggedIn} = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault()
        mutate({
            name: enteredValue.name,
            surname: enteredValue.surname,
            email: enteredValue.email,
            password: enteredValue.password,
        });
    }

    const {
        enteredValue,
        didEdit,
        isNotValid,
        handleInputChange,
        handleInputBlur,
    } = useValidation({
        password: "",
        name: "",
        surname: "",
        email: "",
        "confirm-password": "",
    });

    useEffect(() => {
        if (isSuccess) {
            setIsLoggedIn(true)
        }
    }, [isSuccess]);

    return (
        <FormContainer
            isSuccess={isSuccess}
            error={error}
            header='Create Account'
            linkCaption='Already have an account?'
            navigateTo='/login'
            navigateOnSuccess='/'
        >
            <form onSubmit={handleSubmit}>
                <Input
                    label="Name"
                    type="text"
                    id="name"
                    onChange={(event) => handleInputChange("name", event)}
                    value={enteredValue.name}
                    onBlur={() => handleInputBlur("name")}
                    error={isNotValid.name}
                />
                <Input
                    label="Surname"
                    type="text"
                    id="surname"
                    onChange={(event) => handleInputChange("surname", event)}
                    value={enteredValue.surname}
                    onBlur={() => handleInputBlur("surname")}
                    error={isNotValid.surname}
                />
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
                <Input
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    onChange={(event) => handleInputChange("confirm-password", event)}
                    value={enteredValue["confirm-password"]}
                    onBlur={() => handleInputBlur("confirm-password")}
                    error={isNotValid["confirm-password"]}
                />
                <Button
                    cssClasses='bg-emerald-300 text-white rounded-md p-2 mt-3 hover:bg-emerald-400 cursor-pointer'
                    type='submit'
                    disabled={
                    !didEdit.name ||
                    !didEdit.surname ||
                    !didEdit.password ||
                    !didEdit.email ||
                    !didEdit["confirm-password"] ||
                    isNotValid.email.value ||
                    isNotValid.password.value ||
                    isNotValid.name.value ||
                    isNotValid.surname.value ||
                    isNotValid["confirm-password"].value
                }>
                    Create Account
                </Button>
            </form>
        </FormContainer>
    )
}