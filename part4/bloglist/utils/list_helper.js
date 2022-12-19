const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (prev, cur) => prev + cur
  const mapper = (blog) => blog.likes ? blog.likes : 0
  return blogs.map(mapper).reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}
