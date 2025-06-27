/* auth.controller.js */
import axiosInstance from "@/helper/axios";
const useChat = () => {
  const createChat = async (receiverId, offerId, message) => {
    try {
      const response = await axiosInstance.post(
        `/chats/create/${receiverId}?offerId=${offerId}`,
        {message}
      );

      return response.data.data;
    } catch (error) {
      console.error(
        "Error verifying authentication",
        error.response?.data || error.message
      );
    }
  };

  const fetchChats = async (offerId) => {
    try {
      const res = await axiosInstance.get(`/chats/get-all-chats/${offerId}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  };

 

  return {
    createChat,
    fetchChats,
  };
};

export default useChat;
