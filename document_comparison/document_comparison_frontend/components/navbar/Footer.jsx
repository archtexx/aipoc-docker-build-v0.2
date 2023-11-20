import { AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter } from "react-icons/ai";
import ToggleMode from "../button/ToggleMode";
import { Avatar } from "@chakra-ui/react";
import useArchContext from "@/context/useArchContext";

const Footer = ({ toggleDarkMode, mode }) => {

  const {user} = useArchContext()

  return (
    <div className="flex flex-row justify-between mx-8 mb-1 items-center">
      
      <div className="flex flex-col items-center">
        <h4>Social Media</h4>
        <div className="flex flex-row justify-between gap-x-4">
            <a ><AiOutlineTwitter size="2em"/></a>
            <a ><AiOutlineInstagram size="2em"/></a>
            <a ><AiOutlineLinkedin size="2em"/></a>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center">
      <ToggleMode toggleDarkMode={toggleDarkMode} mode={mode}/>
      <Avatar bg='teal.500' name={user}/>
    </div>      
    </div>
  )
}

export default Footer