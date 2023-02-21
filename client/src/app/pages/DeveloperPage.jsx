import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import CardsList from "../components/ui/CardsList";
import { getDeveloperbyId } from "../store/developers";
import { getGamesByDeveloperId } from "../store/games";

const DeveloperPage = () => {
    const { developerId } = useParams();
    const games = useSelector(getGamesByDeveloperId(developerId));
    const developer = useSelector(getDeveloperbyId(developerId));

    if (!developer) {
        return <Navigate to="/developers" />;
    }

    return (
        <div className="container text-center mt-2">
            <div className="row align-items-center">
                <div className="col-md-4">
                    <img
                        src={developer.image}
                        className="img-fluid"
                        alt={developer.name}
                    />
                </div>
                <div className="col-md-8 fs-2">{developer.name}</div>
            </div>
            <div className="row mt-2">
                <h3>Игры разработчика</h3>
                <CardsList items={games} path={"games"} />
            </div>
        </div>
    );
};

export default DeveloperPage;
