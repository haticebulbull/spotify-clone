import API from "./api.js";
import UI from "./ui.js";

// class ın örneğini al

const api = new API();
const ui = new UI();

// sayfa yüklendiği anda api dan popüler müzikleri al renderla

document.addEventListener("DOMContentLoaded", () => {
  ui.renderLoader();

  // api isteği at
  api
    .getPopular()
    //ekrana kartları bas
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log(err);
      alert("üzgünüz bir sorun oluştu");
    });
});
// formda bir şey aratıldığında api dan aratılan kelimeye uygun sonuçları al ve renderla

ui.form.addEventListener("submit", (e) => {
  // sayfayı yenilemeyi engelle
  e.preventDefault();

  // aratılan kelimeye eriş
  const query = e.target[0].value;

  // aratılan kelime boşsa fonk durdur
  if (query.trim() === "") return alert("Lütfen geçerli bir metin giriniz");

  // ekrana loader bas
  ui.renderLoader();
  //başlığı güncelle
  ui.updateTitle(query + " için sonuçlar");
  // api den verileri al
  api
    .searchMusic(query)
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log(err);
      alert("üzgünüz bir sorun oluştu");
    });
});

// liste alanındaki tıklama olaylarını  izle ve
ui.list.addEventListener("click", (e) => {
  // eğer oynat butonuna tıklanırsa o şarkıyı oynat
  if (e.target.className === "play") {
    // oynatılacak şarkının kartın eris
    const card = e.target.closest(".card");

    // oynatılacak şarkının bilgilerini al
    const data = card.dataset;

    // player alanını tekrar renderla
    ui.renderPlayer(data);
  }
});
// şarkının başlama ve durma olaylarını izleme
