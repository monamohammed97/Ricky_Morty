
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { lazy } from 'react';
import {Loadable} from './components';

const Detail = Loadable(lazy(() => import("./page/detail")));
const Listing = Loadable(lazy(() => import("./page/listing")));


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Listing/>} />
        <Route path="/detail/:id" element={<Detail/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;