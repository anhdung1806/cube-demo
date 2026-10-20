CREATE TABLE customers (
  id integer PRIMARY KEY, tenant_id integer NOT NULL, name text NOT NULL,
  segment text NOT NULL, province text NOT NULL, created_at date NOT NULL
);
CREATE TABLE products (
  id integer PRIMARY KEY, name text NOT NULL, category text NOT NULL
);
CREATE TABLE orders (
  id integer PRIMARY KEY, tenant_id integer NOT NULL, customer_id integer NOT NULL REFERENCES customers(id),
  product_id integer NOT NULL REFERENCES products(id), status text NOT NULL,
  quantity integer NOT NULL, amount numeric(12,2) NOT NULL, ordered_at timestamptz NOT NULL
);
CREATE TABLE events (
  id integer PRIMARY KEY, tenant_id integer NOT NULL, customer_id integer NOT NULL REFERENCES customers(id),
  event_name text NOT NULL, session_id text NOT NULL, occurred_at timestamptz NOT NULL
);
CREATE TABLE customer_attributes (
  id integer PRIMARY KEY, tenant_id integer NOT NULL, customer_id integer NOT NULL REFERENCES customers(id),
  attribute_name text NOT NULL, attribute_value text NOT NULL, updated_at timestamptz NOT NULL
);
CREATE TABLE order_status_history (
  id integer PRIMARY KEY, tenant_id integer NOT NULL, order_id integer NOT NULL REFERENCES orders(id),
  status text NOT NULL, changed_at timestamptz NOT NULL
);
CREATE TABLE cash_flows (
  id integer PRIMARY KEY, tenant_id integer NOT NULL, customer_id integer NOT NULL REFERENCES customers(id),
  occurred_at date NOT NULL, amount numeric(14,2) NOT NULL
);

INSERT INTO customers VALUES
(1,101,'Công ty Ánh Dương','SME','Hà Nội','2024-01-12'),
(2,101,'Công ty Biển Xanh','Enterprise','Đà Nẵng','2023-11-02'),
(3,202,'Công ty Mộc Lan','SME','TP Hồ Chí Minh','2024-03-20'),
(4,202,'Công ty Sao Mai','Mid-market','Cần Thơ','2023-08-09'),
(5,303,'Công ty Tre Việt','Enterprise','Hà Nội','2022-05-18');
INSERT INTO products VALUES
(1,'Phần mềm quản trị','Phần mềm'),(2,'Gói phân tích','Dữ liệu'),(3,'Tư vấn triển khai','Dịch vụ');
INSERT INTO orders VALUES
(1001,101,1,1,'completed',2,24000000,'2025-01-10T09:15:00Z'),
(1002,101,1,2,'completed',1,8000000,'2025-01-18T11:00:00Z'),
(1003,101,2,3,'pending',1,12000000,'2025-02-04T08:30:00Z'),
(1004,101,2,1,'completed',3,36000000,'2025-02-20T13:45:00Z'),
(1005,202,3,1,'completed',1,12000000,'2025-01-14T10:00:00Z'),
(1006,202,3,2,'cancelled',2,16000000,'2025-02-09T16:20:00Z'),
(1007,202,4,3,'completed',2,24000000,'2025-03-03T07:10:00Z'),
(1008,202,4,2,'completed',1,8000000,'2025-03-19T15:25:00Z'),
(1009,303,5,1,'completed',4,48000000,'2025-01-27T12:00:00Z'),
(1010,303,5,3,'pending',1,12000000,'2025-03-22T09:40:00Z'),
(1011,101,1,3,'completed',1,12000000,'2025-03-25T14:00:00Z'),
(1012,202,3,1,'completed',2,24000000,'2025-03-27T17:15:00Z');
INSERT INTO events VALUES
(1,101,1,'page_view','s-101-a','2025-01-10T09:00:00Z'),
(2,101,1,'product_view','s-101-a','2025-01-10T09:02:00Z'),
(3,101,1,'purchase','s-101-a','2025-01-10T09:15:00Z'),
(4,101,2,'page_view','s-101-b','2025-02-04T08:00:00Z'),
(5,101,2,'quote_request','s-101-b','2025-02-04T08:30:00Z'),
(6,202,3,'page_view','s-202-a','2025-01-14T09:30:00Z'),
(7,202,3,'product_view','s-202-a','2025-01-14T09:45:00Z'),
(8,202,3,'purchase','s-202-a','2025-01-14T10:00:00Z'),
(9,202,4,'page_view','s-202-b','2025-03-03T07:00:00Z'),
(10,202,4,'quote_request','s-202-b','2025-03-03T07:10:00Z'),
(11,303,5,'page_view','s-303-a','2025-03-22T09:00:00Z'),
(12,303,5,'product_view','s-303-a','2025-03-22T09:20:00Z');
INSERT INTO customer_attributes VALUES
(1,101,1,'industry','Bán lẻ','2025-01-01T00:00:00Z'),
(2,101,1,'employee_band','50-199','2025-01-01T00:00:00Z'),
(3,101,2,'industry','Sản xuất','2025-01-01T00:00:00Z'),
(4,202,3,'industry','Công nghệ','2025-01-01T00:00:00Z'),
(5,202,4,'industry','Dịch vụ','2025-01-01T00:00:00Z'),
(6,303,5,'industry','Nông nghiệp','2025-01-01T00:00:00Z');
INSERT INTO order_status_history VALUES
(1,101,1001,'pending','2025-01-10T08:00:00Z'),
(2,101,1001,'completed','2025-01-10T09:15:00Z'),
(3,101,1003,'pending','2025-02-04T08:30:00Z'),
(4,101,1004,'pending','2025-02-19T09:00:00Z'),
(5,101,1004,'completed','2025-02-20T13:45:00Z'),
(6,202,1006,'pending','2025-02-08T09:00:00Z'),
(7,202,1006,'cancelled','2025-02-09T16:20:00Z');
INSERT INTO cash_flows VALUES
(1,101,1,'2024-01-15',-100000000),(2,101,1,'2024-07-15',25000000),(3,101,1,'2025-01-15',35000000),(4,101,1,'2025-07-15',60000000),
(5,202,3,'2024-02-01',-80000000),(6,202,3,'2024-10-01',30000000),(7,202,3,'2025-06-01',62000000);
