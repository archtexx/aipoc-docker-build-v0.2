import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import logo from '../../public/aechtexxLogo.png'
import logoDark from '../../public/logodark.png';
import clsx from "clsx";
import ToggleMode from "../button/ToggleMode";
import { Text } from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";
const TopBar = ({ mode, toggleSidebar, toggleDarkMode, selectedOperation }) => {


  const bergerMenuColor = mode ? 'white' : "black"
  const HeaderStyle = clsx({
    'w-auto': true,
    // 'border-2':true,
    'font-semibold': true,
    'text-3xl': true,
    'rounded-lg': true,
    'p-1': true,
    // 'border-white-500':mode,
    'text-white-600': mode,
    // 'border-black':!mode,
    'text-black-600': !mode,
    // 'ring-offset-2':true,
    // 'ring-2':true,
    // 'ring-black':!mode,
    // 'ring-white':mode,
    // 'ring-offset-gray-800':mode
  })

  const burgerStyle = clsx({
    'rounded-full': true,
    'p-2': true,
    'hover:bg-gray-900': mode,
    'hover:bg-gray-200': !mode
  })

  return (
    <>
      <div className={`flex flex-row justify-between items-center w-full p-2 ${!mode ? "shadow-md" : "shadow-sm shadow-white"}`}>

        <div className='flex-1'>
          <HiMenu  onClick={toggleSidebar} size="3em" className={burgerStyle} color={bergerMenuColor} />
        </div>

        <div className="flex-2 flex justify-center">
          <Text className={HeaderStyle}>{selectedOperation}</Text>
        </div>

        <div className="flex-1 flex justify-end items-center gap-2">
          <a href="https://www.archtexx.de/"><Image src={!mode ? logo : logoDark} width={200} height={50} alt='algoleap Logo' /></a>
        </div>
      </div>
    </>
  )
}

export default TopBar