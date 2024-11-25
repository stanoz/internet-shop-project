import {LiaSearchSolid} from "react-icons/lia";

export default function SearchBar() {
    return (
        <div className='bg-white w-fit p-1 border-b border-neutral-950'>
            <div className='inline-flex'>
                <LiaSearchSolid size={18} className='mr-2 mt-1'/> <input type='text' placeholder='Search...'/>
            </div>
        </div>
    )
}