import React from 'react';

const Specifications = () => {
  return (
    <section className="specifications">
      <ul className="specifications__list">
        <li className="specifications__item">
          <span className="specifications__name">
            Million km of earth
          </span>
          <div className="specifications__value">
            <span>55</span>
          </div>
        </li>
        <li className="specifications__item">
          <span className="specifications__name">
            Temperature on the planet
          </span>
          <div className="specifications__value">            
            <span>-153</span>
            <span> °C</span>
          </div>
        </li>
        <li className="specifications__item">
          <span className="specifications__name">
            Оf the mass of the Earth
          </span>
          <div className="specifications__value">
            <span>10,7</span>
            <span> %</span>
          </div>
        </li>
      </ul>
    </section>   
  );
}

export default Specifications;
