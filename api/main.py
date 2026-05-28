from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io

app = FastAPI(title="Bitki Hastalığı Tespit API")

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "runs/classify/runs/plant_disease/weights/best.pt"
try:
    model = YOLO(MODEL_PATH)
except Exception as e:
    print(f"Model yüklenemedi, yolu kontrol et: {e}")

@app.get("/")
def read_root():
    return {"mesaj": "Plant Disease API Başarıyla Çalışıyor!"}

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    try:
        # Kullanıcıdan gelen resmi bayt olarak oku ve PIL formatına çevir
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))

        # Modeli çalıştır ve tahmin yap
        results = model(image)

        # Sınıflandırma modelinden gelen sonuçları ayrıştır
        # top1: en yüksek ihtimalli sınıfın index'i, top1conf: o sınıfın güven skoru
        top_class_idx = results[0].probs.top1  
        confidence = float(results[0].probs.top1conf)
        class_name = results[0].names[top_class_idx]

        return {
            "durum": "basarili",
            "hastalik": class_name,
            "guven_skoru": round(confidence, 4)
        }

    except Exception as e:
        return {"durum": "hata", "mesaj": str(e)}