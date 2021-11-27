import { useState } from "react";

function NewScooter({ create }) {

    // STATE bus objektas (buvo galima daryti keturis steitus ir jiems priskirti kontroliavimas, bet darem paparasciau, vienas steitas, kuris kontroliuoja 4 inputus)
    const [inputs, setInputs] = useState({
        registration_code: '',
        is_busy: false,
        last_use_time: '',
        total_ride_kilometers: 0,
        one_day_ride: 0
    })

    // inputu kontroliavimas, daroma inputu kopija nes tiesiogiai steito keisti negalima, norint gauti reiksme naudojam e.target.value
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
        if (inputs.registration_code === '') {
            alert('Registration code field can not be empty');
        }
        if (inputs.last_use_time === 'mm/dd/yyyy') {
            alert('Last use time field can not be empty');
        }
        if (inputs.total_ride_kilometers === '') {
            alert('Total ride kilometers field can not be empty');
        }
        if (inputs.one_day_ride === '') {
            alert('One day ride field can not be empty');
        }
        // resetina inputu info kai sukuriamas naujas scooteris
        setInputs({
            registration_code: '',
            is_busy: false,
            last_use_time: '',
            total_ride_kilometers: 0,
            one_day_ride: 0
        })
    }


    return (
        // Cia yr akontroliuojamas komponentas. Kiekvienas inputas turi savo STATE, be State bueji begaslim kontroliuoti. Yra būdingas onChange eventas, jis pasileis kai ką nors įrašysim.
        <>
        <h2>New scooter</h2>
        <div className='new-item'>
            <div className='each-new-item'>
                <span>New registration code: </span> <input type="text" value={inputs.registration_code} onChange={(e) => control(e, 'registration_code')} placeholder='8 number/letter combo' required minLength="8" maxLength="8" onKeyPress={(event) => {
                    if (!/[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]/.test(event.key)) { event.preventDefault(); }
                }} />
            </div>
            <div className='each-new-item'>
                <span>New use time: </span> <input type='date' value={inputs.last_use_time} onChange={(e) => control(e, 'last_use_time')} required />
            </div>
            <div className='each-new-item'>
                <span>New one day ride kilometers: </span> <input type="text" value={inputs.one_day_ride} onChange={(e) => control(e, 'one_day_ride')} placeholder='insert day km' required onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) { event.preventDefault(); }
                }} />
            </div>
            <div className='each-new-item'>
                <button onClick={handleCreate}>Save</button>
            </div>
        </div>
        </>
    );
}
export default NewScooter;