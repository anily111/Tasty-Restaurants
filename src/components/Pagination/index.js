import {Component} from 'react'
import {GrFormPrevious, GrFormNext} from 'react-icons/gr'
import './index.css'

class Pagination extends Component {
  state = {
    pageNo: 1,
  }

  previousButtonClicked = () => {
    const {pageNo} = this.state
    const {paginationHandler} = this.props
    if (pageNo > 1) {
      this.setState(
        prevState => ({
          pageNo: prevState.pageNo - 1,
        }),
        () => {
          paginationHandler(pageNo)
        },
      )
    }
  }

  nextPageButtonClicked = () => {
    const {pageNo} = this.state
    const {paginationHandler, totalPages} = this.props
    if (pageNo < totalPages) {
      this.setState(
        prevState => ({
          pageNo: prevState.pageNo + 1,
        }),
        () => {
          paginationHandler(pageNo)
        },
      )
    }
  }

  render() {
    const {pageNo} = this.state
    return (
      <div className="pagination-container">
        <button
          type="button"
          className="page-button"
          onClick={this.previousButtonClicked}
          data-testid="pagination-left-button"
        >
          <GrFormPrevious className="prev-icon" />
        </button>
        <p className="page-number" data-testid="active-page-number">
          {pageNo}
        </p>
        <button
          type="button"
          onClick={this.nextPageButtonClicked}
          className="page-button"
          data-testid="pagination-right-button"
        >
          <GrFormNext className="prev-icon" />
        </button>
      </div>
    )
  }
}

export default Pagination
