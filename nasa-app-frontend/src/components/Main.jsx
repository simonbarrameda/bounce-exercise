export default function Main(props) {
  const { data, handleTogglePlayer } = props
  const imgUrl = data?.hdurl || data?.thumbnail_url
  const isVideo = data?.media_type === 'video'

  return (
      <div className='imgContainer'>
          <img src={imgUrl} alt={data?.title || 'bg-img'} className='bgImage' />
          {isVideo ? (
            <div className='videoPrompt'>
              <button onClick={handleTogglePlayer}>
                <i className="fa-regular fa-circle-play"></i>
              </button>
            </div>
          ) : null}
      </div>
  )
}