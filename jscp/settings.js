const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settingsModal');
const closeModal = document.querySelector('.close');
const applySettingsButton = document.getElementById('applySettings');

pages = [];
let currentLang = 'id';

// Translation strings (Indonesian only)
const translations = {
    id: {
        loading: "Sabar ayangku my baby aline iloveyou...",
        waitingIsHappiness: "rispanganteng",
        settings: "⚙️ Pengaturan Website",
        music: "🎵 Pengaturan Suara",
        backgroundMusic: "Musik Latar:",
        countdown: "⏰ Pengaturan Waktu",
        countdownTime: "Waktu Hitung Mundur:",
        sec3: "3 detik",
        sec5: "5 detik",
        sec10: "10 detik",
        matrix: "🌧️ Efek Hujan Tulisan",
        matrixText: "Tulisan utama hujan:",
        colorTheme: "Pilih warna tema:",
        pinkTheme: "Pink Romantis (Pink)",
        blueTheme: "Biru Keren (Blue)",
        purpleTheme: "Ungu Fantasi (Purple)",
        customTheme: "Kustom",
        matrixColor1: "Warna hujan tulisan 1:",
        matrixColor2: "Warna hujan tulisan 2:",
        sequence: "✨ Pengaturan Tulisan Utama",
        sequenceText: "Konten Tulisan Utama:",
        noteSequence: "Catatan: Gunakan | untuk memisahkan kata, jangan buat satu baris terlalu panjang.",
        sequenceColor: "Warna tulisan utama:",
        gift: "🎁 Pengaturan Gambar GIF",
        giftImage: "Gambar GIF (Opsional):",
        noGif: "Tidak Ada",
        enableHeart: "Efek Foto Terbang Hati:",
        apply: "🎉 Terapkan Pengaturan"
    }
};

function t(key, variables = {}) {
    let text = translations.id[key] || key;

    Object.keys(variables).forEach(varKey => {
        text = text.replace(new RegExp(`\\{${varKey}\\}`, 'g'), variables[varKey]);
    });

    return text;
}

