// ================= NAVBAR ACTIVE SCROLL =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 60;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ================= FORM KONTAK =================
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const subjek = document.getElementById("subjek").value;
  const pesan = document.getElementById("pesan").value;

  const confirmBox = document.createElement("div");
  confirmBox.className = "confirm-box";
  confirmBox.innerHTML = `
    <h3>Terima kasih, ${nama}! 🎉</h3>
    <p>Pesanmu sudah terkirim dengan detail berikut:</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subjek:</strong> ${subjek}</p>
    <p><strong>Pesan:</strong> ${pesan}</p>
  `;

  const oldConfirm = document.querySelector(".confirm-box");
  if (oldConfirm) oldConfirm.remove();

  form.parentElement.appendChild(confirmBox);
  form.reset();
});

// ================= DARK MODE =================
const darkToggle = document.createElement("button");
darkToggle.className = "dark-toggle";
darkToggle.textContent = "🌙";
document.querySelector(".nav-container").appendChild(darkToggle);

// cek preferensi
let theme = localStorage.getItem("theme");
if (theme === "dark") {
  document.body.classList.add("dark-mode");
  darkToggle.textContent = "☀️";
}

// klik toggle
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    darkToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    darkToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// ================= SMOOTH SCROLL =================
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    window.scrollTo({
      top: targetSection.offsetTop - 50,
      behavior: "smooth",
    });
  });
});

// ================= SCROLL TO TOP =================
const scrollBtn = document.createElement("button");
scrollBtn.textContent = "⬆️";
scrollBtn.className = "btn-top";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ================= GALERI INTERAKTIF =================
const galeriItems = document.querySelectorAll(".galeri-item img");

