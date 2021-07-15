import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/pages/Home";
import Register from "./Components/pages/Register";
import Login from "./Components/pages/Login";
import MenuBar from "./Components/MenuBar";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute.js";
import SinglePost from "./Components/pages/SinglePost";

import 'semantic-ui-css/semantic.min.css'
function App() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<MenuBar />
					<Route exact path='/' component={Home}></Route>
					<AuthRoute exact path="/register" component={Register}></AuthRoute>
					<AuthRoute exact path="/login" component={Login}></AuthRoute>
					<Route exact path="/post/:postId" component={SinglePost}></Route>
				</Container>
			</Router>
		</AuthProvider>

	);
}

export default App;
