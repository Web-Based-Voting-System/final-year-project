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

app.get("/", (req, res) => {
	res.send("Heyyy");
});

app.get("/category/:id", (req, res) => {
	const id = req.params.id;
	db.query(
		"SELECT * FROM category WHERE voteType_id = ?",
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

app.get("/votetype", (req, res) => {
	db.query("SELECT * FROM voteType", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});

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

app.post("/vote", (req, res) => {
	db.query(
		"SELECT users_id FROM vote_count WHERE users_id = ? AND category_id = ?",
		[req.body.user_id, req.body.category_id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				if (result.length > 0) {
					res.send("Has already voted");
				} else {
					db.query(
						"INSERT INTO vote_count (candidate_id, category_id, users_id) VALUES (?, ?, ?)",
						[req.body.candidate_id, req.body.category_id, req.body.user_id],
						(err, result) => {
							if (err) {
								console.log(err);
							} else {
								res.send("Success");
							}
						}
					);
				}
			}
		}
	);
});

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
			"INSERT INTO users(name, student_id, password) VALUES (?, ?, ?)",
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

							res.header(token).json({ auth: 1, token: token, user_id: user_id, name: name });
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

app.listen(8081, () => {
	console.log("Server runnning");
});
