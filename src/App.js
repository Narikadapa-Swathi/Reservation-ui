import logo from './logo.svg';
import './App.css';
import ReservationList from './components/ReservationList';
import AddReservationForm from './components/AddReservationForm';
import {useState, useEffect} from 'react';
import apiClient from './http-common';
import {BrowserRouter,Route, Routes,Link} from 'react-router-dom';
import EditReservationForm from './components/EditReservationForm';
function App() {
  const [reservations,setReservations]=useState([]);

  useEffect(()=>{apiClient.get("/viewAll").then((response)=>{
    setReservations(response.data);
  })},[])

  const [editing,setEditing]=useState(false);

  const initialFormState ={
    reservationId:'0',
    reservationType:'',
    source:'',
    destination:''

  }

  const [currentReservation,setCurrentReservation] 
     =useState(initialFormState);

     async function addReservation(reservation){
      try{
      const response=await apiClient.post('/addReservation',reservation);
        setReservations([...reservations,response.data]);
        console.log(reservations);
        
      }catch(err){
        console.log(err)
      }
      
    }

    async function deleteReservation(reservationId){
      await apiClient.delete(`/${reservationId}`);
        setReservations(reservations.filter((reservation)=>reservation.reservationId !== reservationId));
      }
      
      const editReservation=(reservation)=>{
    
        setEditing(true);
          setCurrentReservation
          ({reservationId:reservation.reservationId,reservationType:reservation.reservationType,
            source:reservation.source, destination:reservation.destination})
         
      }
      
      const updateReservation = (reservationId,updatedReservation)=>{
      
        setEditing(false);
        apiClient.put(`/${reservationId}`,updatedReservation).then((response)=>
        {
      
          console.log('reservation updated');
          setReservations(reservations.map((reservation)=>
        (reservation.reservationId === reservationId ? updateReservation : reservation)));
        })
        
      }

    const findByDate=(date,data)=>{
      setEditing(true);
      apiClient.post(`/${date}`,data).then((response)=>{
        console.log('reservation date updated')
        setReservations(reservations.map((reservation)=>
        (reservation.date===date ? findByDate :date)));
      })
      
    }
    

  return (

    <div>
    <div className='container'>
    <h1>Reservation Crud app with hooks</h1>
    <div className='flex-row'>
      <div className='flex-large'>
        {editing ? (
        <div>
          <h2>Edit Reservation Form </h2>
          <EditReservationForm
           setEditing={setEditing}
           currentReservation={currentReservation}
           updateReservation={updateReservation}
           />
           </div>):(

    <BrowserRouter>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/reservations" className="navbar-brand">
          React App
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/reservations"} className="nav-link">
              Reservation
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addReservation"} className="nav-link">
              Add Reservation
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
        <Route path='/' element={<ReservationList 
    reservationData={reservations} 
         editReservation={editReservation}
         deleteReservation={deleteReservation} />} ></Route>
          <Route exact path="addReservation" element={<AddReservationForm addReservation={addReservation}/>} />
         
         <Route path='/reservations' element={<ReservationList  
    reservationData={reservations} 
         editReservation={editReservation}
         deleteReservation={deleteReservation} />}>

         </Route>
         <Route path="/reservations/:reservationId" element={<EditReservationForm /> }></Route>
        </Routes>
      </div>
    
    </BrowserRouter>
    ) }</div>
    </div></div></div>
  )
}

export default App;



