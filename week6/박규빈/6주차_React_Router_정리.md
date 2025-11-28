# Week 6: Todo App (React) - Mock Server & LocalStorage Sync

"라우팅 개념 정리 + Mock 서버 & 로컬스토리지 동기화"를 완성하는 주차였습다. 즉, 네트워크 요청 흐름과 클라이언트 데이터 저장 구조를 익힐 수 있었습니다.

> React Router까지는 구현하지 못했고, **Mock 서버 연동 및 LocalStorage 동기화**에 집중하여 과제를 진행했습니다.

## 1. React Router란 (개념 학습; 구현 X)

- **SPA와 라우팅의 필요성**: React 같은 SPA(Single Page Application)에서 왜 페이지 새로고침 없이 URL을 변경하며 뷰를 전환해야 하는지, 그리고 `react-router-dom`이 이 역할을 어떻게 수행하는지 학습했습니다.
- **핵심 컴포넌트**: `BrowserRouter`, `Routes`, `Route`, `Link` 등 라우팅을 구성하는 기본 컴포넌트들의 역할을 알게 되었습니다..
- **동적/중첩 라우팅**: `/todo/:id`와 같이 URL 파라미터를 받는 **동적 라우팅**(`useParams` 훅)과, 공통 레이아웃 내부에 하위 페이지를 렌더링하는 **중첩 라우팅**(`Outlet` 컴포넌트)의 개념을 알게 되었습니다.

## 2. Mock Server 및 데이터 연동 (구현)

- **Mock API 서버 구축**: `json-server`를 이용해 `db.json` 파일을 기반으로 한 API 서버를 구축했습니다.
- **비동기 데이터 관리**: 기존 `useTodo` 커스텀 훅을 리팩터링하여, `async/await`와 `fetch`를 사용해 서버와 통신하도록 변경했습니다.
- **REST API 연동**: 4가지 핵심 메서드(GET, POST, PATCH, DELETE)를 구현했습니다.
- **데이터 동기화 (캐싱)**: UX 향상을 위해, 초기 로드 시 로컬스토리지 데이터를 먼저 보여주고, 이후 서버에서 가져온 최신 데이터로 동기화하는(업데이트하는) 로직을 구현했습니다.
- **Tailwind CSS v3 설정**: v4 마이그레이션 과정에서 발생한 이슈를 해결하고, 안정적인 v3 환경을 재구성했습니다.

## 어려움 및 해결 과정

### 1. Tailwind v3/v4 설정 충돌 문제

- **겪은 문제:**
  처음 Tailwind v4로 마이그레이션을 시도했으나 `npm error could not determine executable to run` 오류가 발생했습니다. 이후 v3로 다시 설치했음에도 불구하고, 프로젝트를 실행하면 CSS가 모두 적용되지 않은(깨진) 화면이 나타났습니다.

- **원인 파악:**
  Tailwind v3와 v4는 설정 방식이 완전히 다르다는 것을 알게 되었습니다.

  - **v4:** `@tailwindcss/vite` 플러그인을 사용하며, `postcss.config.js` 파일이 **필요 없고**, `index.css`의 `@tailwind` 지시문도 **제거해야 합니다.**
  - **v3:** `postcss`와 `autoprefixer`에 의존하며, `postcss.config.js` 파일이 **필수**이고 `index.css`에 `@tailwind` 지시문이 **필수**입니다.

  v4 설치 시도 -> v3 재설치 과정에서 이 설정 파일들이 꼬이면서(ex: v3 환경에 v4 플러그인이 남아있거나, `postcss.config.js` 파일이 없거나) CSS가 빌드되지 않았습니다.

- **해결 방법 (v3 기준으로 재설정):**
  1.  `@tailwindcss/vite` (v4 플러그인)를 `npm uninstall`로 완전히 제거했습니다.
  2.  `tailwindcss@^3`, `postcss`, `autoprefixer`를 명시적으로 설치했습니다.
  3.  `postcss.config.js` 파일을 루트에 생성하고, `tailwindcss`와 `autoprefixer`를 플러그인으로 등록했습니다.
  4.  `src/index.css` 파일에 `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;` 지시문을 다시 추가했습니다.
  5.  `vite.config.js`에서는 `react()` 플러그인만 남기고, v4용 `tailwindcss()` 플러그인 코드를 제거했습니다.

### 2. 서버 데이터와 로컬 상태(LocalStorage) 동기화

- **겪은 문제:**
  `json-server`에서 데이터를 `fetch`로 받아오는 것과, 기존 `useTodo` 훅에 있던 `localStorage` 로직을 어떻게 결합해야 할지 어려웠습니다. 서버가 켜질 때까지 앱이 빈 화면으로 보이거나, 데이터를 받아온 후 `localStorage`에 어떻게 다시 저장해야 할지 흐름이 헷갈렸습니다.

