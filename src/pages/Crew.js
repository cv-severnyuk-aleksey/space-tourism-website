import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Header from '../components/Header';

const Crew = props => {
  const { data } = props;

  const [content, setContent] = useState({
    active: 0,
    name: '',
    role: '',
    bio: '',
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
    role: data[item].role,
    bio: data[item].bio,
    images: {
      png: data[item].images.png,
      webp: data[item].images.webp,
    },
  });

  return (
    <div className="wrapper crew">
      <Header />
      <main className="content">
        <div className="crew__container">
          <h5 class="section__title"><span>02</span> Meet your crew</h5>
          <div className="crew__content">
            <div className="crew__content__img">
              <picture>
                <source srcset={content.images.webp} type="image/webp" />
                <img src={content.images.png ? content.images.png : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} alt={content.name} width="178" height="222" />
              </picture>
            </div>
            <div className="crew__content__text">
              <ul className="nav crew__content__nav">
                {data?.map((item, index) => <li 
                  key={index} 
                  className={index === content.active ? 'active' : ''}
                  onClick={() => showContent(index)}
                />)}
              </ul>
              <div className="crew__content__info">
                <h4>{content.role}</h4>
                <h3>{content.name}</h3>
                <p>{content.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Crew;