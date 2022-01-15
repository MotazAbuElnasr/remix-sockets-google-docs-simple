import * as React from 'react'
import { Textarea } from '~/components/Textarea'
import { colors } from '~/theme'
import { wsContext } from '~/ws-context'

export default function Index() {
  const [text, setText] = React.useState('')
  const socket = React.useContext(wsContext)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    socket!.emit('send-client', event.target.value)
  }

  React.useEffect(() => {
    if (!socket) return

    socket.on('receive-client', (text) => {
      setText(text)
    })
  }, [socket])

  return (
    <main
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: 40,
          color: colors.red,
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          marginTop: 25,
        }}
      >
        Extremely Simple Google Docs
      </h1>
      <Textarea text={text} handleChange={handleChange} />
    </main>
  )
}
