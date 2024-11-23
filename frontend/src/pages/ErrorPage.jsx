export default function ErrorPage({error}) {
    return (
        <div>
            {error.message ? <span>{error.message}</span> : <span>Error occurred!</span>}
        </div>
    )
}