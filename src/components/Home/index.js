import {MdOutlineSort} from 'react-icons/md'
import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import HomeOffers from '../HomeOffers'
import RestaurantCard from '../RestaurantCard'
import Pagination from '../Pagination'
import Footer from '../Footer'

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
    sortBy: sortByOptions[1].id,
    totalPages: 0,
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
      const {restaurants, total} = data
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
        totalPages: total,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  loadingView = () => {
    ;<div
      className="offers-loader-container"
      data-testid="restaurants-list-loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  }

  successView = () => {
    const {restaurentsList} = this.state
    return (
      <div className="restaurants-list">
        {restaurentsList.map(eachRestaurant => (
          <RestaurantCard
            details={eachRestaurant}
            key={eachRestaurant.id}
            data-testid="restaurant-item"
          />
        ))}
      </div>
    )
  }

  failureView = () => {
    ;<div className="offers-failure-container">
      <h1 className="no-offers-heading">NO AVAILABLE RESTAURANTS</h1>
    </div>
  }

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

  onEnterSearchInput = () => {
    this.getRestaurents()
  }

  render() {
    const {sortBy, searchInput, totalPages} = this.state
    return (
      <div className="home-container">
        <Header activePage="home" />
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
          <div className="search-container">
            <input
              type="search"
              value={searchInput}
              className="search-input"
              placeholder="Search"
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              className="search-button"
              onClick={this.onEnterSearchInput}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <hr className="horizontal-line" />
          {this.renderRestaurents()}
          <Pagination
            totalPages={totalPages}
            paginationHandler={this.getRestaurents}
          />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
