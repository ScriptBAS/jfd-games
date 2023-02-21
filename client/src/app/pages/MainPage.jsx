import { useSelector } from "react-redux";
import Sidebar from "../components/ui/Sidebar";
import { getCategories } from "../store/categories";
import Games from "./Games";

const MainPage = () => {
    const categories = useSelector(getCategories());
    return (
        <div className="d-flex">
            <div className="d-flex flex-column flex-shrink-0 p-3">
                <Sidebar categories={categories} />
            </div>
            <div className="d-flex flex-column">
                <Games />
            </div>
        </div>
    );
};

export default MainPage;