// Default presets
const musicOptions = [
    { value: './music/happybirthday.mp3', label: 'Happy Birthday (Aline Special)' },
    { value: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', label: 'Acoustic Romantic Instrumental (Online)' },
    { value: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav', label: 'Simple Birthday Chime (Online)' }
];

const gifOptions = [
    { value: '', label: 'None (Tanpa GIF)' },
    { value: './image/kicaumania.gif', label: 'Kicaumania GIF' },
    { value: 'https://media.giphy.com/media/z15gY5Z93S0p2/giphy.gif', label: 'Dancing Cats GIF' },
    { value: 'https://media.giphy.com/media/10g0MtbqP38I5a/giphy.gif', label: 'Birthday Cake GIF' }
];

const colorThemes = {
    pink: {
        matrixColor1: '#ff69b4',
        matrixColor2: '#ff1493',
        sequenceColor: '#ff69b4',
        name: 'Pink Theme'
    },
    blue: {
        matrixColor1: '#87ceeb',
        matrixColor2: '#4169e1',
        sequenceColor: '#1e90ff',
        name: 'Blue Theme'
    },
    purple: {
        matrixColor1: '#dda0dd',
        matrixColor2: '#9370db',
        sequenceColor: '#8a2be2',
        name: 'Purple Theme'
    },
    custom: {
        matrixColor1: '#ffb6c1',
        matrixColor2: '#ffc0cb',
        sequenceColor: '#d39b9b',
        name: 'Custom Theme'
    }
};

// Main settings storage
let settings = {
    music: './music/happybirthday.mp3',
    countdown: 3,
    matrixText: 'HAPPYBIRTHDAYALINE',
    matrixColor1: '#ff69b4',
    matrixColor2: '#ff1493',
    sequence: 'HAPPY|BIRTHDAY|TO|ALINE|❤',
    sequenceColor: '#ff69b4',
    gift: './image/kicaumania.gif',
    enableHeart: true,
    colorTheme: 'pink',
    polaroidImage: './image/IMG_0033.jpeg',
    specialMessage: 'Selamat Ulang Tahun, Aline Sayang! 💖 Kamu adalah hal terindah yang hadir dalam hidupku. Terima kasih telah membuat hari-hariku penuh warna. Aku mencintaimu selamanya... 🌸',
    storySlides: [
        {
            isCover: true,
            image: './image/IMG_0033.jpeg',
            title: 'Untuk Pacar Aku 💖',
            text: 'Selamat ulang tahun ayangggg yang baik, cantik, lucu, murah senyum, dewasa, lembut, sayang aku, semoga panjang umur, semoga hal-hal yang selama ini bikin kamu capek secepatnya diganti dengan hasil yang jauh lebaik baik di masa-masa yang akan datang ya, semoga langkah-langkah kamu selalu dipermudah oleh Allah SWT, semoga harapan-harapan kamu segera tercapai. Terimakasih kamu udah berjuang selama ini untuk diri kamu sendiri dan orang-orang tersayang kamu aku bangga banget sama kamu, kamu keren! Tetap selalu jadi orang baik yang aku kenal ya!❤️'
        },
        {
            image: './image/foto-berdua/rispan-1.jpg',
            rightImage: './image/foto-berdua/rispan-2.jpg'
        },
        {
            image: './image/foto-berdua/rispan-3.jpg',
            rightImage: './image/foto-berdua/rispan-4.jpg'
        },
        {
            image: './image/foto-berdua/rispan-5.jpg',
            rightImages: [
                './image/foto-berdua/rispan-6.jpg',
                './image/foto-berdua/rispan-7.jpg',
                './image/foto-berdua/rispan-1.jpg',
                './image/foto-berdua/rispan-2.jpg'
            ]
        }
    ],
    galleryImages: [
        './image/IMG_0033.jpeg',
        './image/IMG_0224.jpeg',
        './image/IMG_0372.jpeg',
        './image/04305450-6404-4073-a7dd-0a0073288eda.jpeg',
        './image/7672b927-7052-4ef8-85c0-d266e6714c2b.jpeg',
        './image/IMG_0874.jpeg',
        './image/IMG_0877.jpeg',
        './image/IMG_0957.jpeg',
        './image/IMG_2161.jpeg',
        './image/IMG_2164.jpeg',
        './image/IMG_2167.jpeg',
        './image/foto-berdua/rispan-1.jpg',
        './image/foto-berdua/rispan-2.jpg',
        './image/foto-berdua/rispan-3.jpg',
        './image/foto-berdua/rispan-4.jpg',
        './image/foto-berdua/rispan-5.jpg',
        './image/foto-berdua/rispan-6.jpg',
        './image/foto-berdua/rispan-7.jpg'
    ]
};

function initializeDefaultSettings() {
    const saved = localStorage.getItem('aline_birthday_settings');
    let useDefaults = true;
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // If the cached settings contain the new storySlides, use them, otherwise force reset
            if (parsed.polaroidImage && !parsed.polaroidImage.includes('aline_01.jpg') && parsed.storySlides) {
                // If it contains the old giphy URL, update it to the local kicaumania.gif
                if (parsed.gift && parsed.gift.includes('giphy.gif')) {
                    parsed.gift = './image/kicaumania.gif';
                }
                // Force update music path to corrected one
                if (parsed.music && (parsed.music.includes('happybirtday.mp3') || parsed.music.includes('happybirtday_uia.mp3'))) {
                    parsed.music = './music/happybirthday.mp3';
                }
                // Force update storySlides if they don't match the new design length, are the old defaults, or have titles on couple slides
                if (parsed.storySlides && (parsed.storySlides.length !== settings.storySlides.length || parsed.storySlides.length === 5 || parsed.storySlides[1]?.title)) {
                    parsed.storySlides = settings.storySlides;
                    parsed.galleryImages = settings.galleryImages;
                }
                settings = parsed;
                useDefaults = false;
            }
        } catch (e) {
            console.error("Error loading local settings:", e);
        }
    }

    if (useDefaults) {
        localStorage.setItem('aline_birthday_settings', JSON.stringify(settings));
    }

    window.settings = settings;

    // Update global variables in ui.js
    if (typeof photoUrls !== 'undefined') {
        photoUrls = settings.galleryImages || [];
    }

    // Update UI Elements with configured values on start
    const polaroidImg = document.getElementById('polaroidImage');
    if (polaroidImg && settings.polaroidImage) {
        polaroidImg.src = settings.polaroidImage;
    }
}

