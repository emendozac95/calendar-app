import { types } from "../types/types";

export const calendarAddNew = ( event ) => ({
    type: types.calendarAddNew,
    payload: event
});

export const calendarSetActive = ( event ) => {
    return {
        type: types.calendarSetActive,
        payload: event
    }
}

export const calendarUnsetActive = () => {
    return {
        type: types.calendarUnsetActive
    }
}

export const calendarUpdated = ( event ) => ({
    type: types.calendarUpdate,
    payload: event
});

export const calendarDelete = ( event ) => ({
    type: types.calendarDelete,
    payload: event
})