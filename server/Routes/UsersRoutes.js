import express from "express";
import {
	countEelectionVotes,
	getAllElectionCandidate,
	getElectionType,
	getOneCandidate,
	loginUser,
	voteForCandidate,
} from "../Controller/ElectionLogics.js";

const router = express.Router();
//This routes gets the type of election
router.get("/electiontype", getElectionType);

//This routes gets all categories in an election
router.get("/category/:id", getAllElectionCandidate);

//This routes helps to get candidates of a particular category
router.get("/candidate/:id", getOneCandidate);

//This routes helps to keep track of users votes
router.get("/votesCounts/:id", countEelectionVotes);

// This route insert users votes and check whether a user has already voted
router.post("/vote", voteForCandidate);

//This routes helps to authenticate users before they login
router.post("/loginUser", loginUser);

export default router;
