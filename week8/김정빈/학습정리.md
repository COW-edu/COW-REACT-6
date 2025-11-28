# Week 8: 로그인/회원가입 + 라우팅 정리

## 1. JWT vs Session 차이

- Session: 서버가 사용자 상태(세션)를 메모리나 저장소에 보관하고, 클라이언트는 세션 ID(쿠키)를 보관한다. 서버에서 상태를 관리하므로 로그아웃/세션 무효화가 쉬움.
- JWT: 토큰 자체에 사용자 정보와 만료시간을 담아 서명한 뒤 클라이언트가 보관한다. 서버는 상태를 거의 가지지 않으므로 확장성과 무상태(Stateless)에 유리함.
장단점 비교:
- 확장성: JWT가 유리(서버 상태 불필요) / Session은 중앙 저장소 필요 시 확장 복잡도 증가
- 보안: Session은 서버가 세션을 통제하므로 탈취 시 세션 무효화 가능, JWT는 토큰 만료 전까지 유효(리프레시/블랙리스트 필요)
- 구현 편의성: Session은 기존 프레임워크에서 간단, JWT는 토큰 발급·검증·만료/리프레시 설계 필요

 ## 2. 라우터 구성

- `/` : 메인 랜딩 페이지(비로그인 상태에서 회원가입/로그인 링크 표시)
- `/login` : 로그인 페이지
- `/register` : 회원가입 페이지
- `/dashboard` : 로그인 이후 개인 할 일(TODO) 조회 및 관리(토큰 필요)

API 라우트(백엔드 기준):
- `POST /api/auth/register` : 회원가입 (토큰 발급)
- `POST /api/auth/login` : 로그인 (토큰 발급)
- `GET/POST /api/members/{memberId}/todos` : 회원별 TODO 목록 조회/생성
- `PUT/PATCH/DELETE /api/members/{memberId}/todos/{todoId}` : TODO 수정/삭제
Router 보호 전략:
- 프론트: `ProtectedRoute` 컴포넌트로 `/dashboard` 접근 시 로컬스토리지의 토큰 확인 후 리다이렉트 처리
- 백엔드: 로그인 메인페이지 회원가입은 허락

 ## 3. 구현하면서 느낀 점

- 코드를 더 쪼갤지 말지 고민이 많이 들었다
- 백엔드보다 디버깅을 하기 힘들다
- 구조를 처음에 잘 짜야 재사용을 쉽게 할 수 있다 
- window.location.href보다 navigate이 훨씬 부드럽다는것을 알았다