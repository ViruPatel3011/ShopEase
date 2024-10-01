import ProductDetail from "../../Components/Product/ProductDetail";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Common/Footer";

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