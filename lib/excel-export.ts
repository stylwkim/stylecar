import * as XLSX from "xlsx"

export function downloadToExcel(data: any[], fileName: string) {
  // 데이터 가공 (필요한 경우)
  const processedData = data.map((item) => {
    // 필요한 경우 데이터 변환 작업 수행
    return { ...item }
  })

  // 워크시트 생성
  const worksheet = XLSX.utils.json_to_sheet(processedData)

  // 워크북 생성
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "유입 데이터")

  // 열 너비 자동 조정
  const maxWidth = 20
  const colWidths = {}

  // 헤더 스타일 적용
  const headerRange = XLSX.utils.decode_range(worksheet["!ref"] || "A1")
  for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
    const address = XLSX.utils.encode_col(C) + "1"
    if (!worksheet[address]) continue

    // 헤더 셀 스타일 설정
    worksheet[address].s = {
      font: { bold: true },
      fill: { fgColor: { rgb: "EFEFEF" } },
      alignment: { horizontal: "center" },
    }

    // 열 너비 계산
    const headerValue = String(worksheet[address].v)
    colWidths[C] = Math.max(headerValue.length, maxWidth)
  }

  // 열 너비 설정
  worksheet["!cols"] = Object.keys(colWidths).map((key) => ({ wch: colWidths[Number(key)] }))

  // 엑셀 파일 다운로드
  const currentDate = new Date().toISOString().split("T")[0]
  XLSX.writeFile(workbook, `${fileName}-${currentDate}.xlsx`)
}
