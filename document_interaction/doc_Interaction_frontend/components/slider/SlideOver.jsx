import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import SliderContainer from './SliderContainer';
import { Select, Text, Textarea, useToast } from '@chakra-ui/react';
import FileListing from '../navbar/FileListing';
import useArchContext from '@/context/useArchContext';
import clsx from 'clsx';
import { HiCog } from 'react-icons/hi';
import ToggleMode from '../button/ToggleMode';

const SlideOver = ({ toggleDarkMode, mode }) => {
    const [open, setOpen] = useState(true);
    const {
        temperature,
        setTemperature,
        tokens,
        setToken,
        promptMsg,
        setPromptMsg,
    } = useArchContext();

    const [temperatureValue, setTemperatureValue] = useState(temperature);
    const [tokenValue, setTokenValue] = useState(tokens);
    const [promptValue, setPromptValue] = useState(promptMsg);
    const options = ['Open AI', 'Vertex AI'];
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        setTemperature(temperatureValue);
        setToken(tokenValue);
        setPromptMsg(promptValue);
        toast({
            title: 'Settings updated successfully',
            position: 'top',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <>
            <ToggleMode toggleDarkMode={toggleDarkMode} mode={mode} />
            <button
                className={`fixed bottom-4 right-4 p-2 rounded-full shadow-md focus:outline-none focus:ring focus:border-blue-300 ${mode ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                onClick={() => setOpen(true)}
            >
                <HiCog size={24} />
            </button>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className={`fixed inset-0 ${mode ? 'bg-gray-800' : 'bg-gray-500'} bg-opacity-75 transition-opacity`} />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className={`absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4 ${mode ? 'text-white' : 'text-gray-300'}`}>
                                                <button
                                                    type="button"
                                                    className={`relative rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white ${mode ? 'text-gray-300' : 'text-white'
                                                        }`}
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="absolute -inset-2.5" />
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className={`flex h-full flex-col overflow-y-scroll ${mode ? 'bg-gray-800' : 'bg-white'} py-6 shadow-xl`}>
                                            <div className="px-4 sm:px-6">
                                                <Dialog.Title className={`text-xl flex gap-2 font-medium leading-6 ${mode ? 'text-white' : 'text-gray-900'}`}>
                                                    <HiCog size={24} /> <span> Settings</span>
                                                </Dialog.Title>
                                            </div>
                                            <div className={`relative mt-6 flex-1 px-4 sm:px-6`}>
                                                <div className="mx-5 flex flex-col gap-y-2">
                                                    <label htmlFor="operation" className={`font-medium ${mode ? 'text-white' : 'text-gray-900'}`}>Choice of Gen AI</label>
                                                    <Select defaultValue={options[0]} className={`font-medium ${mode ? 'text-white' : 'text-gray-900'}`}>
                                                        {options.map((value, index) => (
                                                            <option className='font-medium text-gray-900' key={index} value={value}>{value}</option>
                                                        ))}
                                                    </Select>
                                                    <SliderContainer
                                                        defaultValue={temperatureValue}
                                                        min={0.1}
                                                        step={0.1}
                                                        max={1.0}
                                                        title="Temperature"
                                                        sliderValue={temperatureValue}
                                                        onChange={(val) => setTemperatureValue(val)}
                                                        mode={mode}
                                                    />

                                                    <SliderContainer
                                                        defaultValue={tokenValue}
                                                        min={1}
                                                        step={1}
                                                        max={1024}
                                                        title="Tokens"
                                                        sliderValue={tokenValue}
                                                        onChange={(val) => setTokenValue(val)}
                                                        mode={mode}
                                                    />

                                                    <Text mb="8px" fontSize="lg" className={`font-medium ${mode ? 'text-white' : 'text-gray-900'}`}>
                                                        Prompt
                                                    </Text>
                                                    <Textarea
                                                        value={promptValue}
                                                        onChange={(e) => setPromptValue(e.target.value)}
                                                        placeholder={`You are a helpful AI assistant and you are conversational. you are given file its content is represented by the following pieces of context, use them to answer the question at the end. If you don't know the answer, just say you don't know. Do NOT try to make up an answer. Use as much detail as possible when responding.`}
                                                        size="md"
                                                        h="200px"
                                                        className={`font-medium ${mode ? 'text-white' : 'text-gray-900'}`}
                                                    />
                                                    <div className="flex justify-end">
                                                        <button
                                                            onClick={handleSubmit}
                                                            className={clsx('w-auto p-2 rounded-lg cursor-pointer', {
                                                                'bg-white border-2 border-gray-400 hover:bg-slate-100': !mode,
                                                            })}
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>

                                                    <FileListing mode={mode} />
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default SlideOver;
