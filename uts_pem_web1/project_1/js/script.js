/* ===========================
   Modal Functions
   =========================== */

// Fungsi untuk membuka modal dengan detail perusahaan
function openModal(companyId) {
    const company = companiesData.find(c => c.id === companyId);
    if (!company) return;
    
    document.getElementById('modalCompanyName').textContent = company.name;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="detail-item">
            <strong>📍 Lokasi</strong>
            <p>${company.location}</p>
        </div>
        <div class="detail-item">
            <strong>📅 Tahun Berdiri</strong>
            <p>${company.founded}</p>
        </div>
        <div class="detail-item">
            <strong>👥 Jumlah Karyawan</strong>
            <p>${company.employees}</p>
        </div>
        <div class="detail-item">
            <strong>🏭 Industri</strong>
            <p>${company.industry}</p>
        </div>
        <div class="detail-item">
            <strong>📝 Deskripsi</strong>
            <p>${company.fullDesc}</p>
        </div>
        <div class="detail-item">
            <strong>🎯 Layanan</strong>
            <p>${company.services}</p>
        </div>
    `;
    
    document.getElementById('detailModal').style.display = 'block';
}

// Fungsi untuk menutup modal
function closeModal() {
    document.getElementById('detailModal').style.display = 'none';
}

// Tutup modal ketika klik di luar modal
window.onclick = function(event) {
    const modal = document.getElementById('detailModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

/* ===========================
   Companies Loading Functions
   =========================== */

// Fungsi untuk memuat daftar perusahaan
function loadCompanies() {
    const grid = document.getElementById('companiesGrid');
    grid.innerHTML = '';
    
    companiesData.forEach(company => {
        const card = document.createElement('div');
        card.className = 'company-card';
        card.innerHTML = `
            <h3>${company.name}</h3>
            <span class="industry">${company.industry}</span>
            <p>${company.shortDesc}</p>
            <button class="btn" onclick="openModal(${company.id})">Lihat Detail →</button>
        `;
        grid.appendChild(card);
    });
}

/* ===========================
   Initialization
   =========================== */

// Jalankan ketika halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Muat daftar perusahaan
    loadCompanies();
    // Tampilkan nama user jika tersedia
    try {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const el = document.getElementById('userName');
            if (el) el.textContent = `Halo, ${currentUser}`;
        }
    } catch(e) {
        // ignore
    }
});
