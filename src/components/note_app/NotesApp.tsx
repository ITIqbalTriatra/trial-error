import { useState } from "react"
import Footer from "./Footer"
import Form from "./Form"
import GroceryList from "./GroceryList"
import Header from "./Header"
import ProgressBar from "../ProgressBar"

const groceryItems = [
  {
    id: 1,
    name: "Kopi Bubuk",
    quantity: 2,
    checked: true,
  },
  {
    id: 2,
    name: "Gula Pasir",
    quantity: 5,
    checked: false,
  },
  {
    id: 3,
    name: "Air Mineral",
    quantity: 3,
    checked: false,
  },
]

export default function NotesApp() {
  const [items, setItems] = useState(groceryItems)
  const [loading, setLoading] = useState(false);

  function handleAddItem(item: any) {
    setLoading(true);

    setTimeout(() => {
      setItems([...items, item]);
      setLoading(false);
    }, 1500);
  }

  function handleDeleteItem(id: any) {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  function handleToggleItem(id: any) {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  function handleClearItems() {
    setItems([])
  }

  return (
    <div className="app">
      {loading && <ProgressBar />}
      <Header />
      <Form onAddItem={handleAddItem} />
      <GroceryList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Footer items={items} />
    </div>
  )
}
