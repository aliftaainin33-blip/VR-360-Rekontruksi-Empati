REKONSTRUKSI EMPATI - PANDUAN

1. Buka folder ini di VS Code.
2. Klik kanan index.html > Open with Live Server (jika Live Server terpasang), atau buka index.html di browser.
3. Video yang kamu kirim sudah dimasukkan sebagai:
   assets/video-verbal.mp4
4. Skenario fisik, sosial, dan cyber sudah dibuat sebagai kartu. Saat videonya sudah ada,
   tambahkan file ke assets dan isi path-nya di script.js:
   fisik: "assets/video-fisik.mp4"
   sosial: "assets/video-sosial.mp4"
   cyber: "assets/video-cyber.mp4"

FITUR:
- Opening "Rasakan. Pahami. Ubah."
- Pilihan 4 jenis bullying
- Video POV
- Refleksi
- Tanya & Refleksi (pendamping lokal, tanpa API key)
- Uji empati
- Hasil
- Langkah nyata
- Penutup BULLY
- Responsive untuk HP

PENTING:
Fitur "Tanya & Refleksi" di sini bukan AI online sungguhan. Jawabannya dibuat lokal dengan JavaScript agar aman
untuk GitHub Pages dan tidak membocorkan API key. Jika ingin AI sungguhan, gunakan backend/server dan jangan
menaruh API key langsung di index.html/script.js.

VIDEO 360:
Video yang sekarang adalah MP4 1280x720 dan sekitar 80 detik. Ia akan tampil sebagai video POV biasa.
Jika nanti kamu punya video 360° equirectangular, diperlukan viewer 360° khusus agar pengguna bisa melihat
sekeliling dengan drag/gyro/VR, bukan sekadar video biasa.


Video Relational + Cyberbullying: assets/video-relasional-cyber.mp4
