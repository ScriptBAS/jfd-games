import PropTypes from "prop-types";

const Card = ({ data }) => {
    function sliceText(text) {
        if (!text) {
            return "";
        }
        if (text.length > 60) {
            return text.slice(0, 60) + "...";
        }
        return text;
    }

    return (
        <div className="card">
            <img src={data.image} className="card-img-top" alt={data.name} />
            <div className="card-body">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text">{sliceText(data.content)}</p>
            </div>
        </div>
    );
};

Card.propTypes = {
    data: PropTypes.object
};

export default Card;
