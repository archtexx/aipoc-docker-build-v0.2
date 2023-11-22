import { HiCog, HiMoon, HiSun } from 'react-icons/hi';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';

const ToggleMode = ({ toggleDarkMode, mode }) => {
  return (
    <button
      className={`fixed bottom-16 right-4 p-2 rounded-full shadow-md focus:outline-none focus:ring focus:border-blue-300 ${mode ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      onClick={toggleDarkMode}
    >
      {mode ? <HiMoon size={24} color='white' /> : <HiSun size={24} color="white" />}
    </button>
  );
};

export default ToggleMode;