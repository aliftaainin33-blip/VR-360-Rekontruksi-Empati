const videos = {
  verbal: "assets/video-verbal.mp4",
  physical: "",   // Tambahkan video-physical.mp4 jika sudah dibuat
  sosial: "assets/video-relasional-cyber.mp4",
  cyber: "assets/video-relasional-cyber.mp4"
};

const scenarios = {
  verbal: {
    title: "Bullying Verbal",
    intro: "Ejekan dan kata-kata menyakitkan dari sudut pandang korban.",
    question: "Bagaimana perasaanmu ketika diejek seperti itu?"
  },
  physical: {
    title: "Bullying Physical",
    intro: "Situasi intimidasi dari sudut pandang korban.",
    question: "Apa yang kamu rasakan ketika berada dalam situasi tersebut?"
  },
  sosial: {
    title: "Bullying Sosial",
    intro: "Pengucilan dan tindakan tidak mengajak dari sudut pandang korban.",
    question: "Bagaimana rasanya ketika sengaja tidak diajak?"
  },
  cyber: {
    title: "Cyberbullying",
    intro: "Komentar dan perlakuan negatif di dunia digital.",
    question: "Apa yang kamu rasakan ketika membaca komentar tersebut?"
  }
};

let currentScenario = "verbal";

function showSection(id) {
  const sections = ["beranda","skenario","simulasi","refleksi","tanya","uji","hasil","langkah","tentang"];
  sections.forEach(name => {
    const el = document.getElementById(name);
    if (el) el.classList.toggle("hidden", name !== id);
  });
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({behavior:"smooth", block:"start"});
}

function openScenario(type) {
  currentScenario = type;
  const d = scenarios[type];

  document.getElementById("scenarioTitle").textContent = d.title;
  document.getElementById("videoLabel").textContent = d.title;
  document.getElementById("scenarioIntro").textContent = d.intro;

  const video = document.getElementById("vrVideo");
  const source = document.getElementById("videoSource");
  const notice = document.getElementById("videoNotice");

  if (videos[type]) {
    source.src = videos[type];
    video.load();
    notice.textContent = "Video tersedia. Gunakan layar penuh untuk pengalaman yang lebih imersif.";
  } else {
    source.src = "";
    video.removeAttribute("src");
    video.load();
    notice.textContent = "Video untuk skenario ini belum dipasang. Tambahkan file MP4 ke folder assets lalu isi alamatnya di script.js.";
  }

  showSection("simulasi");
}

function finishVideo() {
  const d = scenarios[currentScenario];
  document.getElementById("reflectionIntro").textContent =
    `Kamu baru saja melihat skenario ${d.title.toLowerCase()} dari sudut pandang korban.`;
  document.getElementById("reflectionAnswer").value = "";
  showSection("refleksi");
}

function saveReflection() {
  const answer = document.getElementById("reflectionAnswer").value.trim();
  if (!answer) {
    alert("Tulis refleksimu terlebih dahulu.");
    return;
  }
  localStorage.setItem("rekonstruksi_reflection", answer);
  showSection("tanya");
}

