import * as React from 'react';
import {Link} from 'react-router-dom'
import {stopLoading, store} from "@/context/store";
import {PlanetsService} from "@/services/api.service";
import {StarRating} from "@/common/Stars";
import ReviewsContainer from "@/components/reviews-container";
import {capitalCase} from 'change-case';

export default class PlanetContainer extends React.Component<any, { planet }> {
  constructor(props) {
    super(props);
    this.state = {planet: null};
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    const planet = await PlanetsService.get(id);
    this.setState({planet: planet}, () => store.dispatch(stopLoading()));
  }
  
  normalizePopulation = (number: any): number|string => {
    number = Number(number);
    if (number === null) {
      return null;
    }
    if (number === 0) {
      return 0;
    }
    let b = (number).toPrecision(2).split("e"),
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
      c = k < 1 ? number.toFixed(0) : (number / Math.pow(10, k * 3) ).toFixed(1),
      d = c < 0 ? c : Math.abs(c);
    
    return d + ['', 'K', 'M', 'B', 'T'][k];
  };

  render() {
    const {planet} = this.state;
    return planet && (
      <div className="planet-container container mt-2 mb-5">
        <Link to="/" className="d-block text-center mb-2 mt-2"><i className="fas fa-home" /></Link>
        <div className="card">
          <div className="card-img-header">
            <img alt={planet.name} src={planet.photo.file_path} className="card-img-top" />
            <button className="btn btn-light btn-photos">Photos</button>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-7">
                <small className="text-muted text-xs text-uppercase">{planet.galaxy.name}</small>
                <h1 className="card-title">{planet.name}</h1>
                <ul className="list-inline mb-1">
                  <li className="list-inline-item">
                    <StarRating rating={planet.average_rating || 0} />
                  </li>
                  <li className="list-inline-item">({planet.total_reviews || 0})</li>
                </ul>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <i className="fas fa-users"/> Population <span className="text-muted">{this.normalizePopulation(planet.population)}</span>
                  </li>
                  <li className="list-inline-item">
                    <i className="fas fa-sun"/> Climate <span className="text-muted">{planet.climate}</span>
                  </li>
                </ul>
                <hr/>
                <p className="card-text text-muted">{ planet.description }</p>
                {planet.terrains.length > 0 && (
                  <React.Fragment>
                    <hr/>
                    <h5>Terrains</h5>
                    <div className="row">
                      {planet.terrains.map((amenity) => {
                        return <div key={amenity.id} className="col-md-6"><p className="text-muted">{capitalCase(amenity.name)}</p></div>
                      })}
                    </div>
                  </React.Fragment>
                )}
                {planet.amenities_available.length > 0 && (
                  <React.Fragment>
                    <hr/>
                    <h5>Amenities</h5>
                    <div className="row">
                      {planet.amenities_available.map((amenity) => {
                        return <div key={amenity.id} className="col-md-6"><p className="text-muted">{amenity.name}</p></div>
                      })}
                    </div>
                  </React.Fragment>
                )}
                <hr />
                <h5>Reviews</h5>
                <div className="row">
                  <ReviewsContainer planet_id={planet.id} />
                </div>
              </div>
              <div className="col-md-5">
                <div className="card border">
                  <div className="card-body">
                    <div className="card-text">
                      <p className="mb-0"><strong>${ planet.price_dollars }</strong> per night</p>
                      <span className="text-muted text-xs d-block">
                        <span>
                          <StarRating rating={planet.average_rating || 0} />
                        </span>
                        <span className="ml-1">({planet.total_reviews || 0})</span>
                      </span>
                    </div>
                    <div className="form-group mb-0 mt-3">
                      <button className="btn-xl btn btn-block btn-primary">Check availability</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
