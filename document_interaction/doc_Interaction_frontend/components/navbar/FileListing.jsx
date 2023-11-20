import React, { useEffect } from 'react';
import { Tooltip, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Toaster } from "react-hot-toast";
import useArchContext from "@/context/useArchContext";

export default function FileListing({ mode }) {
    // Destructuring values from useArchContext
    const { fileList, deleteFile, getFilesList, selectedOperation } = useArchContext();

    // Fetch files list when selectedOperation changes
    useEffect(() => {
        if (selectedOperation) {
            getFilesList();
        }
    }, [selectedOperation]);

    return (
        <>
            <Text fontSize="lg" className={`font-medium ${mode ? 'text-white' : 'text-gray-900'}`}>
                File Listing
            </Text>

            {selectedOperation && fileList?.length > 0 ? (
                <OrderedList>
                    {fileList.map((file) => (
                        // Key prop added for better performance
                        <ListItem key={file}>
                            <Tooltip label={file}>
                                <div className={`flex justify-between items-center ${mode ? 'text-white bg-gray-800' : 'text-gray-900 bg-white'}`}>
                                    <span className={`truncate flex-1 ${mode ? 'text-gray-300' : 'text-gray-800'}`}>{file}</span>
                                    <TrashIcon
                                        className={`cursor-pointer text-red-600 hover:scale-110 ${mode ? 'text-white' : 'text-gray-600'}`}
                                        onClick={() => deleteFile(file)}
                                    />
                                </div>
                            </Tooltip>
                        </ListItem>
                    ))}
                </OrderedList>
            ) : (
                <div className={`font-medium ${mode ? 'text-white' : 'text-gray-900'}`}>
                    No files available
                </div>
            )}
        </>
    );
}
