# Lab: Implementing Entity-Attribute-Value Model (EAV)

**Hướng dẫn tương ứng:** [Implementing Entity-Attribute-Value Model (EAV)](/recipes/data-modeling/entity-attribute-value)  
**Dữ liệu dùng chung:** `orders`, `customers`, `products` và `customer_attributes` trong PostgreSQL của lab.

## Tình huống thực tế

Thuộc tính doanh nghiệp thay đổi theo ngành nên không thể thêm cột cho mọi thuộc tính.

## Mục tiêu học

Chuyển bảng key-value thành member có thể truy vấn, chú ý kiểu dữ liệu và số lượng join.

## Làm bài

1. Chạy stack một lần từ thư mục `lab`: `docker compose up -d`.
2. Mở `http://localhost:8080`, chọn **Implementing Entity-Attribute-Value Model (EAV)**. Trang sẽ nạp query mẫu từ `lab/recipes/entity-attribute-value/query.json`.
3. Gọi REST API với tenant 101, sau đó tenant 202. Xác định metric, dimension, time dimension và filter tenant trong kết quả.
4. Truy vấn CustomerAttributes theo tên/giá trị; so sánh EAV linh hoạt với cột chuẩn.
5. Mở hướng dẫn tương ứng ở đầu trang để áp dụng phần cấu hình/schema đầy đủ. Các mẫu nâng cao nằm cạnh dữ liệu dùng chung trong `lab/cube/schema`.

## Tự kiểm tra

- Query đang tính trên một dòng mỗi đơn, khách hàng hay sự kiện?
- Nếu join thêm cube, có làm nhân đôi doanh thu không?
- Tenant khác có thể nhìn thấy kết quả này không? Kiểm tra `queryRewrite` ở `lab/cube/cube.js`.
- Kỹ thuật này tác động thế nào đến độ mới, thời gian phản hồi và chi phí khi dữ liệu tăng?

> Dữ liệu lab là dữ liệu giả lập nhỏ để kiểm tra logic. Bài về dịch vụ ngoài (như dbt, SSL, database thứ hai hoặc Chat API) dùng query này làm nền và thực hành phần tích hợp theo hướng dẫn; Compose không giả lập các dịch vụ đó.
