import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import CategoryHeader from '../../Components/Category/CategoryHeader'
import CardProductsContainer from '../../Components/Products/CardProductsContainer'
import ProductDetalis from '../../Components/Products/ProductDetalis'
import RateContainer from '../../Components/Rate/RateContainer'
import ViewProductsDetalisHook from './../../hook/products/view-products-detalis-hook'

const ProductDetalisPage = () => {
    const { id } = useParams();
    const [item, images, cat, brand, prod] = ViewProductsDetalisHook(id);

    // Add error boundary and loading state
    if (!item) {
        return (
            <div style={{ minHeight: '670px' }}>
                <Container>
                    <div>Loading...</div>
                </Container>
            </div>
        )
    }

    const rateAvg = item?.ratingsAverage || 0;
    const rateQty = item?.ratingsQuantity || 0;
    const relatedProducts = prod?.slice(0, 4) || [];

    return (
        <div style={{ minHeight: '670px' }}>
            <Container>
                <ProductDetalis item={item} />
                <RateContainer rateAvg={rateAvg} rateQty={rateQty} />
                <CardProductsContainer products={relatedProducts} title="Related Products" />
            </Container>
        </div>
    )
}

export default ProductDetalisPage
