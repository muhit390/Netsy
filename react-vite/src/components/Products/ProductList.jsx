import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../../redux/products"; // Assuming you have a fetchProducts thunk
import "./Product.css";

function ProductList() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([])
  console.log(products)

  useEffect(() => {
    const fetchData = async () => {
      let arr = await dispatch(fetchProducts()); // Fetch products from the backend
      setProducts(arr)
    }
    fetchData()
  }, [dispatch]);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  ) || <p>Loading...</p>;
}

export default ProductList;
