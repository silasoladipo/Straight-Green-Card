import React, { useState, useEffect } from 'react'
import { Bell, FileText, Home, LogOut, Settings, Upload, Book, DollarSign, Calendar as CalendarIcon, MoreVertical, Star, Check, ChevronRight, Menu, X } from 'lucide-react'

// Dummy data
const userData = {
  name: "Silas Oladipo",
  email: "silasdshuru@gmail.com",
  avatar: "/placeholder.svg?height=40&width=40"
}

const notificationData = [
  { id: 1, message: "New document uploaded", time: "2 hours ago" },
  { id: 2, message: "Invoice ready for payment", time: "1 day ago" },
  { id: 3, message: "Status update on your case", time: "3 days ago" },
]

const trackerData = [
  { id: 1, stage: "Onboarding", status: "completed", date: "2023-05-01" },
  { id: 2, stage: "First Draft", status: "completed", date: "2023-05-15" },
  { id: 3, stage: "Recommendation Letters", status: "in-progress", date: "2023-06-01" },
  { id: 4, stage: "Final Review", status: "pending", date: "2023-06-15" },
]

const invoiceData = [
  { 
    id: 1, 
    type: "Initial Payment", 
    amount: 2000, 
    status: "Paid", 
    date: "2023-05-01",
    details: [
      { description: "Initial consultation", amount: 500 },
      { description: "Document preparation", amount: 1000 },
      { description: "Filing fees", amount: 500 },
    ]
  },
  { 
    id: 2, 
    type: "Final Payment", 
    amount: 3000, 
    status: "Pending", 
    date: "2023-06-15",
    details: [
      { description: "Legal research", amount: 1000 },
      { description: "Court appearances", amount: 1500 },
      { description: "Final document preparation", amount: 500 },
    ]
  },
]

const uploadedFiles = [
  { id: 1, name: "Passport.jpg", size: "45.78 Mb", date: "26 Dec 2023 3:40 PM", status: "Urgent" },
  { id: 2, name: "Immigration form.pdf", size: "22.89 Mb", date: "25 Dec 2023 2:40 PM", status: "Done" },
  { id: 3, name: "Immigration form.pdf", size: "22.89 Mb", date: "25 Dec 2023 2:40 PM", status: "Done" },
  { id: 4, name: "Immigration form.pdf", size: "22.89 Mb", date: "25 Dec 2023 2:40 PM", status: "Done" },
]

