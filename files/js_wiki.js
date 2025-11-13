const links = {};
        let lastScrollTop = 0;
        const header = document.getElementById('header');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });

        function showPage(pageId) {
            const pages = document.querySelectorAll('.page');
            const buttons = document.querySelectorAll('.nav-link');
            
            pages.forEach(page => page.classList.remove('active'));
            buttons.forEach(btn => btn.classList.remove('active'));
            
            document.getElementById(pageId).classList.add('active');
            
            buttons.forEach(btn => {
                if (btn.textContent.toLowerCase().includes(pageId) || 
                    (pageId === 'wiki' && btn.textContent === 'Wiki')) {
                    btn.classList.add('active');
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            const nav = document.getElementById('nav');
            if (window.innerWidth <= 768) {
                nav.classList.remove('open');
            }
        }

        function toggleMenu() {
            const nav = document.getElementById('nav');
            nav.classList.toggle('open');
        }

        function openLink(platform) {
            const linkInput = document.getElementById(platform + '-link');
            
            if (links[platform]) {
                window.open(links[platform], '_blank');
            } else {
                if (linkInput.style.display === 'none' || linkInput.style.display === '') {
                    linkInput.style.display = 'block';
                    linkInput.focus();
                    linkInput.onblur = function() {
                        if (this.value) {
                            links[platform] = this.value;
                            alert('Lien enregistré ! Cliquez à nouveau pour l\'ouvrir.');
                        }
                        setTimeout(() => {
                            this.style.display = 'none';
                        }, 100);
                    };
                    linkInput.onkeypress = function(e) {
                        if (e.key === 'Enter') {
                            if (this.value) {
                                links[platform] = this.value;
                                alert('Lien enregistré ! Cliquez à nouveau pour l\'ouvrir.');
                            }
                            this.style.display = 'none';
                        }
                    };
                }
            }
        }

        function openFooterLink(platform) {
            if (links[platform]) {
                window.open(links[platform], '_blank');
            } else {
                alert('Veuillez d\'abord configurer le lien Discord dans la page Liens.');
            }
        }

        window.addEventListener('resize', () => {
            const nav = document.getElementById('nav');
            if (window.innerWidth > 768) {
                nav.classList.remove('open');
            }
        });
		
		
		// IMAGES IN BIG
		const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeBtn = document.querySelector('.close-modal');

        function openModal(src) {
            modal.classList.add('active');
            modalImg.src = src;
        }

        function closeModal() {
            modal.classList.remove('active');
        }

        closeBtn.onclick = closeModal;

        modal.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        };

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });