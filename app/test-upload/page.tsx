'use client'

export default function TestUpload() {
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)

    const res = await fetch('/api/post-spruke', {
      method: 'POST',
      body: formData,
    })

    const result = await res.json()
    alert(JSON.stringify(result))
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🎬 Test Spruke Upload</h2>
      <form onSubmit={handleSubmit}>
        <input name="file" type="file" required /> <br />
        <input name="name" type="text" placeholder="Your name or handle" />{' '}
        <br />
        <input name="caption" type="text" placeholder="Short caption" /> <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}

