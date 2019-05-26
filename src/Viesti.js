import React, { useRef } from 'react';
import { format } from 'date-fns/esm';
import fi from 'date-fns/esm/locale/fi';

const fmt = new Intl.NumberFormat('fi-FI', {
  style: 'currency',
  currency: 'EUR'
});

const Linkki = ({ url, children }) => (
  <span>
    <button
      onClick={e => {
        e.preventDefault();
        window.open(url, '_blank');
      }}
      className="u-full-width"
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

const Yahoo = ({ to, subject, body }) => {
  const e = encodeURIComponent;
  const url = `https://compose.mail.yahoo.com/?to=${e(to)}&subject=${e(
    subject
  )}&body=${e(body)}`;
  return <Linkki url={url}>Yahoo</Linkki>;
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

  const textareaRef = useRef(null);
  const copy = e => {
    textareaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
  };
  const to = 'jks+matkalasku@iki.fi';
  const subject = 'Matkalasku';

  return (
    <>
      <div className="small leftcol">
        <label htmlFor="viesti">Viesti</label>
      </div>
      <section className="full">
        <textarea
          ref={textareaRef}
          readOnly={true}
          id="viesti"
          className="u-full-width full"
          style={{ height: '25rem' }}
          value={getViesti()}
        />
      </section>
      <div className="full">
        Valitse käyttämäsi sähköpostipalvelu. "Oletus" avaa koneesi
        sähköpostiohjelman ns. mailto-linkin avulla, seuraavat painikkeet
        avaavat selainpohjaisen sähköpostipalvelun, tai jos näistä ei ole apua,
        "Kopioi" kopioi viestin leikepöydälle, josta voit liittää sen muuten
        kirjoittamaasi sähköpostiin. Lähetä sähköposti osoitteeseen
        <code> jks+matkalasku@iki.fi</code>.
      </div>
      <div className="full buttons">
        <Oma to={to} subject={subject} body={getViesti()} />
        <Gmail to={to} subject={subject} body={getViesti()} />
        <Outlook to={to} subject={subject} body={getViesti()} />
        <Yahoo to={to} subject={subject} body={getViesti()} />
        <span>
          <button className="button u-full-width" onClick={copy}>
            Kopioi
          </button>
        </span>
      </div>
    </>
  );
};

export default Viesti;
