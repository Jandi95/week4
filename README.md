# React + Supabase(auth, database) SPA 구현

## 작업 계획

1. 컴포넌트 구축 및 상태 설정
2. SPA 라우팅 작업 (usePageQuery, navigate)
3. 진행도 확인 후, 토스트 알림 기능을 라이브러리 활용할지 or 직접 만들지 결정
4. 프로필 정보 조회 및 수정
   - 프로필 페이지에서 현재 로그인 사용자의 `id`로 `profiles` 테이블 정보 조회
   - 사용자 프로필 정보(이름, 이메일, 소개 등) 화면에 표시
   - 사용자 프로필 정보를 수정할 수 있는 폼 제공 및 유효성 검사
   - Supabase에 정보 수정을 요청해 성공 또는 오류 발생 시, 토스트 알림
5. 진행도 확인 후, 인증된 사용자만 조회 가능한 게시판
   - 대시보드 페이지 추가 (클라이언트 사이드 라우팅)
   - 현재 인증된 사용자만 접근 가능하도록 라우팅 가드(보호)
   - `posts` 테이블에서 게시글 목록 조회
   - 새 글(제목/내용) 작성 폼 제공 및 유효성 검사
   - 게시글을 Supabase의 데이터베이스에 저장
   - 글 작성 성공/실패 시, 토스트 알림

---

## 시행착오와 해결과정

### 1. 비밀번호와 비밀번호 확인의 동작 이슈

- 문제 : `비밀번호`를 올바른 형식으로 입력하고 `비밀번호 확인`에서 같은 값으로 검증을 끝내고 다시 `비밀번호`를 수정하면 `비밀번호 확인` 필드를 건들지 않는 이상 에러가 작동하지 않았다.
- 해결과정 : 사용한 라이브러리인 `react-hook-form`는 인풋 필드의 validate는 그 필드가 변경될 때만 실행된다는 것을 파악하고 `trigger` 라는 기능을 활용하여 해결해보고자 아래와 같이 코드를 작성했다.

```Typescript
const password = watch("password")

useEffect(() => {
  trigger("passwordAgain")
}, [password, trigger])
```

문제 없이 잘 작동을 기대했지만 간과한점이 있었다.. 초기 화면부터 `비밀번호 확인` 필드에 아무것도 입력하지 않았다는 에러가 출력되고 있었다. 파악해보자면..

1. trigger("passwordAgain") 호출 → 아직 아무 값도 안 넣었는데도 검증 실행
2. 그래서 "패스워드 확인을 입력하세요." 에러가 초기 화면부터 뜸

열심히 머리를 굴려본 결과 아래와 같은 코드가 나왔다.

```Typescript
const password = watch("password")
const passwordAgain = watch("passwordAgain")

useEffect(() => {
  if (passwordAgain) {
    trigger("passwordAgain")
  }
}, [password, passwordAgain, trigger])
```

`passwordAgain`을 `watch`하고 입력이 된 상태에서만 재검증되게 설정하여 해결했다.
