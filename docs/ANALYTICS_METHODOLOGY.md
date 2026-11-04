# ECOCYCLE — ANALYTICS METHODOLOGY & SCIENTIFIC FRAMEWORK
**Dokumen Metodologi Perhitungan Dampak Ekologis & Etika Data**  
**Versi:** 2.0.0 Scientific Documentation  
**Proyek:** ECOCYCLE — Turning Waste Into Worth  
**Penyelenggara:** HIMA TI FKOM Universitas Kuningan (Techno Versary Vol. II 2026)  

---

## 1. LANDASAN TEORITIS: ANALISIS ALIRAN MATERIAL (MATERIAL FLOW ANALYSIS)

ECOCYCLE mengadopsi prinsip dasar Analisis Aliran Material (*Material Flow Analysis / MFA*) dan Penilaian Daur Hidup (*Life Cycle Assessment / LCA*). Dalam sistem persampahan perkotaan linier konvensional (*Take-Make-Dispose*), sebagian besar material anorganik dan organik berakhir di Tempat Pemrosesan Akhir (TPA) sistem *open dumping* atau *sanitary landfill* yang minim penangkapan gas metana ($CH_4$). 

Dengan membelokkan material terpilah ke rantai daur ulang industri atau pengomposan mandiri, dua dampak ekologis utama tercapai secara simultan:
1. **Penghindaran Emisi Metana & Dekomposisi:** Mencegah pembusukan anaerobik di timbunan TPA yang menghasilkan gas metana dengan Potensi Pemanasan Global (*Global Warming Potential / GWP*) 28 kali lebih kuat daripada $CO_2$ dalam horizon 100 tahun.
2. **Penggantian Bahan Baku Virgin (*Virgin Material Displacement*):** Mengurangi kebutuhan ekstraksi minyak bumi untuk plastik virgin, penebangan pohon untuk pulp kertas, dan penambangan bauksit untuk aluminium murni.

---

## 2. TABEL FAKTOR EMISI GAS RUMAH KACA (GHG EMISSION FACTORS)

Faktor konversi reduksi emisi di platform ECOCYCLE didasarkan pada model **EPA WARM v15 (Waste Reduction Model)** yang diharmonisasi dengan data timbulan sampah Kementerian Lingkungan Hidup dan Kehutanan (KLHK) Republik Indonesia:

| Kategori Material | Sub-Tipe Utama | Faktor Emisi Bersih Tercegah ($kg\ CO_2e\ /\ kg$) | Faktor Penghematan Air ($Liter\ /\ kg$) | Basis Rujukan Ilmiah |
| :--- | :--- | :---: | :---: | :--- |
| **Plastik** | PET, HDPE, PP | **1.50** | **24.0** | EPA WARM v15 — Virgin Polymer Displacement |
| **Kertas & Karton**| Kardus Corrugated, Dupleks, HVS | **1.10** | **18.5** | EPA WARM v15 — Forest Carbon Sequestration |
| **Logam & Kaleng** | Aluminium Can, Besi Seng | **8.90** | **45.0** | International Aluminium Institute LCA |
| **Minyak Jelantah**| Minyak Goreng Bekas (UCO) | **2.40** | **12.0** | Feedstock Biodiesel FAME vs Petro-diesel |
| **Organik** | Sisa Makanan, Kulit Buah, Daun | **0.80** | **8.0** | IPCC Waste Composting vs Anaerobic Landfill |
| **Kaca** | Botol Kaca Bening, Kaca Warna | **0.30** | **4.2** | European Container Glass Federation (FEVE) |

---

## 3. FORMULASI MATEMATIKA PERHITUNGAN DAMPAK

### 3.1 Reduksi Emisi Karbon Total ($E_{total}$)
Dihitung secara deterministik dari jumlah perkalian massa masing-masing transaksi material ($m_i$) dengan faktor emisinya ($f_i$):

