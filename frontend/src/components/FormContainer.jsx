import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function FormContainer({
                                          isSuccess,
                                          error,
                                          header,
                                          navigateTo = "",
                                          linkCaption = "",
                                          showLink = true,
                                          navigateOnSuccess = null,
                                          children,
                                      }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess && navigateOnSuccess) {
            navigate(navigateOnSuccess);
        }
    }, [isSuccess, navigate, navigateOnSuccess]);

    return (
        <>
            {error && <p>{error.response?.data?.message}</p>}
            <div className="h-screen bg-cover bg-no-repeat bg-center flex items-center justify-center w-screen">
                <div className="bg-amber-400 w-[30rem] rounded-md px-10 py-8 flex flex-col h-full justify-center">
                    <h1 className="text-center text-2xl text-white font-bold pb-8">
                        {header}
                    </h1>
                    {children}
                    {showLink && (
                        <Link
                            to={navigateTo}
                            className="text-sm hover:underline pt-8 text-gray-600"
                        >
                            {linkCaption}
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}