const deadlines = [
  { id: 1, title: "Submit Documents", date: new Date(2024, 9, 5) },
  { id: 2, title: "Court Hearing", date: new Date(2024, 9, 15) },
  { id: 3, title: "File Appeal", date: new Date(2024, 9, 25) },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [date, setDate] = useState(new Date())
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />
      case 'tracker':
        return <TrackerContent />
      case 'notifications':
        return <NotificationContent />
      case 'invoice':
        return <InvoiceContent />
      case 'upload':
        return <UploadContent />
      case 'knowledge':
        return <KnowledgeBaseContent />
      case 'settings':
        return <SettingsContent />
      case 'calendar':
        return <CalendarContent date={date} setDate={setDate} />
      default:
        return <DashboardContent />
    }
  }

  const SidebarContent = () => (
    <div className="h-full bg-gradient-to-b from-[#3D3A6D] to-[#2C2952] text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Straight</h2>
      </div>
      <nav className="mt-6">
        <SidebarItem icon={<Home className="w-5 h-5" />} label="Dashboard" onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }} active={activeTab === 'dashboard'} />
        <SidebarItem icon={<FileText className="w-5 h-5" />} label="Tracker" onClick={() => { setActiveTab('tracker'); setIsSidebarOpen(false); }} active={activeTab === 'tracker'} />
        <SidebarItem icon={<Bell className="w-5 h-5" />} label="Notifications" onClick={() => { setActiveTab('notifications'); setIsSidebarOpen(false); }} active={activeTab === 'notifications'} />
        <SidebarItem icon={<CalendarIcon className="w-5 h-5" />} label="Calendar" onClick={() => { setActiveTab('calendar'); setIsSidebarOpen(false); }} active={activeTab === 'calendar'} />
        <SidebarItem icon={<DollarSign className="w-5 h-5" />} label="Invoice" onClick={() => { setActiveTab('invoice'); setIsSidebarOpen(false); }} active={activeTab === 'invoice'} />
        <SidebarItem icon={<Upload className="w-5 h-5" />} label="Upload Files" onClick={() => { setActiveTab('upload'); setIsSidebarOpen(false); }} active={activeTab === 'upload'} />
        <SidebarItem icon={<Book className="w-5 h-5" />} label="Knowledge Base" onClick={() => { setActiveTab('knowledge'); setIsSidebarOpen(false); }} active={activeTab === 'knowledge'} />
        <SidebarItem icon={<Settings className="w-5 h-5" />} label="Profile Settings" onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }} active={activeTab === 'settings'} />
        <SidebarItem icon={<LogOut className="w-5 h-5" />} label="Logout" onClick={() => console.log('Logout clicked')} />
      </nav>
    </div>
  )

  return (
    <div className="flex h-screen bg-[#F0F0F8]">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:block w-64 shadow-lg">
        <SidebarContent />
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-2">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold text-[#3D3A6D]">Straight</h2>
        </div>
      </div>

      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute top-0 left-0 bottom-0 w-64 bg-white">
            <SidebarContent />
            <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto pt-16 md:pt-0">
        <header className={`flex flex-col md:flex-row justify-between items-center mb-8 sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white bg-opacity-80 backdrop-blur-md shadow-md p-4 -mx-4 md:-mx-8' : ''}`}>
          <h1 className="text-2xl md:text-3xl font-bold text-[#3D3A6D] mb-4 md:mb-0">Welcome, {userData.name}</h1>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <input type="text" placeholder="Search here" className="w-full md:w-64 px-4 py-2 border rounded-md" />
            <button className="relative p-2 bg-white rounded-full shadow-md">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-600">{userData.name.charAt(0)}</span>
            </div>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  )
}

