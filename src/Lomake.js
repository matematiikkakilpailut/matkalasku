import React, { useState } from 'react';
import shortid from 'shortid';
import IBAN from 'iban';
import Datepicker from 'react-datepicker';

import Rivit from './Rivit';
import Viesti from './Viesti';
import ComboBox from './ComboBox';

const Lomake = () => {
  const [rivit, setRivit] = useState([
    {
      id: shortid.generate(),
      kulkuneuvo: '',
      lahtopaikka: '',
      tulopaikka: 'Päivölän kansanopisto',
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
      <header>
        <h1>Matematiikka­valmennuksen matkalasku</h1>
      </header>
      <p className="selitys">
        Tämä lomake auttaa sinua lähettämään matka­laskun
        matematiikka­valmennukselle. Lomake ei tallenna mitään tietoja
        minnekään, vaan täyttämisen jälkeen voit avata sähkö­posti­ohjelmasi,
        jossa lähetät matka­laskun. Sähkö­postin tiedot tallen­netaan
        tosit­teeksi Suomen mate­maat­tisen yhdis­tyksen tai Mate­maat­tis­ten
        aineiden opet­tajain liiton kirjan­pitoon ja säily­tetään ainakin lain
        vaatima aika.
      </p>
      <div className="perustiedot">
        <div className="input input-nimi">
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
        <div className="input input-tili">
          <label htmlFor="tilinumero">
            Tilinumero (
            <abbr lang="en" title="International Bank Account Number">
              IBAN
            </abbr>
            )
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
                <span
                  className="notOk"
                  role="img"
                  aria-label="Virheellinen IBAN"
                >
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
        <div className="input input-tilaisuus">
          <label htmlFor="tilaisuus">Tilaisuus</label>
          <ComboBox
            value={tilaisuus}
            setValue={setTilaisuus}
            id="tilaisuus"
            data={['Valmennusviikonloppu', 'Valmennusleiri', 'Kilpailumatka']}
          />
        </div>
        <div className="input input-pvm">
          <label htmlFor="pvm">Alkupäivä</label>
          <Datepicker
            id="pvm"
            dateFormat="P"
            selected={pvm}
            onChange={setPvm}
            todayButton={'Tänään'}
            className="u-full-width"
          />
        </div>
      </div>
      <Rivit rivit={rivit} setRivit={setRivit} />
      <Viesti
        rivit={rivit}
        nimi={nimi}
        tilaisuus={tilaisuus}
        pvm={pvm}
        tilinumero={tilinumero}
      />
      <footer>
        <hr />
        <span>
          Koodannut <a href="https://iki.fi/jks">Jouni Seppänen</a>.
          Kuntaluettelon lähde{' '}
          <a href="https://www.avoindata.fi/data/fi/dataset/kunnat/resource/b1cb9870-191f-4616-9c53-5388b7ca6beb">
            Avoindata.fi
          </a>
          , lisenssi{' '}
          <a href="https://creativecommons.org/licenses/by/4.0/deed.fi">
            CC-BY 4.0
          </a>
          . Rautatieasemien lähde{' '}
          <a href="https://www.digitraffic.fi">Traffic Management Finland</a>,
          lisenssi{' '}
          <a href="https://creativecommons.org/licenses/by/4.0/deed.fi">
            CC-BY 4.0
          </a>
          , muutettu poistamalla epätodennäköisiä matkustusasemia.
        </span>
      </footer>
    </section>
  );
};

export default Lomake;
