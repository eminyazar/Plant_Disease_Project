# 🌿 AI Plant Doctor

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi) ![YOLO11](https://img.shields.io/badge/YOLO-11-blue) ![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=pytorch)

A full-stack, AI-powered web application that acts as a digital botanist. It allows users to upload photos of plant leaves and instantly diagnoses diseases using a state-of-the-art computer vision model. 

Designed with a modern microservices architecture, separating the heavy AI inference engine from the user-facing web client.

## ✨ What It Does
* **Instant Diagnosis:** Users can drag & drop a leaf image and get results in milliseconds.
* **Smart Detection:** Recognizes 15 different plant conditions (including healthy leaves, early blights, and viruses).
* **Confidence Scoring:** Returns a transparent probability score for every diagnosis.
* **Modern UI/UX:** A clean, responsive interface built with Tailwind CSS.
<img width="485" height="650" alt="image" src="https://github.com/user-attachments/assets/e3d3d1d4-f9a3-4a19-b73f-d7b7b0ecb363" />
<br>
<img width="700" height="700" alt="confusion_matrix" src="https://github.com/user-attachments/assets/db783896-8144-4efd-b9b0-93ae6925445d" />

## 🏗️ Architecture & Tech Stack
The project is decoupled into two main services to ensure scalability:

* **Frontend (User Interface):** Built with `Next.js` (App Router) and `TypeScript`. Styled with `Tailwind CSS`.
* **Backend (AI Inference Engine):** A blazing-fast `FastAPI` server that handles image processing, CORS, and AI predictions.
* **Machine Learning:** Powered by `YOLO11` (Ultralytics) for image classification, accelerated via `PyTorch` (CUDA).

## 🧠 AI Engineering Highlights
As an AI Engineer, building the model was about more than just calling an API:
* **Rigorous Data Pipeline:** The dataset was meticulously cleaned and stratified into Train (80%), Validation (10%), and Test (10%) splits to prevent data leakage.
* **High Baseline Accuracy:** Achieved **99.95%** Top-1 Accuracy on the isolated test set in laboratory conditions.
* **Real-world Readiness:** Acknowledged the *Domain Shift* challenge. While lab results are near-perfect, the system is designed with active learning in mind to handle complex, noisy backgrounds (soil, sunlight) when deployed in actual agricultural fields.

## 🚀 Quick Start

**1. Start the Backend (API)**
```bash
# Navigate to the root directory and install dependencies
pip install fastapi uvicorn python-multipart ultralytics pillow
# Run the FastAPI server (Runs on port 8000)
uvicorn api.main:app --reload
```
## Open a new terminal, navigate to the frontend folder
```bash
cd frontend
npm install
# Start the Next.js server (Runs on port 3000)
npm run dev
```
Visit http://localhost:3000 to use the application!
