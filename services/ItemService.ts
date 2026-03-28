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

const removeItem = (id: number): Item[] => {

  items = items.filter(item => item.id !== id);

  return items;

};

const editItem = (id: number, newName: string): Item[] => {

  if (newName.length <= 2) {
    throw new Error("O nome precisa ter mais de 2 caracteres");
  }

  const exists = items.find(
    (i) => i.name.toLowerCase() === newName.toLowerCase() && i.id !== id
  );

  if (exists) {
    throw new Error("Já existe um item com esse nome");
  }

  const item = items.find(i => i.id === id);
  if (item) {
    item.name = newName;
  }

  return items;

};

const ItemService = {
  getItems,
  addItem,
  removeLast,
  removeItem,
  editItem
};

export default ItemService;