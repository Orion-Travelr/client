import * as React from 'react';
import {Link} from 'react-router-dom'
import {stopLoading, store} from "@/context/store";
import {PlanetsService} from "@/services/api.service";
import {StarRating} from "@/common/Stars";
import ReviewsContainer from "@/components/reviews-container";

export default class PlanetContainer extends React.Component<any, { planet }> {
  constructor(props) {
    super(props);
    this.state = {planet: null};
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    const planetRes = await PlanetsService.get(id);
    const planet = await planetRes;
    this.setState({planet: planet}, () => store.dispatch(stopLoading()));
  }

  render() {
    const {planet} = this.state;
    return planet && (
      <div className="planet-container container mt-2 mb-5">
        <Link to="/" className="d-block text-center mb-2 mt-2"><i className="fas fa-home" /></Link>
        <div className="card">
          <div className="card-img-header">
            <img alt={planet.data.attributes.name} src={planet.data.relationships.photo.links.src} className="card-img-top" />
            <button className="btn btn-light btn-photos">Photos</button>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-7">
                <small className="text-muted text-xs text-uppercase">{planet.data.relationships.galaxy.meta.name}</small>
                <h1 className="card-title">{planet.data.attributes.name}</h1>
                <ul className="list-inline mb-1">
                  <li className="list-inline-item">
                    <StarRating rating={planet.data.attributes.average_rating} />
                  </li>
                  <li className="list-inline-item">({planet.data.attributes.total_reviews})</li>
                </ul>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <i className="fas fa-users"/> Population <span className="text-muted">{planet.data.attributes.population}</span>
                  </li>
                  <li className="list-inline-item">
                    <i className="fas fa-sun"/> Climate <span className="text-muted">{planet.data.attributes.climate}</span>
                  </li>
                </ul>
                <hr/>
                <p className="card-text text-muted">{ planet.data.attributes.description }</p>
                <hr/>
                <h5>Terrains</h5>
                <div className="row">
                  <div className="col-md-6"><p className="text-muted">cityscape</p></div>
                  <div className="col-md-6"><p className="text-muted">mountains</p></div>
                </div>
                <hr/>
                <h5>Amenities</h5>
                {planet.data.relationships.amenities.data.length > 0 && (
                <div className="row">
                  {planet.data.relationships.amenities.data.map((amenity) => {
                    return <div key={amenity.id} className="col-md-6"><p className="text-muted">{amenity.type}</p></div>
                  })}
                </div>
                )}
                <hr/>
                <h5>Reviews</h5>
                <div className="row">
                  <ReviewsContainer planet_id={planet.data.id} />
                </div>
              </div>
              <div className="col-md-5">
                <div className="card border">
                  <div className="card-body">
                    <div className="card-text">
                      <p className="mb-0"><strong>${ planet.data.attributes.price_dollars }</strong> per night</p>
                      <span className="text-muted text-xs d-block">
                        <span>
                          <StarRating rating={planet.data.attributes.average_rating} />
                        </span>
                        <span className="ml-1">({planet.data.attributes.total_reviews})</span>
                      </span>
                    </div>
                    <div className="form-group mb-0 mt-3">
                      <button className="btn-xl btn btn-block btn-primary">Book</button>
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
