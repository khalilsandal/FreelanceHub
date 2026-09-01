import proposalsData from "../data/proposals.json";
import axios from "axios";
import { useSelector } from "react-redux";

const STORAGE_KEY = "freelance_hub_proposals";

// Get all proposals
export const getProposals = async () => {
  const response = await axios.get("/api/proposals");
    return response.data;
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
    ...proposalData,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await axios.post(
    "/api/proposals",
     newProposal
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