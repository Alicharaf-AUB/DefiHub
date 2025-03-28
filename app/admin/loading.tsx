import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AdminLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex items-center gap-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>

          <Skeleton className="h-12 w-full mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-16" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-32" />
                  </CardContent>
                </Card>
              ))}
          </div>

          <Skeleton className="h-10 w-full mb-6" />

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Skeleton className="h-10 w-full md:w-[250px]" />
            <Skeleton className="h-10 w-full md:w-[180px]" />
          </div>

          <Skeleton className="h-[400px] w-full mb-8 rounded-md" />

          <Skeleton className="h-6 w-48 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-[200px] rounded-md" />
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}

