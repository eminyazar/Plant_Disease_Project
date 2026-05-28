from ultralytics import YOLO
import os

def evaluate_model():
    model_path = "runs/classify/runs/plant_disease/weights/best.pt" 
    
    try:
        model = YOLO(model_path)
    except Exception as e:
        print(f"Model yüklenemedi, dosya yolunu kontrol et: {e}")
        return

    print("Model, kapalı kutudaki TEST verisi (%10) üzerinde değerlendiriliyor...")
    
    # KRİTİK NOKTA: split="test" diyerek modelin sadece test klasörüne bakmasını sağlıyoruz
    metrics = model.val(data=os.path.abspath("data/processed"), split="test")
    
    print("\n" + "="*50)
    print("GERÇEK DÜNYA TEST SONUÇLARI")
    print("="*50)
    print(f"Top-1 Doğruluk (Accuracy): % {metrics.top1 * 100:.2f}")
    print(f"Top-5 Doğruluk (Accuracy): % {metrics.top5 * 100:.2f}")
    print("="*50)

if __name__ == "__main__":
    evaluate_model()