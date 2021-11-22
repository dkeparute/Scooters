import { useEffect, useState } from "react";

function Modal({ showModal, hide, modalElement, edit, deleteScooter }) {

    const [inputs, setInputs] = useState({
        registration_code: '',
        is_busy: false,
        last_use_time: '',
        total_ride_kilometres: '',
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

    useEffect(() => {
        setInputs({
            registration_code: modalElement.registration_code,
            is_busy: modalElement.is_busy,
            last_use_time: modalElement.last_use_time,
            total_ride_kilometres: modalElement.total_ride_kilometres,
            one_day_ride: modalElement.one_day_ride
        })
    }, [modalElement])

    const handleEdit = () => {
        edit({
            registration_code: inputs.registration_code,
            is_busy: inputs.is_busy,
            last_use_time: inputs.last_use_time,
            total_ride_kilometres: inputs.total_ride_kilometres,
            one_day_ride: inputs.one_day_ride
        }, modalElement.id)
    }



    return (
        <div className='general-modal' style={{ display: showModal ? 'block' : 'none', top: window.scrollY + 100 + 'px' }}>
            <div className='each-modal'>
                <span>Registration code: </span> <input type="text" value={inputs.registration_code} onChange={(e) => control(e, 'registration_code,')} readOnly />
            </div>
            <div className='each-modal'>
                <span>Total ride kilometres: </span> <input type="number" value={inputs.total_ride_kilometres} onChange={(e) => control(e, 'total_ride_kilometres')} readOnly />
            </div>
            <div className='each-modal'>
                <span>Last use time: </span> <input type='date' value={inputs.last_use_time} onChange={(e) => control(e, 'last_use_time')} readOnly />
            </div>
            <div className='each-modal'>
                <span>Update availability: </span> <input type='checkbox' value={inputs.is_busy} onChange={(e) => control(e, 'is_busy')} checked={inputs.is_busy} />
            </div>

            <div className='each-modal'>
                <span>Update use time: </span> <input type='date' value={inputs.last_use_time} onChange={(e) => control(e, 'last_use_time')} required />
            </div>
            <div className='each-modal'>
                <span>Update one day ride kilometres: </span> <input type="number" value={inputs.one_day_ride} onChange={(e) => control(e, 'one_day_ride')} required />
            </div>
            <div className='each-modal'>
            <button onClick={handleEdit}>Save</button>
            <button onClick={hide}>Return</button>
            <button onClick={() => deleteScooter(modalElement.id)}>Delete</button>
            </div>
        </div>

    );
}
export default Modal;