# Lab: Designing metrics

**Hướng dẫn tương ứng:** [Designing metrics](/recipes/data-modeling/designing-metrics)  
**Dữ liệu dùng chung:** `orders`, `customers`, `products` trong PostgreSQL của lab.

## Tình huống thực tế

Tài chính, sales và sản phẩm đang dùng các định nghĩa doanh thu khác nhau.

## Mục tiêu học

Thiết kế entity-first hoặc metrics-first views theo consumer và giữ một định nghĩa metric chuẩn.

## Làm bài

1. Chạy stack bằng `docker compose up -d` trong thư mục `lab`.
2. Mở `http://localhost:8080`, chọn đúng bài này. Giao diện nạp query mẫu bên dưới vào tab REST API.
3. Đọc JSON trước khi chạy: xác định chỉ số cần tính, cách nhóm và điều kiện lọc. Sau đó bấm **Chạy REST**.
4. Đối chiếu dữ liệu trả về với phần giải thích; thay đổi một tham số để kiểm tra kết quả đổi như dự kiến.
5. Xem tab **SQL sinh ra** để nối query Cube với truy vấn SQL mà database thực thi.

## Đọc query mẫu

### Dữ liệu mà query chạm tới

`orders`: một dòng cho mỗi đơn hàng; có trạng thái, số tiền, thời điểm, khách hàng và sản phẩm.; `customers`: một dòng cho mỗi doanh nghiệp; có phân khúc, tỉnh thành và ngày tạo.

### Query chạy trong giao diện

```json
{
  "measures": [
    "Orders.revenue",
    "Orders.count"
  ],
  "dimensions": [
    "Customers.segment"
  ],
  "timeDimensions": [
    {
      "dimension": "Orders.orderedAt",
      "granularity": "month"
    }
  ],
  "order": {
    "Orders.orderedAt": "asc"
  }
}
```

### Giải thích từng phần

- `measures`: Các chỉ số tổng hợp Cube tính theo grain và bộ lọc còn lại của query. Query yêu cầu: `Orders.revenue`, `Orders.count`.
- `dimensions`: Các chiều phân nhóm kết quả; thêm dimension thường làm kết quả có nhiều hàng hơn. Query nhóm theo: `Customers.segment`.
- `timeDimensions`: Chiều thời gian, khoảng ngày và/hoặc granularity dùng để nhóm chuỗi thời gian. Query dùng `Orders.orderedAt` theo month.
- `order`: Thứ tự sắp xếp kết quả theo member và chiều tăng/giảm.

### Quan sát khi chạy

1. Chọn bài này trong giao diện lab; JSON bên trên được nạp vào tab REST API.
2. Chạy query và đối chiếu tên cột/dòng với measures, dimensions và điều kiện vừa đọc.
3. Thay đổi một trường mỗi lần (ví dụ granularity, filter, order hoặc limit), chạy lại và mô tả thay đổi quan sát được.
4. Mở tab **SQL sinh ra** để xem Cube chuyển query JSON thành SQL; kiểm tra join và phép tổng hợp mà model tạo ra.

### Phạm vi của demo

Query này dùng dữ liệu seed local. Nếu recipe gốc cần warehouse, dbt, TLS, nhiều nguồn dữ liệu, dịch vụ Chat API hoặc cấu hình triển khai ngoài Compose, phần đó cần thực hiện theo tài liệu gốc; query mẫu ở đây chỉ giúp làm quen API và các member có sẵn.
