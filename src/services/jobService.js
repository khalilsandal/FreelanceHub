import jobs from "../data/jobs.json";

export const getJobs = async () => {
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  return jobs;
};

export const getJobById = async (id) => {
    await new Promise((resolve) =>
        setTimeout(resolve, 1000)
    );

  return jobs.find(
    (job) => job.id === Number(id)
  );
};