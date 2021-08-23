import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { uiCloseModal } from '../../actions/modal';

import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { calendarAddNew, calendarUnsetActive, calendarUpdated } from '../../actions/calendar';
import { useEffect } from 'react';



const customStyles = {
    content: {
        top                 : '50%',
        left                : '50%',
        right               : 'auto',
        bottom              : 'auto',
        marginRight         : '-50%',
        transform           : 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
};

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { active } = useSelector(state => state.calendar);

    const dispatch = useDispatch();

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        });

    }

    const [dateStart, setDateStart] = useState( now.toDate() );
    const [dateEnd, setDateEnd] = useState( nowPlus1.toDate() );
    const [titleValid, setTitleValid] = useState(true);
    const [formValues, setFormValues] = useState( initEvent );

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if( active ){
            setFormValues( active );
        }else{
            setFormValues( initEvent );
        }
    }, [ active, setFormValues ])

    const handleCloseModal = () => {
        dispatch( uiCloseModal() );
        setFormValues( initEvent );
        dispatch( calendarUnsetActive() );
    }

    const handleStartDateChange = ( e ) => {
        setDateStart( e );
        setFormValues({
            ...formValues,
            start: e
        });
    }

    const handleEndDateChange = ( e ) => {
        setDateEnd( e );
        setFormValues({
            ...formValues,
            end: e
        });
    }

    const handleSubmit = ( e ) => {
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );

        if( momentStart.isSameOrAfter( momentEnd ) ){
            return Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
        }

        if( title.trim().length < 2){
            return setTitleValid( false );
        }else{
            setTitleValid( true );
        }

        if( active ){
            dispatch( calendarUpdated( formValues ) );
        }else{
            dispatch( calendarAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    name: 'Mauricio'
                }
            }) );
            console.log( 'Se agregó nuevo evento' );
        }
        handleCloseModal();
    }

    return (
        <Modal
            isOpen={ modalOpen }
            //onAfterOpen={afterOpenModal}
            onRequestClose={ handleCloseModal }
            style={customStyles}
            contentLabel="Example Modal"
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form
                className="container"
                onSubmit={ handleSubmit }    
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker 
                        onChange={ handleStartDateChange }                    
                        value={ dateStart }
                        name=""
                        className="form-control"
                    />

                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker 
                        onChange={ handleEndDateChange }                    
                        value={ dateEnd }
                        minDate={ dateStart }
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ !titleValid && 'is-invalid' }`}
                        placeholder="Título del evento"
                        name="title"
                        value={ title }
                        onChange={ handleInputChange }
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        value={ notes }
                        name="notes"
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
      </Modal>
    )
}
