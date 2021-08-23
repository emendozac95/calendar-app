import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { calendarDelete } from '../../actions/calendar';

export const DeleteEventFab = () => {

    const { active } = useSelector(state => state.calendar);
    const dispatch = useDispatch();
 
    const handleDelete = () => {
        if( active ){
            dispatch( calendarDelete( active ) );
        }else{
            return Swal.fire('Error', 'Seleccina un evento', 'error');
        }
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }
        >
            <i className="fas fa-trash"></i>
        </button>
    )
}
