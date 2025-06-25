"use client"

import { useState, useEffect } from "react"
import { Trash2, Eye, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"

interface Contact {
  _id: string
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  createdAt: string
  status: "new" | "read" | "responded"
}

interface PaginationData {
  total: number
  page: number
  limit: number
  pages: number
}

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  })
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  useEffect(() => {
    fetchContacts()
  }, [pagination.page, statusFilter])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })

      if (statusFilter) {
        queryParams.append("status", statusFilter)
      }

      const res = await fetch(`/api/admin/contacts?${queryParams.toString()}`)
      const data = await res.json()

      if (data.success) {
        setContacts(data.data)
        setPagination(data.pagination)
      } else {
        setError(data.message || "Failed to fetch contacts")
      }
    } catch (error) {
      setError("An error occurred while fetching contacts")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact inquiry?")) {
      return
    }

    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (data.success) {
        // Remove the deleted contact from the state
        setContacts(contacts.filter((contact) => contact._id !== id))
        toast.success("Contact deleted successfully")
      } else {
        setError(data.message || "Failed to delete contact")
        toast.error(data.message || "Failed to delete contact")
      }
    } catch (error) {
      setError("An error occurred while deleting the contact")
      toast.error("An error occurred while deleting the contact")
      console.error(error)
    }
  }

  const handleUpdateStatus = async (id: string, status: "new" | "read" | "responded") => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      const data = await res.json()

      if (data.success) {
        // Update the contact in the state
        setContacts(contacts.map((contact) => (contact._id === id ? { ...contact, status } : contact)))

        // If viewing a contact, update its status in the modal too
        if (selectedContact && selectedContact._id === id) {
          setSelectedContact({ ...selectedContact, status })
        }

        toast.success(`Status updated to ${status}`)
      } else {
        setError(data.message || "Failed to update status")
        toast.error(data.message || "Failed to update status")
      }
    } catch (error) {
      setError("An error occurred while updating the status")
      toast.error("An error occurred while updating the status")
      console.error(error)
    }
  }

  const handleViewContact = async (contact: Contact) => {
    setSelectedContact(contact)
    setIsViewModalOpen(true)

    // If the contact is new, mark it as read
    if (contact.status === "new") {
      handleUpdateStatus(contact._id, "read")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <span className="px-2 py-1 inline-flex items-center text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            New
          </span>
        )
      case "read":
        return (
          <span className="px-2 py-1 inline-flex items-center text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            <Eye className="h-3 w-3 mr-1" />
            Read
          </span>
        )
      case "responded":
        return (
          <span className="px-2 py-1 inline-flex items-center text-xs font-medium rounded-full bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Responded
          </span>
        )
      default:
        return null
    }
  }

  if (loading && contacts.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-dark" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-xl font-semibold font-poppins text-gray-800">Contact Inquiries</h2>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPagination((prev) => ({ ...prev, page: 1 })) // Reset to first page on filter change
            }}
            className="px-3 py-2 border text-black font-roboto border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
          >
            <option className="text-black font-roboto  " value="">All Statuses</option>
            <option className="text-black font-roboto " value="new">New</option>
            <option className="text-black font-roboto " value="read">Read</option>
            <option className="text-black font-roboto  " value="responded">Responded</option>
          </select>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-500 border-b">{error}</div>}

      {contacts.length === 0 ? (
        <div className="p-8 text-center text-gray-500">No contact inquiries found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left font-roboto text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left font-roboto text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left font-roboto text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left font-roboto text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {contact.firstName} {contact.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-roboto text-gray-500">{contact.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-roboto text-gray-900 truncate max-w-[200px]">{contact.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-roboto text-gray-500">{format(new Date(contact.createdAt), "MMM d, yyyy")}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(contact.status)}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewContact(contact)}
                        className="p-1 font-roboto rounded text-blue-500 hover:bg-blue-50"
                        title="View"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="p-1 font-roboto rounded text-red-500 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-500">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className={`p-2 rounded ${
                pagination.page === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-700">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.pages}
              className={`p-2 rounded ${
                pagination.page === pagination.pages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* View Contact Modal */}
      {isViewModalOpen && selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Contact Details</h3>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1 font-roboto">Name</div>
                  <div className="text-lg font-medium text-black font-roboto">
                    {selectedContact.firstName} {selectedContact.lastName}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1 font-roboto">Email</div>
                  <div className="text-lg font-medium text-black font-roboto">{selectedContact.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1 font-roboto">Date</div>
                  <div className="text-lg font-medium text-black font-roboto">{format(new Date(selectedContact.createdAt), "PPP p")}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1 font-roboto">Status</div>
                  <div className="text-lg font-medium text-black font-roboto">{getStatusBadge(selectedContact.status)}</div>
                </div>
              </div>
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1 font-roboto">Subject</div>
                <div className="text-lg font-medium text-black font-roboto">{selectedContact.subject}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1 font-roboto">Message</div>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-black font-roboto">{selectedContact.message}</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-6 border-t bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Mark as:</span>
                <button
                  onClick={() => handleUpdateStatus(selectedContact._id, "new")}
                  disabled={selectedContact.status === "new"}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    selectedContact.status === "new"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
                >
                  New
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedContact._id, "read")}
                  disabled={selectedContact.status === "read"}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    selectedContact.status === "read"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  }`}
                >
                  Read
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedContact._id, "responded")}
                  disabled={selectedContact.status === "responded"}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    selectedContact.status === "responded"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                >
                  Responded
                </button>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

