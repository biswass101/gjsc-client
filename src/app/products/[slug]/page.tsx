import ProductPage, {
  generateMetadata,
  generateStaticParams,
} from "../../product/[slug]/page";

export const dynamicParams = true;
export { generateMetadata, generateStaticParams };
export default ProductPage;
