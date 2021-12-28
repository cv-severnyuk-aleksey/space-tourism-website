import { h } from 'preact';

import Header from '../components/Header';
import { Link } from 'preact-router/match';

const Home = () => {
  return (
    <div className="wrapper home">
      <Header />

      <main className="content">
        <div className="home__content">
          <div className="home__content__text">
            <h1>
              <span className="h5 section__title">So, you want to travel to </span>
              <span>Space</span>
            </h1>
            <p>Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world  experience!</p>
          </div>
          <Link href={`${process.env.SITE_PREFIX}destination.html`} className="home__content__button">Explore</Link>
        </div>
      </main>
    </div>
  );
};

export default Home;