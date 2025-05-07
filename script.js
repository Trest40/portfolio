// Дожидаемся полной загрузки DOM (без изменений)
document.addEventListener('DOMContentLoaded', () => {

    // --- Плавная прокрутка к секциям (без изменений) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // history.pushState(null, null, targetId); // Раскомментируйте, если нужно
            }
        });
    });


    // --- Анимации при прокрутке (без изменений) ---
    // Выбираем элементы, которые будут анимированы при появлении
    const elementsToAnimate = document.querySelectorAll(
        '.animate__fade-in, .animate__slide-up, .animate__btn, .project-item, .skills-block, .learning-block, .goal-item'
    );

    // Создаем IntersectionObserver (без изменений)
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Начинаем наблюдение за всеми выбранными элементами (без изменений)
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Опционально: Запустить анимацию для элементов, которые уже в видимой области при загрузке (без изменений)
     setTimeout(() => {
         elementsToAnimate.forEach(element => {
             if (isElementInViewport(element)) {
                  element.classList.add('animate__visible');
                  observer.unobserve(element);
             }
         });
     }, 100);

     // Вспомогательная функция для проверки видимости в окне просмотра (без изменений)
     function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
     }

});