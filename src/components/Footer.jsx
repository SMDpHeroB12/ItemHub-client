export default function Footer() {
  return (
    <footer className="border-t border-base-200/60">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm opacity-80">
        <p>© {new Date().getFullYear()} ItemHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
