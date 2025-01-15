import {useQuery} from "@tanstack/react-query";
import {fetchReport} from "../../../utils/admin.js";
import ErrorPage from "../../pages/ErrorPage.jsx";
import LoadingIndicator from "../LoadingIndicator.jsx";
import {Link} from "react-router-dom";

export default function Report() {
    const {isSuccess, isLoading, error, isError, data} = useQuery({
        queryKey: ['report'],
        queryFn: fetchReport
    })

    return (
        <div className='flex flex-col items-center'>
            {isError && <ErrorPage error={error}/>}
            {isLoading && <LoadingIndicator/>}
            {isSuccess && (
                <div
                    className='flex flex-col items-center mt-20 space-y-10 border-2 border-blue-400 rounded-sm w-fit p-4'>
                    <div className='flex text-center text-2xl'>
                        <p>Total cost of all orders: ${data.data.totalCost}</p>
                    </div>
                    <div className='flex flex-col text-center'>
                        <h3 className='text-xl mb-3'>Orders Per User:</h3>
                        <ul className='list-disc'>
                            {Object.entries(data.data.ordersPerUser).map(([email, count]) => (
                                <li key={email} className='text-lg border rounded-sm p-1'>{email}: {count}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex flex-col text-center'>
                        <h3 className='text-xl mb-3'>Categories Sold</h3>
                        <ul className='list-disc'>
                            {Object.entries(data.data.categoriesSold).map(([category, count]) => (
                                <li key={category} className='text-lg border rounded-sm p-1'>{category}: {count}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <Link
                to='/admin-panel'
                className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md text-center text-xl text-white mt-5'>
                Return to Admin Panel</Link>
        </div>
    )
}