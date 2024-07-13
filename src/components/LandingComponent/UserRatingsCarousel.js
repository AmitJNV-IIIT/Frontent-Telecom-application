import React from 'react';
import Carousel from 'react-material-ui-carousel/dist';
import ratngslider from '../../data/clients-response.json';
import Item from './Item';
//
function Userratingscarousel() {
  return (
    <div>
      <Carousel>
        {ratngslider.map((item, i) => {
          return <Item key={i} item={item} />;
        })}
      </Carousel>
    </div>
  );
}
export default Userratingscarousel;
