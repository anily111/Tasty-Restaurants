import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const RestaurantCard = props => {
  const {details} = props
  const {name, id, imageUrl, menuType, userRating} = details
  const {rating, totalReviews} = userRating
  return (
    <li className="restaurant-item" data-tesid="restaurant-item" key={id}>
      <Link to={`/restaurant/${id}`} className="restaurant-link">
        <img src={imageUrl} className="restaurant-image" alt="restaurant" />
        <div className="restaurant-details-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="menu-type">{menuType}</p>
          <div className="ratings-review-container">
            <FaStar className="rating-icon" />
            <h1 className="restaurant-name">{rating}</h1>
            <p className="menu-type">({totalReviews} Reviews)</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantCard
