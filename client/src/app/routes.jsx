import { Navigate } from "react-router-dom";
import CategoryLayout from "./layouts/CategoryLayout";
import DevelopersLayout from "./layouts/DevelopersLayout";
import GamesLayout from "./layouts/GamesLayout";
import AddGame from "./pages/AddGame";
import CateroryPage from "./pages/CateroryPage";
import DeveloperPage from "./pages/DeveloperPage";
import Developers from "./pages/Developers";
import Games from "./pages/Games";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProfileLayout from "./layouts/ProfileLayout";
import EditProfile from "./pages/EditProfile";
import UserPage from "./pages/UserPage";
import Categories from "./pages/Categories";
import SearchResults from "./pages/SearchResults";
import EditGame from "./pages/EditGame";
import Dashboard from "./pages/Dashboard";
import GamePageLayout from "./layouts/GamePageLayout";
import LogOut from "./layouts/LogOut";

const routes = () => [
    {
        path: "/",
        element: <MainPage />
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "search",
        element: <SearchResults />
    },
    {
        path: "register",
        element: <Register />
    },
    {
        path: "logout",
        element: <LogOut />
    },
    {
        path: "admin",
        element: <Dashboard />
    },
    {
        path: "users/:userId",
        element: <UserPage />
    },
    {
        path: "games",
        element: <GamesLayout />,
        children: [
            {
                path: "",
                element: <Games />
            },
            {
                path: "add",
                element: <AddGame />
            },
            {
                path: ":gameId",
                element: <GamePageLayout />
            },
            {
                path: ":gameId/edit",
                element: <EditGame />
            },
            {
                path: "*",
                element: <Navigate to="/games" />
            }
        ]
    },
    {
        path: "categories",
        element: <CategoryLayout />,
        children: [
            {
                path: "",
                element: <Categories />
            },
            {
                path: ":categoryId",
                element: <CateroryPage />
            },
            {
                path: "*",
                element: <Navigate to="/games" />
            }
        ]
    },
    {
        path: "developers",
        element: <DevelopersLayout />,
        children: [
            {
                path: "",
                element: <Developers />
            },
            {
                path: ":developerId",
                element: <DeveloperPage />
            },
            {
                path: "*",
                element: <Navigate to="/developers" />
            }
        ]
    },
    {
        path: "profile",
        element: <ProfileLayout />,
        children: [
            {
                path: "",
                element: <Profile />
            },
            {
                path: "edit",
                element: <EditProfile />
            },
            {
                path: "*",
                element: <Navigate to="/profile" />
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
];

export default routes;
