// 이미지 및 리소스 로드 후 코드 실행
window.onload = () => {
    //aos 세팅
    AOS.init();

    // 위로가기. 
    let goTop = document.querySelector('.gotop');
    let visual = document.querySelector('.service');
    new Waypoint({
        element: visual,
        // 스크롤 위치에 따른 div 비교 
        handler: function(dir){
            if(dir === "down"){
                goTop.classList.add('active');
            } else {
                goTop.classList.remove('active');
            }
        },
        // 해당 div의 화면상 보이는 영역 
        offset: "50%"
    });

    // 8.html
    let htmlTeg = document.querySelector('html')
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
    // 7. mb-bt 저장
    let mbBtSpan = document.querySelectorAll('.mb-bt span');
    // 3. 모바일 버튼 클릭 시 모바일 메뉴에 active 클래스 추가
    mbBt.addEventListener('click', () => {
        // html scroll 잠금
        htmlTeg.classList.toggle("active");
        // 메뉴에 active 추가
        mbNav.classList.toggle("active");
        // 버튼에 active 추가
        mbBt.classList.toggle("active");
        // 로고에 active 추가
        logo.classList.toggle("active-blue");
        // mb-bt 추가
        mbBtSpan.forEach((item) => {
            item.classList.add("active");
        })
    });
    // 화면 리사이즈 시 되돌리기
    window.addEventListener('resize', () => {
        // window의 화면 안쪽 너비 체크
        let wW = window.innerWidth;
        if (wW > 1080) {
            htmlTeg.classList.remove("active");
            // 메뉴에 active 제거
            mbNav.classList.remove("active");
            // 버튼에 active 제거
            mbBt.classList.remove("active");
            // 스크롤 유무에 따른 처리 구분
            let scT = window.document.documentElement.scrollTop;
            if (scT > 99) {
                // 스크롤 되면
                mbBtSpan.forEach((item) => {
                    item.classList.add("active");
                })
            } else {
                mbBtSpan.forEach((item) => {
                    item.classList.remove("active");
                })
            }
            logo.classList.remove("active-blue");
        }
    });
    // 스크롤 처리
    window.addEventListener('scroll', () => {
        let scT = window.document.documentElement.scrollTop;
        // 스크롤 했다면
        if (scT > 99) {
            header.classList.add("active");
            logo.classList.add("active");
            gnbA.forEach((item) => {
                item.classList.add("active");
            })
            mbBtSpan.forEach((item) => {
                item.classList.add("active");
            })
        } else {
            header.classList.remove("active");
            logo.classList.remove("active");
            gnbA.forEach((item) => {
                item.classList.remove("active");
            })
            mbBtSpan.forEach((item) => {
                item.classList.remove("active");
            })
        }
    })
    // 화면 리로드 시 처리
    let scT = window.document.documentElement.scrollTop;
    if (scT > 99) {
        header.classList.add("active");
        logo.classList.add("active");
        gnbA.forEach((item) => {
            item.classList.add("active");
        })
        mbBtSpan.forEach((item) => {
            item.classList.add("active");
        })
    }
    // data.json 연동
    // 1. XML 활용(반드시 JSON.parse()실행)
    const xhttp = new XMLHttpRequest();
    // data.json이 불러졌는지 검사 후 완료 시 시행.
    xhttp.onreadystatechange = function (e) {
        const req = e.target;
        if (e.target === XMLHttpRequest.DONE) {
            console.log(req.response);
            // 아래 구문을 반드시 체크하자
            const dataArr = JSON.parse(req.response);
            console.log(dataArr)
        }
    };
    xhttp.open("GET", "data.json");
    // xhttp.send();

    // 2. fetch : 아래 구문을 준수하자
    fetch("data.json")
        .then((res) => res.json())
        .then((data => {
            // 데이터 활용
            // 이 데이터는 문자열
            // // 보통 라이브러리가 이걸 다 해줌
            visualData = data.visual;
            // showVT(visualData[0])

            // 데이터를 외부변수에 지정해서 밖에서도 쓸 수 있게 만듬
            // li태그 만들기
            // 1. 데이터 로딩 후 데이터 개수만큼 li만듬
            // 2. 만들어진 글자를 모아서 ul 안에 innerHTML
            let html = "";
            let count = 0;
            visualData.forEach((item) => {
                html += `<li>${++count}</li>`
            })
            swUl.innerHTML = html;
            // js가 li를 참조하도록 적용하기
            swList = document.querySelectorAll('.swVisual-list li');
            // li태그를 클릭해서 슬라이드 이동하기
            swlistShow();

            showVT(visualData[0], 0);
        }))
        .catch((err) => {
            console.log(err);
        });
    // 비주얼에 활용할 데이터
    let visualData;
    // 화면에 데이터 출력하는 함수
    const swTitle = document.querySelector('.swVisual-title');
    const swTxt = document.querySelector('.swVisual-txt');
    const swLink = document.querySelector('.swVisual-link');
    const swUl = document.querySelector('.swVisual-list');
    let swList;
    // li는 데이터 로딩 후 동적으로 만들어야한다.

    // 타이틀 내용 보여주기
    function showVT(_data, _idx) {
        swTitle.innerHTML = _data.title;
        swTxt.innerHTML = _data.txt;
        if (_data.link === "no") {
            swLink.classList.add('active');
        } else {
            swLink.classList.remove('active');
        }
        changeBar(_idx);
    }
    // 포커스 라인 애니메이션 실행함수
    function changeBar(_idx) {
        swList.forEach((item, index) => {
            if (index === _idx) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        })
    }
    // li 클릭시 슬라이드 변경
    function swlistShow() {
        swList.forEach((item, index) => {
            // 클릭 시 슬라이드 변경
            item.addEventListener('click', () => {
                // swVisual 슬라이드를 변경할 것인가(api 참조)
                // swVisual.slideToLoop(번호, 속도, 효과);

                swVisual.slideToLoop(index, 500, false);
            })
        })
    }

    // swiper
    let swVisual = new Swiper(".swVisual", {
        effect: "fade",
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        navigation: {
            prevEl: "swVisula-prev",
            nextEl: "swVisual-next"
        },
    })
    // 슬라이드가 변경될 때마다
    swVisual.on("slideChange", function () {
        // console.log(`swVisual.realIndex: ${swVisual.realIndex}`)
        // console.log(`swVisual.activeIndex: ${swVisual.activeIndex}`)
        // 텍스트 수정
        showVT(visualData[swVisual.realIndex], swVisual.realIndex);
    })
    // 카테고리 슬라이드
    new Swiper(".swcategory", {
        loop: true,
        slidesPerView: 3,
        breakpoints: {
            480: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
    // 안내창 기능
    const categoryPop = document.querySelector('.category-pop');
    categoryPop.addEventListener('click', ()=>{
        categoryPop.classList.add('active');
    })
}