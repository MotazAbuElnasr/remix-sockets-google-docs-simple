import * as React from 'react'
import { LoaderFunction, useLoaderData } from 'remix'
import { colors } from '~/theme'
import { wsContext } from '~/ws-context'

type LoaderData = {
  room: string
}

export const loader: LoaderFunction = ({ params }): LoaderData => {
  if (!params.room) {
    throw 'Error, no room ooooops'
  }

  return { room: params.room }
}

export default function Index() {
  const { room } = useLoaderData<LoaderData>()
  const [text, setText] = React.useState('')
  const socket = React.useContext(wsContext)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    socket!.emit('send-client', event.target.value, room)
  }

  React.useEffect(() => {
    if (!socket) return

    socket.emit('join-room', room)
  }, [socket])

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
      <label
        htmlFor="text"
        style={{
          fontSize: 25,
          marginTop: 20,
          color: colors.pink,
          textAlign: 'center',
          fontFamily: 'sans-serif',
          fontWeight: 500,
        }}
      >
        Text
      </label>
      <textarea
        name="text"
        id="text"
        value={text}
        onChange={handleChange}
        style={{
          width: '80vw',
          maxWidth: 800,
          height: 900,
          marginTop: 30,
          color: colors.orange,
          backgroundColor: colors.brown,
          fontSize: 20,
          padding: 20,
          border: `2px solid ${colors.pink}`,
        }}
      ></textarea>
    </main>
  )
}
