Cách thêm bài mới:
1. Vào folder một môn học (`sử`/`địa`)
2. Thêm dữ liệu vào file `danh_sach.json`
    <details>
    <summary>Cấu trúc file</summary>

      **Note:** Tên file không được chứa kí tự `%`
      ```json
      [
        {
          "tieu_de": "<Tiêu đề bài 1>",
          "chu_thich": "<Chú thích (không bắt buộc)>",
          "noi_dung": "<Tên file chứa nội dung trắc nghiệm>"|<Danh sách tên các file chứa nội dung trắc nghiệm>
        },
        {
          "tieu_de": "<Tiêu đề bài 2>",
          "chu_thich": "<Chú thích (không bắt buộc)>",
          "noi_dung": "<Tên file chứa nội dung trắc nghiệm>"|<Danh sách tên các file chứa nội dung trắc nghiệm>
        },
        ...
      ]
      ```
      Ví dụ:
      ```json
      [
        {
          "tieu_de": "Ôn tập lịch sử",
          "chu_thich": "Trắc nghiệm 4 phương án - 87 câu",
          "noi_dung": "bai 1"
        },
        {
            "tieu_de": "Làm hết toàn bộ câu hỏi của cả 3 bài",
            "chu_thich": "Trắc nghiệm 4 phương án - 115 câu",
            "noi_dung": [
                "bai 3",
                "bai 5",
                "bai 7"
            ]
        }
      ]
      ```
    </details>
3. Vào folder `data` bên trong folder hiện tại
4. Tạo file mới với tên vừa mới đặt trong `danh_sach.json`
5. Thêm nội dung vào file
    <details>
    <summary>Cấu trúc file</summary>

      ```json
      [
        {
          "cau_hoi": "<Câu hỏi 1>",
          "cau_dung": "<Câu đúng>",
          "cau_sai": [
            "<Câu sai 1>",
            "<Câu sai 2>",
            "<Câu sai 3>"
          ]
        },
        {
          "cau_hoi": "<Câu hỏi 2>",
          "cau_dung": "<Câu đúng>",
          "cau_sai": [
            "<Câu sai 1>",
            "<Câu sai 2>",
            "<Câu sai 3>"
          ]
        },
        ...
      ]
      ```
      Ví dụ:
      ```json
      [
        {
          "cau_hoi": "Ở nước ta vùng núi nào có đủ 3 đai cao?",
          "cau_dung": "Tây Bắc.",
          "cau_sai": [
            "Đông Bắc.",
            "Trường Sơn Bắc.",
            "Trường Sơn Nam."
          ]
        }
      ]
      ```
    </details>