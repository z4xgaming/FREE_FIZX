// app/layout.js
export const metadata = {
  title: 'Free Fire Stats',
  description: 'Check player stats using free APIs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
