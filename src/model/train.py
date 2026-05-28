from ultralytics import YOLO
import os
import torch
import sys

def train_yolo_model():
    if torch.cuda.is_available():
        print("CUDA cihazı bulundu, eğitim GPU üzerinde yapılacak.")
    else:
        sys.exit("CUDA cihazı bulunamadı.")

    data_dir = os.path.abspath("data/processed")

    model = YOLO("yolo11n-cls.pt")

    results = model.train(
        data=data_dir,
        epochs=15,
        imgsz=224,
        batch=32,
        project="runs",
        name="plant_disease",
        device= 0
    )
    print("Eğitim tamamlandı!")
if __name__ == "__main__":
    train_yolo_model()