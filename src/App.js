import React from 'react';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';

import Lomake from './Lomake';

import './css/index.css';
import './css/skeleton.css';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('fi', fi);
setDefaultLocale('fi');

function App() {
  return <Lomake />;
}

export default App;