- **해결 방법 (`useTodo.js` 훅 리팩터링):**
  '성능(빠른 로딩)'과 '데이터 최신성'을 모두 잡기 위해 로직을 분리했습니다.

  1.  **[빠른 로딩] 초기 상태 로드:**
      `useState`의 초기값을 `localStorage`에서 가져오도록 유지했습니다.
      `useState(() => { ... localStorage.getItem('todos') ... })`

      - **효과:** 서버 응답을 기다리지 않고, 사용자가 마지막으로 봤던 화면을 즉시 보여줍니다.

  2.  **[최신성] 서버 데이터 조회 (GET):**
      `useEffect(..., [])` (마운트 시 1회) 훅을 사용해, `fetch` (GET)로 `json-server`의 데이터를 비동기로 가져왔습니다.
      데이터를 성공적으로 가져오면, `setTodos()`를 호출해 상태를 서버의 최신 데이터로 업데이트합니다.

  3.  **[동기화] 로컬스토리지 저장:**
      `useEffect(..., [todos])` 훅을 **그대로 유지**했습니다.

      - **효과:** `todos` 상태가 **어떤 이유로든** (서버에서 `GET`을 했든, `POST`로 새 항목을 추가했든) 변경될 때마다, 이 훅이 자동으로 실행되어 최신 `todos` 상태를 `localStorage.setItem`을 통해 저장합니다.

  4.  **[C/U/D] 비동기 처리:**
      `handleAddTodo` (POST), `handleDeleteTodo` (DELETE), `handleToggleTodo` (PATCH) 함수를 모두 `async/await`로 변경했습니다.
      `fetch`로 서버에 먼저 요청을 보내고, **서버가 성공적으로 응답했을 때** `setTodos()`를 호출하여 화면(로컬 상태)을 변경하도록 로직을 수정했습니다.

---

## 🚀 API 테스트 및 기능 구현 결과 (Postman)

`json-server`를 통해 `http://localhost:3001/todos` 를 구축했으며, Postman으로 4가지 핵심 API의 작동을 확인했습니다.

### 1. [GET] /todos : 할 일 목록 조회

![Postman 할 일 조회](./my-project/img/1.%20할%20일%20목록%20조회.png)

### 2. [POST] /todos : 새 할 일 추가

![Postman 새 할 일 추가](./my-project/img/2.%20새%20할%20일%20추가.png)

![Postman 추가된 할 일 확인](./my-project/img/2-1.%20추가된%20할%20일%20확인.png)

### 3. [PATCH] /todos/:id : 할 일 완료 상태 변경

![Postman 할 일 완료 상태 변경](./my-project/img/3.%20할%20일%20완료%20상태%20변경.png)

![Postman 변경된 상태 확인](./my-project/img/3-1.%20true로%20변경된%20상태%20확인.png)

### 4. [DELETE] /todos/:id : 할 일 삭제

![Postman 할 일 삭제](./my-project/img/4.%20할%20일%20삭제.png)

![Postman 할 일 삭제 확인](./my-project/img/4-1.%20할%20일%20삭제%20확인.png)

## 💡 알게 된 점 (Key Takeaways)

1.  **설정 파일의 중요성**: Tailwind v3와 v4의 설정 방식이 완전히 다르다는 것을 알게 되었습니다. 단순히 패키지만 설치하는 것이 아니라, `postcss.config.js`, `index.css` 등 관련 설정 파일들이 버전에 맞게 정확히 구성되어야만 작동한다는 것을 깨달았습니다.
2.  **커스텀 훅의 힘**: `useTodo` 커스텀 훅을 사용하니, `App.jsx` 등 UI 컴포넌트 코드는 **단 한 줄도 수정하지 않고도** 데이터 로직 전체를 (기존 Local -> `json-server` 연동) 교체할 수 있었습니다. '관심사의 분리'가 왜 중요한지 체감했습니다.
3.  **캐싱 전략**: `localStorage`를 단순 저장이 아닌 '캐시'로 활용하고, `useEffect`로 서버 데이터를 비동기로 가져오는 방식을 통해 "빠른 초기 로딩(UX)"과 "데이터 최신성(동기화)"을 모두 처리하는 방법을 배웠습니다.
4.  **Postman 활용**: 프론트엔드 UI 코드를 작성하기 전에 Postman을 사용하면, API가 의도대로 작동하는지 미리 테스트할 수 있어 디버깅이 매우 용이했습니다.
