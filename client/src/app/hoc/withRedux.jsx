import { createStore } from "../store/createStore";
import { Provider } from "react-redux";
import AppLoader from "./appLoader";
const store = createStore();

const withRedux =
    (Component) =>
    ({ ...props }) => {
        return (
            <Provider store={store}>
                <AppLoader>
                    <Component {...props} />
                </AppLoader>
            </Provider>
        );
    };

export default withRedux;
