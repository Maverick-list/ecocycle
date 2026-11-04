/**
 * ECOCYCLE Static Prerendering Script
 * Generates crawlable HTML files for priority public routes with rich metadata & JSON-LD
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const SITE_URL = 'https://ecocycle.id';

const ROUTES = [
  {
    path: '/',
    title: 'ECOCYCLE — A Living Circular Economy Experience',
    description: 'Infrastruktur teknologi tata kelola daur ulang dan ekonomi sirkular cerdas. Mengubah aliran material menjadi neraca sumber daya terverifikasi dan bernilai nyata.',
    heading: 'Turning Waste Into Worth — Ekosistem Sirkular Cerdas'
  },
  {
    path: '/bank-sampah',
    title: 'Bank Sampah Digital & Buku Tabungan Sirkular — ECOCYCLE',
    description: 'Setor sampah terpilah, catat manifest tertimbang, dan konversikan material daur ulang menjadi saldo rupiah serta poin ekologis.',
    heading: 'Buku Tabungan Sirkular & Neraca Setoran Digital'
  },
  {
    path: '/pemilahan-pintar',
    title: 'Panduan Pemilahan Pintar & Identifikasi Material — ECOCYCLE',
    description: 'Katalog standar pemilahan sampah komprehensif dengan nilai ekonomi, faktor reduksi emisi CO2, dan pedoman pemrosesan daur ulang terverifikasi.',
    heading: 'Standar Presisi Pemilahan Material Daur Ulang'
  },
  {
    path: '/dampak-ekologis',
    title: 'Neraca Dampak Ekologis & Audit Karbon Sains — ECOCYCLE',
    description: 'Lacak metrik dampak lingkungan terverifikasi: reduksi emisi CO2, konservasi air bersih, energi terbarukan, dan sertifikat partisipasi sirkular.',
    heading: 'Audit Emisi & Regenerasi Sumber Daya Terverifikasi'
  },
  {
    path: '/analitik',
    title: 'Dasbor Analitik Sirkular & Tren Material — ECOCYCLE',
    description: 'Visualisasi komprehensif metrik analitik: tren volume daur ulang bulanan, komposisi material, efisiensi drop-point, dan proyeksi reduksi emisi.',
    heading: 'Pusat Analitik & Intelijen Aliran Material'
  },
  {
    path: '/akademi',
    title: 'Akademi Sirkular & Modul Edukasi Keberlanjutan — ECOCYCLE',
    description: 'Pelajari metodologi komprehensif pengelolaan limbah, komposting mandiri, regulasi lingkungan, dan prinsip ekonomi sirkular modern.',
    heading: 'Kurikulum Pengetahuan Daur Ulang & Sirkularitas'
  },
  {
    path: '/tantangan',
    title: 'Tantangan Komunitas & Papan Peringkat Sirkular — ECOCYCLE',
    description: 'Ikuti misi aksi lingkungan bersama ribuan warga, raih lencana pencapaian digital, kumpulkan poin bonus, dan pantau leaderboard sirkular nasional.',
    heading: 'Misi Keberlanjutan & Peringkat Komunitas Hijau'
  },
  {
    path: '/panduan',
    title: 'Panduan Penggunaan Platform & Operasional Daur Ulang — ECOCYCLE',
    description: 'Panduan interaktif langkah demi langkah: mulai dari pemilihan jenis sampah, prosedur pembersihan, pencatatan setoran, hingga penukaran poin.',
    heading: 'Pedoman Interaktif Menggunakan Platform ECOCYCLE'
  },
  {
    path: '/faq',
    title: 'Pertanyaan yang Sering Diajukan (FAQ) — ECOCYCLE',
    description: 'Jawaban resmi dan komprehensif seputar tata kelola bank sampah digital, standar pemilahan material, konversi saldo rupiah, dan audit reduksi karbon.',
    heading: 'Pusat Tanya Jawab & Informasi Resmi'
  },
  {
    path: '/kontak',
    title: 'Hub Jaringan & Drop-Point Terdekat — ECOCYCLE',
    description: 'Temukan titik drop-point penyerahan sampah terpilah di sekitar Anda, jam operasional, panduan rute, dan layanan narahubung ECOCYCLE.',
    heading: 'Jaringan Drop-Point & Layanan Narahubung'
  }
];

function prerender() {
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found! Run npm run build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');

  console.log(`Starting static prerendering for ${ROUTES.length} routes...`);

  ROUTES.forEach(route => {
    const canonicalUrl = `${SITE_URL}${route.path === '/' ? '' : route.path}`;
    
    // Inject route-specific meta tags
    let html = baseHtml
      .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
      .replace(
        /<meta name="description" content=".*?" \/>/,
        `<meta name="description" content="${route.description}" />`
      );

    // Meta block to insert before </head>
    const seoBlock = `
    <!-- Pre-rendered SEO Meta -->
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="ECOCYCLE" />
    <meta property="og:locale" content="id_ID" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "${route.title}",
      "description": "${route.description}",
      "url": "${canonicalUrl}",
      "publisher": {
        "@type": "Organization",
        "name": "ECOCYCLE",
        "url": "${SITE_URL}",
        "logo": "${SITE_URL}/favicon.svg"
      }
    }
    </script>
`;

    html = html.replace('</head>', `${seoBlock}\n  </head>`);

    // Target file path
    let targetFile;
    if (route.path === '/') {
      targetFile = path.join(distDir, 'index.html');
    } else {
      const routeDir = path.join(distDir, route.path.replace(/^\//, ''));
      fs.mkdirSync(routeDir, { recursive: true });
      targetFile = path.join(routeDir, 'index.html');
    }

    fs.writeFileSync(targetFile, html, 'utf-8');
    console.log(`  ✓ Prerendered: ${route.path} -> ${path.relative(distDir, targetFile)}`);
  });

  console.log('✅ Static prerendering successfully completed for all routes.');
}

prerender();
