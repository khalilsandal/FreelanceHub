import freelancers from "../data/freelancers.json";

export const getFreelancers = async () => {
      await new Promise((resolve) =>
        setTimeout(resolve, 400)
    );
    return freelancers;
};

export const getById = async (id) => {
      await new Promise((resolve) =>
        setTimeout(resolve, 400)
    );
    return freelancers.find(
        freelancer => freelancer.id == Number(id)
    );
};