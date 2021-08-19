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

moment.locale( 'es' );

const localizer = momentLocalizer( moment );

const events = [{
    title: 'Cumpeaños del jefe',
    start: moment().toDate(),
    end: moment().add( 2, 'hours' ).toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar el pastel',
    user: {
        name: 'Mauricio'
    }
}];

export const CalendarScreen = () => {

    const style = {
        backGroundColor: '#367CF7',
        borderRadius: '0px',
        opacity: 0.8,
        display: 'block',
        
    }

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'nomth' )

    const eventStyleGetter = ( event, start, end, isSelected) => {
        return {
            style
        }
    }

    const onDoubleClick = ( e ) => {
        console.log( e );
    }

    const onSelectEvent = ( e ) => {
        console.log( e );
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
            <CalendarModal />
        </div>
    )
}
