import { Item } from "../models/Item";

let items: Item[] = [];

const getItems = (): Item[] => {
  return items;
};

const addItem = (name: string): Item[] => {

  if (name.length <= 2) {
    throw new Error("O nome precisa ter mais de 2 caracteres");
  }

  const exists = items.find(
    (i) => i.name.toLowerCase() === name.toLowerCase()
  );

  if (exists) {
    throw new Error("Já existe um item com esse nome");
  }

  const newItem: Item = {
    id: Date.now(),
    name: name
  };

  items.push(newItem);

  return items;

};

const removeLast = (): Item[] => {

  items.pop();

  return items;

};

const ItemService = {
  getItems,
  addItem,
  removeLast
};

export default ItemService;