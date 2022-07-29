import{
    ADD_RESERVATION,
    RETRIEVE_RESERVATIONS,
    UPDATE_RESERVATION,
    DELETE_RESERVATION
} from '../actions/types';

const initialState = [];
  function reservationReducer(reservations = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case ADD_RESERVATION:
        return [...reservations, payload];
      case RETRIEVE_RESERVATIONS:
        return payload;
      case UPDATE_RESERVATION:
        return reservations.map((reservation) => {
          if (reservation.reservationId === payload.reservationId) {
            return {
              ...reservation,
              ...payload,
            };
          } else {
            return reservation;
          }
        });
      case DELETE_RESERVATION:
        return reservations.filter(({reservationId }) =>reservationId !== payload.reservationId);
      
      default:
        return reservations;
    }
  };
  export default reservationReducer;