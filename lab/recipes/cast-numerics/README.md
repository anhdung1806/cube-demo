# Lab: Retrieving numeric values on the front-end

**Hướng dẫn tương ứng:** [Retrieving numeric values on the front-end](/recipes/core-data-api/cast-numerics)  
**Dữ liệu dùng chung:** `orders`, `customers`, `products` trong PostgreSQL của lab.

## Tình huống thực tế

API trả doanh thu dưới dạng chuỗi JSON; biểu đồ cần số nhưng tiền có thể vượt giới hạn chính xác của Number.

## Mục tiêu học

Chuyển kiểu có chủ đích và giữ độ chính xác tiền tệ khi hiển thị/tính toán.

## Làm bài

1. Chạy stack một lần từ thư mục `lab`: `docker compose up -d`.
2. Mở `http://localhost:8080`, chọn **Retrieving numeric values on the front-end**. Trang sẽ nạp query mẫu từ `lab/recipes/cast-numerics/query.json`.
3. Gọi REST API với tenant 101, sau đó tenant 202. Xác định metric, dimension, time dimension và filter tenant trong kết quả.
4. Gọi Orders.revenue, xem kiểu JSON và chọn cách format không làm tròn sai.
5. Mở hướng dẫn tương ứng ở đầu trang để áp dụng phần cấu hình/schema đầy đủ. Các mẫu nâng cao nằm cạnh dữ liệu dùng chung trong `lab/cube/schema`.

## Tự kiểm tra

- Query đang tính trên một dòng mỗi đơn, khách hàng hay sự kiện?
- Nếu join thêm cube, có làm nhân đôi doanh thu không?
- Tenant khác có thể nhìn thấy kết quả này không? Kiểm tra `queryRewrite` ở `lab/cube/cube.js`.
- Kỹ thuật này tác động thế nào đến độ mới, thời gian phản hồi và chi phí khi dữ liệu tăng?

> Dữ liệu lab là dữ liệu giả lập nhỏ để kiểm tra logic. Bài về dịch vụ ngoài (như dbt, SSL, database thứ hai hoặc Chat API) dùng query này làm nền và thực hành phần tích hợp theo hướng dẫn; Compose không giả lập các dịch vụ đó.
