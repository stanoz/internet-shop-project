import {PiNumberCircleOne} from "react-icons/pi";
import {PiNumberCircleTwo} from "react-icons/pi";
import {PiNumberCircleThree} from "react-icons/pi";
import {PiNumberCircleFour} from "react-icons/pi";
import {FaMinus} from "react-icons/fa6";

export default function Steps({step}) {
    const activeCssClasses = 'text-green-500'
    return (
        <div className='flex items-center'>
            <PiNumberCircleOne size={40} className={step >= 1 ? activeCssClasses : undefined}/>
            <FaMinus size={20} className={step >= 2 ? activeCssClasses : undefined}/>
            <PiNumberCircleTwo size={40} className={step >= 2 ? activeCssClasses : undefined}/>
            <FaMinus size={20} className={step >= 3 ? activeCssClasses : undefined}/>
            <PiNumberCircleThree size={40} className={step >= 3 ? activeCssClasses : undefined}/>
            <FaMinus size={20} className={step >= 4 ? activeCssClasses : undefined}/>
            <PiNumberCircleFour size={40} className={step >= 4 ? activeCssClasses : undefined}/>
        </div>
    )
}