export const setEvents = (events) => (
    {
        type: 'SET_EVENTS',
        data: events,
    }
);

export const setEventsType = (type) => (
    {
        type: 'SET_EVENTS_TYPE',
        data: type,
    }
);

export const setActiveEvent = (event) => (
    {
        type: 'SET_ACTIVE_EVENT',
        data: event,
    }
);

export const setTopLocations = (locations) => (
    {
        type: 'SET_TOP_LOCATIONS',
        data: locations,
    }
);

export const setEventAfterDelete = (events) => (
    {
        type: 'SET_EVENTS_AFTER_DELETE',
        data: events,
    }
);

exports.setEvents = setEvents;
exports.setEventsType = setEventsType;
exports.setActiveEvent = setActiveEvent;
exports.setTopLocations = setTopLocations;
exports.setEventAfterDelete = setEventAfterDelete;