// "use client"

// import * as React from "react"
// import { useState } from 'react'
// import { cva, type VariantProps } from "class-variance-authority"
// import * as LabelPrimitive from "@radix-ui/react-label"
// import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
// import { Slot } from "@radix-ui/react-slot"
// import {
//   BarChart3,
//   Bell,
//   ChevronFirst,
//   ChevronLast,
//   LayoutDashboard,
//   Menu,
//   Search,
//   Settings,
//   UserPlus,
//   Users,
// } from "lucide-react"

// // Utility function for class names
// function cn(...inputs: (string | undefined)[]) {
//   return inputs.filter(Boolean).join(" ")
// }

// // Button Component
// const buttonVariants = cva(
//   "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary text-primary-foreground hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-destructive-foreground hover:bg-destructive/90",
//         outline:
//           "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
//         secondary:
//           "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-10 px-4 py-2",
//         sm: "h-9 rounded-md px-3",
//         lg: "h-11 rounded-md px-8",
//         icon: "h-10 w-10",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// )

// interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, size, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button"
//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     )
//   }
// )
// Button.displayName = "Button"

// // Input Component
// interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, ...props }, ref) => {
//     return (
//       <input
//         type={type}
//         className={cn(
//           "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
//           className
//         )}
//         ref={ref}
//         {...props}
//       />
//     )
//   }
// )
// Input.displayName = "Input"

// // Label Component
// const Label = React.forwardRef<
//   React.ElementRef<typeof LabelPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
// >(({ className, ...props }, ref) => (
//   <LabelPrimitive.Root
//     ref={ref}
//     className={cn(
//       "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
//       className
//     )}
//     {...props}
//   />
// ))
// Label.displayName = LabelPrimitive.Root.displayName

// // Card Components
// const Card = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn(
//       "rounded-lg border bg-card text-card-foreground shadow-sm",
//       className
//     )}
//     {...props}
//   />
// ))
// Card.displayName = "Card"

// const CardHeader = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn("flex flex-col space-y-1.5 p-6", className)}
//     {...props}
//   />
// ))
// CardHeader.displayName = "CardHeader"

// const CardTitle = React.forwardRef<
//   HTMLParagraphElement,
//   React.HTMLAttributes<HTMLHeadingElement>
// >(({ className, ...props }, ref) => (
//   <h3
//     ref={ref}
//     className={cn(
//       "text-2xl font-semibold leading-none tracking-tight",
//       className
//     )}
//     {...props}
//   />
// ))
// CardTitle.displayName = "CardTitle"

// const CardContent = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
// ))
// CardContent.displayName = "CardContent"

// // ScrollArea Component
// const ScrollArea = React.forwardRef<
//   React.ElementRef<typeof ScrollAreaPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
// >(({ className, children, ...props }, ref) => (
//   <ScrollAreaPrimitive.Root
//     ref={ref}
//     className={cn("relative overflow-hidden", className)}
//     {...props}
//   >
//     <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
//       {children}
//     </ScrollAreaPrimitive.Viewport>
//     <ScrollBar />
//     <ScrollAreaPrimitive.Corner />
//   </ScrollAreaPrimitive.Root>
// ))
// ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

// const ScrollBar = React.forwardRef<
//   React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
//   React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
// >(({ className, orientation = "vertical", ...props }, ref) => (
//   <ScrollAreaPrimitive.ScrollAreaScrollbar
//     ref={ref}
//     orientation={orientation}
//     className={cn(
//       "flex touch-none select-none transition-colors",
//       orientation === "vertical" &&
//         "h-full w-2.5 border-l border-l-transparent p-[1px]",
//       orientation === "horizontal" &&
//         "h-2.5 border-t border-t-transparent p-[1px]",
//       className
//     )}
//     {...props}
//   >
//     <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
//   </ScrollAreaPrimitive.ScrollAreaScrollbar>
// ))
// ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