$$E_{total} = \sum_{i=1}^{n} (m_i \times f_i) \quad [kg\ CO_2e]$$

### 3.2 Ekuivalensi Penyerapan Pohon Dewasa ($P_{tree}$)
Berdasarkan standar US EPA Greenhouse Gas Equivalencies Calculator, satu batang pohon dewasa (*urban deciduous tree*) mampu menyerap rata-rata **21.77 kg $CO_2$ per tahun**:

$$P_{tree} = \frac{E_{total}}{21.77} \quad [Pohon\ Dewasa\ /\ Tahun]$$

### 3.3 Konservasi Air Bersih ($W_{saved}$)
Dihitung dari akumulasi efisiensi konsumsi air dalam proses daur ulang mekanis dibandingkan manufaktur primer polimer dan ekstraksi virgin:

$$W_{saved} = \sum_{i=1}^{n} (m_i \times w_i) \quad [Liter]$$

### 3.4 Persentase Pengalihan dari TPA (*Landfill Diversion Rate*)
Material yang telah disetor dan diverifikasi oleh Hub Bank Sampah dialihkan **100%** dari timbulan TPA menuju fasilitas daur ulang resmi (Recyclers & Off-takers).

---

## 4. SIMULATOR PROYEKSI RUMAH TANGGA

Pada halaman **Neraca Dampak Ekologis** (`/dampak-ekologis`), kalkulator proyeksi menggunakan algoritma parametrik tahunan:

- **Konsumsi Botol Harian ($B_{day}$):**
  - Estimasi berat botol PET berukuran 600 ml = 0.03 kg.
  - Massa tahunan: $M_{plastic} = B_{day} \times 365 \times 0.03\ kg$.
  - Emisi tercegah: $E_{plastic} = M_{plastic} \times 1.50\ kg\ CO_2e/kg$.

- **Kompos Dapur Mingguan ($K_{week}$):**
  - Massa tahunan: $M_{compost} = K_{week} \times 52\ kg$.
  - Emisi tercegah: $E_{compost} = M_{compost} \times 0.80\ kg\ CO_2e/kg$.

- **Total Penghematan Proyeksi:**
  - $E_{proyeksi} = E_{plastic} + E_{compost}$.
  - $P_{proyeksi} = \frac{E_{proyeksi}}{21.77}$.
  - $W_{proyeksi} = (M_{plastic} \times 24) + (M_{compost} \times 8)$.

---

## 5. ETIKA DATA & MANIFESTO ANTI-GREENWASHING

Dalam dunia teknologi keberlanjutan (*Climatetech*), integritas data adalah modalitas moral yang paling krusial. Platform ECOCYCLE memegang teguh 4 komitmen etika data:

1. **Jujur Mengenai Skala Prototipe Kompetisi:**  
   Platform ini dibangun untuk keperluan Web Design Competition Techno Versary Vol. II 2026. Data demo awal disimpan di LocalStorage peramban dan tidak diklaim sebagai basis data cloud multi-nasional tanpa bukti.
2. **Tidak Mengklaim Sertifikasi Fiktif:**  
   Platform tidak mengklaim kepemilikan sertifikasi ISO 14001:2015 individual. Sebaliknya, kami menegaskan kepatuhan terhadap **Pedoman Tata Kelola Bank Sampah Berbasis SNI 19-3983-1995** serta verifikasi timbangan metrologi resmi di tingkat drop-point.
3. **Penyebutan Nilai Konversi Finansial:**  
   Nilai rupiah per kg yang tertera dalam formulir setoran dinyatakan secara eksplisit sebagai **"Estimasi Nilai Pasar Terbuka"**, disesuaikan dengan fluktuasi harga pengepul material di wilayah Kuningan dan Jawa Barat.
4. **Kalkulasi Deterministik:**  
   Tidak ada pembuatan angka acak untuk membuat platform terlihat "hijau". Seluruh angka reduksi emisi berakar langsung pada massa kilogram fisik yang dimasukkan pengguna.
