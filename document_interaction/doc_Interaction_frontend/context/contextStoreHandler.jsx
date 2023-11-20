import { createContext, useCallback, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ArchtexxContext = createContext()

function Provider({ children }) {
  const [user, setUser] = useState()
  const [userId, setUserId] = useState()
  //used for selecting which chatroom is acive
  const [chatRoomId, setChatRoomId] = useState()

  const [allChatRooms, setAllChatRooms] = useState([])
  // for static text on main content
  const [textAppear, setTextAppear] = useState(true);
  // for disabling the button after text is send and also for the loaders to appear on the screen in maincontent
  const [disableBtn, setDisableddBtn] = useState(false)

  //maincontent conversation usestate all chats are storing over here
  const [conversation, setConversation] = useState([]);

  const [temperature, setTemperature] = useState(0.6); // temperature value
  const [tokens, setToken] = useState(512); // tokens
  const [promptMsg, setPromptMsg] = useState("You are a helpful AI assistant and you are conversational. you are given file its content is represented by the following pieces of context, use them to answer the question at the end. If you don't know the answer, just say you don't know. Do NOT try to make up an answer. Use as much detail as possible when responding.");  // promptMsg
  const [fileList, setFileList] = useState([]);
  const [loading,setLoading] = useState(false)
  const [selectedOperation, setSelectedOperation] = useState("")

  async function getFilesList() {
    const response = await axios.get(
      // `http://localhost:5000/listdocs/${selectedOperation}`
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/listdocs/${selectedOperation}`
    );
    console.log(response)
    if (response?.data?.files?.length > 0) {
      setFileList(response.data.files)
    }
  }

  async function deleteFile(name) {
    setLoading(true)
    try {
      // const response = await axios.post(`http://localhost:5000/delete_files/${selectedOperation}`,{fileName:name});
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delete_files/${selectedOperation}`,{fileName:name});
      if(response?.data?.message){
        toast.success(response.data.message)
        setFileList(fileList.filter(it=> it !== name))
      }
    } catch (error) {
      console.error(error);
      toast
      .error(error)
      // Handle error case
    }
    setLoading(false)
  }

  const getAllChatList = useCallback(async () => {
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:8000/api/getAllchatrooms/${userId}`);
        setAllChatRooms(response.data.reverse());
      } catch (error) {
        console.error(error);
        // Handle error case
      }
    }
  }, [userId]);


  const getConversation = useCallback(async () => {
    if (conversation.length === !0) { setTextAppear(false) }
    if (chatRoomId) {
      const response = await axios.get(`http://localhost:8000/api/getMessages/${chatRoomId}`)
      console.log(response.data.messages)
      const filteredMessages = response.data.messages.filter((message) => message !== null);
      if (filteredMessages.length !== 0) {
        setConversation(filteredMessages);
      }
    }
  }, [chatRoomId])

  useEffect(() => {
    console.log(conversation);
  }, [conversation]);


  const valueToShare = {
    user, setUser,
    userId, setUserId,
    allChatRooms, getAllChatList,
    textAppear, setTextAppear,
    disableBtn, setDisableddBtn,
    conversation, setConversation,
    chatRoomId, setChatRoomId,
    getConversation, temperature, setTemperature, tokens, setToken, promptMsg, setPromptMsg, fileList, getFilesList, deleteFile,
    loading, setLoading, selectedOperation, setSelectedOperation
  }
  

  return (
    <ArchtexxContext.Provider value={valueToShare}>
      {children}
    </ArchtexxContext.Provider>
  )
}

export { Provider }
export default ArchtexxContext