// // Dashboard Component
// export default function Dashboard() {
//   const [isOpen, setIsOpen] = useState(true)
//   const [activeItem, setActiveItem] = useState('Dashboard')
//   const [searchTerm, setSearchTerm] = useState('')

//   const sidebarItems = [
//     { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
//     { icon: <UserPlus size={20} />, label: 'Add User' },
//     { icon: <Users size={20} />, label: 'All Users' },
//   ]

//   const userList = [
//     { id: 1, name: 'John Doe' },
//     { id: 2, name: 'Jane Smith' },
//     { id: 3, name: 'Bob Johnson' },
//     { id: 4, name: 'Alice Brown' },
//     { id: 5, name: 'Charlie Davis' },
//   ]

//   const filteredUsers = userList.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className={`bg-white ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
//         <nav className="h-full flex flex-col border-r shadow-sm">
//           <div className="p-4 pb-2 flex justify-between items-center">
//             <img
//               src="https://img.logoipsum.com/243.svg"
//               className={`overflow-hidden transition-all ${isOpen ? "w-32" : "w-0"}`}
//               alt="Logo"
//             />
//             <Button
//               onClick={() => setIsOpen(!isOpen)}
//               variant="ghost"
//               className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
//             >
//               {isOpen ? <ChevronFirst /> : <ChevronLast />}
//             </Button>
//           </div>

//           <ScrollArea className="flex-1">
//             {sidebarItems.map((item, index) => (
//               <Button
//                 key={index}
//                 variant="ghost"
//                 onClick={() => setActiveItem(item.label)}
//                 className={`relative flex items-center py-2 px-3 my-1
//                   font-medium rounded-md cursor-pointer
//                   transition-colors group w-full justify-start
//                   ${
//                     activeItem === item.label
//                       ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
//                       : "hover:bg-indigo-50 text-gray-600"
//                   }`}
//               >
//                 {item.icon}
//                 <span
//                   className={`overflow-hidden transition-all ${
//                     isOpen ? "w-52 ml-3" : "w-0"
//                   }`}
//                 >
//                   {item.label}
//                 </span>
//                 {activeItem === item.label && (
//                   <div
//                     className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
//                       isOpen ? "" : "top-2"
//                     }`}
//                   />
//                 )}
//               </Button>
//             ))}
//           </ScrollArea>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto">
//         {/* Top Navbar */}
//         <header className="bg-white shadow-sm">
//           <div className="flex items-center justify-between p-4">
//             <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
//               <Menu />
//             </Button>
//             <div className="flex items-center space-x-4">
//               <Button variant="ghost" size="icon">
//                 <Bell />
//               </Button>
//               <Button variant="ghost" size="icon">
//                 <Settings />
//               </Button>
//             </div>
//           </div>
//         </header>

//         {/* Dashboard Content */}
//         <div className="p-4">
//           {/* Top Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//             {['Total Users', 'Active Users', 'New Users'].map((title, index) => (
//               <Card key={index}>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">{title}</CardTitle>
//                   <BarChart3 className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{Math.floor(Math.random() * 1000)}</div>
//                   <p className="text-xs text-muted-foreground">
//                     +{Math.floor(Math.random() * 100)}% from last month
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* User List Card */}
//           <Card className="col-span-3">
//             <CardHeader>
//               <CardTitle>User List</CardTitle>
//               <div className="flex items-center space-x-2">
//                 <Search className="text-gray-400" />
//                 <Input
//                   type="text"
//                   placeholder="Search users..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="flex-1"
//                 />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <ScrollArea className="h-[300px]">
//                 {filteredUsers.map((user) => (
//                   <div key={user.id} className="flex items-center justify-between py-2">
//                     <span>{user.name}</span>
//                     <div>
//                       <Button variant="ghost" size="sm" className="mr-2">
//                         Edit
//                       </Button>
//                       <Button variant="ghost" size="sm">
//                         Delete
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </ScrollArea>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }