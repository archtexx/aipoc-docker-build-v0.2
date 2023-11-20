import useArchContext from "@/context/useArchContext";
import {
  Avatar,
  Button,
  Tooltip,
  useToast
} from "@chakra-ui/react";
import * as Collapsible from '@radix-ui/react-collapsible';
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { LuSend } from "react-icons/lu";
import { Radio, Rings } from 'react-loader-spinner';
import ReactMardown from "react-markdown";
import remarkGfm from "remark-gfm";
import logo from '../../public/aechtexxLogo.png';
import logoDark from '../../public/logodark.png';
import PopupModal from "../Modal";
import StaticText from "../staticText/StaticText";
import {
  chatBoxColor,
  inputStyle,
  msgStyle,
  replyContainerStyle,
  replyTextStyle,
  sendButtonStyle
} from './styles.js';

const MainContent = ({ mode, isOpen }) => {
  const toast = useToast()
  const [inputText, setInputText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([])
  const [ingestData, setIngestData] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const isSendButtonDisabled = inputText.trim() === "";
  const containerRef = useRef(null);
  const hiddenFileInput = useRef(null)
  const [excelConversation, setExcelConversation] = useState([])
  const [testGenConversation, setTestGenConversation] = useState([])
  const { textAppear, setTextAppear, disableBtn, setDisableddBtn, selectedOperation,
    conversation, setConversation, user, temperature, tokens, promptMsg, getFilesList } = useArchContext()

  useEffect(() => {
    scrollToBottom()
  });

  const scrollToBottom = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };

  const chatBoxColorClasses = chatBoxColor(mode);
  const msgStyleClasses = msgStyle(mode);
  const inputStyleClasses = inputStyle(mode);
  const sendButtonStyleClasses = sendButtonStyle(mode);
  const replyContainerStyleClasses = replyContainerStyle(mode);
  const replyTextStyleClasses = replyTextStyle(mode);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (selectedOperation === "Excel - Data Analysis") {
      // setfeedback(false)

      setTextAppear(false);
      setDisableddBtn(true)
      if (inputText.trim() === "") {
        return;
      }
      const newMessage = {
        user: inputText,
        reply: null,
        listItems: null,
        isOpen: false,
        loader: true,
      };

      setExcelConversation((prevConversation) => [...prevConversation, newMessage]);
      setInputText("");
      try {
        const customPrompMsg = `You are a helpful AI assistant and you are conversational. you are given file its content is represented by the following pieces of context, use them to answer the question at the end. If you don't know the answer, just say you don't know. Do NOT try to make up an answer. Use as much detail as possible when responding.`
        // const response = await axios.post(`http://localhost:5000/chat?query_param_value=${selectedOperation}`, { message: inputText, prompt: promptMsg || customPrompMsg, temperature: temperature, max_tokens: tokens, user_payload: selectedOperation });                
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat?query_param_value=${selectedOperation}`, {
          message: inputText,
          prompt: promptMsg || customPrompMsg,
          temperature: temperature,
          max_tokens: tokens,
          user_payload: selectedOperation
        });
        setExcelConversation((prevConversation) =>
          prevConversation.map((messageObj) => {
            if (messageObj === newMessage) {
              return {
                ...messageObj,
                reply: response.data.message,
                listItems: null,
                loader: false,
              };
            }
            return messageObj;
          })
        );
        if (inputText.trim() !== "") {
          setInputText("");
        }
      } catch (error) {
        console.log(error);
      }
      setDisableddBtn(false)
      // setfeedback(true)
    } else if (selectedOperation === "Test case generation") {
      // setfeedback(false)
      setTextAppear(false);
      setDisableddBtn(true)
      if (inputText.trim() === "") {
        return;
      }

      const newMessage = {
        user: inputText,
        reply: null,
        listItems: null,
        isOpen: false,
        loader: true,
      };

      setTestGenConversation((prevConversation) => [...prevConversation, newMessage]);
      setInputText("");
      try {
        const customPrompMsg = `You are a helpful AI assistant and you are conversational. you are given file its content is represented by the following pieces of context, use them to answer the question at the end. If you don't know the answer, just say you don't know. Do NOT try to make up an answer. Use as much detail as possible when responding.`
        // const response = await axios.post(`http://localhost:5000/chat?query_param_value=${selectedOperation}`, { message: inputText, prompt: promptMsg || customPrompMsg, temperature: temperature, max_tokens: tokens, user_payload: selectedOperation });
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat?query_param_value=${selectedOperation}`, { message: inputText, prompt: promptMsg || customPrompMsg, temperature: temperature, max_tokens: tokens, user_payload: selectedOperation });
        setTestGenConversation((prevConversation) =>
          prevConversation.map((messageObj) => {
            if (messageObj === newMessage) {
              return {
                ...messageObj,
                reply: response.data.message,
                loader: false,
              };
            }
            return messageObj;
          })
        );
        console.log(response.data)
        if (inputText.trim() !== "") {
          setInputText("");
        }
      } catch (error) {
        console.log(error);
      }
      setDisableddBtn(false)
      // setfeedback(true)
    } else {
      // setfeedback(false)
      setTextAppear(false);
      setDisableddBtn(true)
      if (inputText.trim() === "") {
        return;
      }

      const newMessage = {
        user: inputText,
        reply: null,
        listItems: null,
        isOpen: false,
        loader: true,
      };

      setConversation((prevConversation) => [...prevConversation, newMessage]);
      setInputText("");
      try {
        const customPrompMsg = `You are a helpful AI assistant and you are conversational. you are given file its content is represented by the following pieces of context, use them to answer the question at the end. If you don't know the answer, just say you don't know. Do NOT try to make up an answer. Use as much detail as possible when responding.`
        // const response = await axios.post(`http://localhost:5000/chat?query_param_value=${selectedOperation}`, { message: inputText, prompt: promptMsg || customPrompMsg, temperature: temperature, max_tokens: tokens, user_payload: selectedOperation });
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat?query_param_value=${selectedOperation}`, { message: inputText, prompt: promptMsg || customPrompMsg, temperature: temperature, max_tokens: tokens, user_payload: selectedOperation });
        let listItems = null
        if (response?.data?.source_information) {
          const documentNames = response.data.source_information.match(/'source':\s*'([^']+)'/g)?.map(match => {
            const sourceMatch = match.match(/'source':\s*'([^']+)'/);
            if (sourceMatch) {
              const source = sourceMatch[1];
              const fileName = source.split('/').pop();
              return fileName.replace('source_docs\\\\', ''); // Remove 'source_docs\\'
            }
            return '';
          });
          const pageNumberRegex = /'page':\s(\d+)/g;
          const pageNumbers = [...response.data.source_information?.matchAll(pageNumberRegex)]?.map(match => parseInt(match[1]));

          const pageContentRegex = /page_content='([^']+)/g;
          const pageContents = [...response.data.source_information?.matchAll(pageContentRegex)].map(match => match[1]);

          listItems = documentNames?.map((name, index) => ({
            document: name,
            line: pageContents[index]?.split("\\n").join(" "),
            page: `Page ${pageNumbers[index]}`
          }));
        }

        setConversation((prevConversation) =>
          prevConversation.map((messageObj) => {
            if (messageObj === newMessage) {
              return {
                ...messageObj,
                reply: response.data.message,
                listItems: listItems,
                loader: false,
              };
            }
            return messageObj;
          })
        );

        if (inputText.trim() !== "") {
          setInputText("");
        }
      } catch (error) {
        console.log(error);
      }
      setDisableddBtn(false)
      // setfeedback(true)
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  };

  const handleCollapsibleToggle = (index) => {
    setConversation((prevConversation) => {
      const updatedConversation = prevConversation.map((message, i) => {
        if (i === index) {
          return { ...message, isOpen: !message.isOpen };
        }
        return message;
      });
      return updatedConversation;
    });
  };
  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleInputChangeFile = async (e) => {
    setIsUploading(true)
    const files = e.target.files;
    console.log(files)
    if (files.length > 0) {
      const newSelectedFiles = Array.from(files);
      setSelectedFiles(newSelectedFiles);

      try {
        const formData = new FormData();
        newSelectedFiles.forEach((file) => {
          formData.append("file", file);
        });
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload?query_param_value=${selectedOperation}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Files uploaded successfully:", response.data);
        toast({
          title: "Files uploaded  successfully",
          position: 'top',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        getFilesList()
      } catch (error) {
        console.error("Error uploading files:", error);
        // toast.error("Error uploading files")
        toast({
          title: "Error uploading files",
          position: 'top',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });

      }
    }
    setIngestData(true);
    setIsUploading(false)
  }

  return (
    <div className={chatBoxColorClasses}>
      {selectedOperation && <><div className="flex p-6 h-4/5 relative flex-col overflow-y-auto overflow-x-auto" ref={containerRef}>
        {textAppear ? (
          <StaticText isOpen={isOpen} mode={mode} />
        ) : null}
        {selectedOperation === "Excel - Data Analysis" ? (excelConversation.map((message, index) => (
          <>
            <p key={index} className={msgStyleClasses}>
              <span><Avatar size="sm" bg='teal.500' name={user} /></span><span className="pl-8 text-lg">{message.user}</span>
            </p>
            {message.loader ? (<Rings />) : (
              <div>
                <Collapsible.Root className={replyContainerStyleClasses} open={message.isOpen} onOpenChange={() => handleCollapsibleToggle(index)}>
                  <div className={replyTextStyleClasses}>
                    <div className="flex flex-4 items-center w-full">
                      <Image src={mode ? logoDark : logo} height={50} width={50} />
                      <div className="p-4">
                        {<p className="pb-2 text-violet11 text-lg leading-[25px] w-full">{message?.reply}</p>}
                      </div>
                    </div>
                  </div>
                </Collapsible.Root>
              </div>
            )}
          </>
        ))) : selectedOperation === "Test case generation" ? (testGenConversation.map((message, index) => (
          <>
            <p key={index} className={msgStyleClasses}>
              <span><Avatar size="sm" bg='teal.500' name={user} /></span><span className="pl-8 text-lg">{message.user}</span>
            </p>
            {message.loader ? (<Rings />) : (
              <div>
                <Collapsible.Root className={replyContainerStyleClasses} open={message.isOpen} onOpenChange={() => handleCollapsibleToggle(index)}>
                  <div className={replyTextStyleClasses}>
                    <div className="flex flex-4 items-center w-full">
                      <Image src={mode ? logoDark : logo} height={50} width={50} />
                      <div className="p-4">
                        {/* <p className="pb-2 text-violet11 text-xl leading-[25px] w-full">test {message.reply}</p> */}
                        <ReactMardown children={message.reply} remarkPlugins={[remarkGfm]} />
                        {message?.listItems?.length > 0 && message.listItems.map((item, index) => (
                          <PopupModal link={item?.page} content={`${item.line}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Collapsible.Root>
              </div>
            )}
          </>
        ))) : (conversation.map((message, index) => (
          <>
            <p key={index} className={msgStyleClasses}>
              <span><Avatar size="sm" bg='teal.500' name={user} /></span><span className="pl-8 text-lg">{message.user}</span>
            </p>
            {message.loader ? (<Rings />) : (
              <div>
                <Collapsible.Root className={replyContainerStyleClasses} open={message.isOpen} onOpenChange={() => handleCollapsibleToggle(index)}>
                  <div className={replyTextStyleClasses}>
                    <div className="flex flex-4 items-center w-full">
                      <Image src={mode ? logoDark : logo} height={50} width={50} />
                      <div className="p-4">
                        <p className="pb-2 text-violet11 text-lg leading-[25px] w-full">{message.reply}</p>
                        {message?.listItems?.length > 0 && message.listItems.map((item, index) => (
                          <PopupModal link={item?.page} content={`${item.line}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Collapsible.Root>
              </div>
            )}
          </>
        )))}

      </div>
        <div className={`flex h-1/5 flex-col justify-center items-center px-8`}>
          <div className={`flex flex-row w-full justify-center items-center gap-1`}>
            <input
              type="text"
              className={inputStyleClasses}
              placeholder="Type Here"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              disabled={disableBtn}
            />
            {disableBtn ? (<Tooltip label="Send">
              <button className={sendButtonStyleClasses}>
                <Radio colors={mode ? ['#03e3fc', '#2B061E', '#361134'] : ['#4b5563', '#6b7280', '#9ca3af']} />
              </button>
            </Tooltip>) : (<Tooltip label="Send">
              <button className={sendButtonStyleClasses} onClick={handleSendMessage} disabled={isSendButtonDisabled}>
                <LuSend size="1.6em" />
              </button>
            </Tooltip>)}
            <div>
              <Button
                isLoading={isUploading}
                loadingText='Processing...'
                colorScheme={mode ? "white" : "black"}
                variant='outline'
                spinnerPlacement='start'
                onClick={handleClick}
                leftIcon={<BsUpload size="1.5em" color={mode ? "white" : "black"} />}
              >
                Upload Files
              </Button>
              <input type="file" ref={hiddenFileInput}
                onChange={(input) => handleInputChangeFile(input)}
                // directory="" webkitdirectory=""
                // accept="image/*,.pdf"
                multiple
                style={{ display: 'none' }} />
            </div>
          </div>
          <p className="text-xs">© Archtexx Consulting GmbH</p>
        </div> </>}
    </div>
  );
};

export default MainContent;