import {Component} from 'react'
import {FaRupeeSign, FaStar} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import FoodCard from '../FoodCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SpecificRestaurent extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantDetails: {},
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.id,
        rating: data.rating,
        name: data.name,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        reviewsCount: data.reviews_count,
        opensAt: data.opens_at,
        location: data.location,
        itemsCount: data.items_count,
        foodItems: data.food_items.map(eachFoodItem => ({
          name: eachFoodItem.name,
          cost: eachFoodItem.cost,
          foodType: eachFoodItem.food_type,
          imageUrl: eachFoodItem.image_url,
          id: eachFoodItem.id,
        })),
      }
      this.setState({
        restaurantDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div
      className="offers-loader-container"
      data-testid="restaurants-list-loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => {}

  renderSuccessView = () => {
    const {restaurantDetails} = this.state
    const {
      imageUrl,
      name,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantDetails
    const {foodItems} = restaurantDetails
    console.log(foodItems)
    return (
      <div className="restaurent-container">
        <div className="restaurent-details-container">
          <img src={imageUrl} className="restaurant-image" alt="restaurant" />
          <div className="restaurant-details">
            <h1 className="restaurant-name">{name}</h1>
            <p className="restaurant-location">{location}</p>
            <div className="reviews-cost-container">
              <div className="rating-review-container">
                <div className="rating-icon-container">
                  <FaStar className="star-icon" />
                  <p className="restaurant-rating">{rating}</p>
                </div>
                <p className="restaurant-reviews">{reviewsCount}+ Ratings</p>
              </div>
              <hr className="vertical-line" />
              <div className="cost-container">
                <div className="rupee-cost-container">
                  <FaRupeeSign className="rupee-icon" />
                  <p className="cost-for-two-value">{costForTwo}</p>
                </div>
                <p className="cost-for-two">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="restaurant-items-list">
          {foodItems.map(eachFoodItem => (
            <FoodCard
              foodDetails={eachFoodItem}
              rating={rating}
              key={eachFoodItem.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderSpecificRestaurantDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="specific-restaurants-container">
        <Header />
        {this.renderSpecificRestaurantDetails()}
        <Footer />
      </div>
    )
  }
}

export default SpecificRestaurent
