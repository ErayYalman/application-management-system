# 🚀 Başvuru Yönetim Sistemi (Application Management System)

Bu proje, kurum içi izin, avans, malzeme vb. başvuruların dijital ortamda yönetilmesini sağlayan Spring Boot & PostgreSQL tabanlı bir REST API sistemidir.

## 📐 Sistem Mimarisi ve Beyaz Tahta (Whiteboard)

Sistemin iş akışı ve durum (state) geçişlerini aşağıdaki beyaz tahta üzerinde görebilirsiniz. 

![Sistem Akışı](docs/architecture/system-design-whiteboard.png)

> 🔗 **Canlı Tasarım Linki:** (https://excalidraw.com/#json=wBzOjEMkp9xR1CE-2DWio,3GqSIBZJooUtrNfGhm141A)  
> 📝 *Not: Tasarımın kaynak dosyası (`system-design.excalidraw`) `docs/architecture/` klasörü altındadır.*

---

## 🗄️ Veritabanı Şeması (ER Diagram)

Projede 4 ana tablo kullanılmıştır. Veri bütünlüğünü sağlamak adına UUID, Soft Delete (is_active) ve Foreign Key kısıtlamaları (RESTRICT/CASCADE) uygulanmıştır.

![Veritabanı Şeması](docs/architecture/db-schema.png)


## Description

Corporate Application and Form Management System developed with Spring Boot and React.

---

## Technologies

- Java 21
- Spring Boot 3.5.x
- PostgreSQL
- Docker
- Flyway
- Spring Security
- JWT
- React
- Material UI

---

## Project Structure

```
backend/
frontend/
docker/
```

---

## Installation

Coming soon...

---

## License

Private Project