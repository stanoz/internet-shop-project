export default function Button({cssClasses, onClick = f => f, children}) {
    return (
        <button className={`${cssClasses}`}
            onClick={onClick}>{children}</button>
    )
}