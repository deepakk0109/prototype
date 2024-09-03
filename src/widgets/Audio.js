import React from 'react'
import ReactAudioPlayer from 'react-audio-player'

const Audio = () => {
  return (
    <div style={{display:'flex', width:'100%', height:'100%'}}>
      <ReactAudioPlayer
        src="my_audio_file.ogg"
        autoPlay
        controls
        />
    </div>
  )
}

export default Audio
