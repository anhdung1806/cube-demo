# Lab: Referencing environment variables

**Hướng dẫn tương ứng:** [Referencing environment variables](/recipes/configuration/environment-variables)  
**Dữ liệu dùng chung:** `orders`, `customers`, `products` trong PostgreSQL của lab.

## Tình huống thực tế

Cùng model phải chạy ở máy dev và môi trường triển khai, nhưng địa chỉ DB và secret khác nhau.

## Mục tiêu học

Đưa cấu hình thay đổi theo môi trường ra biến môi trường; không hard-code secret trong schema.

## Làm bài

1. Chạy stack một lần từ thư mục `lab`: `docker compose up -d`.
2. Mở `http://localhost:8080`, chọn **Referencing environment variables**. Trang sẽ nạp query mẫu từ `lab/recipes/environment-variables/query.json`.
3. Gọi REST API với tenant 101, sau đó tenant 202. Xác định metric, dimension, time dimension và filter tenant trong kết quả.
4. Đối chiếu các biến `CUBEJS_DB_*` trong Compose với ví dụ cấu hình trong tài liệu.
5. Mở hướng dẫn tương ứng ở đầu trang để áp dụng phần cấu hình/schema đầy đủ. Các mẫu nâng cao nằm cạnh dữ liệu dùng chung trong `lab/cube/schema`.

## Tự kiểm tra

- Query đang tính trên một dòng mỗi đơn, khách hàng hay sự kiện?
- Nếu join thêm cube, có làm nhân đôi doanh thu không?
- Tenant khác có thể nhìn thấy kết quả này không? Kiểm tra `queryRewrite` ở `lab/cube/cube.js`.
- Kỹ thuật này tác động thế nào đến độ mới, thời gian phản hồi và chi phí khi dữ liệu tăng?

> Dữ liệu lab là dữ liệu giả lập nhỏ để kiểm tra logic. Bài về dịch vụ ngoài (như dbt, SSL, database thứ hai hoặc Chat API) dùng query này làm nền và thực hành phần tích hợp theo hướng dẫn; Compose không giả lập các dịch vụ đó.
