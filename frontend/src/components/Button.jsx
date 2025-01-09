export default function Button({cssClasses, onClick = f => f, children, ...props}) {
    return (
        <button className={`${cssClasses}`}
            onClick={onClick} {...props}>{children}</button>
    )
}