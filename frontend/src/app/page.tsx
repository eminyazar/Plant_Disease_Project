"use client";

import { useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ hastalik: string; guven_skoru: number } | null>(null);

  // Dosya seçildiğinde çalışacak fonksiyon
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Resmi ekranda göstermek için önizleme URL'i
      setResult(null); // Yeni resim seçildiğinde eski sonucu temizle
    }
  };

  // API'ye istek atan fonksiyon
  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.durum === "basarili") {
        setResult({
          hastalik: data.hastalik,
          guven_skoru: data.guven_skoru,
        });
      } else {
        alert("Tahmin sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error("API Hatası:", error);
      alert("Sunucuya bağlanılamadı. FastAPI'nin çalıştığından emin olun.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        
        {/* Başlık Alanı */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            AI Bitki Doktoru
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Yapay Zeka ile bitki hastalıklarını saniyeler içinde teşhis edin.
          </p>
        </div>

        {/* Yükleme Alanı */}
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 mb-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Fotoğraf yüklemek için tıklayın</span></p>
                <p className="text-xs text-gray-500">PNG, JPG (Max 5MB)</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>

          {/* Resim Önizleme */}
          {previewUrl && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-inner">
              <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
            </div>
          )}

          {/* Gönder Butonu */}
          <button
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              !selectedFile || loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            } transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
          >
            {loading ? "Yapay Zeka Analiz Ediyor..." : "Teşhis Et"}
          </button>

          {/* Sonuç Alanı */}
          {result && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center animate-pulse-once">
              <h3 className="text-lg font-medium text-green-800">Teşhis Sonucu</h3>
              <p className="mt-2 text-xl font-bold text-gray-900">{result.hastalik.replace(/_/g, " ")}</p>
              <p className="mt-1 text-sm text-green-600">
                Güven Skoru: %{(result.guven_skoru * 100).toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}