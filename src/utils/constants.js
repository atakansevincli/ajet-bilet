// API endpoint'lerini tanımlayabiliriz
export const API_URLS = {
  getPortList: "http://localhost:3000/api/getportlist",
  getPortMatrix: "http://localhost:3000/api/getportmatrix",
  getMonthlyLowestPrices: "http://localhost:3000/api/getmonthlylowestprices",
};

// Uygulama içinde kullanılacak sabit metinleri tanımlayabiliriz
export const LABELS = {
  searchTitle: "Uçuş Arama",
  departurePort: "Kalkış Havaalanı",
  arrivalPort: "Varış Havaalanı",
  selectDate: "Tarih Seçimi",
  searchButton: "Ara",
  monthlyLowestPrices: "Aylık En Düşük Fiyatlar",
  loading: "Yükleniyor...",
};

// Diğer sabit değerler
export const DATE_FORMAT = "MM/yyyy";
export const DEFAULT_CURRENCY = "TRY";
