import { useState } from "react";
import { Item } from "../models/Item";
import ItemService from "../services/ItemService";

export const useItemController = () => {

  const [items, setItems] = useState<Item[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);

  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const addItem = (name: string): { success: boolean; message?: string } => {

    try {

      const newList = ItemService.addItem(name);

      setItems([...newList]);

      return { success: true };

    } catch (error: any) {

      return {
        success: false,
        message: error.message
      };

    }

  };

  const removeLast = () => {

    const newList = ItemService.removeLast();

    setItems([...newList]);

  };

  return {
    items,
    dialogVisible,
    openDialog,
    closeDialog,
    addItem,
    removeLast
  };

};