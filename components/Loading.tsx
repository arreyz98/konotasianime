const Loading = () => {
    return(
        <div className="flex flex-row gap-2 items-center justify-center min-h-screen px-2">
            <div className="w-8 h-8 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-8 h-8 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-8 h-8 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
    )
}
export default Loading