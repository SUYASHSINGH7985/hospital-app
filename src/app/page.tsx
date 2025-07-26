export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to HospitalCare</h1>
      <p className="text-lg text-gray-600 mb-8">Book appointments or manage your hospital dashboard</p>
      <div className="flex gap-4">
        <a href="/login/patient" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">Login as Patient</a>
        <a href="/login/hospital" className="bg-gray-200 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-100 transition">Login as Hospital</a>
      </div>
    </main>
  );
}
