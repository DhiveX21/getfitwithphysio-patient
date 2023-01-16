import { CONTROL_SUB_LOADING } from "../../store/types";
import { appointmentCreate } from "../../endpoint/Appointment";
import { setControlSubLoading } from "../../store/actions/controlActions";

// const startCall = () => async (dispatch) => {
//   dispatch({
//     type: CONTROL_SUB_LOADING,
//     cond: true,
//   });
// };

// const endCall = () => async (dispatch) => {
//   dispatch({
//     type: CONTROL_SUB_LOADING,
//     cond: true,
//   });
// };

// SERVICES ACTIONS
export const appointmentCreateActions = (body) => async (dispatch) => {
  dispatch(setControlSubLoading(true));
  appointmentCreate(body)
    .then((response) => {
      if (response.status === 200) {
        alert("Appointment berhasil di buat");
        dispatch(setControlSubLoading(false));
        router.push(`/appointment/${response.data.data._id}`);
      }
    })
    .catch((error) => {
      alert("Terjadi Keasalahan di Server");
      dispatch(setControlSubLoading(false));
    });
};
