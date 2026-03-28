# 🎓 Exam Class Allocator

A modern, professional, and glassmorphism-inspired web application designed to help students quickly find their designated exam classrooms. Built with a focus on user experience, responsiveness, and sleek aesthetics.

---

## 🚀 Features

-   **✨ Modern Glassmorphism UI**: A visually stunning interface with blur effects, gradients, and ambient lighting.
-   **📱 Fully Responsive**: Optimized for all devices, from mobile phones to desktop monitors.
-   **🔍 Quick Allocation**: Instantly find your room number and subject by entering your roll number, department, and semester.
-   **⚡ Real-time Validation**: Smooth input validation with shake animations and error messaging.
-   **🎨 Premium Animations**: Interactive button glows, loading states, and modal entrance animations.
-   **🏛️ Multi-Department Support**: Supports AIDS, Computer Science, Information Technology, and Mechanical Engineering.

---

## 📸 Screenshots

<div align="center">
  <img src="Screenshot 2026-03-28 at 13.21.22.png" width="400" alt="Home Screen">
  <img src="Screenshot 2026-03-28 at 13.21.38.png" width="400" alt="Allocation Result">
</div>

---

## 🛠️ Technologies Used

-   **HTML5**: Semantic structure.
-   **[Tailwind CSS](https://tailwindcss.com/)**: Modern utility-first CSS framework for styling.
-   **JavaScript (ES6+)**: Core application logic and DOM manipulation.
-   **[Google Fonts (Outfit)](https://fonts.google.com/specimen/Outfit)**: Clean and modern typography.
-   **[Font Awesome](https://fontawesome.com/)**: Beautiful vector icons.

---

## 📖 How to Use

1.  **Enter Your Details**: Input your Roll Number, select your Department, and choose your Semester.
2.  **Click "Find My Seat"**: The system will process your information with a premium loading animation.
3.  **View Results**: A sleek modal will appear displaying your allocated Room Number (e.g., `EL-211`), Subject Name, and verified details.
4.  **Done**: Click "Done" or outside the modal to return to the home screen.

---

## 🏗️ Architecture

The application uses a simple but effective room allocation logic based on roll numbers:
-   **Room Index**: Calculated by dividing the roll number by 30 (`Math.ceil(rollNo / 30)`).
-   **Room Prefix**: Automatically assigned based on the department (e.g., `CS-`, `IT-`, `ME-`, `EL-`).
-   **Room Number**: A base room number (`205`) incremented by the calculated room index.

---

## 👨‍💻 Built By

**Atharv**  
Built with ❤️ to make exam seat finding easier for everyone.
