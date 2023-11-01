import { useState } from "react"

export default function Form({ onAddItem }: any) {
  const [name, setName] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)

  function handleSumbit(e: any) {
    e.preventDefault()

    if (!name) return

    const newItem = {
      name,
      quantity,
      checked: false,
      id: Date.now(),
    }

    onAddItem(newItem)

    setName("")
    setQuantity(1)
  }

  const quantityNum = [...Array(20)].map((_, i) => (
    <option key={i + 1} value={i + 1}>
      {i + 1}
    </option>
  ))

  return (
    <form className="add-form" onSubmit={handleSumbit}>
      <h3>Hari ini belanja apa kita?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {quantityNum}
      </select>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="nama barang..."
      />
      <button>Tambah</button>
    </form>
  )
}
