import React, { useState } from 'react';
import { format } from 'date-fns/esm';
import fi from 'date-fns/esm/locale/fi';
import Clipboard from 'react-clipboard-polyfill';

const fmt = new Intl.NumberFormat('fi-FI', {
  style: 'currency',
  currency: 'EUR'
});

const Linkki = ({ url, children }) => (
  <span className="button-wrapper">
    <button
      onClick={e => {
        e.preventDefault();
        window.open(url, '_blank');
      }}
      className="u-full-width"
      tabIndex="0"
    >
      {children}
    </button>
  </span>
);

const Gmail = ({ to, subject, body }) => {
  const e = encodeURIComponent;
  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${e(to)}&su=${e(
    subject
  )}&body=${e(body)}`;
  return <Linkki url={url}>Gmail</Linkki>;
};

const Oma = ({ to, subject, body }) => {
  const e = encodeURIComponent;
  const url = `mailto:${e(to)}?subject=${e(subject)}&body=${e(body)}`;
  return <Linkki url={url}>Oletus</Linkki>;
};

const Outlook = ({ to, subject, body }) => {
  const e = encodeURIComponent;
  const url = `https://outlook.office.com/owa/?path=/mail/action/compose&to=${e(
    to
  )}&subject=${e(subject)}&body=${e(body)}`;
  return <Linkki url={url}>Outlook</Linkki>;
};

const Live = ({ to, subject, body }) => {
  const e = encodeURIComponent;
  const url = `https://outlook.live.com/owa/?subject=${e(subject)}&body=${e(
    body
  )}&to=${e(to)}&path=%2fmail%2faction%2fcompose`;
  return <Linkki url={url}>Hotmail</Linkki>;
};

const Viesti = ({ rivit, nimi, rooli, tilaisuus, pvm, tilinumero }) => {
  const getViesti = () => {
    const kulurivit = rivit
      .map(
        ({ lahtopaikka, tulopaikka, kulkuneuvo, matka, kustannus }) =>
          `${fmt
            .format(kustannus)
            .padStart(9)}: ${lahtopaikka} — ${tulopaikka}, ${kulkuneuvo}` +
          (kulkuneuvo === 'oma auto' ? ` ${matka || 0} km` : '')
      )
      .join('\n');
    return `Hei!

Seuraavassa matkalasku:

${tilaisuus || '???'}, ${pvm ? format(pvm, 'P', { locale: fi }) : '???'}

Matkakulut:

${kulurivit}
---------
${fmt
  .format(rivit.map(({ kustannus }) => +kustannus).reduce((a, b) => a + b, 0))
  .padStart(9)}

Pyydän maksamaan nämä tililleni ${tilinumero || '???'}.
Liitän skannatut tai kuvatut kuitit tähän sähköpostiin.

Terveisin ${nimi || '???'}`;
  };

  const [kopioiClasses, setKopioiClasses] = useState('u-full-width');
  const to = 'jks+matkalasku@iki.fi';
  const subject = 'Matkalasku';

  return (
    <>
      <div className="input input-viesti">
        <label htmlFor="viesti">Viesti</label>
        <textarea
          readOnly={true}
          id="viesti"
          className="u-full-width"
          style={{ height: '25rem' }}
          value={getViesti()}
        />
      </div>
      <p className="selitys">
        Valit­se käyt­tä­mäsi sähkö­posti­palvelu. "Ole­tus" avaa konee­si
        sähkö­posti­ohjelman ns. <span lang="en">mailto</span>-linkin avul­la,
        seu­raa­vat pai­nik­keet avaa­vat selain­pohjaisen sähkö­posti­palvelun,
        tai jos näis­tä ei ole apua, "Kopioi" kopioi vies­tin leike­pöydälle,
        josta voit liit­tää sen muu­ten kir­joit­ta­maa­si sähkö­postiin.
        Lähe­tä sähkö­posti osoit­tee­seen
        <code> jks+matkalasku@iki.fi</code>.
      </p>
      <div className="buttons">
        <Oma to={to} subject={subject} body={getViesti()} />
        <Gmail to={to} subject={subject} body={getViesti()} />
        <Outlook to={to} subject={subject} body={getViesti()} />
        <Live to={to} subject={subject} body={getViesti()} />
        <span className="button-wrapper">
          <Clipboard
            render={({ copyText }) => (
              <button
                className={kopioiClasses}
                tabIndex="0"
                onClick={() =>
                  copyText(getViesti())
                    .then(setKopioiClasses('u-full-width working'))
                    .then(
                      setTimeout(() => setKopioiClasses('u-full-width'), 100)
                    )
                }
              >
                Kopioi
              </button>
            )}
          />
        </span>
      </div>
    </>
  );
};

export default Viesti;
