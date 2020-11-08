import * as React from 'react';
import {CSSProperties} from "react";

// This assumes the nax number stars is 5.
export const StarRating = ({rating, ...props}: {rating:number}) => {
  const style: CSSProperties = {
    width: `${rating/5*100}%`
  };

  // functional way.
  const renderStars = (rating: number): any => {
    const starNodes = [];
    for (let i = 1; i <= 5; i++) {
      let className = 'fas fa-star';
      if (rating < i) {
        className = 'far fa-star';
      }
      const starNodeInput = (<i key={i} className={className} {...props} />);
      starNodes.push(starNodeInput);
    }
    return starNodes;
  };

  return (
    <span className="star-rating" title={`${rating}`}>
      <span className="back-stars">
        <i className="far fa-star" aria-hidden="true" />
        <i className="far fa-star" aria-hidden="true" />
        <i className="far fa-star" aria-hidden="true" />
        <i className="far fa-star" aria-hidden="true" />
        <i className="far fa-star" aria-hidden="true" />

        <span className="front-stars" style={style}>
          <i className="fas fa-star" aria-hidden="true" />
          <i className="fas fa-star" aria-hidden="true" />
          <i className="fas fa-star" aria-hidden="true" />
          <i className="fas fa-star" aria-hidden="true" />
          <i className="fas fa-star" aria-hidden="true" />
        </span>
      </span>
    </span>
  )
}
