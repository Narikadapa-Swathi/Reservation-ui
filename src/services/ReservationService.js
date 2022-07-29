import http from "../http-common";

const getAll = () => {
    return http.get("/viewAll");
  };
  const get = reservationId=> {
    return http.get(`/${reservationId}`);
  };
  const create =(addReservation,data) => {
    return http.post(`/${addReservation}`, data);
  };
  const update = (reservationId,data) => {
    return http.patch(`/${reservationId}`, data);
  };
  const remove = reservationId => {
    return http.delete(`/${reservationId}`);
  };

  const findByDate=(date,data)=>{
    return http.get(`/${date}`,data)
  }

  const ReservationService ={
    getAll,
    get,
    create,
    update,
    remove,
    findByDate,
  }
  export default ReservationService;