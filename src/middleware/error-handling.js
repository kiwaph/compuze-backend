export function error404(req, res) {
    res.status(404).json({ message: '404: Page not found' })
}

export function errorInternal(err, req, res, next) {
    res.status(err.status || 500).json({ message: '500: Internal error'})
    console.log(err)
}