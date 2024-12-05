import {FaFacebook} from "react-icons/fa";
import {FaGoogle} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";

export default function Footer() {
    return (
        <div className='bg-sky-50 flex-col p-3 w-full'>
            <div>Contact&nbsp;us:</div>
            <ul>
                <li>clothes-shop@mail.com</li>
                <li>123-567-789</li>
            </ul>
            <ul className='flex space-x-4'>
                <li><FaFacebook/></li>
                <li><FaGoogle/></li>
                <li><FaXTwitter/></li>
            </ul>
        </div>
    );
}