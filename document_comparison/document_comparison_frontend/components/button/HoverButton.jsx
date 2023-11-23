

const HoverButton = () => {
  return (
    <button className="rounded-full bg-teal-400 w-1/5 h-24 text-3xl hover:bg-teal-800 relative isolate">
        <span className="absolute bg-orange-400	w-1/3 h-full left-0 top-0 z-[-1] opacity-50	">
        </span>
            ClickMe  
        <span className="absolute bg-orange-400	w-1/3 h-full right-0 top-0 z-[-1] opacity-50">
        </span>  
    </button>
  )
}

export default HoverButton