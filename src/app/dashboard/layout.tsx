import Footer from "@/components/Footer"

function layout({ children }: any) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}
export default layout