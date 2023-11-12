const privilegesMap = {
    get_users: 1,
    post_users: 2,
    put_users: 3,
    get_watchman: 4,
    post_watchman: 5,
    put_watchman: 6,
    get_visitors: 7,
    post_visitors: 8,
    put_visitors: 9,
    get_guest_income: 10,
    post_guest_income: 11,
    put_guest_income: 12,
    get_fines: 13,
    post_fines: 14,
    put_fines: 15,
    //Demas privilegios segun como esten en la BD
};

module.exports = privilegesMap;