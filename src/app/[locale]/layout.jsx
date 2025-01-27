import '@/app/globals.css'

export default async function RootLayout({ children, params }) {
  return (
    <html lang={params.locale}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
