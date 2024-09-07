import { Card, CardContent,Button } from '@/components/ui'
import { Table } from 'lucide-react'

export function CreateTableWidget() {
  return (
    <Card className="fixed bottom-6 right-6 w-64 shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <Table className="w-12 h-12 text-text-muted" />
          <h3 className="font-semibold text-text-title">Create a table</h3>
          <p className="text-sm text-text-muted">Once you have some data to query, you can ask E2QL questions.</p>
          <Button className="mt-2 bg-button-default text-text-button hover:bg-button-hover">
            Create
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
