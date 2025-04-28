import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dri7jmdgw/image/upload/v1745835677/erroring_1_dkdsst.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="page-not-found-heading">Page Not Found</h1>
    <p className="page-not-found-description">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/" className="not-found-home-link">
      <button className="not-found-home-button">Home Page</button>
    </Link>
  </div>
)

export default NotFound
