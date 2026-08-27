import proposalsData from "../data/proposals.json";

const STORAGE_KEY = "freelance_hub_proposals";

// Get all proposals
export const getProposals = async () => {
  const storedProposals = localStorage.getItem(STORAGE_KEY);

  if (storedProposals) {
    return JSON.parse(storedProposals);
  }

  return proposalsData;
};

// Get proposals submitted by a specific freelancer
export const getFreelancerProposals = async (freelancerId) => {
  const proposals = await getProposals();

  return proposals.filter(
    (proposal) => proposal.freelancerId === freelancerId
  );
};

// Submit a new proposal
export const submitProposal = async (proposalData) => {
  const proposals = await getProposals();

  const newProposal = {
    id: Date.now(),
    ...proposalData,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const updatedProposals = [...proposals, newProposal];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedProposals)
  );

  return newProposal;
};

// Get a single proposal
export const getProposalById = async (proposalId) => {
  const proposals = await getProposals();

  return proposals.find(
    (proposal) => proposal.id === Number(proposalId)
  );
};