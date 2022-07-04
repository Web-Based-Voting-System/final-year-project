import express from "express";
import multer from "multer";
import {
	countEelectionVotes,
	createAnAdmin,
	createCandidate,
	createCategory,
	createElection,
	createUsers,
	getAllElectionCandidate,
	getElectionType,
	getOneCandidate,
	loginAdmin,
	loginUser,
	voteForCandidate,
} from "../Controller/ElectionLogics.js";

const storage = multer.diskStorage({
	destination: "../candidates images",
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		return cb(null, uniqueSuffix + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/png" ||
		file.mimetype === "image/webp"
	) {
		cb(null, true);
	} else {
		cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
	}
};

const upload = multer({
	storage,
	fileFilter,
});

const router = express.Router();

//This routes helps admin to create votes
router.post("/create-vote", createElection);

//This routes helps admin to create votes category
router.post("/create-category", createCategory);

router.post("/create-candidate", upload.single("img"), createCandidate);

//This routes are for both admin and users
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

//This routes helps to create new admins
router.post("/createadmin", createAnAdmin);

//This routes helps to create new users
router.post("/createUser", createUsers);

//This routes helps to authenticate users before they login
router.post("/loginUser", loginUser);

//This routes helps to authenticate admins before they login
router.post("/loginAdmin", loginAdmin);

export default router;
