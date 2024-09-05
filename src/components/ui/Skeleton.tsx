import { cn } from "@/lib/utils"

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-700/50",
        className
      )}
      {...props}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

export function SkeletonAvatar() {
  return (
    <Skeleton className="h-12 w-12 rounded-full" />
  )
}

export function SkeletonButton() {
  return (
    <Skeleton className="h-10 w-[100px] rounded-md" />
  )
}

export function SkeletonInput() {
  return (
    <Skeleton className="h-10 w-full rounded-md" />
  )
}

export function SkeletonText() {
  return (
    <Skeleton className="h-4 w-full" />
  )
}

export function SkeletonForm() {
  return (
    <div className="space-y-6">
      <SkeletonInput />
      <SkeletonInput />
      <SkeletonInput />
      <Skeleton className="h-24 w-full rounded-md" /> {/* For textarea */}
      <div className="flex justify-end">
        <SkeletonButton />
      </div>
    </div>
  )
}

export function SkeletonProfile() {
  return (
    <div className="flex items-center space-x-4">
      <SkeletonAvatar />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  )
}
