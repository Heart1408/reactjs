import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectedCurrentUser } from "../../redux/login/selector";
import { useGetCategories } from "../../hooks/category";
import ProductList from "../../components/Staff/Menu/ProductList";
import CategoryList from "../../components/Staff/Menu/CategoryList";

function Menu() {
  const currentStaff = useSelector(selectedCurrentUser);
  const isAdmin = currentStaff.role === "admin";

  const { data: dataCategoryResponse, isSuccess, refetch } = useGetCategories();
  const categoryList = dataCategoryResponse?.data;

  const [queryParams, setQueryParams] = useState({
    search_key: "",
    sortByPrice: null,
    categoryId: null,
    status: null,
  });

  const [categoryActive, setCategoryActive] = useState({
    id: null,
    name: null,
  });

  useEffect(() => {
    setCategoryActive({
      id: categoryList && categoryList[0] ? categoryList[0].id : null,
      name: categoryList && categoryList[0] ? categoryList[0].type : null,
    });
  }, [categoryList, isSuccess]);

  return (
    <>
      <div className="menu">
        <CategoryList
          categoryList={categoryList}
          refetchCategories={refetch}
          categoryActive={categoryActive}
          queryParams={queryParams}
          setCategoryActive={setCategoryActive}
          setQueryParams={setQueryParams}
          isAdmin={isAdmin}
        />
        <ProductList
          categoryActive={categoryActive}
          isAdmin={isAdmin}
          categoryList={categoryList}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
      </div>
    </>
  );
}

export default Menu;
