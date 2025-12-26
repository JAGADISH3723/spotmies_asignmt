 Frontend (React / Next.js)
│
├── User Gallery UI
├── Upload Artwork
├── Public Exhibitions
├── Curator Dashboard
│
Backend (Node.js + Express)
│
├── Auth & Roles (User / Curator)
├── Artwork APIs
├── Exhibition APIs
├── AI Theme Generator
│
MongoDB Atlas
│
├── users
├── artworks
├── exhibitions
│
Cloudinary (Images + Thumbnails)
│
AI Service (Gemini / OpenAI)
| Layer         | Tech                                          |
| ------------- | --------------------------------------------- |
| Frontend      | React.js (or Next.js for SSR)                 |
| Backend       | Node.js + Express.js                          |
| Database      | MongoDB Atlas                                 |
| Image Storage | Cloudinary                                    |
| AI            | Google Gemini **or** OpenAI                   |
| Hosting       | Vercel (frontend), Render / Railway (backend) |
{
  _id,
  title,
  description,
  tags: ["abstract", "nature"],
  imageUrl,
  thumbnailUrl,
  uploadedBy,
  aiAnalysis: {
    mood,
    style,
    colors,
    suggestedThemes[]
  },
  createdAt
}

