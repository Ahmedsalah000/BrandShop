import HomeCategory from '../../Components/Home/HomeCategory';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import Silder from './../../Components/Home/Silder';
import DiscountSection from './../../Components/Home/DiscountSection';
import BrandFeatured from '../../Components/Brand/BrandFeatured';
import ViewHomeProductsHook from './../../hook/products/view-home-products-hook';
const HomePage = () => {

    const [items] = ViewHomeProductsHook();
    return (
        <div className='font' style={{ minHeight: '670px' }}>

            <Silder />
            <HomeCategory />
            <CardProductsContainer products={items} title="الاكثر مبيعا" btntitle="المزيد" pathText="/products" />
            <DiscountSection />
            <CardProductsContainer products={items} title="احدث المنتجات" btntitle="المزيد" pathText="/products" />
            <BrandFeatured title="اشهر الماركات" btntitle="المزيد" />

        </div>
    )
}

export default HomePage
