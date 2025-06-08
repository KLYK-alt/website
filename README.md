Klyk Application Documentation  

Overview  
Klyk is a modern web application built using Next.js, React, and Supabase. Designed as a comprehensive platform, it features services, testimonials, a blog system, and more.  

Technology Stack  
- Frontend Framework: Next.js 15.3.2  
- UI Library: React 19.0.0  
- Database: Supabase  
- Styling:  
  - Bootstrap 5.3.6  
  - Bootstrap Icons 1.13.1  
  - Custom CSS Modules  
- Animation: Framer Motion 12.12.1  
- Email Integration: Nodemailer with Gmail SMTP  
- Development Tools: TypeScript, ESLint, Turbopack  

Project Structure  

klyk/  
├── src/  
│   ├── app/                  # Main application code  
│   │   ├── components/      # Reusable UI components  
│   │   ├── api/            # API routes  
│   │   ├── about/          # About page  
│   │   ├── blog/           # Blog functionality  
│   │   ├── service/        # Service-related pages  
│   │   ├── testimonials/   # Testimonials section  
│   │   ├── whyus/         # Why choose us section  
│   │   └── utils/         # Utility functions  
│   └── integrations/       # Third-party integrations  
├── public/                  # Static assets  
└── supabase/               # Supabase configuration  


Key Features  
1. Responsive Design  
   - Support for both mobile and desktop UI  
   - Bootstrap-based responsive layout  
   - Custom CSS modules for styling  

2. Dynamic Content  
    - Blog system (e.g., "Latest in EV Technology" section on Home page)  
    - Testimonials management (including client testimonials, names, and feedback)  
    - Service showcase  
    - About section (editable team members: images, names, designations)  
    - Dashboard-controlled metrics:  
      - Training Programs Delivered (count)  
      - Professionals Trained (count)  
      - Client Satisfaction Rate (count)  
      - Corporate Partners (count and names)  
      - Trusted by industry leaders (partnering company names)  

3. Integration Features  
   - Email functionality with Nodemailer  
   - Supabase database integration  
   - API routes for backend support  

Getting Started  

Prerequisites  
- Latest LTS version of Node.js  
- npm or yarn package manager  
- Supabase account setup  

Installation  
1. Clone the repository  
2. Install dependencies:  
   ```
   npm install  
   # or  
   yarn install  
   ```  

Development  
To run the development server:  
```
npm run dev  
# or  
yarn dev  

Application available at `http://localhost:3000`.  

Building for Production  
To create a production build:  
```
npm run build  
# or  
yarn build  
```
To start the production server:  
```
npm run start  
# or  
yarn start  
```  

Environment Setup  
Create a `.env.local` file in the root directory with these variables:  

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url  
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key  
EMAIL_USER=your_gmail_address  
EMAIL_PASS=your_gmail_app_password  

Maintenance and Updates  
Code Quality  
- ESLint configured for linting and formatting  
- Run linting:  
  ```
  npm run lint  
  # or  
  yarn lint  
  ```  

Dependencies  
- Regular updates recommended  
- Check for security vulnerabilities using:  
  ```
  npm audit  
  # or  
  yarn audit  
  ```  

Support and Contact  
For technical support or questions, reach out to the development team.  

License  
This project is private and proprietary. All rights reserved.  

Note: This documentation may be updated as the application evolves.