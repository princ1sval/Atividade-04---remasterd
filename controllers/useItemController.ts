import { useState } from "react";
import { Item } from "../models/Item";
import ItemService from "../services/ItemService";

export const useItemController = () => {

  const [items, setItems] = useState<Item[]>([]);

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

  const removeItem = (id: number) => {

    const newList = ItemService.removeItem(id);

    setItems([...newList]);

  };

  const editItem = (id: number, newName: string): { success: boolean; message?: string } => {

    try {

      const newList = ItemService.editItem(id, newName);

      setItems([...newList]);

      return { success: true };

    } catch (error: any) {

      return {
        success: false,
        message: error.message
      };

    }

  };

  return {
    items,
    addItem,
    removeLast,
    removeItem,
    editItem
  };

};