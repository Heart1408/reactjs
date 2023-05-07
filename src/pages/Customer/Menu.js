import React, { useState } from "react";
import Banner from "../../components/Customer/Menu/Banner";
import List from "../../components/Customer/Menu/List";
import ConfirmCustomerModal from "../../components/Customer/Menu/ConfirmCusModal";

const Menu = () => {
  return (
    <>
      <Banner />
      <List />
      <ConfirmCustomerModal />
    </>
  );
};

export default Menu;
