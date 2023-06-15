## gojiri
고지리: 고정지출관리

### 실행
```bash
# node v16.15.1
npm install
npm run dev
```

### 폴더구조
```bash
gojiri
├── public # 빌드 경로
└── src
	├── assets # 콘텐츠 리소스 폴더(font,image,scss)
	├── common
	│   ├── http.ts # API 통신
	│   └── util.ts # 유틸함수
	├─ components
	│   ├── card # 카드 컴포넌트
	│   │   ├── Card.vue
	│   │   ├── CardControl.vue
	│   │   ├── CardInput.vue
	│   │   ├── CardItem.vue
	│   │   ├── CardItemControl.vue
	│   │   └── CardItemInput.vue
	│   ├── flicker # 플리커 컴포넌트
  │   │   ├── HorizonFlicker.vue
  │   │   └── VerticalFlicker.vue
  │   ├── modal # 모달모듈 컴포넌트
  │   │   ├── AddCardModule.vue
  │   │   ├── ChangePeriodModule.vue
  │   │   ├── CloneCardModule.vue
  │   │   ├── DeleteModule.vue
  │   │   └── ErrorTitleNullModule.vue
	├── layout # 레이아웃
  │   ├── BodyArea.vue
  │   ├── HeaderArea.vue
	│   └── ModalArea.vue
	├── router # 라우터
	├── service # 뷰 컨트롤러
	│   ├── errors.ts
	│	  ├── useCardItemService.ts
	│   └── useCardService.ts
	├── store # pinia 스토어
	│   ├── index.ts
	│	  ├── useCardItemStore.ts
	│	  ├── useCardStore.ts
	│	  ├── useDateStore.ts
	│   └── useModalStore.ts
	├── types # 타입스크립트 타입
	│   └── index.ts
	├── App.vue
	└── index.js
```