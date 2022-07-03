import express from "express";
import cors from "cors";
import {
	countEelectionVotes,
	createAnAdmin,
	createCategory,
	createElection,
	createUsers,
	getAllElectionCandidate,
	getElectionType,
	getOneCandidate,
	loginAdmin,
	loginUser,
	voteForCandidate,
} from "./Controller/ElectionLogics.js";
import AdminRouter from "./Routes/AdminRoutes.js";
import UsersRoutes from "./Routes/UsersRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

//This route just confirms whether the server is running or not
app.get("/", (req, res) => {
	res.send("Heyyy");
});

//This routes are for admins
app.use("/admin", AdminRouter);
//This routes are for users
app.use("/users", UsersRoutes);

//The application is running on port 8081
const Port = 8081;

app.listen(Port, () => {
	console.log(`Server runnning on ${Port}`);
});
