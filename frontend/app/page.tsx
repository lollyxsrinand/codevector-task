import Link from "next/link"
import { redirect } from "next/navigation"

export default function Home() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-neutral-950">
      <Link 
      href="/products"
      className="rounded-2xl px-4 py-2 border border-neutral-700 bg-neutral-800">show products</Link>
    </div>
  )
  // return redirect(`/products`)
}
