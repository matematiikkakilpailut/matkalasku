import React from 'react';
import Autocomplete from 'react-autocomplete';

const Rivi = ({ data, setData, children }) => (
  <div class="rivi">
    {children}
    <div className="input input-kulkuneuvo">
      <label htmlFor="kulkuneuvo">Kulku­neuvo</label>
      <Autocomplete
        inputProps={{
          type: 'text',
          className: 'u-full-width',
          id: 'kulkuneuvo'
        }}
        getItemValue={item => item.label}
        items={[
          { label: 'juna' },
          { label: 'bussi' },
          { label: 'taksi' },
          { label: 'oma auto' }
        ]}
        renderItem={(item, isHighlighted) => (
          <div
            key={item.label}
            style={{ background: isHighlighted ? 'lightgray' : 'white' }}
          >
            {item.label}
          </div>
        )}
        value={data.kulkuneuvo}
        onChange={e => setData({ ...data, kulkuneuvo: e.target.value })}
        onSelect={val => setData({ ...data, kulkuneuvo: val })}
      />
    </div>
    <div className="input input-lahtopaikka">
      <label htmlFor="lahtopaikka">Mis­tä</label>
      <input
        type="text"
        id="lahtopaikka"
        className="u-full-width"
        value={data.lahtopaikka}
        onChange={e => {
          setData({ ...data, lahtopaikka: e.target.value });
        }}
      />
    </div>
    <div className="input input-tulopaikka">
      <label htmlFor="tulopaikka">Min­ne</label>
      <input
        type="text"
        id="tulopaikka"
        className="u-full-width"
        value={data.tulopaikka}
        onChange={e => {
          setData({ ...data, tulopaikka: e.target.value });
        }}
      />
    </div>
    {data.kulkuneuvo === 'oma auto' && (
      <div className="input input-km">
        <label htmlFor="km">Mat­ka km</label>
        <input
          type="number"
          id="km"
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
      <label htmlFor="kustannus">Kus­tan­nus €</label>
      <input
        type="number"
        id="kustannus"
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
      <div className="taksa">Kor­vaam­me oman auton käy­tös­tä 0,15 €/km.</div>
    )}
  </div>
);

export default Rivi;
