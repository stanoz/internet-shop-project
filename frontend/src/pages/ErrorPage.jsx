export default function ErrorPage({error}) {
    return (
        <div className='flex justify-center'>
            <div className='text-lg text-red-600 font-bold border-2 border-yellow-400 w-fit p-4 rounded-md'>
                {<span>{error?.response?.data?.message}</span> || <span>Error occurred!</span>}
            </div>
        </div>
    )
}