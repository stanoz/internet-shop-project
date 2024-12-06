import {FaFacebook} from "react-icons/fa";
import {FaGoogle} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";

export default function Footer() {
    return (
        <div className='bg-sky-50 flex-col p-3 w-full text-lg'>
            <div>Contact&nbsp;us:</div>
            <ul>
                <li>clothes-shop@mail.com</li>
                <li>123-567-789</li>
            </ul>
            <ul className='flex space-x-4 mt-1.5'>
                <li><FaFacebook size={20} className='cursor-pointer hover:text-blue-600'/></li>
                <li><FaGoogle size={20} className='cursor-pointer hover:text-rose-600'/></li>
                <li><FaXTwitter size={20} className='cursor-pointer hover:text-neutral-700'/></li>
            </ul>
        </div>
    );
}