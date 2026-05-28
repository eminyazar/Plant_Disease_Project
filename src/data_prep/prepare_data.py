import splitfolders

# Senin hazırladığın temiz ham veri klasörü
input_folder = "data/raw/PlantVillage"
output_folder = "data/processed"

print("Veriler Train (%80), Val (%10) ve Test (%10) olarak bölünüyor (Stratified)...")

# Her sınıfı kendi içinde oranlayarak böler
splitfolders.ratio(
    input_folder, 
    output=output_folder, 
    seed=42, 
    ratio=(0.8, 0.1, 0.1), 
    group_prefix=None
)

print("İşlem tamamlandı! 'data/processed' klasörü altında train, val ve test klasörlerin hazır.")