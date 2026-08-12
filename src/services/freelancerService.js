import freenlancers from "../data/freenlancers.json";

export const getFreelancers = async () => {
    return freenlancers;
};

export const getById = async (id) => {
    return freenlancers.find(
        freelancer => freelancer.id == Number(id)
    );
};