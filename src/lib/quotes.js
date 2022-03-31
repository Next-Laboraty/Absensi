let quotes = [
    `\"Jangan pernah menyerah dan mengasihani diri sendiri.\"\n\n~ Ciputra`,
    `\"Setiap bertemu dengan orang baru, saya selalu mengosongkan gelas saya terlebih dahulu\".\n\n~ Bob Sadino`,
    `\"Bekerja bukan hanya untuk mencari materi. Bekerja adalah bermanfaat bagi orang banyak\".\n\n~ Merry Riana`,
    `\"Bekerjalah lebih banyak dari orang lain, karena usaha tidak pernah membohongi hasil\".\n\n~ Chairul Tanjung`,
    `\"Kerja itu sebuah kenikmatan yang tiada terkira rasanya. Tapi, banyak orang yang malas bekerja karena dirinya tidak mau merasakan kenikmatan tersebut\".\n\n ~Quotes of the day`,
    `\"Jalan untuk mendapatkan kesuksesan memang banyak. Namun, untuk mendapatkan harta yang berkah, kamu perlu racikan khusus untuk itu yakni doa dan kerja keras\".\n\n ~Quotes of the day`,
    `\"Tahapan untuk meraih kesuksesan itu panjang. Dari persiapan, percobaan, ujian dan kemenangan\".\n\n~ Quotes of the day`,
    `\"Melihat cahaya matahari merupakan tanda bahwa Tuhan masih memberikan kita kesempatan untuk bekerja\".\n\n~ Quotes of the day`,
    `\"Hal yang berat dalam hidup ini adalah memulai sesuatu. Namun, ada juga yang tidak kalah berat yakni berusaha kontinu melakukan usahanya\".\n\n~ Quotes of the day`,
    `\"Berlomba-lomba dalam kerja keras agar menjadi yang terbaik. Demi kebahagiaan keluarga\".\n\n~ Quotes of the day`,
    `\"Manusia itu memiliki potensi dan kesempatan yang sama pula. Maka jangan menyerah untuk terus berusaha mendapatkan yang terbaik\".\n\n~ Quotes of the day`,
    `\"Sekarang bukan waktunya untuk mengeluh apalagi menyerah. Namun, setiap momen adalah untuk bekerja".\n\n~ Quotes of the day`,
    `\"Bekerjalah dengan baik agar kamu juga akan dipertemukan dengan orang yang baik pula\".\n\n~ Quotes of the day`,
    `\"Apabila kita menginginkan hal besar terjadi di hidup kita, maka kita juga harus siap untuk melakukan perjuangan yang lebih besar juga\".\n\n~ Quotes of the day`,
    `\"Jika tindakan Anda menginspirasi orang lain untuk bermimpi lebih banyak, belajar lebih banyak, berbuat lebih banyak, dan menjadi lebih sukses, Anda adalah seorang pemimpin\".\n\n~ John Quincy Adams`,
    `\"Jika Anda gagal merencanakan, maka Anda berencana untuk gagal\".\n\n~ Harvey Mackay`,
    `\"Saya belum gagal. Saya hanya menemukan 10.000 cara yang tidak akan berhasil\".\n\n~ Thomas Edison`,
    `\"Sukses adalah beranjak dari kegagalan ke kegagalan tanpa kehilangan antusiasme\".\n\n~ Winston Churchill`,
    `\"Untuk memahami hati dan pikiran seseorang, jangan lihat pada apa yang telah dia capai, tetapi lihat pada apa yang dia cita-citakan\".\n\n~ Kahlil Gi`,
    `\"Tindakan menyalahkan hanya akan membuang waktu. Sebesar apa pun kesalahan yang Anda timpakan ke orang lain, dan sebesar apa pun Anda menyalahkannya, hal tersebut tidak akan mengubah Anda\".\n\n~ Wayne Dyer`,
    `\"Ambillah risiko yang lebih besar dari apa yang dipikirkan orang lain aman. Berilah perhatian lebih dari apa yang orang lain pikir bijak. Bermimpilah lebih dari apa yang orang lain pikir masuk akal\".\n\n~ Claude T. Bissell`,
    `\"Ia yang mengerjakan lebih dari apa yang dibayar pada suatu saat akan dibayar lebih dari apa yang ia kerjakan\".\n\n~ Napoleon Hill`,
    `\"Jangan tanyakan pada diri Anda apa yang dibutuhkan dunia. Bertanyalah apa yang membuat Anda hidup, kemudian kerjakan. Karena yang dibutuhkan dunia adalah orang yang antusias\".\n\n~ Harold Whitman`,
    `\"Janganlah pernah menyerah ketika Anda masih mampu berusaha lagi. Tidak ada kata berakhir sampai Anda berhenti mencoba\".\n\n~ Brian Dyson`,
    `\"Saat kita masih diberi kesempatan bangun di pagi hari, itu berarti Tuhan masih memberi kesempatan kepada kita untuk melakukan pekerjaan yang harus kita lakukan.\"\n\n~ Quotes of the day`,
    `\"Jalan untuk mendapatkan kesuksesan memang banyak. Namun untuk mendapatkan harta yang berkah kamu perlu racikan khusus untuk itu yakni doa dan kerja keras\".\n\n~ Quotes of the day`,
    `\"Kerja keras mengalahkan bakat ketika bakat tidak bekerja keras\"\n\n~ Tim Notke`,
    `\"Tanpa bekerja, semua kehidupan akan membusuk. Tetapi ketika bekerja tanpa jiwa, maka kehidupan akan tercekik dan mati\"\n\n~ Albert Camus`,
    `\"Buruh itu bukan pekerjaan hina, karena buruh memberikan mencurahkan setiap keringatnya untuk kepentingan orang lain\"\n\n~ Quotes of the day`,
]

export default function NewQuotes(){
    let randomNumber = Math.floor(Math.random()* (quotes.length))
    return quotes[randomNumber]
}