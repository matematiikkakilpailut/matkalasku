import React from 'react';
import paikat from './kunnat/paikat.json';
import ComboBox from './ComboBox';

const Rivi = ({ data, setData, children }) => {
  const kulkuneuvoId = `kulkuneuvo-${data.id}`;
  const lahtopaikkaId = `lahtopaikka-${data.id}`;
  const tulopaikkaId = `tulopaikka-${data.id}`;
  const kmId = `km-${data.id}`;
  const kustannusId = `kustannus-${data.id}`;
  return (
    <div class="rivi">
      {children}
      <div className="input input-kulkuneuvo">
        <label htmlFor={kulkuneuvoId}>Kulku­neuvo</label>
        <ComboBox
          data={['juna', 'bussi', 'taksi', 'oma auto']}
          id={kulkuneuvoId}
          value={data.kulkuneuvo}
          setValue={value => setData({ ...data, kulkuneuvo: value })}
        />
      </div>
      <div className="input input-lahtopaikka">
        <label htmlFor={lahtopaikkaId}>Mis­tä</label>
        <ComboBox
          data={paikat}
          id={lahtopaikkaId}
          value={data.lahtopaikka}
          setValue={value => setData({ ...data, lahtopaikka: value })}
        />
      </div>
      <div className="input input-tulopaikka">
        <label htmlFor={tulopaikkaId}>Min­ne</label>
        <ComboBox
          data={paikat}
          id={tulopaikkaId}
          value={data.tulopaikka}
          setValue={value => setData({ ...data, tulopaikka: value })}
        />
      </div>
      {data.kulkuneuvo === 'oma auto' && (
        <div className="input input-km">
          <label htmlFor={kmId}>Mat­ka km</label>
          <input
            type="number"
            id={kmId}
            className="u-full-width"
            value={data.matka || 0.0}
            onChange={e => {
              setData({
                ...data,
                matka: e.target.value,
                kustannus: 0.15 * e.target.value
              });
            }}
          />
        </div>
      )}
      <div className="input input-kustannus">
        <label htmlFor={kustannusId}>Kus­tan­nus €</label>
        <input
          type="number"
          id={kustannusId}
          step=".01"
          className="u-full-width"
          value={data.kustannus}
          readOnly={data.kulkuneuvo === 'oma auto'}
          disabled={data.kulkuneuvo === 'oma auto'}
          onChange={e => {
            setData({ ...data, kustannus: e.target.value });
          }}
        />
      </div>
      {data.kulkuneuvo === 'oma auto' && (
        <div className="taksa">
          Kor­vaam­me oman auton käy­tös­tä 0,15 €/km.
        </div>
      )}
    </div>
  );
};

export default Rivi;
