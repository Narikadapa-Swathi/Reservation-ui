import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReservation } from '../actions/reservations';
import { Link } from 'react-router-dom';
export default function AddReservationForm(props){

const dispatch=useDispatch();

const initialFormState ={

    reservationId:'0',
    
    reservationType:'',
    //reservationDate:'',
    //reservationTime:'',
    source:'',
    destination:''

}
const [reservation,setReservation]=useState(initialFormState);

const handleInputChange = (event)=>{
    const {name,value} =event.target;
   
    setReservation({...reservation,[name]:value});
 }
 const submitHandler=(event)=>{event.preventDefault();
    if( !reservation.reservationType || 
         !reservation.source ||!reservation.destination) return;
     console.log(reservation+'from addReservationform')
    props.addReservation(reservation);
   // dispatch(addReservation(reservation));
    setReservation(initialFormState);
    
    }
    
    return (

        <form onSubmit={submitHandler}>
     
     <label>reservationId</label>
     <input 
     type='number'
     name='reservationId'
     value={reservation.reservationId}
     onChange={handleInputChange}/><br></br>

    <label>reservationType</label>
     <input 
     type='text'
     name='reservationType'
     value={reservation.reservationType}
     onChange={handleInputChange}/><br></br>

    <label>source</label>
     <input 
     type='text'
     name='source'
     value={reservation.source}
     onChange={handleInputChange}/><br></br>

    <label>destination</label>
     <input 
     type='text'
     name='destination'
     value={reservation.destination}
     onChange={handleInputChange}/><br></br>

     <button >Reserve</button>
     
     <Link to='/' className='btn btn danger ml-2' >Cancel</Link>
     </form>
    )
}