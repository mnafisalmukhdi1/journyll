# Situs Jurnal Berbasis Jekyll (gaya OJS)

Siap dipublikasikan di GitHub Pages. Bootstrap 5 dan Bootstrap Icons dimuat dari CDN.

## Struktur
- `_layouts/`  : `default`, `page`, `article`
- `_includes/` : `head`, `header`, `navbar`, `sidebar`, `footer`, `article-card`
- `_data/`     : `journal.yml` (identitas jurnal), `navigation.yml` (menu), `announcements.yml`
- `_articles/` : satu file `.md` per artikel (koleksi Jekyll)
- `assets/pdf/`: berkas PDF artikel

## Publikasi ke GitHub Pages
1. Buat repositori, unggah seluruh isi folder ini.
2. Ubah `url` dan `baseurl` di `_config.yml`
   (situs proyek: `baseurl: "/nama-repo"`; `username.github.io`: `baseurl: ""`).
3. Settings > Pages > Deploy from a branch > `main` / `(root)`.

## Menjalankan lokal
    bundle install
    bundle exec jekyll serve

## Menambah artikel
Salin salah satu file di `_articles/`, lalu ubah `volume`, `number`, `year`, `authors`, `abstract`, `doi`, dan `pdf`.
Terbitan terkini dan arsip dibuat otomatis dari `volume` dan `number`; terbitan dengan nomor tertinggi tampil sebagai "Terbitan Terkini".
