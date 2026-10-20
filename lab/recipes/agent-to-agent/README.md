# Lab: Agent-to-agent: using the Chat API as a tool

**Hướng dẫn tương ứng:** [Agent-to-agent: using the Chat API as a tool](/recipes/ai/agent-to-agent)  
**Dữ liệu dùng chung:** `orders`, `customers`, `products` trong PostgreSQL của lab.

## Tình huống thực tế

Một nhà phân tích hỏi trợ lý: “Doanh thu theo phân khúc tháng này là bao nhiêu?”. Trợ lý cần gọi Cube có ngữ cảnh và nhận metric đã quản trị.

## Mục tiêu học

Bọc lời gọi Cube Chat API thành tool cho agent; kiểm tra agent dùng semantic member thay vì tự đoán tên cột SQL.

## Làm bài

1. Chạy stack một lần từ thư mục `lab`: `docker compose up -d`.
2. Mở `http://localhost:8080`, chọn **Agent-to-agent: using the Chat API as a tool**. Trang sẽ nạp query mẫu từ `lab/recipes/agent-to-agent/query.json`.
3. Gọi REST API với tenant 101, sau đó tenant 202. Xác định metric, dimension, time dimension và filter tenant trong kết quả.
4. Dùng query doanh thu theo phân khúc làm câu hỏi mẫu; đối chiếu câu trả lời với REST query.
5. Mở hướng dẫn tương ứng ở đầu trang để áp dụng phần cấu hình/schema đầy đủ. Các mẫu nâng cao nằm cạnh dữ liệu dùng chung trong `lab/cube/schema`.

## Tự kiểm tra

- Query đang tính trên một dòng mỗi đơn, khách hàng hay sự kiện?
- Nếu join thêm cube, có làm nhân đôi doanh thu không?
- Tenant khác có thể nhìn thấy kết quả này không? Kiểm tra `queryRewrite` ở `lab/cube/cube.js`.
- Kỹ thuật này tác động thế nào đến độ mới, thời gian phản hồi và chi phí khi dữ liệu tăng?

> Dữ liệu lab là dữ liệu giả lập nhỏ để kiểm tra logic. Bài về dịch vụ ngoài (như dbt, SSL, database thứ hai hoặc Chat API) dùng query này làm nền và thực hành phần tích hợp theo hướng dẫn; Compose không giả lập các dịch vụ đó.
