// 이미지 및 리소스 로드 후 코드 실행
window.onload = () => {
    // 모바일 메뉴 버튼 처리
    // 1. 모바일 버튼을 찾아서 저장
    let mbBt = document.querySelector('.mb-bt');
    // 2. 모바일 메뉴를 찾아서 저장
    let mbNav = document.querySelector('.mb-nav');
    // 4. 로고를 찾아서 저장
    let logo = document.querySelector('.logo');
    // 5. header 저장
    let header = document.querySelector('.header');
    // 6. header menu 저장
    let gnbA = document.querySelectorAll('.gnb>li>a')
    // 3. 모바일 버튼 클릭 시 모바일 메뉴에 active 클래스 추가
    mbBt.addEventListener('click', () => {
        // 메뉴에 active 추가
        mbNav.classList.toggle("active");
        // 버튼에 active 추가
        mbBt.classList.toggle("active");
        // 로고에 active 추가
        logo.classList.toggle("active-blue");
    });
    // 화면 리사이즈 시 되돌리기
    window.addEventListener('resize', ()=>{
        // window의 화면 안쪽 너비 체크
        let wW = window.innerWidth;
        if(wW > 1080){
            // 메뉴에 active 제거
            mbNav.classList.remove("active");
            // 버튼에 active 제거
            mbBt.classList.remove("active");
        }
    });
    // 스크롤 처리
    window.addEventListener('scroll', ()=>{
        let scT = window.document.documentElement.scrollTop;
        // 스크롤 했다면
        if(scT > 99){
            header.classList.add("active");
            logo.classList.add("active");
            gnbA.forEach((item)=>{
                item.classList.add("active");
            })
        } else {
            header.classList.remove("active");
            logo.classList.remove("active");
            gnbA.forEach((item)=>{
                item.classList.remove("active");
            })
        }
    })
}