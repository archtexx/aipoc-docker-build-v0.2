import React, { useState } from 'react';
import clsx from 'clsx';
import Sidebar from '@/components/navbar/Sidebar';
import TopBar from '@/components/navbar/TopBar';
import Footer from '@/components/navbar/Footer';
import MainContent from '@/components/content/MainContent';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Loader from '@/components/Loader';
import useArchContext from '@/context/useArchContext';
import SlideOver from '@/components/slider/SlideOver'


const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Select Options');
    const {loading, selectedOperation, setSelectedOperation} = useArchContext()
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };``

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const buttonClass = clsx({
        'h-screen': true,
        'bg-gray-800 text-white': isDarkMode, // Dark mode styles
        'bg-white text-gray-800': !isDarkMode, // Light mode styles
    });

    const drawerBackground = isDarkMode ? '#1F2937' : '#fff';

    const theme = extendTheme({
        components: {
            Drawer: {
                baseStyle: {
                    dialog: {
                        bg: drawerBackground, // Set the desired background color here
                        borderTopRightRadius: '10px',
                        borderBottomRightRadius: '10px',
                    },
                },
            },
        },
    });

    return (
        <ChakraProvider theme={theme}>
            {loading && <Loader />}
            <div className="overflow-hidden">
                <div className={buttonClass}>
                    <div className="h-full flex flex-col relative">
                        <div>
                            <TopBar
                                toggleDarkMode={toggleDarkMode}
                                mode={isDarkMode}
                                toggleSidebar={toggleSidebar}
                                selectedOperation = {selectedOperation}
                            />
                        </div>

                        <div className="flex-grow flex mb-2">
                            <Sidebar
                                isOpen={isOpen}
                                mode={isDarkMode}
                            />
                            <div className={`mx-24 flex flex-col items-center ${isOpen && "ml-0"}`} style={{ width: `calc(100vw - ${isOpen ? '400px' : '190px'})` }}>
                                {/* <div className="flex items-center"> */}
                                    {/* <h2 className="text-sm font-medium italic">{selectedOption}</h2> */}
                                {/* </div> */}
                                <MainContent
                                    mode={isDarkMode}
                                    isOpen={isOpen}
                                />
                            </div>
                        </div>
                        {/* <div className="mt-auto fixed bottom-0 w-full">
                            <Footer
                                toggleDarkMode={toggleDarkMode}
                                mode={isDarkMode}
                            />
                        </div> */}
                        <SlideOver toggleDarkMode={toggleDarkMode} mode={isDarkMode}/>
                    </div>
                </div>
            </div>
        </ChakraProvider>
    );
};

export default Home;
