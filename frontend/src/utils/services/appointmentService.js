/* auth.controller.js */
import axiosInstance from "@/helper/axios";
const useAppoinment = () => {
  const createAppoinment = async (offerId, data) => {
    try {
      const response = await axiosInstance.post(
        `/appointments/create/${offerId}`,
        data
      );

      return response.data.data;
    } catch (error) {
      console.error(
        "Error verifying authentication",
        error.response?.data || error.message
      );
    }
  };

  const fetchAppoinment = async (offerId) => {
    try {
      const res = await axiosInstance.get(`/appointments/get-appointment/${offerId}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  };

 

  return {
    createAppoinment,
    fetchAppoinment,
  };
};

export default useAppoinment;