function resetWebsiteState() {
    const canvas = document.querySelector('.canvas');
    const matrixCanvas = document.getElementById('matrix-rain');
    const giftImageElement = document.getElementById('gift-image');
    const fireworkContainer = document.getElementById('fireworkContainer');
    const birthdayAudio = document.getElementById('birthdayAudio');
    const polaroidContainer = document.getElementById('polaroidContainer');
    const tapContinueBtn = document.getElementById('tapContinueBtn');
    const specialTextDisplay = document.getElementById('specialTextDisplay');
    const moon = document.querySelector('.moon');

    S.initialized = false;

    if (moon) {
        moon.classList.remove('show');
    }

    if (typeof hideStars === 'function') {
        hideStars();
    }

    if (polaroidContainer) {
        polaroidContainer.style.display = 'none';
        polaroidContainer.classList.remove('show');
    }
    if (tapContinueBtn) {
        tapContinueBtn.style.display = 'none';
    }
    if (specialTextDisplay) {
        specialTextDisplay.innerHTML = '';
    }
    if (giftImageElement) {
        giftImageElement.style.display = 'none';
        giftImageElement.style.animation = '';
    }
    if (fireworkContainer) {
        fireworkContainer.style.display = 'none';
        fireworkContainer.style.opacity = '0';
        fireworkContainer.innerHTML = '';
    }

    const photos = document.querySelectorAll('.photo');
    photos.forEach(photo => photo.remove());

    if (canvas) {
        canvas.style.display = 'block';
    }
    if (matrixCanvas) {
        matrixCanvas.style.display = 'block';
    }

    if (birthdayAudio && window.settings) {
        birthdayAudio.src = window.settings.music;
        if (isPlaying) {
            birthdayAudio.play().catch(e => console.log("Audio block: user interaction needed."));
        }
    }

    if (window.settings && typeof matrixChars !== 'undefined') {
        matrixChars = window.settings.matrixText.split('');
        if (matrixInterval) {
            clearInterval(matrixInterval);
            matrixInterval = null;
        }
        if (typeof initMatrixRain === 'function') {
            initMatrixRain();
        }
    }

    if (giftImageElement && window.settings) {
        giftImageElement.src = window.settings.gift || '';
    }

    if (typeof S !== 'undefined' && S.UI && window.settings) {
        S.UI.reset(true);
        const sequence = `|#countdown ${window.settings.countdown}|${window.settings.sequence}|#gift|`;
        S.UI.simulate(sequence);
    }
}

function applyLoadedSettings() {
    const birthdayAudio = document.getElementById('birthdayAudio');
    if (birthdayAudio && settings.music) {
        birthdayAudio.src = settings.music;
        // Attempt autoplay on load
        birthdayAudio.play().then(() => {
            const musicControl = document.getElementById('musicControl');
            if (musicControl) {
                musicControl.innerHTML = '⏸';
                musicControl.classList.add('playing');
                musicControl.title = 'Pause Music';
            }
            isPlaying = true;
        }).catch(error => {
            console.log("Autoplay blocked by browser. Awaiting user gesture.", error);
        });
    }

    const giftImageElement = document.getElementById('gift-image');
    if (giftImageElement && settings.gift) {
        giftImageElement.src = settings.gift;
    }

    const polaroidImg = document.getElementById('polaroidImage');
    if (polaroidImg && settings.polaroidImage) {
        polaroidImg.src = settings.polaroidImage;
    }

    matrixChars = settings.matrixText.split('');
    if (matrixInterval) {
        clearInterval(matrixInterval);
        matrixInterval = null;
    }
    initMatrixRain();

    if (typeof S !== 'undefined' && S.UI) {
        S.UI.reset(true);
        const sequence = `|#countdown ${settings.countdown}||${settings.sequence}|#gift|`;
        S.UI.simulate(sequence);
    }
}

if (settingsButton) {
    settingsButton.addEventListener('click', () => {
        if (settingsModal) {
            settingsModal.style.display = 'block';
            populateModal();
        }
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (settingsModal) settingsModal.style.display = 'none';
        stopMusicPreview();
    });
}

const musicPreviewAudio = new Audio();
let currentPreviewTrack = '';

function getSelectedMusicLabel() {
    const musicSelect = document.getElementById('backgroundMusic');
    if (!musicSelect) return '';
    return musicSelect.options[musicSelect.selectedIndex]?.textContent || '';
}

function getIdlePreviewMessage() {
    const label = getSelectedMusicLabel();
    return label ? `Terpilih: ${label}` : 'Pilih lagu lalu tes';
}

function setMusicPreviewState({ message, isPlaying }) {
    const musicPreviewButton = document.getElementById('musicPreviewButton');
    const musicPreviewStatus = document.getElementById('musicPreviewStatus');
    if (musicPreviewButton) {
        musicPreviewButton.textContent = isPlaying ? '⏸ Stop Preview' : '▶ Preview';
        if (isPlaying) {
            musicPreviewButton.classList.add('playing');
        } else {
            musicPreviewButton.classList.remove('playing');
        }
    }
    if (musicPreviewStatus && message) {
        musicPreviewStatus.textContent = message;
    }
}

