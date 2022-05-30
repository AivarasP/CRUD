
import axios from 'axios';
import React,{useState} from 'react';
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';

const Create = () => {
const [sum, SetSum] = useState("");
const [comment,SetComment] = useState("");
const [date, SetDate] = useState("");
// const navigate = useNavigate();
const data = {
    sum: sum,
    comment: comment,
    date: date
}

function Submit(e){
    e.preventDefault();
    if(!date || !comment || !sum || sum <= 0){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Laukeliai neatitinka formato'
            
          })
    }  else {
        Swal.fire(
            'Pajamos pridėtos!',
            '',
            'success',
            axios.post('http://localhost:8080/api/incomes', data)
            )
          
    }
}
    return ( 
        <div>
            <h1 className='pav'>Pridėti Pajamas</h1>
            <form>
                <input type="number" required value={sum} placeholder="Suma" onChange={(e) => SetSum(e.target.value)}/>
                <input type="text" required value={comment} placeholder="Komentaras" onChange={(e) => SetComment(e.target.value)}/>
                <input type="date" required value={date}  onChange={(e) => SetDate(e.target.value)}/>
                <button onClick={Submit}>Prideti</button>
            </form>
        </div>
     );
}
 
export default Create;