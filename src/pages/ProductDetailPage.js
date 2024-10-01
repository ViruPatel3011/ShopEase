import ProductDetail from "../features/product/components/ProductDetail";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/Common/Footer";

function ProductDetailPage() {
    return (
        <div>
            <Navbar>
                <ProductDetail></ProductDetail>
            </Navbar>
            <Footer></Footer>
        </div>
    );
}

export default ProductDetailPage;