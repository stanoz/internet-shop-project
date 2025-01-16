import {Link} from "react-router-dom";

export default function AdminPanel() {
    return (
        <div className='flex flex-col space-y-32 items-center justify-center h-screen'>
            <h1 className='text-5xl text-center'>Admin Panel</h1>
            <ul className='flex space-x-20 text-center text-3xl text-white'>
                <li className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md'>
                    <Link to='/manage-products' className='w-full'>Manage Products</Link></li>
                <li className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md'>
                    <Link to='/manage-categories' className='w-full'>Manage Categories</Link></li>
                <li className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md'>
                    <Link to='/manage-users' className='w-full'>Manage Users</Link></li>
                <li className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md'>
                    <Link to='/manage-orders' className='w-full'>Manage Orders</Link></li>
                <li className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md'>
                    <Link to='/report' className='w-full'>Get Report</Link></li>
            </ul>
        </div>
    )
}