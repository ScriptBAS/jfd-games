import { useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import withRedux from "./hoc/withRedux";
import withRouter from "./hoc/withRouter";
import routes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
    const elements = useRoutes(routes());

    return (
        <div className="container">
            <Navbar />
            {elements}
            <ToastContainer />
        </div>
    );
}

export default withRedux(withRouter(App));
