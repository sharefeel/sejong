# 세종 렌터카 - Implementation Detail

## 프로젝트 개요

- **프로젝트명**: 세종 렌터카
- **타입**: Static 웹사이트 (Single Page Application)
- **배포 환경**: GitHub Pages
- **기술 스택**: HTML5, CSS3, Vanilla JavaScript, YAML
- **상태**: ✅ 구현 완료

## 디렉토리 구조

```
sejong/
├── index.html              # 메인 HTML 파일
├── css/
│   └── style.css          # 메인 스타일시트
├── js/
│   └── app.js             # 메인 애플리케이션 로직
├── data/
│   └── cars.yaml          # 차량 데이터 (10대)
├── images/
│   ├── cars/              # 차량 이미지 (10개)
│   │   ├── grandeur.jpg
│   │   ├── sorento.jpg
│   │   ├── ioniq6.jpg
│   │   ├── carnival.jpg
│   │   ├── tucson.jpg
│   │   ├── k5.jpg
│   │   ├── ev6.jpg
│   │   ├── sonata.jpg
│   │   ├── palisade.jpg
│   │   └── ray.jpg
│   └── placeholder.svg    # 이미지 로딩 실패시 대체 이미지
└── docs/                  # 프로젝트 문서
    ├── FEATURES.md
    ├── IMPLEMENTATION.md
    └── card-concept.png
```

## 기술 스택 상세

### 1. HTML5
- ✅ 시맨틱 HTML 사용 (`<header>`, `<main>`, `<section>`, `<footer>`, `<article>`)
- ✅ 접근성 고려 (ARIA 속성, `aria-pressed` 등)
- ✅ 메타 태그 (viewport, description)

### 2. CSS3
- ✅ CSS Grid & Flexbox 레이아웃
- ✅ CSS Variables로 테마 관리
- ✅ 반응형 디자인 (Mobile First)
- ✅ 애니메이션 효과 (fadeIn, hover)

### 3. Vanilla JavaScript
- ✅ ES6+ 문법 사용 (async/await, arrow functions, template literals)
- ✅ IIFE 패턴으로 코드 구조화
- ✅ 외부 라이브러리: js-yaml (CDN)
- ✅ 이벤트 위임 사용

### 4. YAML
- ✅ 차량 데이터 저장 형식
- ✅ 10대 차량 데이터 포함
- ✅ 읽기 쉽고 수정 용이한 구조

## UI/UX 디자인 상세

### 컬러 팔레트

```css
--primary-color: #2563eb;      /* 파란색 - 신뢰감 */
--primary-hover: #1d4ed8;      /* 파란색 hover */
--secondary-color: #10b981;     /* 녹색 - 태그, 강조 */
--secondary-hover: #059669;    /* 녹색 hover */
--text-primary: #1f2937;       /* 진한 회색 - 본문 */
--text-secondary: #6b7280;     /* 회색 - 설명 */
--text-light: #9ca3af;         /* 밝은 회색 */
--price-color: #dc2626;        /* 빨간색 - 가격 강조 */
--background: #f9fafb;         /* 밝은 회색 - 배경 */
--card-background: #ffffff;    /* 흰색 - 카드 배경 */
--border-color: #e5e7eb;       /* 연한 회색 - 테두리 */
--header-gradient: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
--footer-bg: #1f2937;         /* 진한 회색 - footer 배경 */
```

### 레이아웃 구조

```
┌─────────────────────────────────────────┐
│           Header (세종렌터카)            │
│         함양의 믿을 수 있는 렌터카        │
├─────────────────────────────────────────┤
│         Filter Buttons Area             │
│  [전체] [SUV] [전기차] [하이브리드] ... │
├─────────────────────────────────────────┤
│                                          │
│   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     │
│   │Card1│ │Card2│ │Card3│ │Card4│     │
│   └─────┘ └─────┘ └─────┘ └─────┘     │
│                                          │
│   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     │
│   │Card5│ │Card6│ │Card7│ │Card8│     │
│   └─────┘ └─────┘ └─────┘ └─────┘     │
│                                          │
│   ┌─────┐ ┌─────┐                      │
│   │Card9│ │Card10│                     │
│   └─────┘ └─────┘                      │
│                                          │
├─────────────────────────────────────────┤
│              Footer                      │
│         (업체 정보 표시)                 │
└─────────────────────────────────────────┘
```

### 카드 디자인 (참고: card-concept.png)

```
┌─────────────────────────┐
│                         │
│    [차량 이미지]         │
│    (16:10 비율)          │
│                         │
├─────────────────────────┤
│  카테고리 태그 (녹색)    │
│                         │
│  차량명 (볼드, 18px)     │
│                         │
│  설명 문구 (14px)        │
│                         │
│  #SUV #전기차 (태그)     │
│                         │
│  ₩80,000 / 일 (빨간색) │
│                         │
│  ┌──────────────────┐  │
│  │ 📞 대여 문의하기  │  │
│  └──────────────────┘  │
└─────────────────────────┘
```

