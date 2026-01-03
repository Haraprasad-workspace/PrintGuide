export default function FileUploadCard() {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Upload PDF</h3>

      <div className="border-2 border-dashed rounded-lg p-6 text-center text-gray-500">
        Click or Drag PDF Here
      </div>

      <div className="mt-3 text-sm">
        <p>File: sample.pdf</p>
        <p>Pages: 12</p>
        <p className="text-green-600">Location detected ✔</p>
      </div>
    </div>
  );
}
