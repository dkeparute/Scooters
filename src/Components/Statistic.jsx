function Statistic({ stats, groupStats }) {

    return (
        <div>
            <div className='statistic-results'>
                <span>Scooters count: <i>{stats.scootersCount}</i></span>
                <span>Total scooters km: <i>{stats.scootersKm.toFixed(2)}</i> km</span>
                <span>Average scooters km: <i>{stats.scootersAverage.toPrecision(3)}</i> km</span>
            </div>
            <div className='statistic-list'>
                {groupStats.map((s => <span key={s.registration_code}><i>{s.registration_code}: </i><b>{s.scootersCount}</b></span>))}
            </div>


        </div>
    )
}
export default  Statistic;