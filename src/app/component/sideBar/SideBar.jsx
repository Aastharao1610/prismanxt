import React from 'react'

const SideBar = ({role}) => {
  return (
    <>
    <div>
    <div className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>


        {role==="admin" ?(
             <>
             <SidebarItem label="Admin Panel" href="/admin/dashboard" />
             <SidebarItem label="Manage Users" href="/admin/users" />
           </>
        ):(
            <>
            <SidebarItem label="my Profile" href="/users/dashboard" />
            <SidebarItem label="Manage Blogs" href="/user/blog" />
          </>
        )}
</div>
</div>
       
        </div></>
 
)
}
const SidebarItem = ({ label, href }) => (
    <a href={href} className="block py-2 px-4 hover:bg-gray-600">
      {label}
    </a>
)

export default SideBar