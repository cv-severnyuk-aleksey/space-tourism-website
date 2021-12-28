import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Header from '../components/Header';

const Destinations = props => {
  const { data } = props;

  const [content, setContent] = useState({
    active: 0,
    name: '',
    description: '',
    distance: '',
    travel: '',
    images: {
      png: '',
      webp: '',
    },
  });

  useEffect(() => {
    if (data !== undefined) showContent(0);
  }, [data]);

  const showContent = item => setContent({
    active: item,
    name: data[item].name,
    description: data[item].description,
    distance: data[item].distance,
    travel: data[item].travel,
    images: {
      png: data[item].images.png,
      webp: data[item].images.webp,
    },
  });

  return (
    <div className="wrapper destinations">
      <Header />

      <main className="content">
        <div className="destinations__container">
          <h5 class="section__title"><span>01</span> Pick your destination</h5>
          <div className="destinations__content">
            <div className="destinations__content__img">
              <picture>
                <source srcset={content.images.webp} type="image/webp" />
                <img src={content.images.png ? content.images.png : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} alt={content.name} width="170" height="170" />
              </picture>
            </div>
            <div className="destinations__content__text">
              <ul className="nav destinations__content__nav">
                {data?.map((item, index) => <li 
                  key={index} 
                  className={index === content.active ? 'active' : ''}
                  onClick={() => showContent(index)}
                >{item.name}</li>)}
              </ul>
              <div className="destinations__content__info">
                <h2>{content.name}</h2>
                <p>{content.description}</p>
          
                <div className="destinations__content__meta">
                  <div className="destinations__content__meta__item">
                    <span className="subheading2">AVG. DISTANCE</span>
                    <span className="subheading">{content.distance}</span>
                  </div>
                  <div className="destinations__content__meta__item">
                    <span className="subheading2">Est. travel time</span>
                    <span className="subheading">{content.travel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Destinations;