# Lab: Real-Time data fetch in the REST (JSON) API

**Hướng dẫn tương ứng:** [Real-Time data fetch in the REST (JSON) API](/recipes/core-data-api/real-time-data-fetch)  
**Dữ liệu dùng chung:** `orders`, `customers`, `products` trong PostgreSQL của lab.

## Tình huống thực tế

Dashboard giám sát hoạt động cần tự cập nhật khi dữ liệu mới đến.

## Mục tiêu học

Dùng transport subscription để nhận kết quả mới, đồng thời hiểu tần suất refresh và tải phát sinh.

## Làm bài

1. Chạy stack một lần từ thư mục `lab`: `docker compose up -d`.
2. Mở `http://localhost:8080`, chọn **Real-Time data fetch in the REST (JSON) API**. Trang sẽ nạp query mẫu từ `lab/recipes/real-time-data-fetch/query.json`.
3. Gọi REST API với tenant 101, sau đó tenant 202. Xác định metric, dimension, time dimension và filter tenant trong kết quả.
4. So sánh query REST tĩnh của lab với WebSocket subscription trong bài; Compose không phát sinh stream liên tục.
5. Mở hướng dẫn tương ứng ở đầu trang để áp dụng phần cấu hình/schema đầy đủ. Các mẫu nâng cao nằm cạnh dữ liệu dùng chung trong `lab/cube/schema`.

## Tự kiểm tra

- Query đang tính trên một dòng mỗi đơn, khách hàng hay sự kiện?
- Nếu join thêm cube, có làm nhân đôi doanh thu không?
- Tenant khác có thể nhìn thấy kết quả này không? Kiểm tra `queryRewrite` ở `lab/cube/cube.js`.
- Kỹ thuật này tác động thế nào đến độ mới, thời gian phản hồi và chi phí khi dữ liệu tăng?

> Dữ liệu lab là dữ liệu giả lập nhỏ để kiểm tra logic. Bài về dịch vụ ngoài (như dbt, SSL, database thứ hai hoặc Chat API) dùng query này làm nền và thực hành phần tích hợp theo hướng dẫn; Compose không giả lập các dịch vụ đó.
