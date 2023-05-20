import React, { useContext } from "react";
import { CustomerContext } from "../../../pages/Customer/Layout";
import BookingList from "../../BookingList";

export default function Menu() {
  const { onShowConfirmCustomerModel, confirmCus } =
    useContext(CustomerContext);

  return (
    <BookingList onShowConfirmCustomerModel = {onShowConfirmCustomerModel} confirmCus={confirmCus}/>
  );
}
