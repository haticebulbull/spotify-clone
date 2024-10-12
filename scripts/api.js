// gönderilmesi gerekn headerlar
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "0d7ab807demsh9b3744a707da1b8p12c207jsndf18734a95f1",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};
// fonksiyonların biarada tutulması için class

export default class API {
  async getPopular() {
    const data2 = await this.searchMusic("semicenk");
    const data3 = await this.searchMusic("tarkan");
    return [...data2, ...data3];
  }

  // aratılan kelimeye uygun sonuçları getirecek

  async searchMusic(query) {
    // term parametresini dinamik hale getir
    const url = `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr`;

    // api isteği atıp gelen cevabı işle
    const res = await fetch(url, options);
    const data = await res.json();

    // veriyi formatla
    const formatted = data.tracks.hits.map((item) => item.track);
    // fonksiyonun çağırıldığı yere veriyi geri döndündürür
    return formatted;
  }
}
