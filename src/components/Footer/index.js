import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-image-name-container">
      <img
        src="https://res.cloudinary.com/dri7jmdgw/image/upload/v1745564693/Frame_275_pmeeoq.png"
        className="footer-image"
        alt="website-footer-logo"
      />
      <h1 className="footer-website-name">Tasty Kitchens</h1>
    </div>
    <p className="footer-description">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="footer-logos-container">
      <FaPinterestSquare
        data-testid="pintrest-social-icon"
        className="footer-icon"
      />
      <FaInstagram
        className="footer-icon"
        data-testid="instagram-social-icon"
      />
      <FaTwitter className="footer-icon" data-testid="twitter-social-icon" />
      <FaFacebookSquare
        className="footer-icon"
        data-testid="facebook-social-icon"
      />
    </div>
  </div>
)

export default Footer
