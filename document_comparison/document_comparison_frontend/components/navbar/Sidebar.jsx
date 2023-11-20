import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { HiFolder, HiHome, HiOutlineChartBar, HiOutlineClipboardList, HiOutlineFolder, HiOutlineHome, HiOutlineUsers } from 'react-icons/hi';
import useArchContext from '@/context/useArchContext';

const Sidebar = ({ isOpen, mode }) => {
    const {
        setSelectedOperation, selectedOperation
    } = useArchContext();
    
    const sidebarColor = mode ? 'white' : '#1F2937';
    
    const menuItemClasses = (operation) => `mb-2 p-2 flex gap-2 cursor-pointer hover:bg-blue-600 hover:text-white hover:scale-1.1 rounded-lg transition-all duration-300 ${selectedOperation === operation && "bg-blue-600 text-white"}`;

    return (
        <motion.div
            animate={{
                width: isOpen ? '400px' : '0px',
                background: { sidebarColor },
                height: "80vh"
            }}
            className="overflow-auto"
        >
            {isOpen && (
                <nav className="mx-5 mt-4 flex flex-col">
                    {/* <div className={menuItemClasses("")} onClick={() => setSelectedOperation("")}>
                        <HiOutlineHome size={24} /> <span>Dashboard</span>
                    </div> */}

                    <div className={menuItemClasses("Document Comparision")} onClick={() => setSelectedOperation("Document Comparision")}>
                        <HiOutlineFolder size={24} /> <span>Document Comparision</span>
                    </div>

                    {/* <div className={menuItemClasses("Excel - Data Analysis")} onClick={() => setSelectedOperation("Excel - Data Analysis")}>
                        <HiOutlineChartBar size={24} /> <span>Excel - Data Analysis </span>
                    </div>

                    <div className={menuItemClasses("Test case generation")} onClick={() => setSelectedOperation("Test case generation")}>
                        <HiOutlineClipboardList size={24} /><span> Test case generation</span>
                    </div> */}
                </nav>
            )}
            <Toaster position="top-right" />
        </motion.div>
    );
};

export default Sidebar;
