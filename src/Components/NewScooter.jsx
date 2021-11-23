import { useState } from "react";

function NewScooter({ create }) {

    const [inputs, setInputs] = useState({
        registration_code: '',
        is_busy: false,
        last_use_time: '',
        total_ride_kilometers: '',
        one_day_ride: ''
    })

    const control = (e, what) => {
        const inputsCopy = { ...inputs };
        inputsCopy[what] = e.target.value;
        if (what === 'is_busy') {
            inputsCopy[what] = !inputs.is_busy;
        }
        setInputs(inputsCopy);
    }

    const handleCreate = () => {
        create(inputs);
        setInputs({
            registration_code: '',
            is_busy: false,
            last_use_time: '',
            total_ride_kilometers: '',
            one_day_ride: ''
        })
    }


    return (

        <div className='new-item' id='example' action='/' method='GET'>
            <div className='each-new-item'>
                <span>New registration code: </span> <input type="text" value={inputs.registration_code} onChange={(e) => control(e, 'registration_code')} placeholder='8 number/letter combo' required minLength="8" maxLength="8" onKeyPress={(event) => {
                    if (!/['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]/.test(event.key)) { event.preventDefault(); }
                }} />
            </div>
            <div className='each-new-item'>
                <span>New use time: </span> <input type='date' value={inputs.last_use_time} onChange={(e) => control(e, 'last_use_time')} required />
            </div>
            <div className='each-new-item'>
                <span>New one day ride kilometers: </span> <input type="text" value={inputs.one_day_ride} onChange={(e) => control(e, 'one_day_ride')} required onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) { event.preventDefault(); }
                }}/>
            </div>
            <div className='each-new-item'>
                <span>Total ride kilometers: </span> <input type="text" value={inputs.total_ride_kilometers} onChange={(e) => control(e, 'total_ride_kilometers')} required onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) { event.preventDefault(); }
                }}/>
            </div>
            <div className='each-new-item'>
                <button onClick={handleCreate}>Save</button>
            </div>
        </div>

    );
}
export default NewScooter;