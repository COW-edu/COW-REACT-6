### Router
전통적인 웹사이트는 페이지를 이동할 때마다 새로운 HTML 문서를 받아왔지만, React와 같은 프레임워크로 만드는 SPA에서는 다른 방식으로 페이지 전환을 처리한다

SPA는 처음에 하나의 HTML 페이지만 로드하고, 이후 페이지 이동 요청이 있을 때는 서버에 전체 페이지를 다시 요청하는 대신, javaScript를 사용하여 동적으로 화면의 내용을 바꿔준다 

```jsx
<Routes>
    {/* path="/"는 홈페이지 경로 */}
    <Route path="/" element={<HomePage />} />
    {/* path="/about"은 소개 페이지 경로 */}
    <Route path="/about" element={<AboutPage />} />
    {/* 정의되지 않은 다른 모든 경로 처리 (예: 404 페이지) */}
    <Route path="*" element={<h2>페이지를 찾을 수 없습니다 (404)</h2>} />
</Routes>
```

- 우리가 설정한 대로 ReactRouter가 URL 변경에 따라 적절한 컴포넌트를 보여주는 기능은 브라우저의 History API와 React Router에 있다
- History API는 개발자가 JS를 통해 브라우저의 세션 기록을 조작할 수 있게 해주는 기능이다
- BrowserRouter는 브라우저에 내장된 History API를 사용하여 동작한다 
## HistoryAPI 주요기능
- pushState
- - URL 주소창의 주소를 변경하지만, 페이지를 실제로 새로고침하지는 않습니다. 이것이 SPA에서 페이지 이동처럼 보이게 하는 핵심이다.
- replaceState
- - 현재 세션 기록을 새로운 상태로 교체한다. 뒤로 가기 시 이전 기록이 남지 않아야 할 때 사용된다.
- popstate 
- - 사용자가 브라우저의 뒤로 가기/앞으로 가기 버튼을 사용하거나, JavaScript로 history.back(), history.forward() 등을 호출하여 URL이 변경될 때 발생하는 이벤트이다
- BrowserRouter는 Histroy API를 통해 URL 변경을 감지하고, 변경된 URL에 따라 어떤 컴포넌트를 보여줄지 결정하는 역할을 한다.
## 주요 컴포넌트
- Routes
- - 여러 경로를 묶는 컨테이너
- Route
- - 각각의 경로와 컴포넌트를 연결한다 
- useNavigate
- - 페이지 이동용 훅
- useParams
- - URL 파라미터를 읽는 훅
- - ex) todos/:id -> id =3 
- Link
- - 새로고침 없이 이동하는 링크
## 중첩 라우팅
- 부모-자식 페이지 구조를 가질 수 있다
```jsx
<Route path="/todos" element={<TodoLayout />}>
  <Route index element={<TodoList />} />  {/* /todos */}
  <Route path=":id" element={<TodoDetail />} /> {/* /todos/:id */}
</Route>
```
- <Outlet />을 넣어 자식 라우트가 표시될 위치를 지정할 수 있다 
## 인증 라우팅
- react router에서 로그인된 사용자만 접근할 수 있는 페이지를 보호하는 라우팅 방식
- 인증이 필요한 주소로 들어갈려면 허가가 되어 있어야 하고 허가가 없으면 다른 주소로 접속된다 
