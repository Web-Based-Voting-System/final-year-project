import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Guest/HomePage";
import LoginPage from "./Pages/Guest/LoginPage";
import SignupPage from "./Pages/Guest/SignupPage";
import CategoriesPage from "./Pages/Auth/Votings/CategoriesPage";
import VotingPage from "./Pages/Auth/Votings/VotingPage";
import VotingSelection from "./Pages/Auth/Votings/VotingSelection";
import VotingResultsCategory from "./Pages/Auth/Results/VotingResultsCategory";
import VotingResultsSelection from "./Pages/Auth/Results/VotingResultsSelection";
import VotingResultsPage from "./Pages/Auth/Results/VotingResultsPage";

function App() {

	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/select-vote" element={<VotingSelection />} />
			<Route
				path="/select-vote/categories/:id"
				element={<CategoriesPage />}
			/>
			<Route path="/categories/candidates/:id" element={<VotingPage />} />
			<Route path="/results" element={<VotingResultsSelection />} />
			<Route
				path="/results/categories/:id"
				element={<VotingResultsCategory />}
			/>
			<Route
				path="/results/categories/candidates/:id"
				element={<VotingResultsPage />}
			/>
		</Routes>
	);
}

export default App;
