# 2048 게임

Node.js와 Express로 만든 간?단한 2048 퍼즐 게임입니다.

## 🎮 게임 소개

2048은 같은 숫자의 타일을 합쳐서 2048 타일을 만드는 슬라이딩 블록 퍼즐 게임입니다. 방향키를 사용해 타일을 4 방향으로 움직이며 최고 점수를 달성해보세요!

## 🚀 주요 기능

- 클래식 2048 게임플레이
- 부드러운 애니메이션과 반응형 디자인
- 점수 추적 시스템
- 게임 오버 감지
- 깔끔하고 모던한 UI

## 🛠️ 사용 기술

- **백엔드**: Node.js, Express
- **프론트엔드**: HTML5, CSS3, JavaScript
- **개발 도구**: Nodemon (핫 리로딩)

## 📦 설치 방법

1. 저장소 클론:
```bash
git clone https://github.com/GoProSMC/2048-game.git
cd 2048-game
```

2. 의존성 설치:
```bash
npm install
```

## 🎯 실행 방법

### 개발 모드
```bash
npm run dev
```

### 프로덕션 모드
```bash
npm start
```

게임은 `http://localhost:3000`에서 실행됩니다.

## 🎮 게임 방법

1. 방향키 (↑ ↓ ← →)를 사용해 타일을 움직입니다
2. 같은 숫자의 타일 두 개가 만나면 하나로 합쳐집니다
3. 2048 타일을 만들면 승리합니다
4. 더 이상 움직일 수 없으면 게임이 끝납니다

## 📁 프로젝트 구조

```
2048-game/
├── public/
│   ├── index.html    # 메인 HTML 파일
│   ├── style.css     # 게임 스타일링
│   └── game.js       # 게임 로직
├── server.js         # Express 서버
├── package.json      # 프로젝트 의존성
└── README.md         # 이 파일
```

## 🤝 기여하기

1. 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/멋진기능`)
3. 변경사항을 커밋합니다 (`git commit -m '멋진 기능 추가'`)
4. 브랜치에 푸시합니다 (`git push origin feature/멋진기능`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🎯 향후 개선 계획

- [ ] 최고 점수 저장 기능
- [ ] 다양한 게임 모드
- [ ] 모바일 터치 컨트롤
- [ ] 효과음 추가
- [ ] 테마 및 커스터마이징

---

2048 게임을 즐겨보세요! 🎉

---

Made by [spear34000](https://github.com/spear34000)
