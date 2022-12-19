const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (prev, cur) => prev + cur
  const mapper = (blog) => blog.likes ? blog.likes : 0
  return blogs.map(mapper).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (prev, cur) => cur.likes > prev.likes ? cur : prev
  return blogs.reduce(reducer, blogs[0] ? blogs[0] : null)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
