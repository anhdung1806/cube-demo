# Lab: Implementing event analytics

**Hướng dẫn tương ứng:** [Implementing event analytics](/recipes/data-modeling/event-analytics)  
**Dữ liệu dùng chung:** `orders`, `customers`, `products` và `events` trong PostgreSQL của lab.

## Tình huống thực tế

Data360 nhận page_view, product_view và purchase; nhóm sản phẩm cần session và hành trình sự kiện.

## Mục tiêu học

Định nghĩa session, event metrics và chuyển đổi từ bảng sự kiện thô.

## Làm bài

1. Chạy stack một lần từ thư mục `lab`: `docker compose up -d`.
2. Mở `http://localhost:8080`, chọn **Implementing event analytics**. Trang sẽ nạp query mẫu từ `lab/recipes/event-analytics/query.json`.
3. Gọi REST API với tenant 101, sau đó tenant 202. Xác định metric, dimension, time dimension và filter tenant trong kết quả.
4. Đếm Events theo eventName và session; dùng thứ tự timestamp để xác định hành trình.
5. Mở hướng dẫn tương ứng ở đầu trang để áp dụng phần cấu hình/schema đầy đủ. Các mẫu nâng cao nằm cạnh dữ liệu dùng chung trong `lab/cube/schema`.

## Tự kiểm tra

- Query đang tính trên một dòng mỗi đơn, khách hàng hay sự kiện?
- Nếu join thêm cube, có làm nhân đôi doanh thu không?
- Tenant khác có thể nhìn thấy kết quả này không? Kiểm tra `queryRewrite` ở `lab/cube/cube.js`.
- Kỹ thuật này tác động thế nào đến độ mới, thời gian phản hồi và chi phí khi dữ liệu tăng?

> Dữ liệu lab là dữ liệu giả lập nhỏ để kiểm tra logic. Bài về dịch vụ ngoài (như dbt, SSL, database thứ hai hoặc Chat API) dùng query này làm nền và thực hành phần tích hợp theo hướng dẫn; Compose không giả lập các dịch vụ đó.
