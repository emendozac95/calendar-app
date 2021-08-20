import { types } from "../types/types";
import moment from 'moment'

const initialState = {
    events: [{
        title: 'Cumpeaños del jefe',
        start: moment().toDate(),
        end: moment().add( 2, 'hours' ).toDate(),
        bgcolor: '#fafafa',
        notes: 'Comprar el pastel',
        user: {
            name: 'Mauricio'
        }
    }],
    active: null
};

export const calendarReducer = ( state = initialState, action ) => {
    switch ( action.type ) {    
        case types.calendarSetActive:
            return {
                ...state,
                active: action.payload
            }
        case types.calendarUnsetActive:
            return {
                ...state,
                active: null
            }
        case types.calendarAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]
            }
        default:
            return state;
    }
}