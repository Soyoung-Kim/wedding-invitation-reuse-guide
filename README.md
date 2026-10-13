# 모바일 청첩장 재사용 가이드

이 문서는 기존 청첩장 디자인과 기능을 다른 사람이 재사용할 때, 기존 커플의 개인정보·관리자 계정·Supabase 데이터를 침해하지 않고 새 청첩장을 만드는 절차를 정리한 안내서입니다.

## 가장 중요한 원칙

새 사용자는 반드시 자기 명의의 **새 GitHub 저장소**, **새 Supabase 프로젝트**, **새 관리자 계정**, 그리고 사진 업로드 기능을 사용할 경우 **새 Google Drive 폴더와 OAuth 앱**을 만들어야 합니다.

기존 운영 청첩장의 Supabase URL, 관리자 계정, 사진, 연락처, 계좌, RSVP, 방명록, Google Drive 폴더는 절대 공유하거나 재사용하지 않습니다.

## 전달할 것과 전달하지 않을 것

| 구분 | 전달 방식 |
| --- | --- |
| 코드 | 개인정보를 제거한 새 저장소 또는 별도 템플릿으로 전달 |
| 디자인·기능 | HTML, CSS, JavaScript, Edge Function 코드만 재사용 |
| 사진·이름·연락처·계좌·주소·RSVP·방명록 | 모두 삭제하거나 예시 값으로 교체 |
| Supabase | 새 사용자가 본인 계정에서 새 프로젝트 생성 |
| 관리자 | 새 Supabase Auth 사용자와 새 관리자 권한 생성 |
| Google Drive·Google OAuth | 새 사용자가 별도 생성 |
| 비밀값 | service role, OAuth secret, OpenAI 키, password pepper는 공유 금지 |

브라우저에 들어가는 publishable/anon key도 반드시 **새 Supabase 프로젝트의 값**으로 바꿉니다.

## 권장 전달 순서

1. 새 비공개 GitHub 저장소를 만듭니다.
2. 기존 코드에서 사진과 개인정보를 지운 복사본을 새 저장소에 올립니다.
3. 새 Supabase 프로젝트와 관리자 로그인 계정을 만듭니다.
4. 새 Supabase에서 SQL과 Edge Function을 설치합니다.
5. 설정 파일, 사진, 문구, GitHub Pages 주소를 새 사용자 정보로 바꿉니다.
6. 관리자·공개 청첩장·모바일 환경을 모두 테스트한 뒤 배포합니다.

## 코드 복사 전 개인정보 제거

다음 항목은 새 사용자 정보 또는 예시 값으로 바꿉니다.

- `assets/photos/`, 사진 목록, 약도, OG 이미지와 아이콘
- `index.html`의 예식 일시, 장소, 주소, 안내 문구, 이름
- `config.js`의 사이트 키, 예식 정보, 공유 문구, Supabase URL·publishable key
- 연락처·계좌·갤러리 시드 SQL의 예시 데이터
- 하객 사진 업로드 SQL의 기존 `site_key`와 Google Drive 폴더 ID

실제 사진, 연락처, 계좌번호, Google Drive 폴더 ID가 GitHub에 남지 않았는지 푸시 전에 확인합니다.

## 새 Supabase 프로젝트

새 사용자는 자신의 Supabase 프로젝트에서 다음을 실행합니다.

1. Authentication에 관리자 이메일과 비밀번호를 만듭니다.
2. 새 프로젝트의 URL과 publishable/anon key를 `config.js`에 입력합니다.
3. SQL Editor에서 아래 순서로 스키마를 만듭니다.

   1. `guestbook.sql`
   2. `wedding_directory.sql` — 예시 연락처·계좌를 새 정보로 교체
   3. `admin_portal.sql`
   4. `wedding_gallery_variants.sql`
   5. `wedding_site_settings.sql`
   6. `wedding_gallery_settings.sql`
   7. `wedding_display_settings.sql`
   8. `wedding_rsvp.sql`
   9. 관리자 승인 SQL — 실제 관리자 이메일로 교체 후 실행

기존 RSVP를 삭제하는 마이그레이션은 새 빈 프로젝트에 실행할 필요가 없습니다.

## 관리자와 사이트 키

관리자 권한은 새 Supabase Auth 사용자만 대상으로 등록합니다. 기존 관리자 계정에 새 사용자를 추가하지 않습니다.

사이트 키는 청첩장 데이터를 구분합니다. 예를 들어 `kim_lee_wed`처럼 새 고유 값을 사용합니다. 동일한 Supabase 프로젝트에서 두 청첩장을 운영한다면 각 청첩장마다 저장소, 사이트 키, 공개 URL을 모두 구분해야 합니다.

## 하객 사진 업로드는 선택 기능

사진 업로드 기능을 사용하지 않으면 공유 버튼을 숨기고 Google Drive·OAuth 설정을 건너뛰어도 됩니다.

사용할 경우 새 사용자가 다음을 직접 준비합니다.

1. 새 Google Drive 폴더
2. 새 Google Cloud OAuth 클라이언트와 Drive API
3. Supabase Edge Function Secrets
   - `GOOGLE_DRIVE_CLIENT_ID`
   - `GOOGLE_DRIVE_CLIENT_SECRET`
4. 하객 사진 관련 SQL과 Edge Function 배포

Google OAuth redirect URI는 새 Supabase 프로젝트의 callback 주소여야 합니다. 기존 프로젝트의 Drive 폴더나 OAuth 설정을 재사용하지 않습니다.

## GitHub Pages 배포와 캐시

새 저장소의 `main` 브랜치를 GitHub Pages 배포 원본으로 설정하고, 새 공개 URL을 공유 링크에 반영합니다.

HTML, CSS, JavaScript를 변경해 배포할 때는 `version.json`과 각 페이지의 `version-check.js?v=...` 버전을 함께 올려 모바일 캐시가 갱신되도록 합니다.

## 최종 점검표

- [ ] 기존 커플의 사진·실명·전화번호·계좌번호·주소가 남아 있지 않다.
- [ ] 새 Supabase 프로젝트 URL과 key를 사용한다.
- [ ] 기존 Supabase, Storage, 관리자, Google Drive를 공유하지 않는다.
- [ ] 비밀값이 Git 기록, 코드, 메신저에 포함되지 않았다.
- [ ] 새 관리자만 새 `/admin/`에 로그인할 수 있다.
- [ ] 새 GitHub Pages URL과 공유 링크를 사용한다.
- [ ] 모바일에서 청첩장, 관리자, RSVP, 사진 업로드(사용 시)를 테스트했다.
