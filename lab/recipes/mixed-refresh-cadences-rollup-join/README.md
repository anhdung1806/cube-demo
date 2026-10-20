# Lab: Joining pre-aggregations with different refresh cadences

**Hướng dẫn tương ứng:** [Joining pre-aggregations with different refresh cadences](/recipes/pre-aggregations/mixed-refresh-cadences-rollup-join)  
**Dữ liệu dùng chung:** `orders`, `customers`, `products` trong PostgreSQL của lab.

## Tình huống thực tế

Doanh thu lớn refresh mỗi đêm, danh mục sản phẩm cập nhật mỗi vài phút.

## Mục tiêu học

Kết hợp rollup có cadence khác nhau và hiểu mức tươi của kết quả join.

## Làm bài

1. Chạy stack một lần từ thư mục `lab`: `docker compose up -d`.
2. Mở `http://localhost:8080`, chọn **Joining pre-aggregations with different refresh cadences**. Trang sẽ nạp query mẫu từ `lab/recipes/mixed-refresh-cadences-rollup-join/query.json`.
3. Gọi REST API với tenant 101, sau đó tenant 202. Xác định metric, dimension, time dimension và filter tenant trong kết quả.
4. Dùng Orders và Products minh họa fact/lookup; so lịch refresh từng rollup.
5. Mở hướng dẫn tương ứng ở đầu trang để áp dụng phần cấu hình/schema đầy đủ. Các mẫu nâng cao nằm cạnh dữ liệu dùng chung trong `lab/cube/schema`.

## Tự kiểm tra

- Query đang tính trên một dòng mỗi đơn, khách hàng hay sự kiện?
- Nếu join thêm cube, có làm nhân đôi doanh thu không?
- Tenant khác có thể nhìn thấy kết quả này không? Kiểm tra `queryRewrite` ở `lab/cube/cube.js`.
- Kỹ thuật này tác động thế nào đến độ mới, thời gian phản hồi và chi phí khi dữ liệu tăng?

> Dữ liệu lab là dữ liệu giả lập nhỏ để kiểm tra logic. Bài về dịch vụ ngoài (như dbt, SSL, database thứ hai hoặc Chat API) dùng query này làm nền và thực hành phần tích hợp theo hướng dẫn; Compose không giả lập các dịch vụ đó.