function addMessage(type, text) {
  const box = document.getElementById("chatMessages");
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerHTML = `<b>${type === "user" ? "Kamu" : "Pendamping"}</b><p></p>`;
  div.querySelector("p").textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function askQuick(text) {
  document.getElementById("questionInput").value = text;
  sendQuestion(new Event("submit"));
}

function answerQuestion(q) {
  const text = q.toLowerCase();

  if (text.includes("apa itu") || text.includes("termasuk bullying") || text.includes("bullying itu")) {
    return "Bullying adalah perilaku menyakiti atau merendahkan orang lain yang dilakukan dengan sengaja dan dapat terjadi berulang, termasuk secara verbal, physical, sosial, maupun digital.";
  }
  if (text.includes("harus bagaimana") || text.includes("melihat bullying")) {
    return "Jangan ikut mengejek atau menyebarkan. Jika aman untuk melakukannya, dukung korban, dengarkan tanpa menghakimi, lalu cari bantuan guru BK, wali kelas, atau orang dewasa yang dipercaya.";
  }
  if (text.includes("membantu korban") || text.includes("cara membantu")) {
    return "Mulailah dengan mendengarkan dan menunjukkan bahwa korban tidak sendirian. Jangan menyalahkan korban. Jika situasinya serius, ajak mencari bantuan dari guru, konselor, atau orang dewasa tepercaya.";
  }
  if (text.includes("salahku") || text.includes("salah saya")) {
    return "Perlakuan bullying bukan alasan untuk menyalahkan korban. Jika kamu mengalami atau melihat bullying, kamu berhak mencari bantuan dan berada di lingkungan yang aman.";
  }
  if (text.includes("lapor") || text.includes("guru") || text.includes("bk")) {
    return "Melapor kepada guru BK, wali kelas, atau orang dewasa yang dipercaya adalah langkah yang tepat, terutama jika situasinya terus terjadi atau membuat seseorang merasa tidak aman.";
  }

  return "Aku bisa membantu menjelaskan tentang bullying, empati, cara mendukung korban, dan langkah mencari bantuan. Kalau situasinya sedang terjadi padamu, pertimbangkan untuk bercerita kepada guru BK atau orang dewasa yang kamu percaya.";
}

function sendQuestion(event) {
  event.preventDefault();
  const input = document.getElementById("questionInput");
  const q = input.value.trim();
  if (!q) return;

  addMessage("user", q);
  input.value = "";

  setTimeout(() => addMessage("bot", answerQuestion(q)), 250);
}

function showResult() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Pilih salah satu jawaban terlebih dahulu.");
    return;
  }

  const title = document.getElementById("resultTitle");
  const text = document.getElementById("resultText");

  if (selected.value === "1") {
    title.textContent = "Pilihan yang baik.";
    text.textContent = "Kamu memilih tindakan yang mendukung korban. Empati bukan hanya memahami perasaan orang lain, tetapi juga berani melakukan sesuatu yang aman dan tepat.";
  } else {
    title.textContent = "Coba pikirkan lagi.";
    text.textContent = "Diam atau ikut tertawa dapat membuat korban merasa semakin sendirian. Kamu bisa memilih untuk mendukung korban dan mencari bantuan orang yang dapat dipercaya.";
  }

  showSection("hasil");
}

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href").slice(1);
    setTimeout(() => showSection(id), 0);
  });
});


// FINAL FEATURE: CARE RATING
function showCareRating() {
  const selected = document.querySelectorAll('input[type="radio"]:checked');
  let score = 0;

  selected.forEach(input => {
    const value = Number(input.dataset.score || input.value || 0);
    score += value;
  });

  // If the existing quiz uses four answer choices with 0–25 points,
  // normalize the result to 0–100.
  if (selected.length > 0) {
    const maxPossible = selected.length * 25;
    score = Math.round((score / maxPossible) * 100);
  }

  score = Math.max(0, Math.min(100, score));

  const scoreEl = document.getElementById("careScore");
  const starsEl = document.getElementById("careStars");
  const levelEl = document.getElementById("careLevel");
  const msgEl = document.getElementById("careMessage");
  const fillEl = document.getElementById("careFill");

  if (!scoreEl) return;

  let level, message, stars;
  if (score >= 80) {
    level = "Sangat Peduli";
    message = "Kamu menunjukkan kepedulian yang sangat baik terhadap korban bullying.";
    stars = "★★★★★";
  } else if (score >= 60) {
    level = "Peduli";
    message = "Kamu sudah menunjukkan sikap peduli dan mau membantu korban.";
    stars = "★★★★☆";
  } else if (score >= 40) {
    level = "Mulai Peduli";
    message = "Kamu sudah mulai peka. Yuk, belajar lebih berani untuk membantu.";
    stars = "★★★☆☆";
  } else {
    level = "Perlu Belajar Lebih Peka";
    message = "Coba pahami kembali perasaan korban dan tindakan yang bisa kamu lakukan.";
    stars = "★★☆☆☆";
  }

  scoreEl.textContent = `${score}/100`;
  starsEl.textContent = stars;
  levelEl.textContent = level;
  msgEl.textContent = message;
  fillEl.style.width = `${score}%`;

  document.getElementById("care-rating")?.scrollIntoView({behavior:"smooth"});
}

document.getElementById("careAgainBtn")?.addEventListener("click", () => {
  document.querySelector("#evaluation")?.scrollIntoView({behavior:"smooth"});
});

// Try to connect the rating to common existing evaluation/result buttons.
document.querySelectorAll("button").forEach(btn => {
  const label = (btn.textContent || "").toLowerCase();
  if (label.includes("selesai") || label.includes("lihat hasil") || label.includes("kirim jawaban")) {
    btn.addEventListener("click", () => setTimeout(showCareRating, 250));
  }
});
