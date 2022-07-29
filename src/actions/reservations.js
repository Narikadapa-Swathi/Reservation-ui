import{
    ADD_RESERVATION,
    RETRIEVE_RESERVATIONS,
    UPDATE_RESERVATION,
    DELETE_RESERVATION
} from './types';

import ReservationService from '../services/ReservationService';

export const addReservation = ({reservationType,source,destination}) => 
async (dispatch) => {

    try{
        const res = await ReservationService.create({ reservationType,source,destination });
    dispatch({
      type: ADD_RESERVATION,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const retrieveReservations = () => async (dispatch) => {
  try {
    const res = await ReservationService.getAll();
    dispatch({
      type: RETRIEVE_RESERVATIONS,
      payload:res.data,
    });
   
  
}
catch(err){return Promise.reject(err);}};


export const updateReservation = (reservationId,data) => async (dispatch) => {
  try {
    const res = await ReservationService.update(reservationId,data);
    dispatch({
      type: UPDATE_RESERVATION,
      payload: data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const  deleteReservation = (reservationId) => async (dispatch) => {
  try {
    await ReservationService.remove(reservationId);
    dispatch({
      type: DELETE_RESERVATION,
      payload: { reservationId },
    });
  } catch (err) {
    console.log(err);
  }
};
    

