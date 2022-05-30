import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Edit = () => {
    const [sum,setSum] = useState("");
    const [comment,setComment] = useState("");
    const [date,setDate] = useState("");
    const{id} = useParams();
    const history = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:3001/incomes/${id}`).then((res)=>{
            setSum(res.data.sum)
            setComment(res.data.comment)
            setDate(res.data.date) 
    })},[])

    const data = {
        sum:sum,
        comment:comment,
        date:date
    }
    

    function Update(e){
        e.preventDefault();
        if(!date || !comment || !sum || sum <= 0){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Laukeliai neatitinka formato'
                
              })
        }  else { 
            Swal.fire({
                title: 'Ar tikrai norite išsaugoti pakeitimus?',
                showDenyButton: true,
                confirmButtonText: 'Išsaugoti',
                denyButtonText: `Neišsaugoti`,
              }).then((result) => {
                if (result.isConfirmed) {
                axios.put(`http://localhost:3001/incomes/${id}`,data).then(history("/"))
                  Swal.fire('Išsaugota!', '', 'success')
                } else if (result.isDenied) {
                  Swal.fire('Pakeitimai nebuvo išsaugoti', '', 'info')
                }
              })
    
        
    }
       
    }

    return ( 
        <div className='w-screen h-full flex flex-col justify-center items-center mt-14'>
            <h1 className='text-black text-2xl font-semibold font-Montserrat'>Redaguoti Pajamas</h1>
            <form className='w-[45%] h-full flex flex-col justify-center items-center mt-4 '>
                <input value={sum} onChange={(e) => setSum(e.target.value)} type="number" required placeholder='Suma' className='w-[80%] bg-white/10 mt-4 text-xl font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400 rounded-lg' />
                <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" required placeholder='Pajamų šaltinis' className='w-[80%] bg-white/10 mt-4 text-xl font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400 rounded-lg' />
                <input value={date} onChange={(e) => setDate(e.target.value)} type="date" required className='w-[80%] bg-white/10 mt-4 text-xl font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400 rounded-lg' />
                <button onClick={Update} className='w-[80%] bg-blue-500 mt-4 text-xl text-white font-Montserrat font-semibold py-4 pl-6 rounded-lg'>Išsaugoti</button>
            </form>

        </div>
     );
}
 
export default Edit;