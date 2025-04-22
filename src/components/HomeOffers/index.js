import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeOffers extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    homeOffers: [],
  }

  componentDidMount() {
    this.getHomeOffers()
  }

  getHomeOffers = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const offersUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(offersUrl, options)
    if (response.ok) {
      const data = await response.json()
      const {offers} = data
      const updatedOffersData = offers.map(eachOffer => ({
        imageUrl: eachOffer.image_url,
        id: eachOffer.id,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        homeOffers: updatedOffersData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  offersLoadingView = () => (
    <div
      className="offers-loader-container"
      data-testid="restaurants-offers-loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  offersView = () => {
    const {homeOffers} = this.state
    const sliderProps = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <div className="offers-container">
        <div className="slider-container">
          <Slider {...sliderProps}>
            {homeOffers.map(eachOffer => {
              const {imageUrl} = eachOffer
              return <img src={imageUrl} alt="offer" className="offer" />
            })}
          </Slider>
        </div>
      </div>
    )
  }

  offersFailureView = () => (
    <div className="offers-failure-container">
      <h1 className="no-offers-heading">NO OFFERS</h1>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.offersLoadingView()
      case apiStatusConstants.success:
        return this.offersView()
      case apiStatusConstants.failure:
        return this.offersFailureView()
      default:
        return null
    }
  }
}

export default HomeOffers
