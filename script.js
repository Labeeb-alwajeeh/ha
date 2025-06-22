document.addEventListener('DOMContentLoaded', () => {
    // 1. معالجة نموذج التبرع وإرسال رسالة واتساب
    const donationForm = document.getElementById('donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const amount = document.getElementById('amount').value;
            const whatsappLink = `https://wa.me/+967775142301?text=مرحباً، أود التبرع بمبلغ ${amount} ريال يمني. اسمي هو ${name}.`;
            window.open(whatsappLink, '_blank');
            alert(`شكراً لك، ${name}! سيتم توجيهك إلى واتساب لإتمام التبرع بمبلغ ${amount} ريال يمني.`);
            this.reset(); // إعادة تعيين النموذج بعد الإرسال
        });
    }

    // 2. تفعيل التمرير السلس للروابط الداخلية (smooth scrolling)
    // ملاحظة: هذا يعمل للروابط التي تبدأ بـ '#' (مثل التنقل داخل صفحة واحدة)
    // ولكن الروابط في هذا المشروع تؤدي إلى صفحات مختلفة، لذا لن يكون لها تأثير مباشر هنا.
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 3. تأثير "Fade-in" للعناصر عند التمرير (Intersection Observer)
    const fadeInElements = document.querySelectorAll('.intro, .call-to-action, .gallery, .donation, .donation-info');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });

    // 4. عرض الوقت الحالي في تذييل الصفحة (مثال بسيط)
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentTime = new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' });
        // يمكن دمجها بشكل أفضل مع النص الموجود
        footer.innerHTML += ` | آخر تحديث: ${currentTime}`;
    }

    // 5. التحقق من عرض النوافذ المنبثقة إذا كانت الصفحة غير نشطة (تنبيه المستخدم للعودة)
    // تم تعطيله لتجنب الإزعاج، يمكن تفعيله عند الحاجة.
    let inactivityTime = function () {
        let time;
        window.onload = resetTimer;
        document.onmousemove = resetTimer;
        document.onkeypress = resetTimer;
        // على الأجهزة التي تعمل باللمس، قد تحتاج لإضافة المزيد من الأحداث
        document.ontouchstart = resetTimer;
        document.onclick = resetTimer;

        function logout() {
            // يمكن استبدال التنبيه هنا برسالة منبثقة أجمل أو إعادة توجيه
            // console.log("هل ما زلت هنا؟ نرحب بعودتك!");
            // alert("هل ما زلت هنا؟ نرحب بعودتك!");
        }

        function resetTimer() {
            clearTimeout(time);
            time = setTimeout(logout, 300000); // 5 دقائق (300000 ميلي ثانية)
        }
    };
    // inactivityTime(); // تم تعطيله لتجنب الإزعاج، يمكن تفعيله عند الحاجة

    // 6. تغيير حجم الخط بناءً على تفضيل المستخدم (يتطلب إضافة أزرار في HTML)
    // لتطبيق هذه الميزة، ستحتاج إلى إضافة أزرار في HTML (مثلاً: <button onclick="changeFontSize('increase')">تكبير الخط</button>)
    let fontSize = 16; // حجم الخط الافتراضي
    function changeFontSize(direction) {
        if (direction === 'increase') {
            fontSize = Math.min(fontSize + 1, 24); // حد أقصى للخط
        } else if (direction === 'decrease') {
            fontSize = Math.max(fontSize - 1, 12); // حد أدنى للخط
        }
        document.body.style.fontSize = `${fontSize}px`;
        localStorage.setItem('userFontSize', fontSize);
    }
    // عند تحميل الصفحة، استعادة حجم الخط المحفوظ
    const savedFontSize = localStorage.getItem('userFontSize');
    if (savedFontSize) {
        fontSize = parseInt(savedFontSize);
        document.body.style.fontSize = `${fontSize}px`;
    }
    // لجعل الدالة متاحة عالمياً (إذا كنت ستستدعيها من HTML مباشرة)
    window.changeFontSize = changeFontSize;


    // 7. تأثير "Parallax Scrolling" بسيط (لصورة الخلفية في المستقبل)
    // يتطلب إضافة صورة خلفية إلى عنصر معين وتعديل CSS.
    // مثال: <div class="parallax-background"></div> في HTML
    // window.addEventListener('scroll', () => {
    //     const parallaxElement = document.querySelector('.parallax-background');
    //     if (parallaxElement) {
    //         let scrollPosition = window.pageYOffset;
    //         // تحريك العنصر بنصف سرعة التمرير لإعطاء تأثير التزيح
    //         parallaxElement.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    //     }
    // });

    // 8. إضافة عداد لعدد التبرعات (يتطلب تخزين البيانات في مكان ما، حالياً وهمي)
    // هذا الجزء هو مثال توضيحي ويحتاج إلى نظام خلفي لتخزين التبرعات الحقيقية.
    // لنقوم بإنشاء عنصر لعرض هذا العداد وإضافته ديناميكيًا.
    const donationCountElement = document.createElement('p');
    // يمكن تخزين هذا في localStorage لأغراض العرض التوضيحي، ولكنه ليس آمناً للبيانات الحقيقية
    let donationCounter = localStorage.getItem('totalDonations') ? parseInt(localStorage.getItem('totalDonations')) : 0;
    // زيادة وهمية للعداد عند تحميل الصفحة لأغراض التجربة
    // donationCounter++;
    // localStorage.setItem('totalDonations', donationCounter);

    donationCountElement.innerHTML = `تم جمع ${donationCounter} تبرع حتى الآن (عدد تقديري)`;
    // يمكن إضافة هذا العنصر إلى قسم التبرعات أو في أي مكان مناسب، مثلاً:
    // const donationSection = document.querySelector('.donation');
    // if (donationSection) {
    //     donationSection.insertBefore(donationCountElement, donationSection.querySelector('form'));
    // }

    // 9. التحقق من اتصال المستخدم بالإنترنت
    function checkOnlineStatus() {
        if (navigator.onLine) {
            console.log('المستخدم متصل بالإنترنت.');
            // يمكن تحديث واجهة المستخدم هنا لإظهار حالة الاتصال (مثل إزالة رسالة تحذير)
            // Example: document.getElementById('offline-warning').style.display = 'none';
        } else {
            console.warn('أنت غير متصل بالإنترنت. قد لا تعمل بعض الميزات بشكل صحيح.');
            alert('أنت غير متصل بالإنترنت. قد لا تعمل بعض الميزات بشكل صحيح.');
            // Example: document.getElementById('offline-warning').style.display = 'block';
        }
    }
    window.addEventListener('online', checkOnlineStatus);
    window.addEventListener('offline', checkOnlineStatus);
    checkOnlineStatus(); // تحقق عند تحميل الصفحة

    // 10. تفعيل وضع "الليل/النهار" (Dark/Light Mode)
    const toggleDarkModeButton = document.createElement('button');
    toggleDarkModeButton.textContent = 'تبديل الوضع الليلي';
    toggleDarkModeButton.style.position = 'fixed';
    toggleDarkModeButton.style.bottom = '20px';
    toggleDarkModeButton.style.left = '20px';
    toggleDarkModeButton.style.padding = '10px';
    toggleDarkModeButton.style.borderRadius = '5px';
    toggleDarkModeButton.style.background = '#333';
    toggleDarkModeButton.style.color = '#fff';
    toggleDarkModeButton.style.border = 'none';
    toggleDarkModeButton.style.cursor = 'pointer';
    toggleDarkModeButton.style.zIndex = '1001'; // للتأكد من ظهوره فوق العناصر الأخرى
    document.body.appendChild(toggleDarkModeButton);

    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode); // حفظ التفضيل
    });

    // استعادة وضع الليل/النهار من LocalStorage عند تحميل الصفحة
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // 11. تأثير تكبير الصور في معرض الصور عند النقر (LightBox بسيط)
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.style.cursor = 'pointer'; // تغيير المؤشر للإشارة إلى أنه قابل للنقر
        img.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = 1000; // تأكد من أنه فوق كل شيء

            const enlargedImg = document.createElement('img');
            enlargedImg.src = img.src;
            enlargedImg.alt = img.alt; // إضافة النص البديل
            enlargedImg.style.maxWidth = '90%';
            enlargedImg.style.maxHeight = '90%';
            enlargedImg.style.objectFit = 'contain';
            enlargedImg.style.borderRadius = '10px';
            enlargedImg.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)'; // ظل للصورة المكبرة

            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);

            // إزالة الطبقة عند النقر عليها
            overlay.addEventListener('click', () => {
                document.body.removeChild(overlay);
            });
            // السماح بالإغلاق باستخدام مفتاح Esc
            document.addEventListener('keydown', function handler(e) {
                if (e.key === 'Escape') {
                    document.body.removeChild(overlay);
                    document.removeEventListener('keydown', handler); // إزالة المستمع بعد الاستخدام
                }
            });
        });
    });

    // 12. إضافة زر "العودة للأعلى" (Back to Top)
    const backToTopButton = document.createElement('button');
    backToTopButton.textContent = '⬆️';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.padding = '10px 15px';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.background = '#007bff';
    backToTopButton.style.color = '#fff';
    backToTopButton.style.border = 'none';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.zIndex = 999;
    backToTopButton.style.display = 'none'; // مخفي في البداية
    backToTopButton.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)'; // ظل للزر
    backToTopButton.style.transition = 'background-color 0.3s, transform 0.2s';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) { // أظهر الزر بعد التمرير 200 بكسل
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // تمرير سلس للأعلى
    });

    // 13. حماية المحتوى من النسخ (يمكن تجاوزها ولكنها تردع المستخدمين العاديين)
    // تحذير: هذه الميزة قد تؤثر سلبًا على تجربة المستخدم ولا توفر حماية كاملة.
    document.addEventListener('contextmenu', event => event.preventDefault()); // منع القائمة اليمنى
    document.addEventListener('copy', event => {
        event.clipboardData.setData('text/plain', 'لا يُسمح بنسخ المحتوى من هذا الموقع.');
        event.preventDefault(); // منع النسخ الافتراضي
    });
    // منع تحديد النص (اختياري، قد يكون مزعجاً)
    // document.addEventListener('selectstart', event => event.preventDefault());


    // 14. عرض رسالة ترحيبية بناءً على الوقت من اليوم
    // يمكن إضافة هذه الرسالة إلى مكان معين في HTML، مثلاً في الرأس
    const greetingElement = document.createElement('p');
    const hour = new Date().getHours();
    let greetingMessage;
    if (hour < 12) {
        greetingMessage = 'صباح الخير!';
    } else if (hour < 18) {
        greetingMessage = 'مساء الخير!';
    } else {
        greetingMessage = 'مساء الخير!';
    }
    // قم بإضافة هذه الرسالة إلى عنصر موجود، مثلاً في الـ header بعد الـ h1
    // const header = document.querySelector('header');
    // if (header) {
    //     greetingElement.textContent = greetingMessage;
    //     greetingElement.style.color = '#fff';
    //     greetingElement.style.fontSize = '1.2rem';
    //     header.appendChild(greetingElement);
    // }


    // 15. التحقق من دعم المتصفح لميزة معينة (مثال: Intersection Observer)
    if ('IntersectionObserver' in window) {
        console.log('المتصفح يدعم Intersection Observer. سيتم تفعيل تأثيرات التحميل السلس.');
    } else {
        console.warn('المتصفح لا يدعم Intersection Observer، قد لا تعمل بعض ميزات التحميل المرئي بشكل صحيح.');
        // يمكن توفير حل بديل للمتصفحات القديمة هنا
    }

    // 16. تأثير "typewriter" على عنوان (مثال بسيط)
    // هذا التأثير سيقوم بإعادة كتابة العنوان حرفاً حرفاً.
    const pageTitle = document.querySelector('header h1');
    if (pageTitle) {
        const originalText = pageTitle.textContent;
        pageTitle.textContent = ''; // مسح النص الأصلي
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                pageTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // سرعة الكتابة بالملي ثانية
            }
        }
        // يمكن تفعيل هذا التأثير عند تحميل الصفحة
        // typeWriter();
    }

    // 17. رسالة تأكيد عند محاولة مغادرة الصفحة
    // ملاحظة: معظم المتصفحات الحديثة تمنع تخصيص الرسالة لأسباب أمنية وتكتفي بعرض رسالة عامة.
    window.addEventListener('beforeunload', (event) => {
        // يمكنك إضافة منطق للتحقق مما إذا كان هناك نموذج لم يتم إرساله أو تغييرات غير محفوظة
        // if (unsavedChangesExist) {
        // event.returnValue = 'هل أنت متأكد من مغادرة هذه الصفحة؟ قد تفقد التغييرات غير المحفوظة.';
        // }
    });

    // 18. إضافة عداد لزوار الصفحة (يتطلب تخزين البيانات، حالياً وهمي)
    // هذا مجرد مثال بسيط يعتمد على LocalStorage، ولا يعكس الزيارات الفريدة بدقة.
    let visitorCount = localStorage.getItem('visitorCount') ? parseInt(localStorage.getItem('visitorCount')) : 0;
    // زيادة العداد فقط إذا لم يقم المستخدم بزيارة الصفحة مؤخرًا (مثلاً خلال ساعة)
    const lastVisitTime = localStorage.getItem('lastVisitTime');
    const currentTime = new Date().getTime();
    const oneHour = 60 * 60 * 1000; // ساعة بالملي ثانية

    if (!lastVisitTime || (currentTime - parseInt(lastVisitTime) > oneHour)) {
        visitorCount++;
        localStorage.setItem('visitorCount', visitorCount);
        localStorage.setItem('lastVisitTime', currentTime.toString());
    }

    const visitorCountElement = document.createElement('p');
    // visitorCountElement.textContent = `عدد الزوار: ${visitorCount}`;
    // يمكن إضافة هذا العنصر إلى تذييل الصفحة
    // const footerElement = document.querySelector('footer');
    // if (footerElement) {
    //     footerElement.appendChild(visitorCountElement);
    // }

    // 19. تفعيل ميزة البحث السريع على الصفحة (للعناصر المخفية/الظاهرة)
    // يتطلب إضافة حقل إدخال للبحث في HTML، مثلاً: <input type="text" id="search-input" placeholder="ابحث...">
    // const searchInput = document.getElementById('search-input');
    // if (searchInput) {
    //     searchInput.addEventListener('keyup', (e) => {
    //         const searchTerm = e.target.value.toLowerCase();
    //         // تحديد العناصر التي تريد البحث بداخلها
    //         document.querySelectorAll('main section p, main section h2, main section ul li, main section .gallery-item').forEach(element => {
    //             const text = element.textContent.toLowerCase();
    //             if (text.includes(searchTerm)) {
    //                 element.style.display = ''; // إظهار العنصر
    //                 // إذا كان العنصر جزءًا من grid/flex، قد تحتاج لتعيين display: 'block' أو 'flex'
    //                 if (element.classList.contains('gallery-item')) {
    //                     element.style.display = 'block'; // أو 'inline-block', 'flex' حسب التخطيط الأصلي
    //                 }
    //             } else {
    //                 element.style.display = 'none'; // إخفاء العنصر
    //             }
    //         });
    //     });
    // }

    // 20. إضافة تأثير تحريك العناصر عند تحميل الصفحة (CSS animations مع JS)
    // يتطلب تعريف keyframes في CSS لهذا التأثير (مثلاً: .page-loaded .intro { animation: slideIn 1s forwards; })
    // بمجرد إضافة الكلاس 'page-loaded' إلى الـ body، سيتم تشغيل التحريكات المعرفة في CSS.
    document.body.classList.add('page-loaded'); // إضافة كلاس لتشغيل التحريكات
});
