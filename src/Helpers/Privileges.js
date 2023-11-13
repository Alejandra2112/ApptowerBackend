const privilegesMap = {
    get_watchman: 1,
    post_watchman: 2,
    put_watchman: 3,
    get_visitors: 4,
    post_visitors: 5,
    put_visitors: 6,
    get_guest_income: 7,
    post_guest_income: 8,
    put_guest_income: 9,
    get_fines: 10,
    post_fines: 11,
    put_fines: 12,
    //Demas privilegios segun como esten en la BD
};

module.exports = privilegesMap;