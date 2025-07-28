export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to HospitalCare</h1>
      <p className="text-lg text-gray-600 mb-8">Book appointments or manage your hospital dashboard</p>
      <div className="flex flex-col gap-6 items-center">
        <a href="/login/patient" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition w-80 text-lg font-semibold">Patient Login</a>
        <a href="/login/hospital" className="bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition w-80 text-lg font-semibold">Hospital Login</a>
        <a href="/login/admin" className="bg-gray-800 text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition w-80 text-lg font-semibold">Admin Login</a>
      </div>
    </main>
  );
}
