
// Global Error Handler
export const errorHandler = (err, req, res, next) => {
  console.log(err)

  if (err.name === 'MongoError' && err.code === 11000) {
    res.status(409).json({
      success: false,
      message: 'An account with that credentials already exist.',
      error: err?.stack
    })
  }

  if (res.headersSent) return next(false)

  return res.status(err.status || 500).json({ success: false, message: 'Server Error', error: err?.stack })
}

// 404 Error
export const notFoundHandler = (req, res) =>
  res.send(
        `OList Test Project - v.0.1.0 ${`${new Date().toDateString()} - ${new Date().toLocaleTimeString()}`}`
  )
