import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Header from '../components/Header';

const Technology = props => {
  const { data } = props;

  const [content, setContent] = useState({
    active: 0,
    name: '',
    description: '',
    images: {
      portrait: '',
      landscape: '',
    },
  });

  useEffect(() => {
    if (data !== undefined) showContent(0);
  }, [data]);

  const showContent = item => setContent({
    active: item,
    name: data[item].name,
    description: data[item].description,
    images: {
      portrait: data[item].images.portrait,
      landscape: data[item].images.landscape,
    },
  });

  return (
    <div className="wrapper technology">
      <Header />
      
      <main className="content">
        <div className="technology__container">
          <h5 class="section__title"><span>03</span> Space launch 101</h5>
          <div className="technology__img">
            <picture>
              <source media="(min-width: 1024px)" srcSet={content.images.portrait} width="515" height="527" type="image/jpg" />
              <img src={content.images.landscape ? content.images.landscape : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} alt={content.name} width="768" height="310" />
            </picture>
          </div>
          <div className="technology__content">
            <div className="technology__content__text">
              <ul className="technology__content__nav">
                {data?.map((item, index) => <li 
                  key={index} 
                  className={index === content.active ? 'active' : ''}
                  onClick={() => showContent(index)}
                >{index+1}</li>)}
              </ul>
              <div className="technology__content__info">
                <div className="technology__content__info__subtitle">The terminology...</div>
                <h3>{content.name}</h3>
                <p>{content.description}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Technology;