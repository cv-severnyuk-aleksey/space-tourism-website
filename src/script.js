import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import Router from 'preact-router';

import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Crew from './pages/Crew';
import Technology from './pages/Technology';

import './scss/style.scss';

const Layout = () => {
  const [data, setData] = useState(null);
  
  const handleRoute = () => {
    if (!data) {
      fetch(`${process.env.SITE_PREFIX}data.json`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(() => setData({}));
    }
  };

  return (
    <Router onChange={handleRoute}>
      <Home path={process.env.SITE_PREFIX} />
      <Destinations path={`${process.env.SITE_PREFIX}destination.html`} data={data?.destinations} />
      <Crew path={`${process.env.SITE_PREFIX}crew.html`} data={data?.crew} />
      <Technology path={`${process.env.SITE_PREFIX}technology.html`} data={data?.technology} />
    </Router>
  )
}

render(<Layout />, document.querySelector('#content'));