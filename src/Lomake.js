import React, { useState } from 'react';
import shortid from 'shortid';
import Autocomplete from 'react-autocomplete';
import IBAN from 'iban';
import Datepicker from 'react-datepicker';

import Rivit from './Rivit';
import Viesti from './Viesti';

const Lomake = () => {
  const [rivit, setRivit] = useState([
    {
      id: shortid.generate(),
      kulkuneuvo: '',
      lahtopaikka: '',
      tulopaikka: 'Päivölä',
      kustannus: 0.0
    }
  ]);

  const [nimi, setNimi] = useState('');
  const [tilaisuus, setTilaisuus] = useState('');
  const [pvm, setPvm] = useState('');
  const [tilinumero, setTilinumero] = useState('');
  const [tilinumeroOK, setTilinumeroOK] = useState(undefined);
  const [tilinumeroBlurred, setTilinumeroBlurred] = useState(false);

  return (
    <section className="container" style={{ marginTop: '2ex' }}>
      <header className="full">
        <h1>Matematiikkavalmennuksen matkalasku</h1>
      </header>
      <p className="full">
        Tämä lomake auttaa sinua lähettämään matkalaskun
        matematiikkavalmennukselle. Lomake ei tallenna mitään tietoja minnekään,
        vaan täyttämisen jälkeen voit avata sähköpostiohjelmasi, jossa lähetät
        matkalaskun. Sähköpostin tiedot tallennetaan tositteeksi Suomen
        matemaattisen yhdistyksen tai Matemaattisten aineiden opettajain liiton
        kirjanpitoon ja säilytetään ainakin lain vaatima aika.
      </p>
      <div className="half leftcol">
        <label htmlFor="nimi">Nimesi</label>
        <input
          className="u-full-width"
          type="text"
          placeholder="Essi Esimerkki"
          id="nimi"
          value={nimi}
          onChange={e => setNimi(e.target.value)}
        />
      </div>
      <div className="half">
        <label htmlFor="tilinumero">
          Tilinumero (IBAN)
          {tilinumeroBlurred ? (
            tilinumeroOK ? (
              <span
                className="ok"
                role="img"
                aria-label="Oikean muotoinen IBAN"
              >
                ✅
              </span>
            ) : (
              <span className="notOk" role="img" aria-label="Virheellinen IBAN">
                ❌
              </span>
            )
          ) : (
            <span />
          )}
        </label>
        <input
          type="text"
          id="tilinumero"
          placeholder="FI00 0000 0000 0000 00"
          step="any"
          className="u-full-width"
          value={tilinumero}
          onChange={e => {
            setTilinumero(e.target.value);
            setTilinumeroOK(IBAN.isValid(e.target.value));
          }}
          onBlur={() => setTilinumeroBlurred(true)}
        />
      </div>
      <div className="half leftcol">
        <label htmlFor="tilaisuus">Tilaisuus</label>
        <Autocomplete
          value={tilaisuus}
          onChange={e => setTilaisuus(e.target.value)}
          onSelect={value => setTilaisuus(value)}
          inputProps={{
            type: 'text',
            className: 'u-full-width',
            id: 'tilaisuus'
          }}
          wrapperStyle={{ width: '100%' }}
          getItemValue={item => item.label}
          items={[
            { label: 'Valmennusviikonloppu' },
            { label: 'Valmennusleiri' },
            { label: 'Kilpailumatka' }
          ]}
          renderItem={(item, isHighlighted) => (
            <div
              key={item.label}
              style={{ background: isHighlighted ? 'lightgray' : 'white' }}
            >
              {item.label}
            </div>
          )}
        />
      </div>
      <div className="half">
        <label htmlFor="pvm">Alkupäivä</label>
        <Datepicker
          id="pvm"
          dateFormat="P"
          selected={pvm}
          onChange={setPvm}
          todayButton={'Tänään'}
        />
      </div>
      <Rivit rivit={rivit} setRivit={setRivit} />
      <Viesti
        rivit={rivit}
        nimi={nimi}
        tilaisuus={tilaisuus}
        pvm={pvm}
        tilinumero={tilinumero}
      />
    </section>
  );
};

export default Lomake;
