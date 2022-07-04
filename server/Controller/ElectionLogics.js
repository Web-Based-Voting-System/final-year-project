import mysql from "mysql";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
	database: "voting",
});

export const createElection = async (req, res) => {
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
};

export const createCategory = async (req, res) => {
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
};

export const getElectionType = async (req, res) => {
	db.query("SELECT * FROM election_type", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			return res.json(result);
		}
	});
};

export const getAllElectionCandidate = async (req, res) => {
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
};

export const getOneCandidate = async (req, res) => {
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
};

export const countEelectionVotes = async (req, res) => {
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
};

export const voteForCandidate = async (req, res) => {
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
};

export const createAnAdmin = async (req, res) => {
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
};

export const createUsers = async (req, res) => {
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
};

export const loginUser = async (req, res) => {
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
				bcrypt.compare(password, result[0].password, (err, response) => {
					if (err) {
						console.log(err);
					}
					if (response) {
						const user_id = result[0].id;
						const name = result[0].name;
						const token = Jwt.sign({ user_id, name }, "1244553345Ggfs$", {
							expiresIn: 300,
						});

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
				});
			} else {
				res.json({ auth: 0, message: "No user found" });
			}
		}
	);
};

export const loginAdmin = async (req, res) => {
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
				bcrypt.compare(password, result[0].password, (err, response) => {
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
				});
			} else {
				res.json({ auth: 0, message: "No user found" });
			}
		}
	);
};

export const createCandidate = async (req, res) => {
	const name = req.body.candidate_name;
	const img = req.file.filename;
	const category_id = req.body.category_id;

	db.query(
		"INSERT INTO candidates(candidate_name,img,category_id) VALUES (?, ?, ?)",
		[name, img, category_id],
		(err, result) => {
			if (err) {
				console.log(err);
				return res
					.status(200)
					.json({ success: false, message: "Candidate uploading failed" });
			}

			if (result) {
				return res.status(200).json({
					success: true,
					message: "Candidate uploaded successfully",
				});
			}
		}
	);
};
