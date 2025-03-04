# **Frontend Technical Test: Store Configuration Interface**

## **Overview**
Many free-to-play games rely on in-game stores for monetization. These stores continuously evolve with new content, promotions, and seasonal events. To manage them effectively, game developers and editors need an intuitive store configuration interface.

### **Examples of In-Game Stores**
- [Fortnite Item Shop](https://www.fortnite.com/item-shop?lang=fr)
- [Genshin Impact Shop](https://genshin-impact.fandom.com/wiki/Shop)
- [World of Warcraft Shop](https://us.shop.battle.net/fr-fr/family/world-of-warcraft)

This test evaluates your ability to **design and implement a store configuration interface** that allows administrators to manage in-game store content dynamically.

---

## **Test Breakdown**
This assessment consists of three parts:

1. **In-Game Store Design & Wireframe** – Create a clear and intuitive wireframe for the in-game store interface.
2. **Technical Implementation** – Develop the in-game store interface using **React (TypeScript)** and connect it to a **mock API**.
3. **Store Administration Interface (Concept & UX Design)** – Propose a user-friendly administration interface for managing in-game store content over time.

---

## **Part A: In-Game Store Design & Wireframe**
### **Objective**
Design an in-game interface that allows users to preview a store page based on different product display formats.

### **Key Requirements**
- **Carousel View**: Displays products one at a time, navigable with arrows.
- **Grid View**: Displays products in a structured grid format.
- **Infinite Scroll**: Dynamically loads products as users scroll down.

### **Instructions**
1. Create a **wireframe** that visually represents how products will be displayed.
2. Provide a **brief rationale** for your design choices (e.g., why a grid might work better for specific store types).
3. Ensure the wireframe considers **usability and accessibility**.

**Deliverable:** Wireframe sketches (Figma, Adobe XD, or any tool of choice) and a short explanation of your approach.

---

## **Part B: Technical Implementation – In-Game Store Page**
### **Objective**
Develop an interactive in-game store page based on your wireframe.

### **Implementation Guidelines**
- Use **React (TypeScript)**.
- Implement the **three UI components** designed in Part A (**Carousel, Grid, Infinite Scroll**).
- Fetch store products dynamically using a **mocked API** (JSON or simple endpoint simulation).
- Ensure **smooth transitions** and **intuitive navigation** between views.

**Deliverable:** A working React project with clear documentation on how to run it.

---

## **Part C: Store Administration Interface (Concept & UX Design)**
### **Objective**
Design a **store administration interface** that allows game editors to manage products, schedule updates, and configure in-game store content efficiently.

### **Key Features to Consider**
- **CRUD Operations**: Add, edit, delete, and organize store products.
- **Store Preview Mode**: View the store as players would see it before publishing changes.
- **Scheduled Updates & Promotions**: Ability to set time-based promotions and future store configurations.
- **Testing & Publishing**: Track store versions and ability to deploy store on different environments and sandboxes.

### **Instructions**
- Focus on **usability** and **ergonomics** of the admin interface.
- Consider how users will **navigate**, **search**, and **manage** store content efficiently.
- Provide **flowcharts, wireframes, or UI mockups** (no technical implementation needed).

**Deliverable:** Wireframes, user flows, or UI designs that illustrate your vision for the admin interface.

---

## **Evaluation Criteria**
Your submission will be evaluated based on:

**Clarity & Structure** – Well-organized and logical approach to problem-solving.  
**Code Quality** – Clean, modular, and maintainable React (TypeScript) implementation.  
**API Handling** – Efficient use of the mocked API with proper error handling.  
**Usability & UX Design** – Intuitive, accessible, and visually appealing interfaces.  
**Performance & Scalability** – Considerations for smooth interactions and store evolution.  
**Testing & Reliability** – Basic unit/integration tests and resilience against edge cases.  

---

## **Submission Details**
Please submit your solution as a **public Git repository** (GitHub, GitLab, etc.), including:

- The complete source code.
- A README with instructions.
- Any additional comments or documentation.