function stopMusicPreview(customMessage) {
    musicPreviewAudio.pause();
    musicPreviewAudio.currentTime = 0;
    currentPreviewTrack = '';
    setMusicPreviewState({
        message: customMessage || getIdlePreviewMessage(),
        isPlaying: false
    });
}

function handleMusicPreview() {
    const musicSelect = document.getElementById('backgroundMusic');
    if (!musicSelect || !musicSelect.value) return;

    const selectedSrc = musicSelect.value;
    const selectedLabel = getSelectedMusicLabel();

    if (currentPreviewTrack === selectedSrc && !musicPreviewAudio.paused) {
        stopMusicPreview();
        return;
    }

    currentPreviewTrack = selectedSrc;
    musicPreviewAudio.pause();
    musicPreviewAudio.currentTime = 0;
    musicPreviewAudio.src = selectedSrc;

    musicPreviewAudio.play().then(() => {
        setMusicPreviewState({
            message: `Memutar: ${selectedLabel}`,
            isPlaying: true
        });
    }).catch(error => {
        console.error('Cannot play preview:', error);
        stopMusicPreview('Gagal memutar preview lagu.');
    });
}

function populateModal() {
    stopMusicPreview();

    const musicSelect = document.getElementById('backgroundMusic');
    musicSelect.innerHTML = musicOptions.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
    musicSelect.value = settings.music;
    musicSelect.onchange = stopMusicPreview;

    const musicPreviewButton = document.getElementById('musicPreviewButton');
    if (musicPreviewButton && !musicPreviewButton.dataset.listenerAttached) {
        musicPreviewButton.addEventListener('click', handleMusicPreview);
        musicPreviewButton.dataset.listenerAttached = 'true';
    }
    setMusicPreviewState({ message: getIdlePreviewMessage(), isPlaying: false });

    const countdownSelect = document.getElementById('countdownTime');
    countdownSelect.value = settings.countdown;

    const giftSelect = document.getElementById('giftImage');
    giftSelect.innerHTML = gifOptions.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
    giftSelect.value = settings.gift;

    const matrixTextInput = document.getElementById('matrixText');
    matrixTextInput.value = settings.matrixText;

    const matrixColor1Input = document.getElementById('matrixColor1');
    matrixColor1Input.value = settings.matrixColor1;

    const matrixColor2Input = document.getElementById('matrixColor2');
    matrixColor2Input.value = settings.matrixColor2;

    const sequenceInput = document.getElementById('sequenceText');
    sequenceInput.value = settings.sequence;

    const sequenceColorInput = document.getElementById('sequenceColor');
    sequenceColorInput.value = settings.sequenceColor;

    // Theme selector click triggers
    const colorButtons = document.querySelectorAll('.color-theme-btn');
    colorButtons.forEach(btn => {
        btn.onclick = function () {
            const theme = this.getAttribute('data-theme');
            handleColorThemeChange(theme);
        };
    });

    handleColorThemeChange(settings.colorTheme || 'pink');

    // Polaroid and Heart configs
    const polaroidImagePath = document.getElementById('polaroidImagePath');
    if (polaroidImagePath) polaroidImagePath.value = settings.polaroidImage || '';

    const specialMessageText = document.getElementById('specialMessageText');
    if (specialMessageText) specialMessageText.value = settings.specialMessage || '';

    const enableHeartSelect = document.getElementById('enableHeart');
    if (enableHeartSelect) enableHeartSelect.value = settings.enableHeart.toString();

    const galleryImagesText = document.getElementById('galleryImagesText');
    if (galleryImagesText) galleryImagesText.value = (settings.galleryImages || []).join(', ');
}

