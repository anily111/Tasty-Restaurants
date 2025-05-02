import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const RestaurantCard = props => {
  const {details} = props
  const {name, id, imageUrl, cuisine, userRating} = details
  const {rating, totalReviews} = userRating
  return (
    <li className="restaurant-card-item" data-tesid="restaurant-item" key={id}>
      <Link to={`/restaurant/${id}`} className="restaurant-card-link">
        <img
          src={imageUrl}
          className="restaurant-card-image"
          alt="restaurant"
        />
        <div className="restaurant-card-details-container">
          <h1 className="restaurant-card-name">{name}</h1>
          <p className="restaurant-card-menu-type">{cuisine}</p>
          <div className="restaurant-card-ratings-review-container">
            <FaStar className="restaurant-card-rating-icon" />
            <h1 className="restaurant-card-name">{rating}</h1>
            <p className="restaurant-card-menu-type">
              ({totalReviews} Reviews)
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantCard
