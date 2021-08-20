import React from 'react'
import { useDispatch } from 'react-redux'
import { calendarSetActive } from '../../actions/calendar';
import { uiOpenModal } from '../../actions/modal';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    //const  = useSelector(state => state.calendar)

    const handleClickNew = ( e ) => {
        console.log( e );
        //dispatch( calendarSetActive( e ) );
        dispatch( uiOpenModal() );
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleClickNew }
        >
            <i className="fas fa-plus" ></i>
        </button>
    )
}
