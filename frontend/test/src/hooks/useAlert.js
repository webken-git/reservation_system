import { useSelector, useDispatch } from "react-redux";
import { createAlert, selectAlerts } from "../store/alertSlice";

function useAlert() {
    const dispatch = useDispatch();

    return {
        alerts: useSelector(selectAlerts),
        createAlert: (alert) => dispatch(createAlert(alert)),
    };
}

export default useAlert;
