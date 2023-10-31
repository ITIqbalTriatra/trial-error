import Item from "./Item"
import { useState } from "react"

export default function GroceryList({ items, onDeleteItem, onToggleItem, onClearItems }: any) {
  const [sortBy, setSortBy] = useState("input")

  let sortedItems

  switch (sortBy) {
    case "name":
      sortedItems = items.slice().sort((a: any, b: any) => a.name.localeCompare(b.name))
      console.log(items.slice(2))
      break
    case "checked":
      sortedItems = items.slice().sort((a: any, b: any) => a.checked - b.checked)
      break
    default:
      sortedItems = items
      break
  }

  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item: any) => (
            <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
          ))}
        </ul>
      </div>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button onClick={onClearItems}>Bersihkan Daftar</button>
      </div>
    </>
  )
}
