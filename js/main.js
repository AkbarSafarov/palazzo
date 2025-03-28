document.addEventListener("DOMContentLoaded", function () {
    const playBtn = document.querySelector('.play_btn');
    const videoBlock = document.querySelector('.about_block_wr video');

    playBtn?.addEventListener('click', () => {
        const isPlaying = playBtn.classList.toggle('play');
        videoBlock[isPlaying ? 'play' : 'pause']();
    });


    const moreBtn = document.querySelector('.projects_block_wr .btn_more');
    const projectsWrap = document.querySelector('.projects_block_wr .inner');

    if(projectsWrap) {
        const projects = projectsWrap.querySelectorAll('.item');
        moreBtn?.addEventListener('click', () => {
            const isActive = projectsWrap.classList.toggle('active');
            moreBtn.innerText = isActive ? 'СКРЫТЬ' : 'ПОКАЗАТЬ ЕЩЕ';
        });
        moreBtn.style.display = 'block';
    } 

    // if(document.querySelector('.mySwiper_images')){
    //     const newProductsSwiper = new Swiper('.mySwiper_images', {
    //         loop: false,
    //         slidesPerView: 1,
    //         loopedSlides: 1,
    //         navigation: {
    //             nextEl: '.swiper-images-next',
    //             prevEl: '.swiper-images-prev',
    //         },
    //         pagination: {
    //             el: ".swiper-pagination",
    //             clickable: true,
    //         },
    //         effect: "fade",
    //         lazy: true
    //     });
    // }

    if(document.querySelector('.mySwiper_preim')){
        const newProductsSwiper = new Swiper('.mySwiper_preim', {
            loop: false,
            slidesPerView: 1,
            loopedSlides: 1,
            navigation: {
                nextEl: '.swiper-preim-next',
                prevEl: '.swiper-preim-prev',
            },
            pagination: {
                el: ".swiper-pagination_preim",
                clickable: true,
            },
            lazy: true
        });
    }

    if(document.querySelector('.mySwiper_team')){
        const newProductsSwiper = new Swiper('.mySwiper_team', {
            loop: false,
            slidesPerView: 'auto',
            loopedSlides: 1,
            spaceBetween: 30,
            lazy: true
        });
    }

    if(document.querySelector('.mySwiper_work') && matchMedia('(max-width: 1000px)').matches){
        const newProductsSwiper = new Swiper('.mySwiper_work', {
            loop: false,
            slidesPerView: 1,
            loopedSlides: 1,
            spaceBetween: 20,
            autoHeight: true,
            navigation: {
                nextEl: '.swiper-work-next',
                prevEl: '.swiper-work-prev',
            },
            pagination: {
                el: ".swiper-pagination_work",
                clickable: true,
            },
            lazy: true
        });
    }

    if(document.querySelector('.mySwiper_active')){
        const newProductsSwiper = new Swiper('.mySwiper_active', {
            loop: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loopedSlides: 1,
            spaceBetween: 8,
            roundLengths: true,
            loopAdditionalSlides: 30,
            navigation: {
                nextEl: '.swiper-active-next',
                prevEl: '.swiper-active-prev',
            },
            pagination: {
                el: ".swiper-pagination_active",
                clickable: true,
            },
            lazy: true
        });

        lightGallery(document.querySelector('.mySwiper_active '), {
            animateThumb: false,
            zoomFromOrigin: false,
            allowMediaOverlap: true,
            toggleThumb: false,
            selector: 'a',
            counter: false,
            download: false
        });
    }

    if (document.querySelector('.mySwiper_partner')) {
        const newProductsSwiper = new Swiper('.mySwiper_partner', {
            loop: false,
            slidesPerView: 1,
            loopedSlides: 1,
            spaceBetween: 0,
            navigation: {
                nextEl: '.swiper-partner-next',
                prevEl: '.swiper-partner-prev',
            },
            lazy: true,
            effect: "fade",
            // on: {
            //     slideChange: function () {
            //         const activeIndex = this.activeIndex;
            //         const images = document.querySelectorAll('.image_bg');

            //         images.forEach((img, index) => {
            //             img.style.opacity = index === activeIndex ? '1' : '0';
            //         });
            //     }
            // }
        });

        document.querySelectorAll('.image_bg').forEach((img, index) => {
            img.style.opacity = index === 0 ? '1' : '0';
            img.style.transition = 'opacity 0.5s ease';
        });
    }
    
    const gallBlock = document.querySelector('.gall_block_wr');

    if(gallBlock){
        lightGallery(gallBlock, {
            animateThumb: false,
            zoomFromOrigin: false,
            allowMediaOverlap: true,
            toggleThumb: false,
            selector: 'a',
            counter: false,
            download: false
        });
    }

    const upBtn = document.querySelector(".up_btn");
    const root = document.documentElement;
    const upBtnOffset = upBtn.offsetTop;

    if (upBtn) {
        upBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (!document.body.classList.contains("scrolling")) {
                document.body.classList.add("scrolling");
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => document.body.classList.remove("scrolling"), 700);
            }
        });

        window.addEventListener("scroll", function () {
            if (window.scrollY > upBtnOffset) {
                upBtn.classList.add("show");
            } else {
                upBtn.classList.remove("show");
            }
        });
    }

    const anchorLinks = document.querySelectorAll(".anchor_menu a, .anchor_btn");
    const html = document.documentElement;
    const menuBtn = document.querySelector('.burger');
    const menuWrapper = document.querySelector('.menu_burger');
    const openedMenu = 'opened';
    const overflowHidden = 'oveflowHidden';

    if(anchorLinks){
        anchorLinks.forEach(button => {
            button.addEventListener("click", function (e) {
                const targetId = this.getAttribute("href");

                if(!document.querySelector('.header_inner_page')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 15,
                            behavior: "smooth"
                        });
                    }
                }

                if (menuWrapper.classList.contains(openedMenu)){
                    menuWrapper.removeClass(openedMenu);
                    menuBtn.removeClass(openedMenu);
                    html.removeClass(overflowHidden);
                }
            });
        });
    }

    if (menuBtn && menuWrapper) {
        menuBtn.addEventListener('click', function () {
            menuWrapper.classList.toggle(openedMenu);
            menuBtn.classList.toggle(openedMenu);
            html.classList.toggle(overflowHidden);
        });

        document.addEventListener('click', function (e) {
            if (!menuBtn.contains(e.target) && !menuWrapper.contains(e.target)) {
                if (menuBtn.classList.contains(openedMenu)) {
                    menuWrapper.classList.remove(openedMenu);
                    menuBtn.classList.remove(openedMenu);
                    html.classList.remove(overflowHidden);
                }
            }
        });
    }

    const fileInput = document.getElementById("file_field");
    const fileLabel = document.querySelector('label[for="file_field"]');

    if (fileInput && fileLabel) {
        fileInput.addEventListener("change", function () {
            fileLabel.textContent = this.files.length ? this.files[0].name : "Прикрепить файл";
        });
    }

    const innerWrap = document.querySelector('.block_inner_page');

    if(innerWrap) {
        const blockRight = innerWrap.querySelector('.text_block .right');
        const blockLeft = innerWrap.querySelector('.text_block .left .body');
        const rightOffsetHeight = blockRight.offsetHeight;
        const leftOffsetHeight = blockLeft.offsetHeight;

        if(leftOffsetHeight > rightOffsetHeight + 100) {
            let btnRead = document.createElement('div');

            btnRead.textContent = 'Показать еще';
            btnRead.classList.add('btn_read_more');
            blockLeft.insertAdjacentElement('afterend', btnRead);
            blockLeft.style.height = `${rightOffsetHeight - 40}px`;
            blockLeft.classList.add('heightHide');

            btnRead.addEventListener('click', function(){
                if(blockLeft.classList.contains('heightHide')){
                    blockLeft.classList.remove('heightHide');
                    blockLeft.style.height = '100%';
                    btnRead.textContent = 'Скрыть';
                } else {
                    blockLeft.classList.add('heightHide');
                    blockLeft.style.height = `${rightOffsetHeight - 40}px`;
                    btnRead.textContent = 'Показать еще';
                }
            })
        }
    }
});
