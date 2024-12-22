import './index.css'

const SimilarProductItem = props => {
  const {details} = props
  const updatedDetails = {
    id: details.id,
    title: details.title,
    brand: details.brand,
    imageUrl: details.image_url,
    rating: details.rating,
    price: details.price,
  }
  const {title, brand, imageUrl, rating, price} = updatedDetails

  return (
    <li className="product-item">
      <img src={imageUrl} alt="similar product" className="thumbnail" />
      <h1 className="title">{title}</h1>
      <p className="brand">by {brand}</p>
      <div className="product-details">
        <p className="price">Rs {price}/-</p>
        <div className="rating-container">
          <p className="rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
