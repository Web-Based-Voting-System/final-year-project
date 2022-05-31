import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
	database: "voting",
});

//This route just confirms whether the server is running or not
app.get("/", (req, res) => {
	res.send("Heyyy");
});

//This routes are for admins

//This routes helps admin to create votes
app.post("/create-vote", (req, res) => {
	db.query(
		"INSERT INTO election_type(election_name, election_description) VALUES (?, ?)",
		[req.body.election_name, req.body.election_description],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Vote created");
			}
		}
	);
});

//This routes helps admin to create votes category
app.post("/create-category", (req, res) => {
	db.query(
		"INSERT INTO category(election_type_id, category_name, category_desc) VALUES (?, ?, ?)",
		[
			req.body.election_type_id,
			req.body.category_name,
			req.body.category_description,
		],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Category created");
			}
		}
	);
});

//This routes are for both admin and users
//This routes gets the type of election
app.get("/electiontype", (req, res) => {
	db.query("SELECT * FROM election_type", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			return res.json(result);
		}
	});
});




//This routes gets all categories in an election
app.get("/category/:id", (req, res) => {
	const id = req.params.id;
	db.query(
		"SELECT * FROM category WHERE election_type_id = ?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.json(result);
			}
		}
	);
});



//This routes helps to get candidates of a particular category
app.get("/candidate/:id", (req, res) => {
	const id = req.params.id;

	db.query(
		"SELECT * FROM candidates WHERE category_id = ?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.json(result);
			}
		}
	);
});



//This routes helps to keep track of users votes
app.get("/votesCounts/:id", (req, res) => {
	const id = req.params.id;

	db.query(
		"SELECT * FROM vote_count WHERE category_id = ?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.json(result);
			}
		}
	);
});



// This route insert users votes and check whether a user has already voted
app.post("/vote", (req, res) => {
	db.query(
		"SELECT users_id FROM vote_count WHERE users_id = ? AND category_id = ?",
		[req.body.user_id, req.body.category_id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				if (result.length > 0) {
					res.send("You have already voted in this category");
				} else {
					db.query(
						"INSERT INTO vote_count (candidate_id, category_id, users_id) VALUES (?, ?, ?)",
						[
							req.body.candidate_id,
							req.body.category_id,
							req.body.user_id,
						],
						(err, result) => {
							if (err) {
								console.log(err);
							} else {
								res.send("Thank you for voting");
							}
						}
					);
				}
			}
		}
	);
});



//This routes helps to create new admins
app.post("/createadmin", (req, res) => {
	const admin_id = req.body.admin_id;
	const admin_name = req.body.admin_name;
	const password = req.body.password;

	let salt = bcrypt.genSaltSync(10);

	bcrypt.hash(password, salt, (err, hash) => {
		if (err) {
			console.log(err);
		}

		db.query(
			"INSERT INTO admin(admin_id, admin_name, password) VALUES (?, ?, ?)",
			[admin_id, admin_name, hash],
			(err, result) => {
				if (err) {
					console.log(err);
				} else {
					res.send("Success");
				}
			}
		);
	});
});

//This routes helps to create new users
app.post("/createUser", (req, res) => {
	const name = req.body.name;
	const student_id = req.body.student_id;
	const password = req.body.password;

	let salt = bcrypt.genSaltSync(10);

	bcrypt.hash(password, salt, (err, hash) => {
		if (err) {
			console.log(err);
		}

		db.query(
			"INSERT INTO users(name, student_id, election_type_id, password) VALUES (?, ?, ?)",
			[name, student_id, hash],
			(err, result) => {
				if (err) {
					console.log(err);
				} else {
					res.send("Success");
				}
			}
		);
	});
});





//This routes helps to authenticate users before they login 
app.post("/loginUser", (req, res) => {
	const student_id = req.body.student_id;
	const password = req.body.password;

	db.query(
		"SELECT * FROM users WHERE student_id = ?",
		student_id,
		(err, result) => {
			if (err) {
				console.log(err);
			}
			if (result.length > 0) {
				bcrypt.compare(
					password,
					result[0].password,
					(err, response) => {
						if (err) {
							console.log(err);
						}
						if (response) {
							const user_id = result[0].id;
							const name = result[0].name;
							const token = Jwt.sign(
								{ user_id, name },
								"1244553345Ggfs$",
								{ expiresIn: 300 }
							);

							res.header(token).json({
								auth: 1,
								token: token,
								user_id: user_id,
								name: name,
							});
						} else {
							res.json({
								auth: 0,
								message: "Id / Password does not match",
							});
						}
					}
				);
			} else {
				res.json({ auth: 0, message: "No user found" });
			}
		}
	);
});

//This routes helps to authenticate admins before they login 
app.post("/loginAdmin", (req, res) => {
	const admin_Id = req.body.admin_Id;
	const password = req.body.password;

	db.query(
		"SELECT * FROM admin WHERE admin_Id = ?",
		admin_Id,
		(err, result) => {
			if (err) {
				console.log(err);
			}
			if (result.length > 0) {
				bcrypt.compare(
					password,
					result[0].password,
					(err, response) => {
						if (err) {
							console.log(err);
						}
						if (response) {
							const admin_Id = result[0].admin_Id;
							const name = result[0].admin_name;
							const token = Jwt.sign(
								{ admin_Id, name },
								"1244553345Ggfs$",
								{ expiresIn: 300 }
							);

							res.status(200).json({
								auth: 1,
								token: token,
								admin_Id: admin_Id,
								name: name,
							});
						} else {
							res.json({
								auth: 0,
								message: "Id / Password does not match",
							});
						}
					}
				);
			} else {
				res.json({ auth: 0, message: "No user found" });
			}
		}
	);
});

//The application is running on port 8081
const Port = 8081;

app.listen(Port, () => {
	console.log(`Server runnning on ${Port}`);
});
