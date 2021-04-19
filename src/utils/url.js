// const root_url = 'http://10.0.2.2:8000';
// const root_url = 'http://127.0.0.1:8000';
const root_url = 'https://vibessa.com';
const api_main = root_url+'/api';

export const Url = {
    root_url: root_url,
    api_main: api_main,
    login: api_main + '/login',
    register: api_main + '/register',
    forgot_password: api_main + '/forgot',
    events: api_main + '/events',
    top_locations: api_main + '/events/top_locations',
    search: api_main + '/events/search/',
    user: api_main + '/user/detail',
    user_see_blocked_events: api_main + '/user/block/see_events',
    user_unblock_events: api_main + '/user/block/unblock_event/',
    user_events: api_main + '/user/events/my_events',
    charge_card: api_main + '/payment/charge',
    admin_event: api_main + '/admin/events',
    headers: {
        Accept: 'application/json'
    }
}
