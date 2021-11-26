import { useState } from "react";

function NewScooter({ create }) {

    // STATE bus objektas (buvo galima daryti keturis steitus ir jiems priskirti kontroliavimas, bet darem paparasciau, vienas steitas, kuris kontroliuoja 4 inputus)
    const [inputs, setInputs] = useState({
        registration_code: '',
        is_busy: false,
        last_use_time: '',
        total_ride_kilometers: '',
        one_day_ride: ''
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
        // resetina inputu info kai sukuriamas naujas scooteris
        setInputs({
            registration_code: '',
            is_busy: false,
            last_use_time: '',
            total_ride_kilometers: '',
            one_day_ride: ''
        })
    }


    return (
        // Cia yr akontroliuojamas komponentas. Kiekvienas inputas turi savo STATE, be State bueji begaslim kontroliuoti. Yra būdingas onChange eventas, jis pasileis kai ką nors įrašysim.
            <div className='new-item'>
                <div className='each-new-item'>
                    <span>New registration code: </span> <input type="text" value={inputs.registration_code} onChange={(e) => control(e, 'registration_code')} placeholder='8 number/letter combo' required minLength="8" maxLength="8" onKeyPress={(event) => {
                        if (!/[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]/.test(event.key)) { event.preventDefault(); }
                    }} />
                </div>
                <div className='each-new-item'>
                    <span>Last use time: </span> <input type='date' value={inputs.last_use_time} onChange={(e) => control(e, 'last_use_time')} readOnly />
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
                    <span>Total ride kilometers: </span> <input type="text" value={inputs.total_ride_kilometers} onChange={(e) => control(e, 'total_ride_kilometers')} placeholder='insert day km results ' required onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) { event.preventDefault(); }
                    }} />
                </div>
                <div className='each-new-item'>
                    <button onClick={handleCreate}>Save</button>
                </div>
            </div>
    );
}
export default NewScooter;