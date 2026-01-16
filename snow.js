// snow.js - Hiệu ứng trái tim ❤ rơi từ Góc Trên-Phải xuống Góc Dưới-Trái

(function () {
  // --- CẤU HÌNH ---
  const CONFIG = {
    snowflakeCount: 50, // Số lượng trái tim (Tăng lên nếu muốn dày hơn)
    color: "247, 205, 246", // Màu Hồng Đậm (HotPink)
    minOpacity: 0.5,
    maxOpacity: 1,
    minSize: 15, // Kích thước nhỏ nhất
    maxSize: 30, // Kích thước lớn nhất
    minSpeedY: 1, // Tốc độ rơi xuống
    maxSpeedY: 3,
    speedX: 2.5, // Tốc độ bay sang trái (Số càng lớn bay càng chéo)
    swingStrength: 1.5, // Độ lắc lư ngang
    rotationSpeed: 0.05, // Tốc độ tự xoay
  };

  const canvas = document.getElementById("pinkSnowCanvas");
  const ctx = canvas.getContext("2d");

  let width = window.innerWidth;
  let height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  window.addEventListener("resize", function () {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  let flakes = [];

  class Flake {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      // Random các thuộc tính cơ bản
      this.size =
        Math.random() * (CONFIG.maxSize - CONFIG.minSize) + CONFIG.minSize;
      this.speedY =
        Math.random() * (CONFIG.maxSpeedY - CONFIG.minSpeedY) +
        CONFIG.minSpeedY;

      // Tốc độ bay sang trái (X)
      // Cộng thêm chút ngẫu nhiên để không hạt nào bay giống hạt nào
      this.speedX = CONFIG.speedX + (Math.random() - 0.5);

      this.swing = Math.random() * Math.PI * 2;
      this.swingStep = Math.random() * 0.02 + 0.01;
      this.opacity =
        Math.random() * (CONFIG.maxOpacity - CONFIG.minOpacity) +
        CONFIG.minOpacity;

      this.rotation = Math.random() * Math.PI * 2;
      this.rotationDirection = Math.random() > 0.5 ? 1 : -1;
      this.rotationSpeed =
        Math.random() * CONFIG.rotationSpeed * this.rotationDirection;

      // --- VỊ TRÍ XUẤT PHÁT (QUAN TRỌNG) ---
      // Để bay từ Phải sang Trái, hạt cần xuất hiện ở Cạnh Trên hoặc Cạnh Phải

      if (initial) {
        // Lần đầu tiên: Rải đều khắp màn hình để không bị trống
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      } else {
        // Những lần sau: Chỉ xuất hiện ở "thượng nguồn"
        if (Math.random() > 0.5) {
          // 1. Xuất hiện ở CẠNH TRÊN (Top)
          // Random từ giữa màn hình đến tít bên phải ngoài màn hình
          // (cần ra xa bên phải để khi bay chéo vào là vừa đẹp)
          this.x = Math.random() * width + width * 0.2;
          this.y = -this.size - 10;
        } else {
          // 2. Xuất hiện ở CẠNH PHẢI (Right)
          this.x = width + this.size + 10;
          this.y = Math.random() * (height * 0.8); // Chỉ xuất hiện ở 80% phía trên cạnh phải
        }
      }
    }

    update() {
      this.swing += this.swingStep;
      this.rotation += this.rotationSpeed;

      // 1. Rơi xuống (+Y)
      this.y += this.speedY;

      // 2. Bay sang TRÁI (-X) kết hợp lắc lư
      // Dấu TRỪ (-) ở đây quyết định hướng bay sang trái
      this.x -= this.speedX + Math.sin(this.swing) * CONFIG.swingStrength;

      // --- ĐIỂM KẾT THÚC ---
      // Nếu rơi quá đáy màn hình HOẶC bay quá mép trái -> Reset lại
      if (this.y > height + this.size || this.x < -this.size) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      ctx.fillStyle = `rgba(${CONFIG.color}, ${this.opacity})`;
      ctx.font = `${this.size}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("❤", 0, 0);

      ctx.restore();
    }
  }

  function init() {
    flakes = [];
    for (let i = 0; i < CONFIG.snowflakeCount; i++) {
      flakes.push(new Flake());
    }
    animate();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let flake of flakes) {
      flake.update();
      flake.draw();
    }
    requestAnimationFrame(animate);
  }

  init();
})();
