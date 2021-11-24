// SORTUI REIKALINGA DALIS

function productsSort(state, by) {
    const scootersCopy = state.slice();

    switch (by) {
        case 'useDate_asc':
            scootersCopy.sort(function (a, b) {
                const last_use_timeA = a.last_use_time.toUpperCase(); // ignore upper and lowercase
                const last_use_timeB = b.last_use_time.toUpperCase(); // ignore upper and lowercase
                if (last_use_timeA < last_use_timeB) {
                    return -1;
                }
                if (last_use_timeA > last_use_timeB) {
                    return 1;
                }
                // names must be equal
                return 0;
            });
            break;
        case 'useDate_desc':
            scootersCopy.sort((a, b) => {
                const last_use_timeA = a.last_use_time.toUpperCase(); // ignore upper and lowercase
                const last_use_timeB = b.last_use_time.toUpperCase(); // ignore upper and lowercase
                if (last_use_timeA < last_use_timeB) {
                    return 1;
                }
                if (last_use_timeA > last_use_timeB) {
                    return -1;
                }
                // names must be equal
                return 0;
            });
            break;
        case 'totalKm_asc':
            scootersCopy.sort((a, b) => {
                return a.total_ride_kilometers - b.total_ride_kilometers;
            });
            break;
        case 'totalKm_desc':
            scootersCopy.sort((a, b) => {
                return b.total_ride_kilometers - a.total_ride_kilometers;
            });
            break;
        default:
    }
    return scootersCopy;
}
export default productsSort;