// slider.js - Xử lý chuyển đổi Slide Hero

let slideIndex = 1;
let slideInterval; // Biến để chứa bộ đếm tự động

// Khởi chạy slide đầu tiên
showSlides(slideIndex);
startAutoSlide(); // Bắt đầu tự chạy

// Hàm chuyển slide khi bấm nút Next/Prev
function moveSlide(n) {
  showSlides((slideIndex += n));
  resetTimer(); // Reset bộ đếm khi người dùng bấm thủ công
}

// Hàm chuyển slide khi bấm Dấu chấm
function currentSlide(n) {
  showSlides((slideIndex = n));
  resetTimer();
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("carousel-slide");
  let dots = document.getElementsByClassName("dot");

  // Xử lý vòng lặp (Đang ở cuối bấm next về đầu, đang ở đầu bấm prev về cuối)
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Ẩn tất cả slide
  for (i = 0; i < slides.length; i++) {
    slides[i].className = slides[i].className.replace(" active-slide", "");
  }

  // Bỏ active ở tất cả dấu chấm
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-dot", "");
  }

  // Hiện slide hiện tại và active dấu chấm tương ứng
  slides[slideIndex - 1].className += " active-slide";
  dots[slideIndex - 1].className += " active-dot";
}

// --- TỰ ĐỘNG CHẠY ---
function startAutoSlide() {
  // Cứ 5 giây (5000ms) chuyển slide 1 lần
  slideInterval = setInterval(function () {
    moveSlide(1);
  }, 5000);
}

// Khi người dùng bấm nút, reset lại thời gian chờ để không bị chuyển loạn
function resetTimer() {
  clearInterval(slideInterval);
  startAutoSlide();
}
