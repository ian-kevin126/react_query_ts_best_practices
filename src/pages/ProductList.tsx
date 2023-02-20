import { useState, useCallback, useEffect } from "react";
import { getAllProducts } from "../apis/base";
import { columns } from "../utils/constants";
import { Card, Table } from "antd";
import { Product } from "../types/base";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // const { data: _productList } = useGetAllProducts();
  // const productList = _productList?.length ? _productList : [];

  // console.log("productList", productList);

  const handleSearch = useCallback(async () => {
    const _products = await getAllProducts();
    setProducts(_products.data);
    console.log("_products111", _products);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <Card title="ProductList">
      <Table dataSource={products} columns={columns} rowKey={"id"} />
    </Card>
  );
};

export default ProductList;
