import React from "react";
import Banner from "../../components/Customer/Menu/Banner";
import { useGetOrderedDishes } from "../../hooks/customer/booking";
import List from "../../components/Customer/Menu/List";
import ConfirmCustomerModal from "../../components/Customer/Menu/ConfirmCusModal";

const Menu = () => {
  const { data: dataOrderedDishesResponse } = useGetOrderedDishes();
  const customerName = dataOrderedDishesResponse?.data.customer_name;

  return (
    <>
      <Banner customerName={customerName} />
      <List />
      <ConfirmCustomerModal />
    </>
  );
};

export default Menu;