**카드 스타일 속성:**
- 배경: 흰색 (#ffffff)
- 테두리: 1px solid #e5e7eb
- 둥근 모서리: 12px
- 그림자: 기본 없음, hover시 shadow-lg
- Hover 효과: 그림자 증가, translateY(-4px)
- 이미지 비율: 16:10 (aspect-ratio)
- 패딩: 16px

### 반응형 브레이크포인트

```css
/* Mobile First */
/* Mobile: 기본 (< 640px) - 1 column */
.cars-container {
  grid-template-columns: 1fr;
  gap: 20px;
}

/* Tablet: 640px ~ 1023px - 2 columns */
@media (min-width: 640px) {
  .cars-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 1024px ~ 1279px - 3 columns */
@media (min-width: 1024px) {
  .cars-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}

/* Large Desktop: 1280px+ - 4 columns */
@media (min-width: 1280px) {
  .cars-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 데이터 구조 (cars.yaml)

**현재 등록된 차량**: 10대

```yaml
cars:
  - id: 1
    name: "그랜저 하이브리드"
    category: "준대형"
    image: "images/cars/grandeur.jpg"
    price: 80000
    description: "넓은 실내공간과 뛰어난 연비의 프리미엄 세단"
    tags:
      - "하이브리드"
      - "준대형"
      - "후방카메라"
      - "네비게이션"
      - "5인승"
  
  # ... 총 10대
```

**필드 설명:**
- `id`: 고유 식별자 (1-10)
- `name`: 차량명
- `category`: 차량 카테고리 (분류용, 카드에 표시)
- `image`: 이미지 경로 (images/cars/ 폴더)
- `price`: 일일 대여료 (원 단위)
- `description`: 차량 설명 (1줄)
- `tags`: 해시태그 배열 (필터링에 사용)

**사용 가능한 태그:**
- SUV, 전기차, 하이브리드, 준대형, 중형, 경차, 미니밴
- 5인승, 7인승, 9인승
- 후방카메라, 네비게이션, 스마트크루즈
- VIP, 경제적

## 기능 구현 상세

### 1. 차량 카드 렌더링 ✅

**동작 흐름:**
1. 페이지 로드시 `cars.yaml` 파일 fetch
2. js-yaml 라이브러리로 파싱
3. 차량 데이터를 순회하며 카드 HTML 생성
4. DOM에 삽입
5. 로딩 상태 표시/숨김

**구현된 기능:**
- ✅ 비동기 데이터 로딩
- ✅ 동적 카드 생성
- ✅ 이미지 lazy loading
- ✅ 이미지 에러 처리 (무한 루프 방지)
- ✅ 애니메이션 효과 (순차적 fadeIn)

### 2. 해시태그 필터 ✅

**동작 흐름:**
1. 모든 차량의 태그를 수집하여 중복 제거
2. 필터 버튼 생성 (전체 + 각 태그, 알파벳 순 정렬)
3. 버튼 클릭시 해당 태그를 가진 차량만 표시
4. 활성화된 필터는 시각적으로 강조
5. 결과 없음 메시지 표시

**구현된 기능:**
- ✅ 동적 필터 버튼 생성
- ✅ 태그 기반 필터링
- ✅ 활성 상태 관리
- ✅ 결과 없음 처리
- ✅ 접근성 (aria-pressed)

**필터 버튼 스타일:**
- 기본: 흰색 배경, 회색 테두리, 회색 텍스트
- 활성화: 파란색 배경, 흰색 텍스트
- Hover: 테두리 색상 변화
- 둥근 모서리: 9999px (pill 형태)
- 패딩: 8px 16px (모바일), 10px 20px (데스크톱)
- 간격: 8px

### 3. 대여 문의하기 버튼 ✅

**동작:**
- 클릭시 전화 연결 (`tel:055-962-4321`)
- 전화 아이콘 포함
- Hover 효과 적용

### 4. 이미지 처리 ✅

**구현된 기능:**
- ✅ Lazy Loading (`loading="lazy"`)
- ✅ 이미지 로딩 실패시 placeholder 표시
- ✅ 무한 루프 방지 (onerror 핸들러에 안전장치)
- ✅ 이미지 크기: 약 5MB (800x600px 이상)
- ✅ 포맷: JPG

**에러 처리 로직:**
```javascript
onerror="if(this.src!=='...'){ this.src='images/placeholder.svg'; this.onerror=null; }"
```

## Header 구현 ✅

```html
<header class="header">
  <div class="container">
    <h1 class="logo">세종렌터카</h1>
    <p class="tagline">함양의 믿을 수 있는 렌터카</p>
  </div>
</header>
```

**스타일:**
- 배경: 파란색 그라디언트
- 텍스트: 중앙 정렬, 흰색
- 높이: 32px 패딩 (모바일), 48px 패딩 (데스크톱)
- 로고 폰트: 볼드, 32px (모바일), 48px (데스크톱)
- 태그라인: 16px (모바일), 18px (데스크톱)

## Footer 구현 ✅

```html
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <h3 class="footer-logo">세종렌터카</h3>
      <div class="footer-info">
        <p class="address">📍 경남 함양군 함양읍 용평중앙길 32</p>
        <p class="contact">📞 <a href="tel:055-962-4321">055-962-4321</a></p>
        <p class="owner">대표: 고영현</p>
      </div>
      <p class="copyright">© 2026 세종렌터카. All rights reserved.</p>
    </div>
  </div>
</footer>
```

**스타일:**
- 배경: 진한 회색 (#1f2937)
- 텍스트: 밝은 회색 (#9ca3af)
- 패딩: 40px 0 (모바일), 48px 0 (데스크톱)
- 텍스트 정렬: 중앙
- 아이콘: SVG 인라인

## 성능 최적화 ✅

### 1. 이미지 최적화
- ✅ Lazy Loading 적용
- ✅ 적절한 크기 (약 5MB)
- ✅ JPG 포맷 사용
- ✅ 에러 처리로 불필요한 요청 방지

### 2. CSS 최적화
- ✅ CSS Variables로 반복 값 관리
- ✅ 미사용 스타일 없음
- ✅ 모바일 퍼스트 접근

### 3. JavaScript 최적화
- ✅ 비동기 로딩 (defer)
- ✅ 이벤트 위임 사용
- ✅ 불필요한 DOM 조작 최소화
- ✅ IIFE 패턴으로 전역 스코프 오염 방지

### 4. 캐싱 전략
- ✅ 정적 파일 브라우저 캐싱 활용
- ✅ GitHub Pages 기본 캐싱

## 접근성 (Accessibility) ✅

- ✅ 시맨틱 HTML 사용
- ✅ alt 속성 필수
- ✅ 키보드 네비게이션 지원
- ✅ 충분한 색상 대비 (WCAG AA 이상)
- ✅ 포커스 표시 명확히 (focus-visible)
- ✅ ARIA 속성 사용 (aria-pressed)
- ✅ Reduced motion 지원

## 브라우저 지원

- ✅ Chrome (최신 2버전)
- ✅ Firefox (최신 2버전)
- ✅ Safari (최신 2버전)
- ✅ Edge (최신 2버전)
- ✅ 모바일: iOS Safari 12+, Chrome Android 최신

## GitHub Pages 배포

### 설정
1. Repository Settings > Pages
2. Source: main branch / root
3. Custom domain (선택사항)

### 배포 URL
- `https://{username}.github.io/sejong/`

### 주의사항
- ✅ 모든 경로는 상대 경로 사용
- ✅ YAML 파일은 CORS 이슈 없음 (같은 도메인)
- ✅ HTTPS 기본 제공

## 개발 단계

### Phase 1: 기본 구조 ✅
- [x] HTML 기본 구조 작성
- [x] CSS 레이아웃 구현
- [x] 샘플 차량 데이터 작성 (cars.yaml) - 10대
- [x] 카드 UI 구현

### Phase 2: 기능 구현 ✅
- [x] YAML 로딩 및 파싱
- [x] 카드 동적 렌더링
- [x] 필터 기능 구현
- [x] 반응형 디자인 적용

### Phase 3: 최적화 및 마무리 ✅
- [x] 이미지 최적화 (10개 차량 이미지 생성)
- [x] 이미지 에러 처리 (무한 루프 방지)
- [x] 접근성 검토
- [x] 성능 최적화

### Phase 4: 배포
- [ ] GitHub Pages 설정
- [ ] 최종 테스트
- [x] 문서 작성

## 현재 구현 상태

### 완료된 기능 ✅
- ✅ Single Page Application 구조
- ✅ 10대 차량 데이터 및 이미지
- ✅ 카드 형태 차량 표시
- ✅ 해시태그 기반 필터링
- ✅ 반응형 디자인 (1/2/3/4열)
- ✅ 이미지 lazy loading
- ✅ 이미지 에러 처리
- ✅ 전화 연결 기능
- ✅ Header/Footer 구현
- ✅ 로딩 상태 표시
- ✅ 결과 없음 처리

### 추후 개선 가능 항목
- [ ] 다크 모드 지원
- [ ] 차량 비교 기능
- [ ] 예약 가능 날짜 표시
- [ ] 카카오맵 API 연동 (위치 표시)
- [ ] 카카오톡 상담 버튼
- [ ] 검색 기능
- [ ] 정렬 기능 (가격순, 이름순)
- [ ] 애니메이션 효과 강화
- [ ] 이미지 갤러리 (여러 장)
- [ ] 차량 상세 페이지

## 참고 자료

- **js-yaml CDN**: https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js
- **디자인 참고**: docs/card-concept.png
- **폰트**: Noto Sans KR (Google Fonts)
- **아이콘**: SVG 인라인

## 파일 정보

### 주요 파일
- `index.html`: 1개 (메인 페이지)
- `css/style.css`: 약 500줄
- `js/app.js`: 약 200줄
- `data/cars.yaml`: 10대 차량 데이터
- `images/cars/*.jpg`: 10개 차량 이미지 (각 약 5MB)
- `images/placeholder.svg`: 1개

### 총 파일 수
- HTML: 1개
- CSS: 1개
- JavaScript: 1개
- YAML: 1개
- 이미지: 11개 (차량 10개 + placeholder 1개)
