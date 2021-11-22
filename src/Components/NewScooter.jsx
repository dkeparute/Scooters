import { useState } from "react";

function NewScooter({ create }) {

    const [inputs, setInputs] = useState({
        registration_code: '',
        is_busy: false,
        last_use_time: '',
        total_ride_kilometres: 0,
        one_day_ride: 0
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
            total_ride_kilometres: '',
            one_day_ride: ''
        })
    }





    return (

        <div className='new-item'>
            <div className='each-new-item'>
                <span>New registration code: </span> <input type="text" value={inputs.registration_code} onChange={(e) => control(e, 'registration_code')} placeholder='insert 8 number combo' required minlength="8" maxlength="8" onKeyPress={(event) => {
                    if (!/['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]/.test(event.key)) { { event.preventDefault(); } }
                }} />
            </div>
            <div className='each-new-item'>
                <span>New use time: </span> <input type='date' value={inputs.last_use_time} onChange={(e) => control(e, 'last_use_time')} required />
            </div>
            <div className='each-new-item'>
                <span>New one day ride kilometres: </span> <input type="number" value={inputs.one_day_ride} onChange={(e) => control(e, 'one_day_ride')} required />
            </div>
            <div className='each-new-item'>
                <span>Total ride kilometres: </span> <input type="number" value={inputs.total_ride_kilometres} onChange={(e) => control(e, 'total_ride_kilometres')} />
            </div>
            <div className='each-new-item'>
                <button onClick={handleCreate}>Save</button>
            </div>
        </div>

    );
}
export default NewScooter;