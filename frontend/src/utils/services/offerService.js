/* auth.controller.js */
import axiosInstance from "@/helper/axios";
const useOffer = () => {
  const createOffer = async (offerData) => {
  
    try {
      const response = await axiosInstance.post("/offers/create?reqId=685e31076be8385c7f6f7289&studentId=685e04b678bc83ef03eff31d", offerData);
      
      return (response.data.data);
    } catch (error) {
      console.error(
        "Error verifying authentication",
        error.response?.data || error.message
      );
    }
  };

  const fetchOffers = async() => {
    try {
      const res = await axiosInstance.get("/offers/fetchOffers");
      return res.data.data;
    } catch (error) {
      console.error(error)
    }
  }

  const fetchOffersByReqId = async (reqId) => {
    try {
      const res = await axiosInstance.get(`/offers/fetchOffers-by-reqId?reqId=${reqId}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  const fetchOfferByReqId = async (reqId) => {
    try {
      const res = await axiosInstance.get(`/offers/fetchOffer-reqId?reqId=${reqId}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  

  return {
    createOffer,
    fetchOffers,
    fetchOffersByReqId,
    fetchOfferByReqId
  };
};

export default useOffer;
