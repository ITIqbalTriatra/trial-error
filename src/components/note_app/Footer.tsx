export default function Footer({ items }: any) {
  if (items.length === 0) return <footer className="stats">Daftar Belanjaan masih kosong!</footer>

  const totalItems = items.length
  const checkedItems = items.filter((item: any) => item.checked).length
  const percentage = Math.round((checkedItems / totalItems) * 100)

  return (
    <footer className="stats">
      Ada {totalItems} barang di daftar belanjaan, {checkedItems} barang sudah dibeli ({percentage}%)
    </footer>
  )
}
