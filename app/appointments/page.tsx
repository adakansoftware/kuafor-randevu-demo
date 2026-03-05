import { BookingForm } from "@/components/booking-form";

export const dynamic = "force-dynamic";

export default function AppointmentsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Randevu Al</h1>
      <p className="mt-2 text-sm opacity-80">
        Uygun tarih ve saati seçerek randevunuzu oluşturabilirsiniz.
      </p>

      <div className="mt-8">
        <BookingForm />
      </div>
    </div>
  );
}