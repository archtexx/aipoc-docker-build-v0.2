import { useContext } from "react"
import ArchtexxContext from "./contextStoreHandler"

const useArchContext = () => {
    return useContext(ArchtexxContext)
}

export default useArchContext