import jobs from "../data/jobs.json";
import axios from "axios";

export const getJobs = async () => {
  const response = await axios.get("/api/jobs");
    return response.data;
};

export const getJobById = async (id) => {
    await new Promise((resolve) =>
        setTimeout(resolve, 400)
    );

  return jobs.find(
    (job) => job.id === Number(id)
  );
};