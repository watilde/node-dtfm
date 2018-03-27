window.encode = (val) => {
  if (window.__pushed__) return

  const context = window.__context__ || new AudioContext()
  const sampleRate = 8000
  const buffer = context.createBuffer(2, sampleRate, sampleRate)
  const data = buffer.getChannelData(0)
  const data1 = buffer.getChannelData(1)
  currentTime = 0
  const keymaps = {
    '1': [1209, 697],
    '2': [1336, 697],
    '3': [1477, 697],
    'A': [1633, 697],
    '4': [1209, 770],
    '5': [1336, 770],
    '6': [1477, 770],
    'B': [1633, 770],
    '7': [1209, 852],
    '8': [1336, 852],
    '9': [1477, 852],
    'C': [1633, 852],
    '*': [1209, 941],
    '0': [1336, 941],
    '#': [1477, 941],
    'D': [1633, 941]
  }
  if (!keymaps[val]) return

  for (let i = 0; i < 0.5 * sampleRate; i++) {
    data[i] = Math.sin((2 * Math.PI) * keymaps[val][0] * (i / sampleRate))
  }

  for (let i = 0; i < 0.5 * sampleRate; i++) {
    data1[i] = Math.sin((2 * Math.PI) * keymaps[val][1] * (i / sampleRate))
  }

  const gainNode = context.createGain()
  gainNode.connect(context.destination)

  const src = context.createBufferSource()
  src.buffer = buffer
  src.connect(gainNode)
  src.start(currentTime)

  window.__pushed__ = true
  setTimeout(() => {
    window.__pushed__ = false
  }, 500)
  if (!window.__context__) window.__context__ = context
}
