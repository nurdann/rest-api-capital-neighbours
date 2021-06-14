from xlrd import open_workbook
import json
import sys

# incorporated from https://zetcode.com/python/openpyxl/
if __name__ == '__main__':
    json_data = {}
    book = open_workbook(sys.argv[1], 'r')
    sheet = book.sheet_by_index(0)
    for row_idx in range(3, sheet.nrows):
        code = sheet.cell(row_idx, 0)
        json_data[code.value] = sheet.cell(row_idx, 1).value

    with open('./country-codes.js', 'w', encoding='utf-8') as f:
        json.dump(json_data, f)