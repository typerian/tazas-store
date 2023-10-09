export const Footer = () => {
  return (
    <footer className="flex justify-center py-12">
      <span>
        Construido con ♡ en{" "}
        <a
          href="https://remix.run/"
          target="_blank"
          className=""
          rel="noreferrer"
        >
          Next.js
        </a>{" "}
        &{" "}
        <a
          href="https://turso.tech/"
          target="_blank"
          className="text-secondary-500"
          rel="noreferrer"
        >
          tRPC
        </a>
        {". Hosted on "}
        <a
          href="https://developers.cloudflare.com/workers/"
          target="_blank"
          className="text-orange-500"
          rel="noreferrer"
        >
          Vercel
        </a>
      </span>
    </footer>
  );
};
