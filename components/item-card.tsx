import type { Item } from "@/types/item"
import Image from "next/image"
import { useEffect, useState } from "react"
import DOMPurify from "dompurify"

interface ItemCardProps {
  item: Item
}

export function ItemCard({ item }: ItemCardProps) {
  const [sanitizedDescription, setSanitizedDescription] = useState<string>("")

  useEffect(() => {
    // Only sanitize on client side since DOMPurify needs DOM
    if (typeof window !== "undefined") {
      const clean = DOMPurify.sanitize(item.description, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'i', 'b', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a'],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style']
      })
      setSanitizedDescription(clean)
    } else {
      // Fallback for SSR - just use the description as-is
      setSanitizedDescription(item.description)
    }
  }, [item.description])

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
        <div className="flex-1 flex flex-col gap-2 lg:min-w-[350px]">
          <h2 className="link-blue text-lg font-normal break-words">{item.title}</h2>
          <div className="text-base font-normal">{formatPrice(item.price)}</div>
          <hr className="divider-gray my-2" />
          <div className="flex-1 lg:overflow-y-scroll lg:max-h-[300px]">
            <div 
              className="text-sm text-gray-700 sm:line-clamp-none break-words prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
