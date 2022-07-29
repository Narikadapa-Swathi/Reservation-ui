import React ,{useState,useEffect}from 'react'
import { useSelector,useDispatch } from 'react-redux'


import {
    retrieveReservations,

} from '../actions/reservations'
export default function ReservationList(props){

    const dispatch=useDispatch();
    const [currentReservation,setCurrentReservation]=useState({});
    const [currentIndex,setCurrentIndex]=useState(-1);

    const reservations = useSelector((state)=>state.reservations);
      
    useEffect(()=>{
        dispatch(retrieveReservations());
      },[]);

    
     const refreshData=()=>{
        setCurrentReservation(null);
        setCurrentIndex(-1);
    } 
 

     const setActiveReservation = (reservation,index)=>{
        setCurrentReservation(reservation);
        setCurrentIndex(index);

    } 

    return(

        <table border='5'>
        <thead>
            <tr>
                <th>RESERVATION ID</th>
                <th>RESERVATION TYPE</th>
                <th>RESERVATION DATE</th>
                <th>RESERVATION TIME</th>
                <th>SOURCE</th>
                <th>DESTINATION</th>
            </tr>
        </thead>
        <tbody>
    
            {reservations?.length > 0 ? (
            reservations.map((reservation)=>(
                <tr key={reservation.reservationId}>

                <td>{reservation.reservationId}</td>
                <td>{reservation.reservationType}</td>
                <td>{reservation.reservationDate}</td>
                <td>{reservation.reservationTime}</td>
                <td>{reservation.source}</td>
                <td>{reservation.destination}</td><br/>

                <td><button 
                onClick={()=>{props.editReservation(reservation)}}
                className="button muted-button">Edit</button></td><br/>
                <td><button 
                onClick={()=>props.deleteReservation(reservation.reservationId)}
                className="button muted-button">Delete</button></td>
        
     </tr>))):(
        <tr>
            <td colSpan={6}>No Reservation</td>
        </tr>
     )}

        </tbody>
        </table>
    )


}