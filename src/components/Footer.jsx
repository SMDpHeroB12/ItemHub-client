export default function Footer() {
  return (
    <footer className="border-t border-base-200/60">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm opacity-80 text-center">
        <p>
          © {new Date().getFullYear()} Item
          <span className="text-primary">Hub</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
