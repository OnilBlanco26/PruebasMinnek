import DogsTable from "../../components/DogsTable"
import Navbar from "../../components/Navbar"

const DogsTablePage = () => {
  return (
    <>
      <Navbar />
    <div className="table-container">
      <DogsTable />
    </div>
    </>
  )
}

export default DogsTablePage