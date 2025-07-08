// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  console.log('세종 프로젝트 사이트가 로드되었습니다!');
  
  // 네비게이션 활성화
  initNavigation();
  
  // 스크롤 이벤트
  initScrollEffects();
  
  // 카테고리 필터링 활성화
  initCategoryFilter();
});

// 네비게이션 초기화
function initNavigation() {
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // 현재 페이지 링크는 기본 동작 방지
      if (this.getAttribute('href') === window.location.pathname) {
        e.preventDefault();
      }
    });
  });
}

// 스크롤 효과 초기화
function initScrollEffects() {
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 스크롤 방향 감지
    if (scrollTop > lastScrollTop) {
      // 아래로 스크롤
      document.body.classList.add('scrolling-down');
    } else {
      // 위로 스크롤
      document.body.classList.remove('scrolling-down');
    }
    
    lastScrollTop = scrollTop;
  });
}

// 카테고리 필터링 함수
function initCategoryFilter() {
  const menuItems = document.querySelectorAll('.sr-category-menu li');
  const cards = document.querySelectorAll('.sr-car-card');

  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      // 메뉴 active 처리
      menuItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      const category = this.getAttribute('data-category');
      // 카드 필터링
      cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 유틸리티 함수들
const utils = {
  // 디바운스 함수
  debounce: function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // 스무스 스크롤
  smoothScroll: function(target) {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}; 