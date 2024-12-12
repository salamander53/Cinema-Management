# Sử dụng hình ảnh chính thức của Node.js làm hình ảnh gốc
FROM node:23.1

# Tạo thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các gói cần thiết
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Biên dịch mã nguồn TypeScript
RUN npm run build

# Expose cổng mà ứng dụng sẽ chạy
EXPOSE 80

# Khởi động ứng dụng, đảm bảo rằng ứng dụng Node.js của bạn lắng nghe trên cổng 80
CMD ["npm", "run", "start:prod"]
