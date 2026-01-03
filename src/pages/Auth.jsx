export default function Auth() {
  return (
    <div className="bg-white p-8 rounded-xl shadow w-96">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Student Login
      </h1>

      <button className="w-full bg-blue-600 text-white py-2 rounded mb-3">
        Continue with Google
      </button>

      <button className="w-full border py-2 rounded">
        Continue with Email
      </button>
    </div>
  );
}
