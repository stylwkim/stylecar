"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Edit3, Save, X } from "lucide-react"

interface TitleEditorBoxProps {
  titles: string[]
  onTitlesChange: (titles: string[]) => void
}

export default function TitleEditorBox({ titles, onTitlesChange }: TitleEditorBoxProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingTitles, setEditingTitles] = useState("")

  const handleStartEdit = () => {
    setEditingTitles(titles.join("\n"))
    setIsEditing(true)
  }

  const handleSave = () => {
    const newTitles = editingTitles.split("\n").filter((title) => title.trim() !== "")
    onTitlesChange(newTitles)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingTitles("")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">제목 리스트 ({titles.length}개)</CardTitle>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-1" />
                  저장
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-1" />
                  취소
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={handleStartEdit}>
                <Edit3 className="w-4 h-4 mr-1" />
                편집
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">한 줄에 하나씩 제목을 입력하세요.</p>
            <Textarea
              value={editingTitles}
              onChange={(e) => setEditingTitles(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
              placeholder="제목을 한 줄씩 입력하세요..."
            />
          </div>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {titles.length > 0 ? (
              <div className="grid gap-2">
                {titles.map((title, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                    <Badge variant="outline" className="min-w-[40px] justify-center">
                      {index + 1}
                    </Badge>
                    <span className="text-sm flex-1">{title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">먼저 제목을 생성해주세요.</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
