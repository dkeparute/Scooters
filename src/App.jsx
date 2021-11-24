import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import Modal from "./Components/Modal";
import NewScooter from "./Components/NewScooter";
import Scooters from "./Components/Scooters";
import Statistic from "./Components/Statistic";
import { useRef } from "react";
import productsSort from "./Common/productsSort";
import Message from "./Components/Message";



function App() {

  // Testas
  useEffect(() => {
    axios.get('http://localhost:3003/test')
      .then(res => {
        console.log(res.data);
      })
  }, [])
  // -------------------------------------------------------STARTAS--------------------------------------------------------------
  const [scooters, setScooters] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Read node
  useEffect(() => {
    axios.get('http://localhost:3003/scooters')
      .then(res => {
        setScooters(res.data);
        console.log(res.data);
      })
  }, [lastUpdate])

  // Delete node
  const deleteScooter = (id) => {
    setShowModal(false);
    axios.delete('http://localhost:3003/scooters/' + id)
      .then(res => {
        // add message
        addMsg('Scooter was deleted!')
        setLastUpdate(Date.now())
        console.log(res.data);
      })
  }
  // -----------------------------------------
  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modalElement, setModalElement] = useState({
    registration_code: '',
    is_busy: false,
    last_use_time: '',
    total_ride_kilometers: '',
    one_day_ride: ''
  });

  const modal = (scooter) => {
    setShowModal(true);
    setModalElement(scooter);
  }

  const hide = () => {
    setShowModal(false);
  }
  // -------------------------------------------------
  // Edit node
  const edit = (scooter, id) => {
    setShowModal(false);
    axios.put('http://localhost:3003/scooters/' + id, scooter)
      .then(res => {
        // add message
        addMsg('Scooter was edited!')
        setLastUpdate(Date.now())
        console.log(res.data);
      })
  }

  // Create Node
  const create = scooter => {
    axios.post('http://localhost:3003/scooters', scooter)
      .then(res => {
        // add message
        addMsg('Scooter was created!')
        setLastUpdate(Date.now())
        console.log(res.data);
      })
  }
  // --------------------------------------------------------------

  // Statistic
  const [stats, setStats] = useState({
    scootersCount: 0,
    scootersKm: 0,
    scootersAverage: 0
  })

  useEffect(() => {
    axios.get('http://localhost:3003/stats')
      .then(res => {
        setStats(res.data[0]);
        console.log(res.data);
      })
  }, [lastUpdate])

  // Group statistic
  const [groupStats, setGroupStats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/group-stats')
      .then(res => {
        setGroupStats(res.data)
        console.log(res);
      })
  }, [lastUpdate])
  // -----------------------------------------------------------------------

  // Sort (rusiavimas)
  const sortBy = useRef('');
  const sort = (by) => {
    setScooters(productsSort(scooters, by))
    sortBy.current = by;
  }
  // -------------------------------------------

  // DISTINCT registration code
  const [code, SetCode] = useState([]);
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3003/scooters-code')
      .then(res => {
        SetCode(res.data);
        console.log(res.data);
      })
  }, [lastUpdate])
  // ---------------------------------------------------------

  // Filter registration code
  useEffect(() => {
    if (filterBy) {
      axios.get('http://localhost:3003/scooters-filter/' + filterBy)
        .then(res => {
          setScooters(productsSort((res.data), sortBy.current));
          console.log(res.data);
        })
    }
  }, [filterBy])
  // -------------------------------------------------------------

  // Search by registration_code
  const [searchBy, setSearchBy] = useState('');
  useEffect(() => {
    if (searchBy) {
      axios.get('http://localhost:3003/scooters-search/?s=' + searchBy)
        .then(res => {
          setScooters(productsSort((res.data), sortBy.current));
          console.log(res.data);
        })
    }
  }, [searchBy])

  // RESET

  const reset = () => {
    setLastUpdate(Date.now());
  }
  // ---------------------------------------------------------------

    // JEIGU REIKIA PAPRASTO SORTO TAI CIA PVZ

     const simpleSort = by => {
      const scootersCopy = scooters.slice();
      if ('last_use_time' === by) {
        scootersCopy.sort((a, b) => {
          if (a.last_use_time > b.last_use_time) {
            return 1
          }
          if (a.last_use_time < b.last_use_time) {
            return -1
          }
          return 0
        })
        setScooters(scootersCopy)
      }
      if ('total_ride_kilometers' === by) {
        scootersCopy.sort((a, b) => a.total_ride_kilometers - b.total_ride_kilometers)
        setScooters(scootersCopy)
      }
    }

// -----------------------------------------------------------------------------------------
  // Message
  const [showMsg, setShowMsg] = useState(false);
  const msg = useRef('labas');

  const addMsg = text => {
    msg.current = text;
    setShowMsg(true);
    setTimeout(() => { clearMsg() }, 2000);
  }

  const clearMsg = () => {
    setShowMsg(false);
  }

  return (

    <div className='general'>
      <h1> <span>Kolt</span> scooters rent</h1>
      <Message showMsg={showMsg} msg={msg.current} />
      <NewScooter create={create} />
      <Statistic stats={stats} groupStats={groupStats} />
      <Filter sort={sort} code={code} setFilterBy={setFilterBy} setSearchBy={setSearchBy} reset={reset} simpleSort={simpleSort}/>
      <Modal showModal={showModal} hide={hide} modalElement={modalElement} deleteScooter={deleteScooter} edit={edit} />
      <Scooters scooters={scooters} deleteScooter={deleteScooter} modal={modal} />
    </div>

  );
}
export default App;