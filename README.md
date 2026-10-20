# Portal Multi-Jurnal Berbasis Jekyll (gaya OJS)

Siap dipublikasikan di GitHub Pages tanpa plugin khusus. Bootstrap 5 dan Bootstrap Icons dimuat dari CDN.

## Struktur
- `index.html`        : beranda portal (daftar jurnal + artikel terbaru lintas jurnal)
- `jurnal-a/`, `jurnal-b/` : satu folder per jurnal (beranda, terbitan terkini, arsip, tentang, tim editorial, panduan penulis, kontak)
- `_articles/<slug>/` : artikel tiap jurnal, satu file `.md` per artikel
- `_data/journals.yml`: identitas dan warna tiap jurnal (satu entri per jurnal)
- `_data/portal.yml`  : identitas portal
- `_layouts/`         : `default`, `page`, `article`, `journal-home`, `journal-current`, `journal-archive`
- `_includes/`        : `head`, `header`, `navbar`, `sidebar`, `footer`, `breadcrumb`, `article-card`
- `tools/new-journal.sh` : skrip penambah jurnal baru

## Menambah jurnal baru
    bash tools/new-journal.sh jurnal-c "Jurnal Contoh C"
Skrip membuat folder `jurnal-c/`, folder `_articles/jurnal-c/`, dan entri di `_data/journals.yml`.
Lengkapi data (ISSN, penerbit, warna) di `journals.yml`, lalu isi halaman Tentang, Tim Editorial, dan Panduan Penulis di `jurnal-c/`.
Tanpa skrip: salin salah satu folder jurnal, ganti `journal:` dan `permalink:` di setiap berkas, lalu tambahkan entri di `journals.yml`.

## Menambah artikel
Salin file di `_articles/jurnal-a/` ke `_articles/<slug>/`, ubah `journal` (harus sama dengan slug), `volume`, `number`, `year`, `published`, `authors`, `abstract`, `doi`, `pdf`.
Terbitan terkini dan arsip tiap jurnal dibuat otomatis dari `volume` dan `number`.
Taruh PDF di `assets/pdf/` dengan nama sesuai isian `pdf`.

## Publikasi ke GitHub Pages
1. Ubah `url` dan `baseurl` di `_config.yml` (situs proyek: `baseurl: "/nama-repo"`).
2. Unggah ke repositori, lalu Settings > Pages > Deploy from a branch > `main` / root.

## Menjalankan lokal
    bundle install
    bundle exec jekyll serve
