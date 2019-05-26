import React from 'react';
import Rivi from './Rivi';
import { ReactComponent as Minus } from './fonts/baseline-delete_forever-24px.svg';
import { ReactComponent as Plus } from './fonts/baseline-add-24px.svg';
import shortid from 'shortid';

const Rivit = ({ rivit, setRivit }) => {
  const setData = id => data => {
    setRivit(
      rivit.map(rivi => {
        if (rivi.id === id) {
          return data;
        } else {
          return rivi;
        }
      })
    );
  };

  const removeRivi = id => () => {
    setRivit(rivit.filter(rivi => rivi.id !== id));
  };

  const addRivi = () => {
    const len = rivit.length;
    const lahto = len > 0 ? rivit[len - 1].tulopaikka : '';

    setRivit(
      rivit.concat({
        id: shortid.generate(),
        kulkuneuvo: '',
        lahtopaikka: lahto,
        tulopaikka: '',
        kustannus: 0.0
      })
    );
  };

  return (
    <>
      {rivit.map(item => (
        <Rivi key={item.id} data={item} setData={setData(item.id)}>
          <div className="margin list-control-container">
            <Minus
              className="list-control"
              tabIndex="0"
              role="button"
              onClick={removeRivi(item.id)}
              onKeyPress={e => {
                if (e.key === ' ' || e.key === 'Enter') {
                  removeRivi(item.id)();
                  e.preventDefault();
                }
              }}
            />
          </div>
        </Rivi>
      ))}
      <div className="margin list-control-container">
        <Plus
          className="list-control"
          tabIndex="0"
          role="button"
          onClick={addRivi}
          onKeyPress={e => {
            if (e.key === ' ' || e.key === 'Enter') {
              addRivi();
              e.preventDefault();
            }
          }}
        />
      </div>
      <div className="full" style={{ minHeight: '40px' }}>
        (lisää uusi rivi)
      </div>
    </>
  );
};

export default Rivit;
