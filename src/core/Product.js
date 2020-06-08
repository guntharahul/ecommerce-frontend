import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';
const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
      // fetch related products as  we need to fetch related products only after getting the single product
      // sending the productId to get related products
      listRelated(data._id).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setRelatedProduct(data);
        }
      });
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-6'>
          {product && product.description && (
            <div className='col-12'>
              <Card product={product} showViewProductButton={false}></Card>
            </div>
          )}
        </div>
        <div className='col-6'>
          <h4>Related Products</h4>
          <hr></hr>
          <div className='row'>
            {relatedProduct.map((p, i) => (
              <div className='col-4 mb-3'>
                {<Card key={i} product={p}></Card>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Product;
