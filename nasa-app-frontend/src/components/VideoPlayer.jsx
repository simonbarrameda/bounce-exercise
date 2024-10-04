export default function VideoPlayer(props) {
  const { handleTogglePlayer, data } = props;

  return (
    <div onClick={handleTogglePlayer} className='videoContainer'>
      <iframe
        src={data.url}
        title={data.title || 'video'}
        allowFullScreen
        className='bgVideo'
      ></iframe>
    </div>
  )
}