import * as React from 'react';
import {Link} from 'react-router-dom'
import {stopLoading, store} from "@/context/store";
import {PlanetsService} from "@/services/api.service";
import {StarRating} from "@/common/Stars";

const qs = require('qs');

export default class PlanetsContainer extends React.Component<any, { data, loading: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const query = await qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    const searchRes = await PlanetsService.query({
      name: query.name,
      galaxy_id: query.galaxy_id,
      amenities: query.amenities
    });
    const data = await searchRes.data;

    this.setState({data: data, loading: false}, () => store.dispatch(stopLoading()));
  }

  likeHandler = (e, id: number) => {
    e.preventDefault();
  }

  render() {
    const {loading, data} = this.state;
    if (loading) {
      return <h3 className="center-of-screen text-white text-center">Fueling up the tanks, and reviewing ignition plans...</h3>;
    }

    if (!loading && data.data.length === 0) {
      return <h3 className="center-of-screen text-white text-center">
        Sorry, we were unable to find planets that meet your needs :(
        <Link to="/" className="d-block mt-3"><i className="fas fa-home"/></Link>
      </h3>;
    }

    return !loading && data && (
      <div className="mt-2 container">
        <Link to="/" className="d-block text-center mb-2 mt-2"><i className="fas fa-home" /></Link>
        <div className="items row">
          {data.data.map((item) => {
            return (
              <div className="col-sm-3" key={item.id}>
                <div className="item">
                  <div className="card mb-4">
                    <Link to={`/planets/${item.id}`} className="card-overlay">
                      <button className="card-heart btn text-white text-right" type="button" onClick={(e) => this.likeHandler(e, item.id)}>
                        <i className="far fa-heart" />
                      </button>
                      <img src={item.relationships.photo.links.thumb_src} alt={item.attributes.name} className="card-img-top"/>
                      <div className="overlay-container">
                        <figure className="text-xs m-0 badge badge-primary">${item.attributes.price_dollars} per night</figure>
                        <h5 className="card-title mb-0">{item.attributes.name}</h5>
                        <small className="text-sm text-uppercase">{item.relationships.galaxy.meta.name}</small>
                      </div>
                    </Link>

                    <div className="card-body">
                      <span className="text-muted text-xs">
                        <span>
                          <StarRating rating={(item.attributes.average_rating)} />
                        </span>
                        <span className="ml-1 text-muted">({item.attributes.total_reviews})</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}
