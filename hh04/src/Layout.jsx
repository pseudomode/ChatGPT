export default function Layout({ children, currentPageName }) {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; height: 100%; }
        @media (max-width: 600px) {
          html, body, #root { height: auto; min-height: 100%; overflow-x: hidden; }
        }
        @media (min-width: 601px) {
          html, body, #root { overflow: hidden; }
        }
      `}</style>
      {children}
    </>
  );
}