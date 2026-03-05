"use client"

import { useEffect, useState } from "react"

type Appointment = {
  id: string
  name: string
  phone: string
  email: string | null
  service: string | null
  date: string
  createdAt: string
}

export default function AdminAppointments() {

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  async function loadAppointments() {
    try {
      const res = await fetch("/api/appointments/admin")
      const data = await res.json()

      if (data.ok) {
        setAppointments(data.items)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAppointments()
  }, [])

  async function deleteAppointment(id: string) {

    const ok = confirm("Bu randevuyu silmek istiyor musunuz?")
    if (!ok) return

    await fetch(`/api/appointments/admin/delete/${id}`, {
      method: "POST"
    })

    setAppointments(prev => prev.filter(a => a.id !== id))
  }

  if (loading) {
    return (
      <div className="p-10">
        <h1 className="text-xl font-semibold">Yükleniyor...</h1>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-10">

      <h1 className="text-2xl font-semibold mb-6">
        Randevu Yönetimi
      </h1>

      <div className="border rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">İsim</th>
              <th className="text-left p-3">Telefon</th>
              <th className="text-left p-3">Hizmet</th>
              <th className="text-left p-3">Tarih</th>
              <th className="text-left p-3">WhatsApp</th>
              <th className="text-left p-3">Sil</th>
            </tr>
          </thead>

          <tbody>

            {appointments.map((a) => {

              const phone = a.phone.replace(/\D/g, "")
              const wa = phone.startsWith("0")
                ? `https://wa.me/90${phone.slice(1)}`
                : `https://wa.me/${phone}`

              return (
                <tr key={a.id} className="border-t">

                  <td className="p-3">
                    {a.name}
                  </td>

                  <td className="p-3">
                    {a.phone}
                  </td>

                  <td className="p-3">
                    {a.service}
                  </td>

                  <td className="p-3">
                    {new Date(a.date).toLocaleString("tr-TR")}
                  </td>

                  <td className="p-3">
                    <a
                      href={wa}
                      target="_blank"
                      className="text-green-600 underline"
                    >
                      WhatsApp
                    </a>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => deleteAppointment(a.id)}
                      className="text-red-600 underline"
                    >
                      Sil
                    </button>
                  </td>

                </tr>
              )
            })}

          </tbody>

        </table>

      </div>

    </div>
  )
}