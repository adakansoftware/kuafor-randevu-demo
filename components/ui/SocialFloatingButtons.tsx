export default function SocialFloatingButtons() {
  return (
    <div className="fixed right-6 bottom-28 flex flex-col gap-3 z-50">

      {/* WhatsApp */}
      <a
        href="https://wa.me/905315910103?text=Merhaba%20bilgi%20almak%20istiyorum"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition"
      >
        <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor">
          <path d="M19.11 17.35c-.27-.13-1.59-.78-1.84-.87-.25-.09-.43-.13-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.13-.13.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.13-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3s.99 2.67 1.13 2.85c.14.18 1.95 2.98 4.72 4.18.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.59-.65 1.82-1.27.23-.62.23-1.15.16-1.27-.07-.11-.25-.18-.52-.31z"/>
          <path d="M16.04 3C9.41 3 4 8.33 4 14.89c0 2.63.87 5.05 2.36 7.02L4 29l7.35-2.24c1.91 1.04 4.06 1.59 6.25 1.59 6.63 0 12.04-5.33 12.04-11.89C29.64 8.33 24.23 3 17.6 3h-1.56z"/>
        </svg>
      </a>

      {/* Instagram */}
      <a
        href="https://instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg hover:scale-110 transition"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5z"/>
          <path d="M12 7a5 5 0 110 10 5 5 0 010-10zm0 2.2A2.8 2.8 0 109.2 12 2.8 2.8 0 0012 9.2z"/>
          <circle cx="17.5" cy="6.5" r="1.2"/>
        </svg>
      </a>

    </div>
  );
}