import { useEffect, useState } from "react"
import { CiTextAlignLeft } from "react-icons/ci";
import { API_KEY } from "../../constants";

const ProductPrice = ({ productId, regionId }) => {
  const [price, setPrice] = useState(null)

  useEffect(() => {
    const fetchPrice = async () => {
      const res = await fetch(
        `http://localhost:9000/store/products/${productId}?region_id=${regionId}`,
        {
          headers: { "x-publishable-api-key": API_KEY },
        }
      )
      const data = await res.json()
      const variant = data.product.variants[0]
      const amount = variant?.calculated_price?.calculated_amount
      if (amount !== undefined) {
        setPrice((amount / 100).toFixed(2))
      }
    }

    fetchPrice()
  }, [productId, regionId])

  return <p style={{textAlign: "left"}}>Price: {price ? `${price} RUB` : "Loading..."}</p>
};

export default ProductPrice;
