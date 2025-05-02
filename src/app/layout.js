// import "./globals.css";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import SideBar from "./component/sideBar/SideBar";

// export default async function RootLayout({ children }) {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;
//   let role = null;

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.TOKEN);

//       console.log(token, decoded, "token", "decoded");
//       role = decoded.role;
//       console.log(role, "role from layout.js");
//     } catch (error) {
//       if (error.name === "TokenExpiredError") {
//         console.warn("Token expired");
//       } else {
//         console.error("Invalid token:", error);
//       }
//     }
//   }

//   return (
//     <html lang="en">
//       <body className="flex">
//         {role && <SideBar role={role} />}
//         <main className="flex-1">{children}</main>
//       </body>
//     </html>
//   );
// }

// app/layout.js or app/layout.tsx
"use client"; // this must now be a client component

import "./globals.css";
import SideBar from "./component/sideBar/SideBar";
import useRole from "@/hooks/useRole";
export default function RootLayout({ children }) {
  const role = useRole();

  return (
    <html lang="en">
      <body className="flex">
        {role && <SideBar role={role} />}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
