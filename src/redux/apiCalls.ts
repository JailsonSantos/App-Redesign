import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { clearAllItemsFromBasket } from "./basketSlice";

export const clearBasket = async (dispatch: Dispatch<AnyAction>) => {

  try {
    dispatch(clearAllItemsFromBasket({} as any))

  } catch (error) {
    console.log(error)
  }
}