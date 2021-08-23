import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';

import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/modal';
import { calendarSetActive } from '../../actions/calendar';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale( 'es' );

const localizer = momentLocalizer( moment );

export const CalendarScreen = () => {

    const { events, active } = useSelector( data => data.calendar);

    const dispatch = useDispatch();

    const style = {
        backGroundColor: '#367CF7',
        borderRadius: '0px',
        opacity: 0.8,
        display: 'block',
        
    }

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' )

    const eventStyleGetter = ( event, start, end, isSelected) => {
        return {
            style
        }
    }

    const onDoubleClick = ( e ) => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = ( e ) => {
        dispatch( calendarSetActive( e ) );
    }

    const onViewChange = ( e ) => {
        setLastView( e );
        localStorage.setItem('lastView', e);
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />
            { active && <DeleteEventFab /> }

            <CalendarModal />
        </div>
    )
}
