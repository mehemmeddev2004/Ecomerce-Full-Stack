import { Skeleton } from "@/components/ui/skeleton"

const ProductCardSkeleton = () => {
  return (
    <div className="group block overflow-hidden bg-white relative rounded-xl shadow-sm hover:shadow-md transition">
      <div className="relative">
        {/* Şəkil skeleton */}
        <Skeleton className="w-full h-[252px] rounded-t-xl bg-gray-200" />
      </div>

      <div className="p-3 flex items-center justify-between">
        <div className="flex flex-col gap-1">
       
          <Skeleton className="h-4 w-32 bg-gray-200" />
          {/* Qiymət */}
          <Skeleton className="h-5 w-20 bg-gray-200" />
        </div>


        <div className="flex gap-1.5 bg-white/90 backdrop-blur-sm p-[2px] rounded-full shadow-inner">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-6 h-6 rounded-full bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton
