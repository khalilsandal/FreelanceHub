import freelancers from "../data/freelancers.json";
import axios from "axios";

export const getFreelancers = async () => {
    const response = await axios.get("/api/freelancer");
    return response.data;
};

export const getById = async (id) => {
      await new Promise((resolve) =>
        setTimeout(resolve, 400)
    );
    return freelancers.find(
        freelancer => freelancer.id == Number(id)
    );
};