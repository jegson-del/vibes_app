export const setUserEvents = (userEvents) => (
    {
        type: 'SET_USER_EVENTS',
        data: userEvents,
    }
);

export const setTickets = (tickets) => (
    {
        type: 'SET_TICKET',
        data: tickets,
    }
);

exports.setUserEvents = setUserEvents;
exports.setTickets = setTickets;