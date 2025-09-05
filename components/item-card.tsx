import type { Item } from "@/types/item"
import Image from "next/image"

interface ItemCardProps {
  item: Item
}

export function ItemCard({ item }: ItemCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  return (
    <div className="bg-white border border-gray-300 p-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[640px] h-[280px] sm:h-[420px] bg-white flex items-center justify-center border border-gray-200">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            width={640}
            height={420}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = "none"
              const parent = target.parentElement
              if (parent) {
                parent.innerHTML = '<span class="text-sm text-gray-500">image not available</span>'
              }
            }}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <h2 className="link-blue text-lg font-normal break-words">{item.title}</h2>
          <div className="text-base font-normal">{formatPrice(item.price)}</div>
          <hr className="divider-gray my-2" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm text-gray-700 line-clamp-6 sm:line-clamp-none sm:max-h-[300px] sm:overflow-y-auto break-words">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
