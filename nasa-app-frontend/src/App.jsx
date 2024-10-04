import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt from 'jwt-encode'
import Footer from './components/Footer'
import Main from './components/Main'
import SideBar from './components/SideBar'
import VideoPlayer from './components/VideoPlayer'

export async function AppLoader() {

}

function App() {
  const [data, setData] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showModal, setShowModal] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const handleToggleModal = () => setShowModal(!showModal)
  const handleTogglePlayer = () => setShowPlayer(!showPlayer)

  useEffect(() => {
    async function fetchAPIData() {
      setIsLoading(true)
      const host = import.meta.env.VITE_API_URL || 'localhost:3000'
      const dateQuery = selectedDate.toISOString().split('T')[0];
      const url = `${host}/v1/nasa/apod?date=${dateQuery}`
      const jwtSecret = import.meta.env.VITE_JWT_SECRET
      const jwtPayload = { type: 'access' }
      const authToken = jwt(jwtPayload, jwtSecret)

      try {
        const headers = new Headers()
        headers.append('Authorization', `Bearer ${authToken}`)

        const res = await fetch(url, { headers: headers })
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }

        const apiData = await res.json()
        setData(apiData)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        navigate('/error')
      }
    }
    fetchAPIData()
  }, [selectedDate])

  return (
    <>
      {!isLoading ? (<Main data={data} handleTogglePlayer={handleTogglePlayer} />) : (
        <div className='loadingState'>
          <i className='fa-solid fa-gear'></i>
        </div>
      )}
      {showPlayer && (
        <VideoPlayer data={data} handleTogglePlayer={handleTogglePlayer} />
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
      {!isLoading && (
        <Footer
          data={data}
          selectedDate={selectedDate}
          handleToggleModal={handleToggleModal}
          setSelectedDate={setSelectedDate}
        />
      )}
    </>
  )
}

export default App