import {MdOutlineSort} from 'react-icons/md'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import HomeOffers from '../HomeOffers'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    restaurentsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    sortBy: sortByOptions[0].id,
  }

  componentDidMount() {
    this.getRestaurents()
  }

  getRestaurents = async (pageNo = 1) => {
    const {searchInput, sortBy} = this.state
    const sortByObj = sortByOptions.find(eachSortBy => eachSortBy.id === sortBy)
    const offset = (pageNo - 1) * 9
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=9&sort_by_rating=${sortByObj.value}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const {restaurants} = data
      const updatedData = restaurants.map(eachRestaurant => ({
        hasOnlineDelivery: eachRestaurant.has_online_delivery,
        userRating: {
          rating: eachRestaurant.user_rating.rating,
          ratingColor: eachRestaurant.user_rating.rating_color,
          ratingText: eachRestaurant.user_rating.rating_text,
          totalReviews: eachRestaurant.user_rating.total_reviews,
        },
        name: eachRestaurant.name,
        hasTableBooking: eachRestaurant.has_table_booking,
        isDeliveryNow: eachRestaurant.is_delivery_now,
        costForTwo: eachRestaurant.cost_for_two,
        cuisine: eachRestaurant.cuisine,
        imageUrl: eachRestaurant.image_url,
        id: eachRestaurant.id,
        menuType: eachRestaurant.menu_type,
        location: eachRestaurant.location,
        opensAt: eachRestaurant.opens_at,
        groupByTime: eachRestaurant.group_by_time,
      }))
      this.setState({
        restaurentsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  loadingView = () => {}

  successView = () => {}

  failureView = () => {}

  renderRestaurents = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  onChangeSortby = event => {
    this.setState({sortBy: event.target.value})
  }

  render() {
    const {sortBy} = this.state
    return (
      <div className="home-container">
        <Header />
        <HomeOffers />
        <div className="home-contents-container">
          <h1 className="popular-restaurents">Popular Restaurants</h1>
          <div className="home-description-sort-container">
            <p className="home-description">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="sort-by-container">
              <MdOutlineSort className="sort-by-icon" />
              <p className="sort-by">Sort by</p>
              <select
                className="sort-by-select"
                value={sortBy}
                onChange={this.onChangeSortby}
              >
                {sortByOptions.map(eachOption => (
                  <option
                    key={eachOption.id}
                    value={eachOption.id}
                    className="select-option"
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {this.renderRestaurents()}
        </div>
      </div>
    )
  }
}

export default Home
