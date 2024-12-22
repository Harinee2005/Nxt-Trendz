import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

const status = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProductItemDetails extends Component {
  state = {
    responseList: [],
    cartCount: 1,
    similarProducts: [],
    statusProducts: status.loading,
  }

  componentDidMount = () => {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({statusProducts: status.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const productDetailsApiUrl = `https://apis.ccbp.in/products/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(productDetailsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedDetails = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        price: data.price,
        description: data.description,
      }
      this.setState({
        responseList: updatedDetails,
        similarProducts: data.similar_products,
        statusProducts: status.success,
      })
    } else {
      this.setState({statusProducts: status.failure})
    }
  }

  onDecrement = () => {
    const {cartCount} = this.state
    if (cartCount > 1) {
      this.setState(prevState => ({
        cartCount: prevState.cartCount - 1,
      }))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({
      cartCount: prevState.cartCount + 1,
    }))
  }

  onSuccess = () => {
    const {responseList, cartCount, similarProducts} = this.state
    const {imageUrl, title, price, rating, totalReviews} = responseList
    const {description, availability, brand} = responseList
    return (
      <>
        <div className="product-item-details">
          <img className="specific-image" src={imageUrl} alt="product" />
          <div className="details-container">
            <h1 className="specific-item-title">{title}</h1>
            <p className="specific-item-price">Rs {price} /-</p>
            <div className="specific-item-rating-reviews">
              <div className="rating-container-specific">
                <p className="rating-specific">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-specific"
                />
              </div>
              <p className="specific-item-reviews">{totalReviews} Reviews</p>
            </div>
            <p className="specific-item-description">{description}</p>
            <p className="specific-item-description">
              <span className="specific-item-bold">Available:</span>{' '}
              {availability}
            </p>
            <p className="specific-item-description">
              <span className="specific-item-bold">Brand:</span> {brand}
            </p>
            <hr />
            <div className="specific-item-cart">
              <button
                onClick={this.onDecrement}
                className="specific-item-btn-minus"
                type="button"
                data-testid="minus"
              >
                <BsDashSquare />
              </button>
              <p className="specific-item-description">{cartCount}</p>
              <button
                onClick={this.onIncrement}
                className="specific-item-btn-plus"
                type="button"
                data-testid="plus"
              >
                <BsPlusSquare />
              </button>
            </div>
            <button className="cart-button" type="button">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="similar-products">
          <h1 className="specific-item-title">Similar Products</h1>
          <ul className="similar-products-container">
            {similarProducts.map(eachData => (
              <SimilarProductItem details={eachData} key={eachData.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  onFailure = () => (
    <div className="on-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="img-failure"
      />
      <h1>Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="shop-now-button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  onLoading = () => (
    <div data-testid="loader" className="primedeals-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {statusProducts} = this.state
    let content
    switch (statusProducts) {
      case status.success:
        content = this.onSuccess()
        break
      case status.loading:
        content = this.onLoading()
        break
      case status.failure:
        content = this.onFailure()
        break
      default:
        content = null
        break
    }
    return (
      <>
        <Header />
        {content}
      </>
    )
  }
}

export default ProductItemDetails