function handleColorThemeChange(selectedTheme) {
    const matrixColor1Input = document.getElementById('matrixColor1');
    const matrixColor2Input = document.getElementById('matrixColor2');
    const sequenceColorInput = document.getElementById('sequenceColor');
    const customColorSection = document.getElementById('customColorSection');

    settings.colorTheme = selectedTheme;

    const allButtons = document.querySelectorAll('.color-theme-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));

    const activeButton = document.querySelector(`[data-theme="${selectedTheme}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    if (selectedTheme === 'custom') {
        if (customColorSection) customColorSection.style.display = 'flex';
    } else {
        if (customColorSection) customColorSection.style.display = 'none';

        const theme = colorThemes[selectedTheme];
        if (theme && matrixColor1Input && matrixColor2Input && sequenceColorInput) {
            matrixColor1Input.value = theme.matrixColor1;
            matrixColor2Input.value = theme.matrixColor2;
            sequenceColorInput.value = theme.sequenceColor;

            settings.matrixColor1 = theme.matrixColor1;
            settings.matrixColor2 = theme.matrixColor2;
            settings.sequenceColor = theme.sequenceColor;
        }
    }
}

function saveFormDataToSettings() {
    try {
        settings.music = document.getElementById('backgroundMusic').value;
        settings.countdown = parseInt(document.getElementById('countdownTime').value) || 3;
        settings.gift = document.getElementById('giftImage').value;
        settings.matrixText = document.getElementById('matrixText').value || 'HAPPYBIRTHDAYALINE';
        settings.matrixColor1 = document.getElementById('matrixColor1').value;
        settings.matrixColor2 = document.getElementById('matrixColor2').value;
        settings.sequence = document.getElementById('sequenceText').value || 'HAPPY|BIRTHDAY|TO|ALINE|❤';
        settings.sequenceColor = document.getElementById('sequenceColor').value;

        const activeTheme = document.querySelector('.color-theme-btn.active');
        if (activeTheme) {
            settings.colorTheme = activeTheme.getAttribute('data-theme');
        }

        const polaroidImagePath = document.getElementById('polaroidImagePath');
        if (polaroidImagePath) settings.polaroidImage = polaroidImagePath.value;

        const specialMessageText = document.getElementById('specialMessageText');
        if (specialMessageText) settings.specialMessage = specialMessageText.value;

        const enableHeartSelect = document.getElementById('enableHeart');
        if (enableHeartSelect) settings.enableHeart = enableHeartSelect.value === 'true';

        const galleryImagesText = document.getElementById('galleryImagesText');
        if (galleryImagesText) {
            settings.galleryImages = galleryImagesText.value
                .split(',')
                .map(s => s.trim())
                .filter(s => s.length > 0);
        }
    } catch (e) {
        console.error("Error backing up form data:", e);
    }
}

if (applySettingsButton) {
    applySettingsButton.addEventListener('click', () => {
        saveFormDataToSettings();

        localStorage.setItem('aline_birthday_settings', JSON.stringify(settings));
        window.settings = settings;

        resetWebsiteState();
        stopMusicPreview();
        if (settingsModal) settingsModal.style.display = 'none';
    });
}

// Fullscreen android support hooks
const fullscreenBtn = document.getElementById('fullscreenBtn');
if (fullscreenBtn) {
    const isAndroid = () => /android/i.test(navigator.userAgent);

    const showFullscreenBtn = () => {
        if (isAndroid() && !document.fullscreenElement) {
            fullscreenBtn.style.display = 'block';
            clearTimeout(fullscreenBtn.hideTimeout);
            fullscreenBtn.hideTimeout = setTimeout(() => {
                fullscreenBtn.style.display = 'none';
            }, 2500);
        } else {
            fullscreenBtn.style.display = 'none';
        }
    };

    showFullscreenBtn();
    document.addEventListener('fullscreenchange', showFullscreenBtn);

    fullscreenBtn.onclick = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                elem.requestFullscreen();
            }
        }
        fullscreenBtn.style.display = 'none';
    };
}

function createLoadingUI() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loadingOverlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h2>${t('loading')}</h2>
            <p>${t('waitingIsHappiness')}</p>
        </div>
    `;

    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        #loadingOverlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: black;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99999;
        }
        .loading-content { text-align: center; color: white; }
        .loading-spinner {
            width: 35px; height: 35px;
            border: 4px solid rgba(255, 105, 180, 0.2);
            border-top: 4px solid #ff6b9d;
            border-radius: 50%;
            animation: loading-spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        .loading-content h2 { font-size: 24px; font-family: 'Dancing Script', cursive; margin-bottom: 8px; }
        .loading-content p { font-size: 14px; opacity: 0.7; font-style: italic; }
        @keyframes loading-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loadingStyles);
    document.body.appendChild(loadingOverlay);
}

function removeLoadingUI() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.transition = 'opacity 0.4s ease';
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 400);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createLoadingUI();
    initializeDefaultSettings();
    applyLoadedSettings();

    setTimeout(() => {
        removeLoadingUI();
        if (window.innerWidth > window.innerHeight) {
            startWebsite();
        } else {
            // Wait for landscape mode rotation on mobile
            window.addEventListener('resize', function checkRot() {
                if (window.innerWidth > window.innerHeight) {
                    startWebsite();
                    window.removeEventListener('resize', checkRot);
                }
            });
        }
    }, 1500);
});