function SidebarItem({ icon, label, onClick, active = false }) {
  return (
    <button
      className={`flex items-center w-full px-6 py-3 text-left transition-colors duration-200 ${
        active ? 'bg-white bg-opacity-10 text-white' : 'text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  )
}

function DashboardContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#3D3A6D] mb-4">Case Tracker</h2>
        <div className="space-y-8 relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          {trackerData.map((stage, index) => (
            <div key={stage.id} className="flex items-center relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${
                stage.status === 'completed' ? 'bg-[#3D3A6D]' :
                stage.status === 'in-progress' ? 'bg-[#6E6AAD]' : 'bg-gray-300'
              }`}>
                {stage.status === 'completed' && <Check className="text-white w-5 h-5" />}
                {stage.status === 'in-progress' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-[#3D3A6D]">{stage.stage}</h3>
                <p className="text-sm text-gray-500">{stage.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#3D3A6D] mb-4">Recent Notifications</h2>
        {notificationData.slice(0, 3).map((notification) => (
          <div key={notification.id} className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-[#3D3A6D]">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TrackerContent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3D3A6D] mb-4">Case Tracker</h2>
      <p className="text-gray-600 mb-6">Track the progress of your case</p>
      <div className="space-y-8 relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        {trackerData.map((stage, index) => (
          <div key={stage.id} className="flex items-center relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${
              stage.status === 'completed' ? 'bg-[#3D3A6D]' :
              stage.status === 'in-progress' ? 'bg-[#6E6AAD]' : 'bg-gray-300'
            }`}>
              {stage.status === 'completed' && <Check className="text-white w-6 h-6" />}
              {stage.status === 'in-progress' && <div className="w-3 h-3 bg-white rounded-full" />}
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-medium text-[#3D3A6D]">{stage.stage}</h3>
              <p className="text-sm text-gray-500">{stage.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationContent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3D3A6D] mb-4">Notifications</h2>
      {notificationData.map((notification) => (
        <div key={notification.id} className="mb-4 p-4 bg-[#F0F0F8] rounded-lg">
          <p className="text-[#3D3A6D]">{notification.message}</p>
          <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
        </div>
      ))}
    </div>
  )
}

function InvoiceContent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3D3A6D] mb-4">Invoice</h2>
      <p className="text-gray-600 mb-6">Your payment details</p>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{invoice.type}</td>
                <td className="px-4 py-2">${invoice.amount.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-4 py-2">{invoice.date}</td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 bg-[#3D3A6D] text-white rounded-md text-sm">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function UploadContent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3D3A6D] mb-4">Documents Request</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-[#F0F0F8] rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText className="w-8 h-8 text-[#3D3A6D]" />
                  <div>
                    <p className="font-medium text-[#3D3A6D]">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.size} • {file.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    file.status === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {file.status}
                  </span>
                  <Star className="w-5 h-5 text-yellow-400" />
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="bg-[#F0F0F8] p-6 rounded-lg">
            <div className="flex flex-col items-center justify-center">
              <Upload className="w-16 h-16 text-[#3D3A6D] mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-[#3D3A6D]">Go to Drive</h3>
              <p className="text-sm text-center text-gray-500 mb-4">Upload requested document to google drive</p>
              <button className="w-full bg-[#3D3A6D] text-white py-2 rounded-md hover:bg-[#4E4A8A] transition-colors duration-200">Go to Drive</button>
            </div>
          </div>
          <div className="mt-4 p-4 bg-[#F0F0F8] rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#3D3A6D]">3/22 Files Left</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/4 h-full bg-[#3D3A6D] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KnowledgeBaseContent() {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const articles = [
    { id: 1, title: "Understanding the Legal Process", description: "An overview of what to expect during your case.", content: "The legal process can be complex and intimidating. This article provides a comprehensive overview of the steps involved in a typical legal case, from initial consultation to final resolution. You'll learn about important milestones, key players in the legal system, and what to expect at each stage of your case." },
    { id: 2, title: "Document Preparation Guide", description: "How to prepare and organize your legal documents.", content: "Proper document preparation is crucial for the success of your legal case. This guide walks you through the process of gathering, organizing, and presenting your legal documents effectively. Learn about common types of legal documents, best practices for document management, and how to ensure your paperwork is complete and accurate." },
    { id: 3, title: "FAQs about Legal Proceedings", description: "Common questions and answers about legal processes.", content: "This article addresses the most frequently asked questions about legal proceedings. From understanding legal terminology to knowing what to wear to court, we cover a wide range of topics to help demystify the legal process. Find answers to questions about court etiquette, the role of different legal professionals, and what to expect during various types of legal proceedings." },
    { id: 4, title: "Legal Terminology Explained", description: "A guide to common legal terms and their meanings.", content: "Legal jargon can be confusing and overwhelming. This comprehensive glossary explains common legal terms in plain language, helping you better understand legal documents and communications. From 'affidavit' to 'writ', we break down complex legal terminology into easy-to-understand definitions." },
    { id: 5, title: "Your Rights and Responsibilities", description: "Understanding your legal rights and obligations.", content: "Knowing your legal rights and responsibilities is essential in any legal matter. This article provides an overview of fundamental legal rights, including constitutional rights, consumer rights, and rights in specific legal situations. We also discuss the responsibilities that come with these rights and how to exercise them effectively." },
    { id: 6, title: "Navigating Court Procedures", description: "A step-by-step guide to court proceedings.", content: "Court procedures can be intimidating, especially for those unfamiliar with the legal system. This step-by-step guide walks you through what to expect when attending court, including security procedures, courtroom etiquette, and the general flow of proceedings. Learn about different types of hearings, what happens during a trial, and how to prepare for your day in court." },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3D3A6D] mb-4">Knowledge Base</h2>
      <p className="text-gray-600 mb-6">Helpful articles and resources</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <div key={article.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-[#3D3A6D] mb-2">{article.title}</h3>
            <p className="text-gray-600 mb-4">{article.description}</p>
            <button 
              className="text-[#3D3A6D] hover:text-[#4E4A8A] transition-colors duration-200"
              onClick={() => setSelectedArticle(article)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-3xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-[#3D3A6D] mb-4">{selectedArticle.title}</h2>
            <p className="text-gray-700 mb-4">{selectedArticle.content}</p>
            <button 
              className="bg-[#3D3A6D] text-white px-4 py-2 rounded-md hover:bg-[#4E4A8A] transition-colors duration-200"
              onClick={() => setSelectedArticle(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function SettingsContent() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3D3A6D] mb-4">Settings</h2>
      <div className="mb-6">
        <button 
          className={`mr-4 pb-2 ${activeTab === 'profile' ? 'border-b-2 border-[#3D3A6D] text-[#3D3A6D]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`pb-2 ${activeTab === 'security' ? 'border-b-2 border-[#3D3A6D] text-[#3D3A6D]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
      </div>
      {activeTab === 'profile' ? (
        <form className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-[#3D3A6D]">First name</label>
            <input id="firstName" type="text" defaultValue="Silas" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-[#3D3A6D]">Last name</label>
            <input id="lastName" type="text" defaultValue="Oladipo" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#3D3A6D]">Email address</label>
            <input id="email" type="email" defaultValue="silasdshuru@gmail.com" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#3D3A6D]">Birthday</label>
            <div className="flex space-x-4 mt-1">
              <select defaultValue="May" className="block w-full rounded-md border-gray-300 shadow-sm">
                <option>May</option>
                {/* Add other months */}
              </select>
              <select defaultValue="29" className="block w-full rounded-md border-gray-300 shadow-sm">
                <option>29</option>
                {/* Add other days */}
              </select>
              <select defaultValue="1992" className="block w-full rounded-md border-gray-300 shadow-sm">
                <option>1992</option>
                {/* Add other years */}
              </select>
            </div>
          </div>
          <button className="w-full bg-[#3D3A6D] text-white py-2 rounded-md hover:bg-[#4E4A8A] transition-colors duration-200">Save changes</button>
        </form>
      ) : (
        <form className="space-y-4">
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-[#3D3A6D]">Old Password</label>
            <input id="oldPassword" type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-[#3D3A6D]">New Password</label>
            <input id="newPassword" type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#3D3A6D]">Confirm Password</label>
            <input id="confirmPassword" type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <button className="w-full bg-[#3D3A6D] text-white py-2 rounded-md hover:bg-[#4E4A8A] transition-colors duration-200">Save changes</button>
        </form>
      )}
    </div>
  )
}

function CalendarContent({ date, setDate }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3D3A6D] mb-4">Calendar</h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <button className="mb-2 md:mb-0 px-4 py-2 bg-[#3D3A6D] text-white rounded-md">Today</button>
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <button className="px-2 py-1 bg-gray-200 rounded-md">&lt;</button>
          <h2 className="text-xl font-semibold text-[#3D3A6D]">October 2024</h2>
          <button className="px-2 py-1 bg-gray-200 rounded-md">&gt;</button>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded-md">Day</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md">Week</button>
          <button className="px-4 py-2 bg-[#3D3A6D] text-white rounded-md">Month</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          {/* Simple calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold">{day}</div>
            ))}
            {Array.from({ length: 35 }, (_, i) => (
              <div 
                key={i} 
                className={`text-center p-2 rounded-full cursor-pointer ${
                  i + 1 === date.getDate() ? 'bg-[#3D3A6D] text-white' : 'hover:bg-gray-200'
                }`}
                onClick={() => setDate(new Date(2024, 9, i + 1))}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-[#3D3A6D] mb-4">Upcoming Deadlines</h3>
          <ul className="space-y-4">
            {deadlines.map((deadline) => (
              <li key={deadline.id} className="flex items-center justify-between p-2 bg-white rounded-lg">
                <div>
                  <p className="font-medium text-[#3D3A6D]">{deadline.title}</p>
                  <p className="text-sm text-gray-500">{deadline.date.toDateString()}</p>
                </div>
                <ChevronRight className="text-gray-400" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}