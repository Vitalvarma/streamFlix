export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      
      <h1 className="text-xl font-bold">
        StreamFlix 🎬
      </h1>

      <input
        type="text"
        placeholder="Search..."
        className="border px-3 py-1 rounded-lg w-64"
      />

    </div>
  )
}