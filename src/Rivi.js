import React from 'react';
import Autocomplete from 'react-autocomplete';

const Rivi = ({ data, setData, children }) => (
  <>
    <label className="leftcol small" htmlFor="kulkuneuvo">
      Kulkuneuvo
    </label>
    <label className="small" htmlFor="lahtopaikka">
      Mistä
    </label>
    <label className="small" htmlFor="tulopaikka">
      Minne
    </label>
    {data.kulkuneuvo === 'oma auto' ? (
      <label className="small" htmlFor="km">
        Matka km
      </label>
    ) : (
      <div className="small" />
    )}
    <label className="small" htmlFor="kustannus">
      Kustannus €
    </label>
    {children}
    <div className="leftcol small">
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
    <div className="small">
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
    <div className="small">
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
    {data.kulkuneuvo === 'oma auto' ? (
      <div className="small">
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
    ) : (
      <div className="small">&nbsp;</div>
    )}
    <div className="small">
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
      <div className="full">Korvaamme oman auton käytöstä 0,15 €/km.</div>
    )}
  </>
);

export default Rivi;
