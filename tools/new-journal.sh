#!/usr/bin/env bash
# Membuat kerangka jurnal baru.
# Pemakaian: bash tools/new-journal.sh <slug> "<Nama Jurnal>"
# Contoh   : bash tools/new-journal.sh jurnal-c "Jurnal Contoh C"
set -e
slug="$1"; name="$2"
if [ -z "$slug" ] || [ -z "$name" ]; then
  echo 'Pemakaian: bash tools/new-journal.sh <slug> "<Nama Jurnal>"'; exit 1
fi
cd "$(dirname "$0")/.."
if [ -e "$slug" ]; then echo "Folder '$slug' sudah ada."; exit 1; fi
mkdir -p "$slug" "_articles/$slug"

stub() { # berkas layout judul permalink isi
  cat > "$slug/$1.md" <<STUB
---
layout: $2
journal: $slug
title: $3
permalink: /$slug/$4
---
$5
STUB
}
stub index journal-home "Beranda" "" "Tulis pengantar singkat jurnal di sini."
stub current journal-current "Terbitan Terkini" "current/" ""
stub archive journal-archive "Arsip" "archive/" ""
stub about page "Tentang Jurnal" "about/" "## Fokus dan ruang lingkup
Tulis fokus dan ruang lingkup jurnal di sini.

## Kebijakan akses terbuka
Seluruh konten tersedia gratis segera setelah terbit.

## Proses telaah sejawat
Jelaskan alur telaah naskah.

## Etika publikasi
Jelaskan kebijakan plagiarisme dan konflik kepentingan."
stub editorial-team page "Tim Editorial" "editorial-team/" "### Pemimpin Redaksi
**Nama, gelar** - Afiliasi

### Dewan Editor
- **Nama, gelar** - Afiliasi

### Mitra Bestari
- **Nama, gelar** - Afiliasi"
stub author-guidelines page "Panduan Penulis" "author-guidelines/" "## Persyaratan naskah
- Naskah orisinal dan belum pernah dipublikasikan.
- Abstrak maksimal 250 kata dengan 3-5 kata kunci.

## Format sitasi
Gunakan gaya APA edisi terbaru."
stub contact page "Kontak" "contact/" "Tulis alamat redaksi dan email di sini."

if ! grep -qx -- "- slug: $slug" _data/journals.yml 2>/dev/null; then
cat >> _data/journals.yml <<YML
- slug: $slug
  name: "$name"
  short_name: ${slug^^}
  tagline: Isi tagline jurnal
  issn_print: "0000-0000"
  issn_online: "0000-0000"
  publisher: Nama Penerbit
  email: redaksi@example.com
  address: Alamat redaksi
  frequency: Dua kali setahun
  doi_prefix: "10.0000"
  license: CC BY 4.0
  license_url: https://creativecommons.org/licenses/by/4.0/
  color: "#6b3e26"
  color_dark: "#472818"
  accent: "#c8892b"
YML
fi
echo "Jurnal '$slug' dibuat. Lengkapi data di _data/journals.yml dan taruh artikel di _articles/$slug/."
