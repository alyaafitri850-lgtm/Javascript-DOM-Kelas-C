console.log("Praktikum Dimulai");

//Aktivitas 1: Dom selection seleksi DOM
// Dom Selection kita harus "Menangkap Elemen" sebelum kita memanipulasi HTML
// Ambil elemen -> simpan di dalam variabel javascript

// 1. ambil elemen judul berdasarkan ID
// document.getElementById("...") -> mabil elemen HTML spesifik berdasarkan ID
const judulUtama = document.getElementById("judul-utama");

// 1.1 querySelector ("#...") mengambil ID berdasarkan atribut ID
// Tanda (#) Artinya menargetkan ID (.) menargetkan class
// Ambil elemen sub judul berdasarkan ID
const SubJudul = document.querySelector("#sub-judul");

// 2. mengambil Elemen Pada Kartu 1 (Kartu memanipulasi teks & style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");

// 3. Mengambil tombol "Aksi pada kartu 1"
const btnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

// 4. mengambil elemen pada kartu 2 (fitur catatan dinamis / todolist)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");


// Aktivitas 2: Manipulasi teks & style (pada kartu 1)
// addEventListener("click", function() {...}) -> artinya Tolong dengarkan dan tunggu
// setelah di "click" oleh user jalankan perintah di dalam function

// A. Mengubah teks & warna teks preview
btnUbahTeks.addEventListener("click", function(){
    // .innerText = Mengisi/menimpa tulisan teks yang ada di HTML
    teksPreview.innerText = "Hebat! Teks ini berhasil diubah melalui DOM!";

    // .style.color = Mengubah warna teks secara langsung melalui Javascript (inline)
    teksPreview.style.color = "#0f4aed"; 

    // console.log = Mencetak pesan di console
    console.log("DOM teks Preview telah diperbaharui");
})

// B. Mengubah Warna background Box Preview
btnToggleWarna.addEventListener("click", function() {
    // .classList.toggle("nama-class") -> meambahkan class jika belum ada, menghapus class jika sudah ada
    // Jika class tersebut belum ada pada elemen, maka class tersebut akan ditambahkan.
    // Jika class tersebut sudah ada pada elemen, maka class tersebut akan dihapus.
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("DOM Box Preview telah diperbaharui");
});

// C. Mengembalikan Teks & warna teks preview ke Default (Reset)
btnReset.addEventListener("click", function(){
    // Mengembalikan teks preview ke dafault
    teksPreview.innerText = "Halo! teks ini siap diubah oleh Javascript"

    // Kosongkan warna agar warna kembali ke default (inherit)
    teksPreview.style.color ="";

    // Hapus class menggunakan .classList.remove("nama-class")
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("higlight");
    
    console.log("DOM Box telah dikembalikan ke default");
});

// Aktivitas 3 & 4: Membuat catatan dinamis (TodoList) & menghitug jumlah catatan (Pada kartu 1)
// Dibagian ini kita akan belajar membuat elemen HTML Baru (<li>) sceraa dinamis menggunakan Javascript
// Lalu mengisi teksnya, memberi tombol hapus, lalu menempelkannya kedalam layar

// Langkah 1 : membuat variabel untuk menampung jumlah catatan 
// 'let' digunakan karena nilainya akan berubah-ubah (mutable)
let totalCatatan = 0;

// Langkah 2: membuat fungsi untuk menambahkan catatan baru 
// Fungsi ini adalah kumpulan perintah yang diberi nama. Kita bisa memanggilnya kapanpun kita mau.
function perbaruiJumlah() {
    // Masukkan angka totalCatatan ke dalam elemen HTML jumlahCatatan
    jumlahCatatan.innerText = totalCatatan;

    // Percabangan Kondisi: apakah catatannya 0?
    if (totalCatatan ===0) {
        // JIka 0: hapus class "hidden" agar pesan "Tidak ada catatan" muncul
        pesanKosong.classList.add("hidden");
    }
}


// Langkah 3: Membuat fungsi untuk menambahkan catatan baru
function tambahCatatan(){
    // 3.1 inputCatatan.value -> Mengambil teks yang diketik user input
    // .trim() -> menghapus spesi kosong di awal dan diakhir teks
    const isiTeks = inputCatatan.value.trim();

    // 3.2 Validasi Iput: Jika variabel isi teks kosong (""), maka tampilkan alert
    if (isiTeks === "") {
        alert("Catatan tidak boleh kosong!");
        return; // Hentikan fungsi jika input kosong
    }

    // 3.3 createElemen("li") -> Membuat elemen HTML baru <li> hanya di memori Javascript 
    const liBaru = document.createElement("li");
    liBaru.className = "note-item"; // Memberi class agar tampilanya sesuai style CSS

    // 3.4 Mengisis teks catatan baru dengan cara innerHTML mnegisi <li> dengan teks dan tombol hapus
    // Tanda Backtick (`) digunakan agar kita bisa menulis teks multi-baris dan menyisipkan variabel dengan ${Variabel}
    liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">Hapus</button>`;

    // 3.5 Menambahkan Event Listener pada tombol hapus pada item <li>
    // querySelector(".btn-hapus") -> Mengambil tombol hapus yang baru dibuat dalam <li>
    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function(){
        // Menghapus <li> dari daftarCatatan (<ul>)
        liBaru.remove(); // Menghapus elemen <li> dari DOM .remove()
        totalCatatan--; // Mengurangi jumlah catatan 
        perbaruiJumlah(); // Memperbarui tampilan jumlah catatan 
        console.log(`Dom Catatan "${isiTeks}" telah dihapus`);
    })

    // 3.6 .appendChild(liBaru) -> Menempelkan <li> baru kedalam <ul> daftarCatatan
    daftarCatatan.appendChild(liBaru);

    // 3.7 Mengosongkan input setelah catatan ditambahkan
    inputCatatan.value = "";

    // 3.8 Menambahkan jumlah catatan dan memperbarui tampilan jumlah catatan
    totalCatatan++;
    perbaruiJumlah();

    console.log(`DOM Catatan baru ditambahkan : "${isiTeks}"`);
}

// Langkah 4: Event Listener untuk tombol tambah catatan 
// Ketika tombol tambah di klik, jalankan fungsi tambahCatatan
btnTambah.addEventListener("click", function(){
    tambahCatatan();
});

// Langkah 5: Event Listener untuk menambahkan catatan ketika menekan tombol enter di input
inputCatatan.addEventListener("keyup", function(event){
    if(event.key === "Enter") {
        tambahCatatan();
    }
});

