// frontend/NavBar.tsx
export function NavBar() {
  return (
    <nav className="p-4 bg-zinc-900 text-white flex justify-between items-center">
      <a href="/" className="text-xl font-bold">AI Video</a>
      <div className="space-x-4">
        <a href="/login" className="hover:text-purple-400">Login</a>
        <a href="/my-videos" className="hover:text-purple-400">My Videos</a>
      </div>
    </nav>
  );
}