galeriItems.forEach((img) => {
  img.addEventListener("click", () => {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <img src="${img.src}" alt="${img.alt}" />
        <p>${img.alt}</p>
      </div>
    `;
    document.body.appendChild(modal);

    // Tutup modal
    modal.querySelector(".modal-close").addEventListener("click", () => {
      modal.remove();
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });
  });
});

// ================= POSTINGAN FANS INTERAKTIF =================
const postinganCards = document.querySelectorAll(".postingan-card");
postinganCards.forEach((card) => {
  card.addEventListener("click", () => {
    const popup = document.createElement("div");
    popup.className = "popup-msg";
    popup.textContent = `Kamu memilih: ${card.querySelector("h3").textContent}`;
    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 2000);
  });
});

// ================= EVENT COUNTDOWN =================
const eventDate = new Date("September 26, 2025 19:00:00").getTime();
const countdownEl = document.createElement("p");
countdownEl.className = "countdown";
document.querySelector("#event").appendChild(countdownEl);

setInterval(() => {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.textContent = `⏳ Countdown konser VR: ${days}h ${hours}j ${minutes}m ${seconds}d`;
  } else {
    countdownEl.textContent = "🎉 Event sudah dimulai!";
  }
}, 1000);

// ================= HAMBURGER MENU =================
const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// ================= FETCH API =================
// Weather API Configuration
const WEATHER_API_KEY = "cdbc05a15da2c5a772617910a83a33bc";

// Mapping cuaca Indonesia ke lagu NCT Dream
const WEATHER_RECOMMENDATIONS = {
  // Cuaca cerah - panas Indonesia
  Clear: {
    song: "Hot Sauce",
    reason: "Panas terik? Dinginkan dengan energi ledakan rasa dari lagu ini! Cocok untuk cuaca cerah yang terik.",
    spotifyLink: "https://open.spotify.com/track/6B8MM3PVQtUbZLay7tP7er",
    icon: "🌞",
    mood: "Berenergi dan Menyegarkan",
  },

  // Hujan - musim hujan Indonesia
  Rain: {
    song: "Rainbow",
    reason: "Hujan turun? Nikmati ketenangan dengan lagu yang selembut rintikan hujan di Indonesia.",
    spotifyLink: "https://open.spotify.com/track/2TyDgN8q5NgOuiR8yYyBYj",
    icon: "🌧️",
    mood: "Tenang dan Reflektif",
  },

  // Berawan - cuaca mendung
  Clouds: {
    song: "My Youth",
    reason: "Cuaca mendung cocok untuk nostalgia. Lagu ini menghangatkan seperti secangkir teh di sore hari.",
    spotifyLink: "https://open.spotify.com/track/3vG5ilGpaYA2MhVtyTORF1",
    icon: "☁️",
    mood: "Nostalgia dan Hangat",
  },

  // Badai petir - hujan lebat
  Thunderstorm: {
    song: "ISTJ",
    reason: "Badai datang? Hadapi dengan energi kuat lagu terbaru NCT Dream!",
    spotifyLink: "https://open.spotify.com/track/6j268AN4RJXNyFNeFUfB50",
    icon: "⛈️",
    mood: "Kuat dan Percaya Diri",
  },

  // Kabut - pagi hari
  Mist: {
    song: "Hello Future",
    reason: "Berkabut di pagi hari? Lagu penuh harapan ini akan cerahkan harimu!",
    spotifyLink: "https://open.spotify.com/track/6b3CWHNAKiJRqmgz6ZcWaB",
    icon: "🌫️",
    mood: "Optimis dan Bersemangat",
  },

  // Default untuk cuaca Indonesia lainnya
  default: {
    song: "Candy",
    reason: "Apapun cuacanya, NCT Dream selalu manis seperti permen! Cocok untuk segala kondisi di Indonesia.",
    spotifyLink: "https://open.spotify.com/track/6kZ39Xq0oGd6S48Kv9fT7E",
    icon: "🌈",
    mood: "Manis dan Ceria",
  },
};

// Get user's current location
function getCurrentLocation() {
  const container = document.getElementById("weatherContainer");

  container.innerHTML = `
        <div class="weather-loading">
            <div class="weather-spinner"></div>
            <p>Mendeteksi lokasi dan mengecek cuaca...</p>
        </div>
    `;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.log("Geolocation error:", error);
        // Fallback to major Indonesian city (Jakarta)
        fetchWeatherData(-6.2088, 106.8456);
      }
    );
  } else {
    // Fallback to Jakarta if geolocation not supported
    fetchWeatherData(-6.2088, 106.8456);
  }
}

// Fetch weather data based on coordinates
async function fetchWeatherData(lat, lon) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=id`);

    if (!response.ok) throw new Error("Weather API failed");

    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    console.log("Weather API error:", error);
    displayWeatherError();
  }
}

// Display weather data and recommendation
function displayWeatherData(weatherData) {
  const container = document.getElementById("weatherContainer");
  const weatherType = weatherData.weather[0].main;
  const recommendation = WEATHER_RECOMMENDATIONS[weatherType] || WEATHER_RECOMMENDATIONS["default"];

  // Get city name or use generic Indonesia location
  const cityName = weatherData.name || "Lokasimu";

  const weatherHTML = `
        <div class="weather-card">
            <div class="weather-info">
                <span class="weather-icon ${weatherType.toLowerCase()}">${recommendation.icon}</span>
                <div class="weather-temp">${Math.round(weatherData.main.temp)}°C</div>
                <div class="weather-location">📍 ${cityName}, Indonesia</div>
                <div class="weather-condition">${getIndonesianWeatherDescription(weatherData.weather[0].description)}</div>
                <div class="weather-mood">Mood: ${recommendation.mood}</div>
            </div>
            
            <div class="recommendation-card">
                <h3 class="recommendation-title">🎵 REKOMENDASI LAGU UNTUKMU</h3>
                <div class="recommendation-song">"${recommendation.song}"</div>
                <p class="recommendation-reason">${recommendation.reason}</p>
                <a href="${recommendation.spotifyLink}" target="_blank" class="recommendation-link">
                    🎧 Putar di Spotify
                </a>
            </div>
        </div>
    `;

  container.innerHTML = weatherHTML;
}

// Display error state
function displayWeatherError() {
  const container = document.getElementById("weatherContainer");

  const errorHTML = `
        <div class="weather-error">
            <div class="error-icon">⚠️</div>
            <h3>Gagal Memuat Data Cuaca</h3>
            <p>Maaf, tidak dapat mengakses data cuaca saat ini. Tapi jangan khawatir, kami punya rekomendasi spesial!</p>
            
            <div class="recommendation-card" style="margin-top: 20px;">
                <h3 class="recommendation-title">🎵 REKOMENDASI KHUSUS INDONESIA</h3>
                <div class="recommendation-song">"Rainbow"</div>
                <p class="recommendation-reason">Lagu yang cocok untuk segala cuaca di Indonesia! Tenang dan menenangkan.</p>
                <a href="https://open.spotify.com/track/2TyDgN8q5NgOuiR8yYyBYj" target="_blank" class="recommendation-link">
                    🎧 Putar di Spotify
                </a>
            </div>
            
            <button class="retry-button" onclick="getCurrentLocation()">🔄 Coba Lagi</button>
        </div>
    `;

  container.innerHTML = errorHTML;
}

// Helper function untuk deskripsi cuaca dalam Bahasa Indonesia
function getIndonesianWeatherDescription(desc) {
  const descriptions = {
    "clear sky": "Cerah",
    "few clouds": "Sedikit Berawan",
    "scattered clouds": "Berawan",
    "broken clouds": "Berawan Tebal",
    "overcast clouds": "Mendung",
    rain: "Hujan",
    "light rain": "Hujan Ringan",
    "moderate rain": "Hujan Sedang",
    "heavy rain": "Hujan Lebat",
    thunderstorm: "Badai Petir",
    mist: "Berkabut",
    fog: "Berkabut",
    haze: "Berkabut",
    smoke: "Berkabut Asap",
  };

  return descriptions[desc] || desc;
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  getCurrentLocation();
});
